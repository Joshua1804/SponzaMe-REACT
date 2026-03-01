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

        case 'campaigns':
            if ($method === 'GET') {
                AdminController::campaigns();
                return;
            }
            break;

        case 'campaign-status':
            if ($method === 'PUT') {
                AdminController::updateCampaignStatus();
                return;
            }
            break;

        case 'campaign':
            if ($method === 'DELETE') {
                AdminController::deleteCampaign();
                return;
            }
            break;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Admin endpoint not found.']);
}
