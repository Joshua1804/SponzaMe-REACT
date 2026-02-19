<?php
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../controllers/TokenController.php';

/**
 * Handle /api/tokens/{action}
 */
function handleTokenRoutes(string $method, string $action): void
{
    if (!requireAuth())
        return;

    switch ($action) {
        case 'balance':
            if ($method === 'GET') {
                TokenController::balance();
                return;
            }
            break;

        case 'purchase':
            if ($method === 'POST') {
                TokenController::purchase();
                return;
            }
            break;

        case 'history':
            if ($method === 'GET') {
                TokenController::history();
                return;
            }
            break;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Token endpoint not found.']);
}
