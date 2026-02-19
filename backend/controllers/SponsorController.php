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

        $campaign = Campaign::create($userId, $data);
        if (!$campaign) {
            http_response_code(400);
            echo json_encode(['error' => 'Failed to create campaign. Sponsor profile may be missing.']);
            return;
        }

        http_response_code(201);
        echo json_encode(['message' => 'Campaign created.', 'campaign' => $campaign]);
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
}
