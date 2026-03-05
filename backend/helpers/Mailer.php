<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer
{
    /**
     * Send an email using PHPMailer + Gmail SMTP.
     *
     * @param string $toEmail    Recipient email address
     * @param string $toName     Recipient name
     * @param string $subject    Email subject
     * @param string $htmlBody   HTML body content
     * @return bool              True on success, false on failure
     */
    public static function send(string $toEmail, string $toName, string $subject, string $htmlBody): bool
    {
        $mail = new PHPMailer(true);

        try {
            // SMTP settings
            $mail->isSMTP();
            $mail->Host = SMTP_HOST;
            $mail->SMTPAuth = true;
            $mail->Username = SMTP_USER;
            $mail->Password = SMTP_PASS;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = SMTP_PORT;

            // Sender & recipient
            $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
            $mail->addAddress($toEmail, $toName);

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlBody;
            $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $htmlBody));

            $mail->send();
            return true;
        }
        catch (Exception $e) {
            error_log("Mailer error: " . $mail->ErrorInfo);
            return false;
        }
    }

    /**
     * Send notification to sponsor when a creator applies to their campaign.
     */
    public static function notifyApplicationReceived(
        string $sponsorEmail,
        string $sponsorName,
        string $creatorName,
        string $campaignTitle
        ): bool
    {
        $subject = "New Application: {$creatorName} applied to \"{$campaignTitle}\"";

        $htmlBody = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <div style='background: linear-gradient(135deg, #393873, #5157a1); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;'>
                <h1 style='color: #fff; margin: 0; font-size: 24px;'>SponzaMe</h1>
            </div>
            <div style='background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;'>
                <h2 style='color: #1f2937; margin-top: 0;'>New Application Received! 🎉</h2>
                <p style='color: #4b5563; font-size: 16px; line-height: 1.6;'>
                    Hi <strong>{$sponsorName}</strong>,
                </p>
                <p style='color: #4b5563; font-size: 16px; line-height: 1.6;'>
                    <strong style='color: #5157a1;'>{$creatorName}</strong> has applied to your campaign
                    <strong>\"{$campaignTitle}\"</strong>.
                </p>
                <p style='color: #4b5563; font-size: 16px; line-height: 1.6;'>
                    Log in to your SponzaMe dashboard to review this application and respond.
                </p>
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='http://localhost:5173/sponsor/dashboard'
                       style='background: linear-gradient(135deg, #5157a1, #393873); color: #fff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 16px;'>
                        View Applications
                    </a>
                </div>
                <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;'>
                <p style='color: #9ca3af; font-size: 12px; text-align: center;'>
                    This is an automated notification from SponzaMe. Please do not reply to this email.
                </p>
            </div>
        </div>";

        return self::send($sponsorEmail, $sponsorName, $subject, $htmlBody);
    }
}
