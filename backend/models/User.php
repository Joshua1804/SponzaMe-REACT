<?php
require_once __DIR__ . '/../config/db.php';

class User
{
    /**
     * Find a user by email address.
     */
    public static function findByEmail(string $email): ?array
    {
        $db = getDB();
        $stmt = $db->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();
        return $user ?: null;
    }

    /**
     * Find a user by ID.
     */
    public static function findById(int $id): ?array
    {
        $db = getDB();
        $stmt = $db->prepare('SELECT user_id, name, email, role, is_verified, is_active, created_at FROM users WHERE user_id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch();
        return $user ?: null;
    }

    /**
     * Create a new user and return the inserted row (without password).
     */
    public static function create(string $name, string $email, string $password, string $role): array
    {
        $db = getDB();
        $hash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $db->prepare(
            'INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)'
        );
        $stmt->execute([
            'name' => $name,
            'email' => $email,
            'password' => $hash,
            'role' => $role,
        ]);

        return self::findById((int)$db->lastInsertId());
    }
}
