<?php
/**
 * Require an authenticated session.
 * Call this at the top of any protected route handler.
 * Returns true if authenticated, false (and sends 401) otherwise.
 */
function requireAuth(): bool
{
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication required.']);
        return false;
    }
    return true;
}
