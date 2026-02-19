<?php
require_once __DIR__ . '/../config/db.php';

class User
{
    public static function findByEmail(string $email): ?array
    {
        $db = getDB();
        $stmt = $db->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->execute(['email' => $email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function findById(int $id): ?array
    {
        $db = getDB();
        $stmt = $db->prepare(
            'SELECT user_id, name, email, role, is_active, token_count, created_at FROM users WHERE user_id = :id'
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function create(string $name, string $email, string $password, string $role): array
    {
        $db = getDB();
        $hash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $db->prepare(
            'INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)'
        );
        $stmt->execute([
            'name' => $name,
            'email' => $email,
            'password' => $hash,
            'role' => $role,
        ]);

        $userId = (int)$db->lastInsertId();

        // Auto-create profile row
        if ($role === 'creator') {
            $stmt = $db->prepare(
                "INSERT INTO creator_profiles (user_id, fullname) VALUES (:uid, :name)"
            );
            $stmt->execute(['uid' => $userId, 'name' => $name]);
        }
        elseif ($role === 'sponsor') {
            $stmt = $db->prepare(
                "INSERT INTO sponsor_profiles (user_id, company_name) VALUES (:uid, :name)"
            );
            $stmt->execute(['uid' => $userId, 'name' => $name]);
        }

        return self::findById($userId);
    }

    // ─── Creator Profile ───

    public static function getCreatorProfile(int $userId): ?array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT u.user_id, u.name, u.email, u.token_count, u.created_at,
                    cp.creator_id, cp.fullname, cp.description, cp.platforms, cp.instalink,
                    cp.bio, cp.niche, cp.location, cp.pricing, cp.followers,
                    cp.youtube_url, cp.twitter_url
             FROM users u
             LEFT JOIN creator_profiles cp ON u.user_id = cp.user_id
             WHERE u.user_id = :uid AND u.role = 'creator'"
        );
        $stmt->execute(['uid' => $userId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function updateCreatorProfile(int $userId, array $data): bool
    {
        $db = getDB();

        // Check if profile exists
        $stmt = $db->prepare("SELECT creator_id FROM creator_profiles WHERE user_id = :uid");
        $stmt->execute(['uid' => $userId]);
        $exists = $stmt->fetch();

        $fields = ['fullname', 'description', 'platforms', 'instalink', 'bio', 'niche', 'location', 'pricing', 'followers', 'youtube_url', 'twitter_url'];

        if ($exists) {
            $sets = [];
            $params = ['uid' => $userId];
            foreach ($fields as $f) {
                if (isset($data[$f])) {
                    $sets[] = "$f = :$f";
                    $params[$f] = $data[$f];
                }
            }
            if (empty($sets))
                return true;
            $sql = "UPDATE creator_profiles SET " . implode(', ', $sets) . " WHERE user_id = :uid";
            return $db->prepare($sql)->execute($params);
        }
        else {
            $data['user_id'] = $userId;
            if (!isset($data['fullname'])) {
                $user = self::findById($userId);
                $data['fullname'] = $user['name'] ?? '';
            }
            $cols = ['user_id', 'fullname'];
            $vals = [':user_id', ':fullname'];
            $params = ['user_id' => $userId, 'fullname' => $data['fullname']];
            foreach ($fields as $f) {
                if ($f === 'fullname')
                    continue;
                if (isset($data[$f])) {
                    $cols[] = $f;
                    $vals[] = ":$f";
                    $params[$f] = $data[$f];
                }
            }
            $sql = "INSERT INTO creator_profiles (" . implode(', ', $cols) . ") VALUES (" . implode(', ', $vals) . ")";
            return $db->prepare($sql)->execute($params);
        }
    }

    // ─── Sponsor Profile ───

    public static function getSponsorProfile(int $userId): ?array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT u.user_id, u.name, u.email, u.token_count, u.created_at,
                    sp.sponsor_id, sp.company_name, sp.description, sp.industry,
                    sp.location, sp.budget_range, sp.hiring_for, sp.platforms
             FROM users u
             LEFT JOIN sponsor_profiles sp ON u.user_id = sp.user_id
             WHERE u.user_id = :uid AND u.role = 'sponsor'"
        );
        $stmt->execute(['uid' => $userId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function updateSponsorProfile(int $userId, array $data): bool
    {
        $db = getDB();

        $stmt = $db->prepare("SELECT sponsor_id FROM sponsor_profiles WHERE user_id = :uid");
        $stmt->execute(['uid' => $userId]);
        $exists = $stmt->fetch();

        $fields = ['company_name', 'description', 'industry', 'location', 'budget_range', 'hiring_for', 'platforms'];

        if ($exists) {
            $sets = [];
            $params = ['uid' => $userId];
            foreach ($fields as $f) {
                if (isset($data[$f])) {
                    $sets[] = "$f = :$f";
                    $params[$f] = $data[$f];
                }
            }
            if (empty($sets))
                return true;
            $sql = "UPDATE sponsor_profiles SET " . implode(', ', $sets) . " WHERE user_id = :uid";
            return $db->prepare($sql)->execute($params);
        }
        else {
            $data['user_id'] = $userId;
            if (!isset($data['company_name'])) {
                $user = self::findById($userId);
                $data['company_name'] = $user['name'] ?? '';
            }
            $cols = ['user_id', 'company_name'];
            $vals = [':user_id', ':company_name'];
            $params = ['user_id' => $userId, 'company_name' => $data['company_name']];
            foreach ($fields as $f) {
                if ($f === 'company_name')
                    continue;
                if (isset($data[$f])) {
                    $cols[] = $f;
                    $vals[] = ":$f";
                    $params[$f] = $data[$f];
                }
            }
            $sql = "INSERT INTO sponsor_profiles (" . implode(', ', $cols) . ") VALUES (" . implode(', ', $vals) . ")";
            return $db->prepare($sql)->execute($params);
        }
    }

    // ─── Admin Helpers ───

    /**
     * Get all creators with profiles (for BrowseCreators).
     */
    public static function getAllCreators(): array
    {
        $db = getDB();
        $stmt = $db->query(
            "SELECT u.user_id, u.name, u.email,
                    cp.fullname, cp.bio, cp.niche, cp.location, cp.platforms,
                    cp.followers, cp.instalink, cp.youtube_url, cp.twitter_url, cp.pricing
             FROM users u
             LEFT JOIN creator_profiles cp ON u.user_id = cp.user_id
             WHERE u.role = 'creator' AND u.is_active = 1
             ORDER BY u.created_at DESC"
        );
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Admin stats.
     */
    public static function getStats(): array
    {
        $db = getDB();
        $total = (int)$db->query("SELECT COUNT(*) FROM users")->fetchColumn();
        $creators = (int)$db->query("SELECT COUNT(*) FROM users WHERE role = 'creator'")->fetchColumn();
        $sponsors = (int)$db->query("SELECT COUNT(*) FROM users WHERE role = 'sponsor'")->fetchColumn();
        $active = (int)$db->query("SELECT COUNT(*) FROM users WHERE is_active = 1")->fetchColumn();

        return [
            'total' => $total,
            'creators' => $creators,
            'sponsors' => $sponsors,
            'active' => $active,
        ];
    }
}
