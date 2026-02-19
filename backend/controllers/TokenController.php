<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/TokenTransaction.php';

class TokenController
{
    /**
     * GET /api/tokens/balance
     */
    public static function balance(): void
    {
        $userId = $_SESSION['user_id'];
        $user = User::findById($userId);

        echo json_encode([
            'balance' => (int)$user['token_count'],
        ]);
    }

    /**
     * POST /api/tokens/purchase
     * Body: { "plan": "basic" | "value" | "premium" }
     */
    public static function purchase(): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);
        $plan = $data['plan'] ?? null;

        if (!$plan) {
            http_response_code(400);
            echo json_encode(['error' => 'Plan is required.']);
            return;
        }

        $result = TokenTransaction::purchaseTokens($userId, $plan);

        if (isset($result['error'])) {
            http_response_code(400);
            echo json_encode(['error' => $result['error']]);
            return;
        }

        echo json_encode([
            'message' => 'Tokens purchased successfully.',
            'data' => $result,
        ]);
    }

    /**
     * GET /api/tokens/history
     */
    public static function history(): void
    {
        $userId = $_SESSION['user_id'];
        $transactions = TokenTransaction::findByUser($userId);

        echo json_encode([
            'transactions' => $transactions,
        ]);
    }
}
