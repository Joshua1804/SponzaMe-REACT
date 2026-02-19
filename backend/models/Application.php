<?php
require_once __DIR__ . '/../config/db.php';

class Application
{
    /**
     * Create a new application (creator applies for a campaign).
     */
    public static function create(int $campaignId, int $userId): ?array
    {
        $db = getDB();

        // Get creator_id from user_id
        $stmt = $db->prepare("SELECT creator_id FROM creator_profiles WHERE user_id = :uid");
        $stmt->execute(['uid' => $userId]);
        $creator = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$creator)
            return null;

        $creatorId = $creator['creator_id'];

        // Check for duplicate application
        $stmt = $db->prepare(
            "SELECT application_id FROM applications WHERE campaign_id = :cid AND creator_id = :crid"
        );
        $stmt->execute(['cid' => $campaignId, 'crid' => $creatorId]);
        if ($stmt->fetch())
            return null; // already applied

        $stmt = $db->prepare(
            "INSERT INTO applications (campaign_id, creator_id, status) VALUES (:cid, :crid, 'pending')"
        );
        $stmt->execute(['cid' => $campaignId, 'crid' => $creatorId]);

        return self::findById((int)$db->lastInsertId());
    }

    /**
     * Find a single application by ID.
     */
    public static function findById(int $id): ?array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT a.*, c.title AS campaign_title, c.budget, c.niche, c.platforms AS campaign_platforms
             FROM applications a
             JOIN campaigns c ON a.campaign_id = c.campaign_id
             WHERE a.application_id = :id"
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    /**
     * Get all applications for a creator (by user_id).
     */
    public static function findByCreator(int $userId): array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT a.*, c.title AS campaign_title, c.budget, c.niche,
                    c.platforms AS campaign_platforms, sp.company_name AS sponsor_name
             FROM applications a
             JOIN campaigns c ON a.campaign_id = c.campaign_id
             JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
             JOIN creator_profiles cp ON a.creator_id = cp.creator_id
             WHERE cp.user_id = :uid
             ORDER BY a.applied_at DESC"
        );
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get all applicants for a campaign.
     */
    public static function findByCampaign(int $campaignId): array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT a.*, u.name AS creator_name, cp.followers, cp.platforms, cp.niche
             FROM applications a
             JOIN creator_profiles cp ON a.creator_id = cp.creator_id
             JOIN users u ON cp.user_id = u.user_id
             WHERE a.campaign_id = :cid
             ORDER BY a.applied_at DESC"
        );
        $stmt->execute(['cid' => $campaignId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Update application status (approve / reject).
     */
    public static function updateStatus(int $id, string $status): bool
    {
        $db = getDB();
        $stmt = $db->prepare("UPDATE applications SET status = :status WHERE application_id = :id");
        return $stmt->execute(['status' => $status, 'id' => $id]);
    }

    /**
     * Count applications by a creator (by user_id).
     */
    public static function countByCreator(int $userId): array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT
                COUNT(*) AS total,
                SUM(CASE WHEN a.status = 'pending' THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN a.status = 'accepted' THEN 1 ELSE 0 END) AS accepted,
                SUM(CASE WHEN a.status = 'rejected' THEN 1 ELSE 0 END) AS rejected
             FROM applications a
             JOIN creator_profiles cp ON a.creator_id = cp.creator_id
             WHERE cp.user_id = :uid"
        );
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
