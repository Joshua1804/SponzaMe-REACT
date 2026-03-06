<?php
// ── App Configuration ──

define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3308');
define('DB_NAME', 'sponzame');
define('DB_USER', 'root');
define('DB_PASS', ''); // change if your MySQL root has a password

define('CORS_ORIGIN', 'http://localhost:5173'); // Vite dev server

// Session lifetime in seconds (2 hours)
define('SESSION_LIFETIME', 7200);

// ── Razorpay Test API Keys ──
define('RAZORPAY_KEY_ID', 'rzp_test_tE68eAnDfgRwJD');       // Replace with your Razorpay test key_id
define('RAZORPAY_KEY_SECRET', '3LSCzazqKtsaGjHxhbf4A85U'); // Replace with your Razorpay test key_secret

// ── Gemini AI API Key ──
define('GEMINI_API_KEY', '');

// ── Email / SMTP Configuration (Gmail App Password) ──
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'joshuaphilip135@gmail.com');  // ← Your Gmail address, e.g. sponzame@gmail.com
define('SMTP_PASSWORD', 'xxxfoizyqaycvzxz');  // ← Your 16-char Gmail App Password
define('SMTP_FROM_NAME', 'SponzaMe');

// ── Frontend URL (for email verification links) ──
define('FRONTEND_URL', 'http://localhost:5173');
