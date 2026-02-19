<?php
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../middleware/role.php';
require_once __DIR__ . '/../controllers/CreatorController.php';

/**
 * Handle /api/creator/{action}[/{id}][/{subaction}]
 */
function handleCreatorRoutes(string $method, string $action, ?int $id = null, ?string $subAction = null): void
{
    if (!requireAuth())
        return;
    if (!requireRole('creator'))
        return;

    switch ($action) {
        case 'dashboard':
            if ($method === 'GET') {
                CreatorController::dashboard();
                return;
            }
            break;

        case 'profile':
            if ($method === 'GET') {
                CreatorController::getProfile();
                return;
            }
            if ($method === 'PUT') {
                CreatorController::updateProfile();
                return;
            }
            break;

        case 'campaigns':
            if ($method === 'GET') {
                CreatorController::campaigns();
                return;
            }
            break;

        case 'campaign':
            if ($id !== null && $subAction === 'apply' && $method === 'POST') {
                CreatorController::apply($id);
                return;
            }
            if ($id !== null && $method === 'GET') {
                CreatorController::campaign($id);
                return;
            }
            break;

        case 'applications':
            if ($method === 'GET') {
                CreatorController::applications();
                return;
            }
            break;

        case 'tokens':
            if ($method === 'GET') {
                CreatorController::tokens();
                return;
            }
            break;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Creator endpoint not found.']);
}
