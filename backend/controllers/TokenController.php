<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/TokenTransaction.php';
require_once __DIR__ . '/../config/config.php';

class TokenController
{
    private static $plans = [
        'basic'   => ['tokens' => 200, 'price' => 999],
        'value'   => ['tokens' => 350, 'price' => 1200],
        'premium' => ['tokens' => 500, 'price' => 1500],
    ];

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
     * POST /api/tokens/create-order
     * Body: { "plan": "basic" | "value" | "premium" }
     * Creates a Razorpay order and returns order details to frontend.
     */
    public static function createOrder(): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);
        $plan = $data['plan'] ?? null;

        if (!$plan || !isset(self::$plans[$plan])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid or missing plan.']);
            return;
        }

        $planData = self::$plans[$plan];
        $amountInPaise = $planData['price'] * 100; // Razorpay expects amount in paise

        // Create Razorpay order via cURL
        $orderData = [
            'amount'   => $amountInPaise,
            'currency' => 'INR',
            'receipt'  => 'order_' . $userId . '_' . time(),
            'notes'    => [
                'plan'    => $plan,
                'user_id' => $userId,
                'tokens'  => $planData['tokens'],
            ],
        ];

        $ch = curl_init('https://api.razorpay.com/v1/orders');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_USERPWD        => RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET,
            CURLOPT_POSTFIELDS     => json_encode($orderData),
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode !== 200) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create Razorpay order.', 'details' => json_decode($response, true)]);
            return;
        }

        $order = json_decode($response, true);

        echo json_encode([
            'order_id' => $order['id'],
            'amount'   => $order['amount'],
            'currency' => $order['currency'],
            'key_id'   => RAZORPAY_KEY_ID,
            'plan'     => $plan,
        ]);
    }

    /**
     * POST /api/tokens/verify-payment
     * Body: { "razorpay_order_id", "razorpay_payment_id", "razorpay_signature", "plan" }
     * Verifies Razorpay payment signature and credits tokens.
     */
    public static function verifyPayment(): void
    {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);

        $orderId   = $data['razorpay_order_id']   ?? null;
        $paymentId = $data['razorpay_payment_id'] ?? null;
        $signature = $data['razorpay_signature']  ?? null;
        $plan      = $data['plan']                ?? null;

        if (!$orderId || !$paymentId || !$signature || !$plan) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing payment verification data.']);
            return;
        }

        if (!isset(self::$plans[$plan])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid plan.']);
            return;
        }

        // Verify signature: HMAC SHA256 of "order_id|payment_id" with key_secret
        $expectedSignature = hash_hmac('sha256', $orderId . '|' . $paymentId, RAZORPAY_KEY_SECRET);

        if (!hash_equals($expectedSignature, $signature)) {
            http_response_code(400);
            echo json_encode(['error' => 'Payment verification failed. Invalid signature.']);
            return;
        }

        // Signature valid — credit tokens
        $result = TokenTransaction::purchaseTokens($userId, $plan, $paymentId, $orderId);

        if (isset($result['error'])) {
            http_response_code(500);
            echo json_encode(['error' => $result['error']]);
            return;
        }

        echo json_encode([
            'message' => 'Payment verified and tokens credited successfully.',
            'data'    => $result,
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
