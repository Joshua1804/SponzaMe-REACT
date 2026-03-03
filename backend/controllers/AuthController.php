<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/EmailService.php';

class AuthController
{
    /**
     * POST /api/auth/signup
     */
    public static function signup(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $confirm = $data['confirmPassword'] ?? '';
        $role = trim($data['role'] ?? '');

        // ── Validation ──
        if ($name === '' || $email === '' || $password === '' || $role === '') {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required.']);
            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address.']);
            return;
        }

        if (strlen($password) < 6) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must be at least 6 characters.']);
            return;
        }

        if ($password !== $confirm) {
            http_response_code(400);
            echo json_encode(['error' => 'Passwords do not match.']);
            return;
        }

        if (!in_array($role, ['creator', 'sponsor'], true)) {
            http_response_code(400);
            echo json_encode(['error' => 'Role must be creator or sponsor.']);
            return;
        }

        // ── Check duplicate ──
        if (User::findByEmail($email)) {
            http_response_code(409);
            echo json_encode(['error' => 'An account with this email already exists.']);
            return;
        }

        // ── Create user (unverified) ──
        $user = User::create($name, $email, $password, $role);

        // ── Generate verification token & send email ──
        $token = User::createVerificationToken((int)$user['user_id']);
        $emailSent = EmailService::sendVerificationEmail($email, $name, $token);

        if (!$emailSent) {
            // Account created but email failed — log it, let user know
            http_response_code(201);
            echo json_encode([
                'message' => 'Account created, but verification email could not be sent. Please contact support.',
                'needsVerification' => true,
                'user' => $user,
            ]);
            return;
        }

        // Don't start session — user must verify first
        http_response_code(201);
        echo json_encode([
            'message' => 'Account created! Please check your email to verify your account.',
            'needsVerification' => true,
        ]);
    }

    /**
     * GET /api/auth/verify-email?token=...
     */
    public static function verifyEmail(): void
    {
        $token = $_GET['token'] ?? '';

        if ($token === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Verification token is required.']);
            return;
        }

        $user = User::verifyToken($token);

        if (!$user) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid or expired verification link. Please sign up again.']);
            return;
        }

        // Start session after verification
        $_SESSION['user_id'] = $user['user_id'];

        echo json_encode([
            'message' => 'Email verified successfully! You are now logged in.',
            'user' => $user,
        ]);
    }

    /**
     * POST /api/auth/resend-verification
     */
    public static function resendVerification(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $email = trim($data['email'] ?? '');

        if ($email === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Email is required.']);
            return;
        }

        $user = User::findByEmail($email);

        if (!$user) {
            // Don't reveal if email exists or not
            echo json_encode(['message' => 'If an account exists with this email, a verification link has been sent.']);
            return;
        }

        if ($user['is_verified']) {
            echo json_encode(['message' => 'This email is already verified. You can log in.']);
            return;
        }

        $token = User::createVerificationToken((int)$user['user_id']);
        EmailService::sendVerificationEmail($email, $user['name'], $token);

        echo json_encode(['message' => 'If an account exists with this email, a verification link has been sent.']);
    }

    /**
     * POST /api/auth/login
     */
    public static function login(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if ($email === '' || $password === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password are required.']);
            return;
        }

        $user = User::findByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid email or password.']);
            return;
        }

        if (!$user['is_active']) {
            http_response_code(403);
            echo json_encode(['error' => 'Your account has been deactivated.']);
            return;
        }

        // ── Check email verification ──
        if (!$user['is_verified']) {
            http_response_code(403);
            echo json_encode([
                'error' => 'Please verify your email before logging in. Check your inbox for the verification link.',
                'needsVerification' => true,
                'email' => $email,
            ]);
            return;
        }

        // Start session
        $_SESSION['user_id'] = $user['user_id'];

        // Remove password from response
        unset($user['password']);

        echo json_encode(['message' => 'Login successful.', 'user' => $user]);
    }

    /**
     * POST /api/auth/logout
     */
    public static function logout(): void
    {
        session_unset();
        session_destroy();
        echo json_encode(['message' => 'Logged out successfully.']);
    }

    /**
     * GET /api/auth/me
     */
    public static function me(): void
    {
        if (empty($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Not authenticated.']);
            return;
        }

        $user = User::findById((int)$_SESSION['user_id']);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => 'User not found.']);
            return;
        }

        echo json_encode(['user' => $user]);
    }
}
