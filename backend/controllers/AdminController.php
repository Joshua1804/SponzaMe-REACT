<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Campaign.php';

class AdminController
{
    /**
     * GET /api/admin/dashboard
     */
    public static function dashboard(): void
    {
        $userStats = User::getStats();
        $campaignCount = Campaign::countAll();

        echo json_encode([
            'users' => $userStats,
            'campaigns' => $campaignCount,
        ]);
    }
}
