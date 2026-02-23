<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Campaign.php';
require_once __DIR__ . '/../models/Application.php';

class SponsorController
{
    /**
     * GET /api/sponsor/dashboard
     */
    public static function dashboard(): void
    {
        $userId = $_SESSION['user_id'];
        $user = User::findById($userId);
        $campaigns = Campaign::findBySponsor($userId);
        $campaignCount = count($campaigns);

        // Calculate total applicants across all campaigns
        $totalApplicants = 0;
        foreach ($campaigns as $c) {
            $totalApplicants += Campaign::countApplicants($c['campaign_id']);
        }

        $activeCampaigns = count(array_filter($campaigns, fn($c) => $c['status'] === 'active'));

        echo json_encode([
            'token_balance' => (int)$user['token_count'],
            'total_campaigns' => $campaignCount,
            'active_campaigns' => $activeCampaigns,
            'total_applicants' => $totalApplicants,
            'recent_campaigns' => array_slice($campaigns, 0, 5),
            'profile' => User::getSponsorProfile($userId),
        ]);
    }

    /**
     * GET /api/sponsor/profile
     */
    public static function getProfile(): void
    {
        $userId = $_SESSION['user_id'];
        $profile = User::getSponsorProfile($userId);

        if (!$profile) {
            http_response_code(404);
            echo json_encode(['error' => 'Sponsor profile not found.']);
            return;
        }

        echo json_encode(['profile' => $profile]);
    }

    /**
     * PUT /api/sponsor/profile
     */
    public static function updateProfile(): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'No data provided.']);
            return;
        }

        User::updateSponsorProfile($userId, $data);
        $profile = User::getSponsorProfile($userId);

        echo json_encode(['message' => 'Profile updated.', 'profile' => $profile]);
    }

    /**
     * POST /api/sponsor/campaigns
     */
    public static function createCampaign(): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || empty($data['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campaign title is required.']);
            return;
        }

        // Sanitise budget to a plain number (strip ₹, commas, spaces)
        if (!empty($data['budget'])) {
            $data['budget'] = preg_replace('/[^0-9.]/', '', $data['budget']);
            if ($data['budget'] === '') {
                $data['budget'] = null;
            }
        }

        // Sanitise deadline – must be YYYY-MM-DD or null
        if (!empty($data['deadline'])) {
            $d = date('Y-m-d', strtotime($data['deadline']));
            $data['deadline'] = ($d && $d !== '1970-01-01') ? $d : null;
        } else {
            $data['deadline'] = null;
        }

        try {
            $campaign = Campaign::create($userId, $data);
            if (!$campaign) {
                http_response_code(400);
                echo json_encode(['error' => 'Failed to create campaign. Sponsor profile may be missing.']);
                return;
            }

            http_response_code(201);
            echo json_encode(['message' => 'Campaign created.', 'campaign' => $campaign]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }

    /**
     * GET /api/sponsor/campaigns
     */
    public static function campaigns(): void
    {
        $userId = $_SESSION['user_id'];
        $campaigns = Campaign::findBySponsor($userId);

        // Enrich with applicant counts
        foreach ($campaigns as &$c) {
            $c['applicant_count'] = Campaign::countApplicants($c['campaign_id']);
        }

        echo json_encode(['campaigns' => $campaigns]);
    }

    /**
     * PUT /api/sponsor/campaign/{id}/status
     */
    public static function updateCampaignStatus(int $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $status = $data['status'] ?? null;

        if (!$status || !in_array($status, ['active', 'paused', 'closed'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status. Use: active, paused, closed.']);
            return;
        }

        Campaign::updateStatus($id, $status);
        echo json_encode(['message' => 'Campaign status updated.']);
    }

    /**
     * GET /api/sponsor/campaign/{id}/applicants
     */
    public static function applicants(int $campaignId): void
    {
        $applicants = Application::findByCampaign($campaignId);
        echo json_encode(['applicants' => $applicants]);
    }

    /**
     * PUT /api/sponsor/application/{id}/status
     */
    public static function updateApplicantStatus(int $appId): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $status = $data['status'] ?? null;

        if (!$status || !in_array($status, ['accepted', 'rejected'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status. Use: accepted, rejected.']);
            return;
        }

        Application::updateStatus($appId, $status);
        echo json_encode(['message' => "Application $status."]);
    }

    /**
     * GET /api/sponsor/creators(?search=&niche=)
     */
    public static function creators(): void
    {
        $creators = User::getAllCreators();

        // Optional filtering
        $search = $_GET['search'] ?? null;
        $niche = $_GET['niche'] ?? null;

        if ($search) {
            $s = strtolower($search);
            $creators = array_values(array_filter($creators, function ($c) use ($s) {
                return str_contains(strtolower($c['name'] ?? ''), $s)
                || str_contains(strtolower($c['fullname'] ?? ''), $s)
                || str_contains(strtolower($c['niche'] ?? ''), $s);
            }));
        }

        if ($niche) {
            $creators = array_values(array_filter($creators, function ($c) use ($niche) {
                return strtolower($c['niche'] ?? '') === strtolower($niche);
            }));
        }

        echo json_encode(['creators' => $creators]);
    }

    /**
     * GET /api/sponsor/creator/{id}
     */
    public static function creatorDetail(int $userId): void
    {
        $profile = User::getCreatorProfile($userId);

        if (!$profile) {
            http_response_code(404);
            echo json_encode(['error' => 'Creator not found.']);
            return;
        }

        echo json_encode(['creator' => $profile]);
    }

    /**
     * POST /api/sponsor/send-campaign
     * Body: { campaign_id, creator_user_id }
     * Inserts into applications with status = 'invited'
     */
    public static function sendCampaign(): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);

        $campaignId = (int) ($data['campaign_id'] ?? 0);
        $creatorUserId = (int) ($data['creator_user_id'] ?? 0);

        if (!$campaignId || !$creatorUserId) {
            http_response_code(400);
            echo json_encode(['error' => 'campaign_id and creator_user_id are required.']);
            return;
        }

        $db = getDB();

        // Verify campaign belongs to this sponsor
        $stmt = $db->prepare(
            "SELECT c.campaign_id FROM campaigns c
             JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
             WHERE c.campaign_id = :cid AND sp.user_id = :uid AND c.status = 'active'"
        );
        $stmt->execute(['cid' => $campaignId, 'uid' => $userId]);
        if (!$stmt->fetch()) {
            http_response_code(403);
            echo json_encode(['error' => 'Campaign not found or not active.']);
            return;
        }

        // Get creator_id from creator_profiles using user_id
        $stmt = $db->prepare(
            "SELECT cp.creator_id FROM creator_profiles cp
             JOIN users u ON cp.user_id = u.user_id
             WHERE u.user_id = :uid AND u.role = 'creator'"
        );
        $stmt->execute(['uid' => $creatorUserId]);
        $creator = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$creator) {
            http_response_code(404);
            echo json_encode(['error' => 'Creator not found.']);
            return;
        }

        $creatorId = $creator['creator_id'];

        // Check if already invited or applied
        $stmt = $db->prepare(
            "SELECT application_id, status FROM applications
             WHERE campaign_id = :cid AND creator_id = :crid"
        );
        $stmt->execute(['cid' => $campaignId, 'crid' => $creatorId]);
        $existing = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($existing) {
            http_response_code(409);
            echo json_encode([
                'error' => 'This creator already has an application/invitation for this campaign.',
                'existing_status' => $existing['status']
            ]);
            return;
        }

        // Insert invitation
        $stmt = $db->prepare(
            "INSERT INTO applications (campaign_id, creator_id, status) VALUES (:cid, :crid, 'invited')"
        );
        $stmt->execute(['cid' => $campaignId, 'crid' => $creatorId]);

        http_response_code(201);
        echo json_encode([
            'message' => 'Campaign invitation sent successfully.',
            'application_id' => $db->lastInsertId()
        ]);
    }

    /* ───────────────────────────────────────────────
     *  CAMPAIGN CRUD – single-resource endpoints
     * ─────────────────────────────────────────────── */

    /**
     * Verify the given campaign belongs to the logged-in sponsor.
     * Returns the campaign row or null.
     */
    private static function ownedCampaign(int $campaignId): ?array
    {
        $userId = $_SESSION['user_id'];
        $campaign = Campaign::findById($campaignId);
        if (!$campaign) return null;

        // Check ownership via sponsor_profiles
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT sponsor_id FROM sponsor_profiles WHERE user_id = :uid"
        );
        $stmt->execute(['uid' => $userId]);
        $sponsor = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$sponsor || (int)$campaign['sponsor_id'] !== (int)$sponsor['sponsor_id']) {
            return null;
        }

        return $campaign;
    }

    /**
     * GET /api/sponsor/campaign/{id}
     */
    public static function getCampaign(int $id): void
    {
        $campaign = self::ownedCampaign($id);

        if (!$campaign) {
            http_response_code(404);
            echo json_encode(['error' => 'Campaign not found.']);
            return;
        }

        $campaign['applicant_count'] = Campaign::countApplicants($id);
        echo json_encode(['campaign' => $campaign]);
    }

    /**
     * PUT /api/sponsor/campaign/{id}
     * Body: { title, description, niche, budget, deadline, platforms, requirements, deliverables }
     */
    public static function updateCampaign(int $id): void
    {
        $campaign = self::ownedCampaign($id);

        if (!$campaign) {
            http_response_code(404);
            echo json_encode(['error' => 'Campaign not found.']);
            return;
        }

        if ($campaign['status'] === 'closed') {
            http_response_code(403);
            echo json_encode(['error' => 'Cannot edit a closed campaign.']);
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campaign title is required.']);
            return;
        }

        // Sanitise budget
        if (!empty($data['budget'])) {
            $data['budget'] = preg_replace('/[^0-9.]/', '', $data['budget']);
            if ($data['budget'] === '') $data['budget'] = null;
        }

        // Sanitise deadline
        if (!empty($data['deadline'])) {
            $d = date('Y-m-d', strtotime($data['deadline']));
            $data['deadline'] = ($d && $d !== '1970-01-01') ? $d : null;
        } else {
            $data['deadline'] = null;
        }

        Campaign::update($id, $data);
        $updated = Campaign::findById($id);
        echo json_encode(['message' => 'Campaign updated.', 'campaign' => $updated]);
    }

    /**
     * DELETE /api/sponsor/campaign/{id}
     */
    public static function deleteCampaign(int $id): void
    {
        $campaign = self::ownedCampaign($id);

        if (!$campaign) {
            http_response_code(404);
            echo json_encode(['error' => 'Campaign not found.']);
            return;
        }

        Campaign::delete($id);
        echo json_encode(['message' => 'Campaign deleted.']);
    }
}
