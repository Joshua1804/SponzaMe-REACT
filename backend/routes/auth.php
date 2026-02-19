<?php
require_once __DIR__ . '/../controllers/AuthController.php';

/**
 * Handle /api/auth/* routes.
 * $method — HTTP method (GET, POST, …)
 * $action — the path segment after /api/auth/  (e.g. "login", "signup")
 */
function handleAuthRoutes(string $method, string $action): void
{
    switch ($action) {
        case 'signup':
            if ($method === 'POST') {
                AuthController::signup();
            }
            else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed.']);
            }
            break;

        case 'login':
            if ($method === 'POST') {
                AuthController::login();
            }
            else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed.']);
            }
            break;

        case 'logout':
            if ($method === 'POST') {
                AuthController::logout();
            }
            else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed.']);
            }
            break;

        case 'me':
            if ($method === 'GET') {
                AuthController::me();
            }
            else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed.']);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Route not found.']);
            break;
    }
}
