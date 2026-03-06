<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Campaign.php';
require_once __DIR__ . '/../models/Application.php';
require_once __DIR__ . '/../models/TokenTransaction.php';
require_once __DIR__ . '/../helpers/Mailer.php';

class CreatorController
{
    /**
     * GET /api/creator/dashboard
     * Returns token balance, application stats, and recent applications.
     */
    public static function dashboard(): void
    {
        $userId = $_SESSION['user_id'];
        $user = User::findById($userId);
        $profile = User::getCreatorProfile($userId);
        $stats = Application::countByCreator($userId);
        $applications = Application::findByCreator($userId);

        echo json_encode([
            'user_name' => $user['name'],
            'token_balance' => (int)$user['token_count'],
            'stats' => $stats,
            'recent_applications' => array_slice($applications, 0, 5),
            'profile' => $profile,
        ]);
    }

    /**
     * GET /api/creator/profile
     */
    public static function getProfile(): void
    {
        $userId = $_SESSION['user_id'];
        $profile = User::getCreatorProfile($userId);

        if (!$profile) {
            http_response_code(404);
            echo json_encode(['error' => 'Creator profile not found.']);
            return;
        }

        echo json_encode(['profile' => $profile]);
    }

    /**
     * PUT /api/creator/profile
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

        User::updateCreatorProfile($userId, $data);
        $profile = User::getCreatorProfile($userId);

        echo json_encode(['message' => 'Profile updated.', 'profile' => $profile]);
    }

    /**
     * GET /api/creator/campaigns(?niche=&search=)
     */
    public static function campaigns(): void
    {
        $niche = $_GET['niche'] ?? null;
        $search = $_GET['search'] ?? null;

        $campaigns = Campaign::findAll($niche, $search);
        echo json_encode(['campaigns' => $campaigns]);
    }

    /**
     * GET /api/creator/campaign/{id}
     */
    public static function campaign(int $id): void
    {
        $campaign = Campaign::findById($id);

        if (!$campaign) {
            http_response_code(404);
            echo json_encode(['error' => 'Campaign not found.']);
            return;
        }

        $applicantCount = Campaign::countApplicants($id);
        $campaign['applicant_count'] = $applicantCount;

        // Count how many campaigns this sponsor has posted
        $db = getDB();
        $stmt = $db->prepare("SELECT COUNT(*) FROM campaigns WHERE sponsor_id = :sid");
        $stmt->execute(['sid' => $campaign['sponsor_id']]);
        $campaign['sponsor_campaign_count'] = (int)$stmt->fetchColumn();

        // Check if the current creator has already applied
        $userId = $_SESSION['user_id'];
        $stmt = $db->prepare("SELECT creator_id FROM creator_profiles WHERE user_id = :uid");
        $stmt->execute(['uid' => $userId]);
        $creator = $stmt->fetch(PDO::FETCH_ASSOC);
        $campaign['has_applied'] = false;
        if ($creator) {
            $stmt = $db->prepare("SELECT application_id FROM applications WHERE campaign_id = :cid AND creator_id = :crid");
            $stmt->execute(['cid' => $id, 'crid' => $creator['creator_id']]);
            $campaign['has_applied'] = (bool)$stmt->fetch();
        }

        echo json_encode(['campaign' => $campaign]);
    }

    /**
     * POST /api/creator/campaign/{id}/apply
     * Deducts tokens and creates application.
     */
    public static function apply(int $campaignId): void
    {
        $userId = $_SESSION['user_id'];

        // Get campaign to check token cost
        $campaign = Campaign::findById($campaignId);
        if (!$campaign) {
            http_response_code(404);
            echo json_encode(['error' => 'Campaign not found.']);
            return;
        }

        // Guard: campaign must be active
        if (($campaign['status'] ?? 'active') !== 'active') {
            http_response_code(400);
            echo json_encode(['error' => 'This campaign is no longer accepting applications.']);
            return;
        }

        // Guard: deadline must not have passed
        if (!empty($campaign['deadline']) && strtotime($campaign['deadline']) < strtotime('today')) {
            http_response_code(400);
            echo json_encode(['error' => 'The deadline for this campaign has passed.']);
            return;
        }

        $cost = (int)($campaign['token_cost'] ?? 2);

        // Deduct tokens
        $deducted = TokenTransaction::deductTokens(
            $userId,
            $cost,
            "Applied to '{$campaign['title']}' campaign"
        );

        if (!$deducted) {
            http_response_code(400);
            echo json_encode(['error' => 'Insufficient tokens. You need ' . $cost . ' tokens to apply.']);
            return;
        }

        // Create application
        $app = Application::create($campaignId, $userId);
        if (!$app) {
            http_response_code(409);
            echo json_encode(['error' => 'You have already applied to this campaign, or your creator profile is missing.']);
            return;
        }

        http_response_code(201);
        echo json_encode([
            'message' => 'Application submitted successfully.',
            'application' => $app,
            'tokens_spent' => $cost,
        ]);

        // Send email notification to the sponsor (non-blocking: don't fail if email fails)
        try {
            $db = getDB();
            $user = User::findById($userId);
            $creatorName = $user['name'] ?? 'A creator';

            // Get sponsor's email via sponsor_id -> user_id -> users table
            $stmt = $db->prepare(
                "SELECT u.email, u.name FROM users u
                 JOIN sponsor_profiles sp ON sp.user_id = u.user_id
                 WHERE sp.sponsor_id = :sid"
            );
            $stmt->execute(['sid' => $campaign['sponsor_id']]);
            $sponsor = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($sponsor && !empty($sponsor['email'])) {
                Mailer::notifyApplicationReceived(
                    $sponsor['email'],
                    $sponsor['name'] ?? 'Sponsor',
                    $creatorName,
                    $campaign['title']
                );
            }
        }
        catch (\Exception $e) {
            error_log('Email notification failed: ' . $e->getMessage());
        }
    }

    /**
     * GET /api/creator/applications
     */
    public static function applications(): void
    {
        $userId = $_SESSION['user_id'];
        $applications = Application::findByCreator($userId);
        echo json_encode(['applications' => $applications]);
    }

    /**
     * GET /api/creator/tokens
     * Token balance and transaction history.
     */
    public static function tokens(): void
    {
        $userId = $_SESSION['user_id'];
        $user = User::findById($userId);
        $history = TokenTransaction::findByUser($userId);

        echo json_encode([
            'balance' => (int)$user['token_count'],
            'transactions' => $history,
        ]);
    }

    /**
     * GET /api/creator/application/{id}/contact
     * Returns real sponsor contact info for an accepted application.
     * Deducts 5 tokens on first view.
     */
    public static function viewContact(int $applicationId): void
    {
        $userId = $_SESSION['user_id'];
        $db = getDB();

        // Verify application belongs to this creator and is accepted
        $stmt = $db->prepare(
            "SELECT a.*, c.sponsor_id, c.title AS campaign_title
             FROM applications a
             JOIN campaigns c ON a.campaign_id = c.campaign_id
             JOIN creator_profiles cp ON a.creator_id = cp.creator_id
             WHERE a.application_id = :aid AND cp.user_id = :uid"
        );
        $stmt->execute(['aid' => $applicationId, 'uid' => $userId]);
        $application = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$application) {
            http_response_code(404);
            echo json_encode(['error' => 'Application not found.']);
            return;
        }

        if ($application['status'] !== 'accepted') {
            http_response_code(403);
            echo json_encode(['error' => 'Contact is only available for accepted applications.']);
            return;
        }

        // Check if tokens were already deducted for this contact view
        $desc = "Viewed contact for application #{$applicationId}";
        $stmt = $db->prepare(
            "SELECT transaction_id FROM token_transactions
             WHERE user_id = :uid AND description = :desc"
        );
        $stmt->execute(['uid' => $userId, 'desc' => $desc]);
        $alreadyViewed = (bool)$stmt->fetch();

        if (!$alreadyViewed) {
            $deducted = TokenTransaction::deductTokens($userId, 5, $desc);
            if (!$deducted) {
                http_response_code(400);
                echo json_encode(['error' => 'Insufficient tokens. You need 5 tokens to view contact info.']);
                return;
            }
        }

        // Fetch sponsor contact info
        $stmt = $db->prepare(
            "SELECT u.name, u.email, sp.company_name
             FROM sponsor_profiles sp
             JOIN users u ON sp.user_id = u.user_id
             WHERE sp.sponsor_id = :sid"
        );
        $stmt->execute(['sid' => $application['sponsor_id']]);
        $sponsor = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            'contact' => [
                'name' => $sponsor['name'] ?? '—',
                'email' => $sponsor['email'] ?? '—',
                'company' => $sponsor['company_name'] ?? '—',
            ],
            'tokens_deducted' => !$alreadyViewed ? 5 : 0,
        ]);
    }

    /**
     * POST /api/creator/invitation/{id}/respond
     * Creator accepts or rejects an invitation.
     * Body: { "action": "accepted" | "rejected" }
     */
    public static function respondToInvitation(int $applicationId): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);
        $action = $data['action'] ?? '';

        if (!in_array($action, ['accepted', 'rejected'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action. Must be "accepted" or "rejected".']);
            return;
        }

        $db = getDB();

        // Verify the application belongs to this creator and is an invitation
        $stmt = $db->prepare(
            "SELECT a.*
             FROM applications a
             JOIN creator_profiles cp ON a.creator_id = cp.creator_id
             WHERE a.application_id = :aid AND cp.user_id = :uid"
        );
        $stmt->execute(['aid' => $applicationId, 'uid' => $userId]);
        $application = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$application) {
            http_response_code(404);
            echo json_encode(['error' => 'Invitation not found.']);
            return;
        }

        if ($application['status'] !== 'invited') {
            http_response_code(400);
            echo json_encode(['error' => 'This is not a pending invitation.']);
            return;
        }

        Application::updateStatus($applicationId, $action);

        echo json_encode([
            'message' => 'Invitation ' . $action . ' successfully.',
            'status' => $action,
        ]);
    }
}
