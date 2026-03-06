<?php
require_once __DIR__ . '/../config/config.php';

/**
 * Handle /api/chat  –  POST only
 * Proxies the user's message to the Gemini API and returns the reply.
 */
function handleChatRoutes(string $method): void
{
    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed.']);
        return;
    }

    // ── Auth check ──
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Not authenticated.']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $userMessage = trim($data['message'] ?? '');
    $history     = $data['history'] ?? [];

    if ($userMessage === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Message is required.']);
        return;
    }

    // ── Build Gemini request ──
    $apiKey = GEMINI_API_KEY;
    $model  = 'gemini-2.5-flash';
    $url    = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";

    $systemPrompt = <<<PROMPT
You are Pozo, the friendly AI assistant for SponzaMe — a platform that connects content creators with sponsors for brand collaborations.

About SponzaMe:
• Creators can build a profile showcasing their niche, platforms (Instagram, YouTube, Twitter), follower count, and pricing.
• Sponsors can create campaigns with budgets, deadlines, requirements, and target platforms.
• Creators browse and apply to campaigns using tokens (the platform currency).
• Sponsors browse creators and manage campaign applicants.
• Tokens can be purchased in the Token Shop or earned through platform activities.

Your role:
- Help users navigate the platform (dashboard, profile, campaigns, tokens, etc.)
- Answer questions about how SponzaMe works
- Give tips on creating effective profiles or campaigns
- Be concise, friendly, and helpful
- If asked something unrelated, politely redirect the conversation back to SponzaMe
- Use emojis sparingly to keep the tone approachable
PROMPT;

    // Build contents array with conversation history
    $contents = [];

    // Add history (alternating user/model messages)
    foreach ($history as $msg) {
        $role = ($msg['role'] === 'user') ? 'user' : 'model';
        $contents[] = [
            'role'  => $role,
            'parts' => [['text' => $msg['text']]],
        ];
    }

    // Add current user message
    $contents[] = [
        'role'  => 'user',
        'parts' => [['text' => $userMessage]],
    ];

    $payload = json_encode([
        'system_instruction' => [
            'parts' => [['text' => $systemPrompt]],
        ],
        'contents' => $contents,
        'generationConfig' => [
            'temperature'     => 0.7,
            'maxOutputTokens' => 512,
        ],
    ]);

    // ── Call Gemini API via cURL ──
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($response === false || $curlErr) {
        http_response_code(502);
        echo json_encode(['error' => 'Failed to reach the AI service: ' . $curlErr]);
        return;
    }

    $result = json_decode($response, true);

    // Check for API errors
    if (isset($result['error'])) {
        http_response_code(502);
        echo json_encode(['error' => 'AI service error: ' . ($result['error']['message'] ?? 'Unknown error')]);
        return;
    }

    $reply = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';

    if ($reply === '') {
        http_response_code(502);
        echo json_encode(['error' => 'No response from AI. Please try again.']);
        return;
    }

    echo json_encode(['reply' => $reply]);
}
