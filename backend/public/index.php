<?php
require_once __DIR__ . '/../config/config.php';

// ── CORS ──
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Session ──
session_set_cookie_params([
    'lifetime' => SESSION_LIFETIME,
    'path' => '/',
    'domain' => '',
    'secure' => false, // set true in production with HTTPS
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

// ── Routing ──
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Strip trailing slash
$uri = rtrim($uri, '/');

// Route: /api/auth/{action}
if (preg_match('#^/api/auth/(\w+)$#', $uri, $matches)) {
    require_once __DIR__ . '/../routes/auth.php';
    handleAuthRoutes($method, $matches[1]);
    exit;
}

// Fallback
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found.']);
