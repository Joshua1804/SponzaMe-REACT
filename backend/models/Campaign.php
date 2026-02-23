<?php
require_once __DIR__ . '/../config/db.php';

class Campaign
{
    /**
     * Get all active campaigns (for creators to browse).
     */
    public static function findAll(?string $niche = null, ?string $search = null): array
    {
        $db = getDB();
        $sql = "SELECT c.*, sp.company_name AS sponsor_name
                FROM campaigns c
                JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
                WHERE c.status = 'active'";
        $params = [];

        if ($niche) {
            $sql .= " AND c.niche = :niche";
            $params['niche'] = $niche;
        }
        if ($search) {
            $sql .= " AND (c.title LIKE :search OR c.description LIKE :search2)";
            $params['search'] = "%$search%";
            $params['search2'] = "%$search%";
        }

        $sql .= " ORDER BY c.created_at DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get a single campaign by ID.
     */
    public static function findById(int $id): ?array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT c.*, sp.company_name AS sponsor_name
             FROM campaigns c
             JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
             WHERE c.campaign_id = :id"
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    /**
     * Get campaigns owned by a sponsor (using user_id).
     */
    public static function findBySponsor(int $userId): array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT c.*
             FROM campaigns c
             JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
             WHERE sp.user_id = :uid
             ORDER BY c.created_at DESC"
        );
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create a new campaign.
     */
    public static function create(int $userId, array $data): ?array
    {
        $db = getDB();

        // Get sponsor_id from user_id
        $stmt = $db->prepare("SELECT sponsor_id FROM sponsor_profiles WHERE user_id = :uid");
        $stmt->execute(['uid' => $userId]);
        $sponsor = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$sponsor)
            return null;

        $stmt = $db->prepare(
            "INSERT INTO campaigns (sponsor_id, title, description, niche, budget, company_name, deadline, platforms, token_cost, requirements, deliverables, status)
             VALUES (:sid, :title, :desc, :niche, :budget, :company, :deadline, :platforms, :token_cost, :reqs, :delivs, 'active')"
        );
        $stmt->execute([
            'sid' => $sponsor['sponsor_id'],
            'title' => $data['title'],
            'desc' => $data['description'] ?? '',
            'niche' => $data['niche'] ?? null,
            'budget' => $data['budget'] ?? null,
            'company' => $data['company_name'] ?? null,
            'deadline' => $data['deadline'] ?? null,
            'platforms' => is_array($data['platforms'] ?? null) ? implode(',', $data['platforms']) : ($data['platforms'] ?? null),
            'token_cost' => $data['token_cost'] ?? 2,
            'reqs' => is_array($data['requirements'] ?? null) ? implode("\n", $data['requirements']) : ($data['requirements'] ?? null),
            'delivs' => is_array($data['deliverables'] ?? null) ? implode("\n", $data['deliverables']) : ($data['deliverables'] ?? null),
        ]);

        return self::findById((int)$db->lastInsertId());
    }

    /**
     * Update campaign status.
     */
    public static function updateStatus(int $id, string $status): bool
    {
        $db = getDB();
        $stmt = $db->prepare("UPDATE campaigns SET status = :status WHERE campaign_id = :id");
        return $stmt->execute(['status' => $status, 'id' => $id]);
    }

    /**
     * Count campaigns for a sponsor.
     */
    public static function countBySponsor(int $userId): int
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT COUNT(*) FROM campaigns c
             JOIN sponsor_profiles sp ON c.sponsor_id = sp.sponsor_id
             WHERE sp.user_id = :uid"
        );
        $stmt->execute(['uid' => $userId]);
        return (int)$stmt->fetchColumn();
    }

    /**
     * Count all campaigns (admin).
     */
    public static function countAll(): int
    {
        $db = getDB();
        return (int)$db->query("SELECT COUNT(*) FROM campaigns")->fetchColumn();
    }

    /**
     * Count applicants for a campaign.
     */
    public static function countApplicants(int $campaignId): int
    {
        $db = getDB();
        $stmt = $db->prepare("SELECT COUNT(*) FROM applications WHERE campaign_id = :cid");
        $stmt->execute(['cid' => $campaignId]);
        return (int)$stmt->fetchColumn();
    }

    /**
     * Update campaign fields.
     */
    public static function update(int $id, array $data): bool
    {
        $db = getDB();
        $stmt = $db->prepare(
            "UPDATE campaigns SET
                title        = :title,
                description  = :desc,
                niche        = :niche,
                budget       = :budget,
                deadline     = :deadline,
                platforms    = :platforms,
                requirements = :reqs,
                deliverables = :delivs
             WHERE campaign_id = :id"
        );
        return $stmt->execute([
            'title'     => $data['title'],
            'desc'      => $data['description'] ?? '',
            'niche'     => $data['niche'] ?? null,
            'budget'    => $data['budget'] ?? null,
            'deadline'  => $data['deadline'] ?? null,
            'platforms' => is_array($data['platforms'] ?? null) ? implode(',', $data['platforms']) : ($data['platforms'] ?? null),
            'reqs'      => is_array($data['requirements'] ?? null) ? implode("\n", $data['requirements']) : ($data['requirements'] ?? null),
            'delivs'    => is_array($data['deliverables'] ?? null) ? implode("\n", $data['deliverables']) : ($data['deliverables'] ?? null),
            'id'        => $id,
        ]);
    }

    /**
     * Delete a campaign by ID. Applications are cascade-deleted via FK.
     */
    public static function delete(int $id): bool
    {
        $db = getDB();
        $stmt = $db->prepare("DELETE FROM campaigns WHERE campaign_id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
