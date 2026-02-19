<?php
require_once __DIR__ . '/../config/db.php';

class TokenTransaction
{
    /**
     * Log a token transaction.
     */
    public static function create(int $userId, string $type, int $amount, string $description): array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "INSERT INTO token_transactions (user_id, type, amount, description)
             VALUES (:uid, :type, :amount, :desc)"
        );
        $stmt->execute([
            'uid' => $userId,
            'type' => $type,
            'amount' => $amount,
            'desc' => $description,
        ]);

        return self::findById((int)$db->lastInsertId());
    }

    /**
     * Find single transaction.
     */
    public static function findById(int $id): ?array
    {
        $db = getDB();
        $stmt = $db->prepare("SELECT * FROM token_transactions WHERE transaction_id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    /**
     * Get transaction history for a user.
     */
    public static function findByUser(int $userId): array
    {
        $db = getDB();
        $stmt = $db->prepare(
            "SELECT * FROM token_transactions WHERE user_id = :uid ORDER BY created_at DESC"
        );
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Purchase tokens: update user balance + log transaction.
     */
    public static function purchaseTokens(int $userId, string $plan): array
    {
        $plans = [
            'basic' => ['tokens' => 200, 'price' => 999],
            'value' => ['tokens' => 350, 'price' => 1200],
            'premium' => ['tokens' => 500, 'price' => 1500],
        ];

        if (!isset($plans[$plan])) {
            return ['error' => 'Invalid plan'];
        }

        $tokens = $plans[$plan]['tokens'];
        $price = $plans[$plan]['price'];

        $db = getDB();
        $db->beginTransaction();

        try {
            // Update user balance
            $stmt = $db->prepare("UPDATE users SET token_count = token_count + :tokens WHERE user_id = :uid");
            $stmt->execute(['tokens' => $tokens, 'uid' => $userId]);

            // Log transaction
            $stmt = $db->prepare(
                "INSERT INTO token_transactions (user_id, type, amount, description)
                 VALUES (:uid, 'purchased', :amount, :desc)"
            );
            $stmt->execute([
                'uid' => $userId,
                'amount' => $tokens,
                'desc' => "Purchased $plan plan (₹$price)",
            ]);

            $db->commit();

            // Get updated balance
            $stmt = $db->prepare("SELECT token_count FROM users WHERE user_id = :uid");
            $stmt->execute(['uid' => $userId]);
            $balance = (int)$stmt->fetchColumn();

            return [
                'tokens_added' => $tokens,
                'new_balance' => $balance,
                'plan' => $plan,
                'price' => $price,
            ];
        }
        catch (\Exception $e) {
            $db->rollBack();
            return ['error' => 'Transaction failed'];
        }
    }

    /**
     * Deduct tokens from a user. Returns false if insufficient balance.
     */
    public static function deductTokens(int $userId, int $amount, string $description): bool
    {
        $db = getDB();

        // Check balance
        $stmt = $db->prepare("SELECT token_count FROM users WHERE user_id = :uid");
        $stmt->execute(['uid' => $userId]);
        $balance = (int)$stmt->fetchColumn();

        if ($balance < $amount)
            return false;

        $db->beginTransaction();
        try {
            $stmt = $db->prepare("UPDATE users SET token_count = token_count - :amount WHERE user_id = :uid");
            $stmt->execute(['amount' => $amount, 'uid' => $userId]);

            $stmt = $db->prepare(
                "INSERT INTO token_transactions (user_id, type, amount, description)
                 VALUES (:uid, 'spent', :amount, :desc)"
            );
            $stmt->execute([
                'uid' => $userId,
                'amount' => -$amount,
                'desc' => $description,
            ]);

            $db->commit();
            return true;
        }
        catch (\Exception $e) {
            $db->rollBack();
            return false;
        }
    }
}
