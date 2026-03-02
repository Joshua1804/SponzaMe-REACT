<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Campaign.php';

class AdminController
{
    /**
     * GET /api/admin/dashboard
     */
    public static function dashboard(): void
    {
        $userStats = User::getStats();
        $campaignCount = Campaign::countAll();

        // Count active campaigns
        $db = getDB();
        $activeCampaigns = (int)$db->query("SELECT COUNT(*) FROM campaigns WHERE status = 'active'")->fetchColumn();
        $totalApplications = (int)$db->query("SELECT COUNT(*) FROM applications")->fetchColumn();

        echo json_encode([
            'users' => $userStats,
            'campaigns' => $campaignCount,
            'activeCampaigns' => $activeCampaigns,
            'totalApplications' => $totalApplications,
        ]);
    }

    /**
     * GET /api/admin/campaigns
     * Returns all campaigns with sponsor name and applicant count.
     */
    public static function campaigns(): void
    {
        $db = getDB();
        $stmt = $db->query(
            "SELECT c.*,
                    sp.company_name AS sponsor_name,
                    (SELECT COUNT(*) FROM applications a WHERE a.campaign_id = c.campaign_id) AS applicant_count
             FROM campaigns c
             LEFT JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
             ORDER BY c.created_at DESC"
        );
        $campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['campaigns' => $campaigns]);
    }

    /**
     * PUT /api/admin/campaign-status
     * Body: { "campaign_id": int, "status": "active"|"paused" }
     */
    public static function updateCampaignStatus(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = (int)($data['campaign_id'] ?? 0);
        $status = $data['status'] ?? '';

        if (!$id || !in_array($status, ['active', 'paused'], true)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid campaign_id or status.']);
            return;
        }

        Campaign::updateStatus($id, $status);
        echo json_encode(['message' => 'Campaign status updated.', 'status' => $status]);
    }

    /**
     * DELETE /api/admin/campaign?id=<campaign_id>
     */
    public static function deleteCampaign(): void
    {
        $id = (int)($_GET['id'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Campaign ID is required.']);
            return;
        }

        Campaign::delete($id);
        echo json_encode(['message' => 'Campaign deleted.']);
    }
}
