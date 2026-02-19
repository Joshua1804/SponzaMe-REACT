<?php
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../middleware/role.php';
require_once __DIR__ . '/../controllers/AdminController.php';

/**
 * Handle /api/admin/{action}
 */
function handleAdminRoutes(string $method, string $action): void
{
    if (!requireAuth())
        return;
    if (!requireRole('admin'))
        return;

    switch ($action) {
        case 'dashboard':
            if ($method === 'GET') {
                AdminController::dashboard();
                return;
            }
            break;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Admin endpoint not found.']);
}
