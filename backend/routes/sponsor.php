<?php
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../middleware/role.php';
require_once __DIR__ . '/../controllers/SponsorController.php';

/**
 * Handle /api/sponsor/{action}[/{id}][/{subaction}]
 */
function handleSponsorRoutes(string $method, string $action, ?int $id = null, ?string $subAction = null): void
{
    if (!requireAuth())
        return;
    if (!requireRole('sponsor'))
        return;

    switch ($action) {
        case 'dashboard':
            if ($method === 'GET') {
                SponsorController::dashboard();
                return;
            }
            break;

        case 'profile':
            if ($method === 'GET') {
                SponsorController::getProfile();
                return;
            }
            if ($method === 'PUT') {
                SponsorController::updateProfile();
                return;
            }
            break;

        case 'campaigns':
            if ($method === 'GET') {
                SponsorController::campaigns();
                return;
            }
            if ($method === 'POST') {
                SponsorController::createCampaign();
                return;
            }
            break;

        case 'campaign':
            // GET /api/sponsor/campaign/{id} — single campaign detail
            if ($id !== null && $subAction === null && $method === 'GET') {
                SponsorController::getCampaign($id);
                return;
            }
            // PUT /api/sponsor/campaign/{id} — update campaign fields
            if ($id !== null && $subAction === null && $method === 'PUT') {
                SponsorController::updateCampaign($id);
                return;
            }
            // DELETE /api/sponsor/campaign/{id}
            if ($id !== null && $subAction === null && $method === 'DELETE') {
                SponsorController::deleteCampaign($id);
                return;
            }
            // PUT /api/sponsor/campaign/{id}/status
            if ($id !== null && $subAction === 'status' && $method === 'PUT') {
                SponsorController::updateCampaignStatus($id);
                return;
            }
            // GET /api/sponsor/campaign/{id}/applicants
            if ($id !== null && $subAction === 'applicants' && $method === 'GET') {
                SponsorController::applicants($id);
                return;
            }
            break;

        case 'application':
            // PUT /api/sponsor/application/{id}/status
            if ($id !== null && $subAction === 'status' && $method === 'PUT') {
                SponsorController::updateApplicantStatus($id);
                return;
            }
            break;

        case 'creators':
            if ($method === 'GET') {
                SponsorController::creators();
                return;
            }
            break;

        case 'creator':
            if ($id !== null && $method === 'GET') {
                SponsorController::creatorDetail($id);
                return;
            }
            break;

        case 'send-campaign':
            if ($method === 'POST') {
                SponsorController::sendCampaign();
                return;
            }
            break;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Sponsor endpoint not found.']);
}
