<?php
/**
 * Require a specific role.
 * Call after requireAuth() to enforce role-based access.
 */
function requireRole(string $role): bool
{
    require_once __DIR__ . '/../models/User.php';

    $userId = $_SESSION['user_id'] ?? null;
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication required.']);
        return false;
    }

    $user = User::findById($userId);
    if (!$user || $user['role'] !== $role) {
        http_response_code(403);
        echo json_encode(['error' => "Access denied. $role role required."]);
        return false;
    }

    return true;
}
