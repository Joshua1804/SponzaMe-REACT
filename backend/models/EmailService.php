<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailService
{
    /**
     * Send an email verification link to the user.
     */
    public static function sendVerificationEmail(string $toEmail, string $toName, string $token): bool
    {
        $mail = new PHPMailer(true);

        try {
            // SMTP configuration
            $mail->isSMTP();
            $mail->Host       = SMTP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = SMTP_USERNAME;
            $mail->Password   = SMTP_PASSWORD;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = SMTP_PORT;

            // Sender & recipient
            $mail->setFrom(SMTP_USERNAME, SMTP_FROM_NAME);
            $mail->addAddress($toEmail, $toName);

            // Content
            $verifyUrl = FRONTEND_URL . '/verify-email?token=' . urlencode($token);

            $mail->isHTML(true);
            $mail->Subject = 'Verify Your SponzaMe Account';
            $mail->Body    = self::buildEmailBody($toName, $verifyUrl);
            $mail->AltBody = "Hi $toName,\n\nPlease verify your email by visiting this link:\n$verifyUrl\n\nThis link expires in 24 hours.\n\n— SponzaMe";

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log('Email send failed: ' . $mail->ErrorInfo);
            return false;
        }
    }

    /**
     * Build the HTML email body.
     */
    private static function buildEmailBody(string $name, string $url): string
    {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f4f4f7;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                            <!-- Header -->
                            <tr>
                                <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;text-align:center;">
                                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">SponzaMe</h1>
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding:40px;">
                                    <h2 style="margin:0 0 16px;color:#1f2937;font-size:22px;">Verify Your Email</h2>
                                    <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
                                        Hi <strong>' . htmlspecialchars($name) . '</strong>,<br><br>
                                        Thanks for signing up! Please click the button below to verify your email address and activate your account.
                                    </p>
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center">
                                                <a href="' . htmlspecialchars($url) . '" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:16px;font-weight:600;">
                                                    Verify Email Address
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style="margin:24px 0 0;color:#9ca3af;font-size:13px;line-height:1.5;">
                                        This link will expire in <strong>24 hours</strong>.<br>
                                        If you didn\'t create an account, you can safely ignore this email.
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
                                    <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ' . date('Y') . ' SponzaMe. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>';
    }
}
