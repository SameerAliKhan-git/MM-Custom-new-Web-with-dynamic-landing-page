import { Router } from 'express';
import { prisma } from '../lib/db.mjs';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import rateLimit from 'express-rate-limit';

const router = Router();

// HTML escape helper to prevent XSS attacks in HTML email body
function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`/g, '&#96;');
}

// Sanitize plain text for email headers and subject lines
// Removes control characters and newlines to prevent header injection
function sanitizePlainText(text) {
  if (text == null) return '';
  return String(text).replace(/[\x00-\x1F\x7F]/g, '');
}

// Rate limiter for contact form to prevent spam/abuse
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 contact form submissions per windowMs
  message: 'Too many contact form submissions from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Do not skip successful requests; successful submissions are counted toward the limit
  skipSuccessfulRequests: false,
  // Skip failed requests (validation errors, etc.) so they don't count toward the limit
  skipFailedRequests: true
});

// Initialize Twilio client for WhatsApp notifications
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && 
    process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  try {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  } catch (error) {
    console.log('Twilio initialization skipped:', error.message);
  }
}

// Contact form schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
  countryCode: z.string().default('+91'),
  whatsapp: z.string().optional(),
  whatsappCountryCode: z.string().default('+91'),
  donate: z.enum(['Yes', 'No', 'Maybe']).optional(),
  message: z.string().min(1, 'Message is required')
});

// Validate required email configuration at startup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  const missingVars = [];
  if (!process.env.EMAIL_USER) missingVars.push('EMAIL_USER');
  if (!process.env.EMAIL_PASSWORD) missingVars.push('EMAIL_PASSWORD');
  
  console.error('❌ FATAL: Missing required email configuration environment variables:', missingVars.join(', '));
  console.error('📧 Email notifications will NOT work. Please set these variables in your .env file:');
  console.error('   EMAIL_USER=your-email@gmail.com');
  console.error('   EMAIL_PASSWORD=your-app-password');
  console.error('   For Gmail, generate an App Password at: https://myaccount.google.com/apppasswords');
  
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

// Email configuration with validated environment variables
// Supports custom SMTP configuration via environment variables:
// - SMTP_SERVICE: Email service provider (default: 'gmail')
// - SMTP_HOST: Custom SMTP host (overrides service)
// - SMTP_PORT: Custom SMTP port (e.g., 587, 465)
// - SMTP_SECURE: Use TLS (true/false, default: false for port 587, true for 465)
const transportConfig = {
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

// Use custom SMTP settings if provided, otherwise use service
if (process.env.SMTP_HOST) {
  transportConfig.host = process.env.SMTP_HOST;
  transportConfig.port = parseInt(process.env.SMTP_PORT || '587', 10);
  transportConfig.secure = process.env.SMTP_SECURE === 'true' || transportConfig.port === 465;
} else {
  transportConfig.service = process.env.SMTP_SERVICE || 'gmail';
}

const transporter = nodemailer.createTransport(transportConfig);

// Send email notification to admin
async function sendAdminNotification(data) {
  // Sanitize plain text for email headers (subject line)
  const sanitizedFirstName = sanitizePlainText(data.firstName);
  const sanitizedLastName = sanitizePlainText(data.lastName);
  
  // Escape HTML for email body content to prevent XSS
  const escapedFirstName = escapeHtml(data.firstName);
  const escapedLastName = escapeHtml(data.lastName);
  const escapedEmail = escapeHtml(data.email);
  const escapedPhone = escapeHtml(data.phone);
  const escapedCountryCode = escapeHtml(data.countryCode || '');
  const escapedWhatsapp = escapeHtml(data.whatsapp);
  const escapedDonate = escapeHtml(data.donate || 'Not specified');
  const escapedMessage = escapeHtml(data.message);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${sanitizedFirstName} ${sanitizedLastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">New Contact Form Submission</h2>
        <p>You have received a new message through the contact form:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedFirstName} ${escapedLastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedEmail}</td>
          </tr>
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedPhone}</td>
          </tr>
          ${data.whatsapp ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">WhatsApp:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedCountryCode} ${escapedWhatsapp}</td>
          </tr>
          ` : ''}
          <tr ${data.whatsapp ? '' : 'style="background-color: #f3f4f6;"'}>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Interested in Donating:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedDonate}</td>
          </tr>
          <tr ${data.whatsapp ? 'style="background-color: #f3f4f6;"' : ''}>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Message:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedMessage}</td>
          </tr>
        </table>
        
        <p style="color: #6b7280; font-size: 14px;">
          This message was submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact form admin notification sent successfully');
  } catch (error) {
    console.error('❌ Error sending contact admin notification:', {
      errorType: error.name,
      errorMessage: error.message
    });
  }
}

// Send confirmation email to user
async function sendUserConfirmation(data) {
  // Escape user-supplied data to prevent XSS
  const escapedFirstName = escapeHtml(data.firstName);
  const escapedMessage = escapeHtml(data.message);
  
  // Use trusted config value directly (no escaping needed for environment variables)
    // Use trusted config value directly (no escaping needed for environment variables)
  const websiteUrl = process.env.WEBSITE_URL || 'http://localhost:5173';
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Thank You for Contacting Mahima Ministries',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f97316; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Mahima Ministries</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Thank You, ${escapedFirstName}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We have received your message and appreciate you taking the time to contact us.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <p style="color: #1f2937; margin: 0; font-weight: bold;">Your message:</p>
            <p style="color: #4b5563; margin-top: 10px; font-style: italic;">"${escapedMessage}"</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Our team will review your inquiry and get back to you as soon as possible.
          </p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            If you have any urgent questions, please feel free to reach out to us:
          </p>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
              📧 <strong>Email:</strong><br/>
              <a href="mailto:mahimaministriesindia@gmail.com" style="color: #f97316; text-decoration: none;">mahimaministriesindia@gmail.com</a> ; 
              <a href="mailto:rdmaharaju@gmail.com" style="color: #f97316; text-decoration: none;">rdmaharaju@gmail.com</a>
            </p>
            <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
              📞 <strong>Phone:</strong><br/>
              <a href="tel:+919246502264" style="color: #1f2937; text-decoration: none;">+91 9246502264</a><br/>
              <a href="tel:+919246272675" style="color: #1f2937; text-decoration: none;">+91 9246272675</a><br/>
              <a href="tel:04023032675" style="color: #1f2937; text-decoration: none;">040-23032675</a>
            </p>
            <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
              📍 <strong>Address:</strong><br/>
              H.No: 2-38/8/2/9/4/1 Mahima Ministries,<br/>
              NTR Nagar colony, Ameenpur(Mandal),<br/>
              Sangareddy(District), Telangana - 502032
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${websiteUrl}/" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Visit Our Website
            </a>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6; margin-top: 30px;">
            <strong>Thank you for reaching out to Mahima Ministries!</strong>
          </p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Together, we can transform lives and build a better future for children in need.
          </p>
        </div>
        
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} Mahima Ministries. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact form user confirmation sent successfully');
  } catch (error) {
    console.error('❌ Error sending contact user confirmation:', {
      errorType: error.name,
      errorMessage: error.message
    });
  }
}

// Send WhatsApp notification to admin
async function sendWhatsAppNotification(data) {
  if (!twilioClient || !process.env.TWILIO_WHATSAPP_FROM || !process.env.ADMIN_WHATSAPP_NUMBER) {
    console.log('WhatsApp notification skipped - Twilio not configured');
    return;
  }

  // Sanitize plain text data to prevent control character injection
  // Preserve tabs (0x09), newlines (0x0A), and carriage returns (0x0D) for legitimate formatting
  const sanitize = (text) => String(text || '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  const sanitizedFirstName = sanitize(data.firstName);
  const sanitizedLastName = sanitize(data.lastName);
  const sanitizedEmail = sanitize(data.email);
  const sanitizedPhone = sanitize(data.phone);
  const sanitizedCountryCode = sanitize(data.countryCode || '');
  const sanitizedWhatsapp = sanitize(data.whatsapp);
  const sanitizedDonate = sanitize(data.donate || 'Not specified');
  const sanitizedMessage = sanitize(data.message);
  
  const whatsappInfo = data.whatsapp ? `\n*WhatsApp:* ${sanitizedCountryCode} ${sanitizedWhatsapp}` : '';
  
  const message = `🔔 *New Contact Form Submission*

*Name:* ${sanitizedFirstName} ${sanitizedLastName}
*Email:* ${sanitizedEmail}
*Phone:* ${sanitizedPhone}${whatsappInfo}
*Interested in Donating:* ${sanitizedDonate}

*Message:*
${sanitizedMessage}

Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Check your email for full details.`;

  try {
    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.ADMIN_WHATSAPP_NUMBER,
      body: message
    });
    console.log('WhatsApp notification sent successfully');
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
  }
}

// POST: Create new contact message
router.post('/contact', contactFormLimiter, async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    
    // Save to database - format all fields into the message field
    const name = `${data.firstName} ${data.lastName}`;
    const phoneInfo = `Phone: ${data.countryCode || '+91'} ${data.phone}`;
    const whatsappInfo = data.whatsapp ? `\nWhatsApp: ${data.whatsappCountryCode || data.countryCode || '+91'} ${data.whatsapp}` : '';
    const donateInfo = data.donate ? `\nInterested in Donating: ${data.donate}` : '';
    
    const created = await prisma.contactMessage.create({ 
      data: {
        name,
        email: data.email,
        message: `${phoneInfo}${whatsappInfo}${donateInfo}\n\n${data.message}`
      }
    });
    
    // Send notifications in background with tracking via Promise.allSettled
    (async () => {
      const notificationPromises = [
        { name: 'Admin Notification', promise: sendAdminNotification(data) },
        { name: 'User Confirmation', promise: sendUserConfirmation(data) },
        { name: 'WhatsApp Notification', promise: sendWhatsAppNotification(data) }
      ];
      
      try {
        const results = await Promise.allSettled(
          notificationPromises.map(n => n.promise)
        );
        
        // Check if all notifications failed
        const allFailed = results.every(result => result.status === 'rejected');
        const someFailed = results.some(result => result.status === 'rejected');
        
        if (allFailed) {
          console.error('⚠️ CRITICAL: All contact form notifications failed for submission:', {
            contactId: created.id,
            userEmail: data.email,
            errors: results.map((result, index) => ({
              notification: notificationPromises[index].name,
              error: result.reason?.message || result.reason
            }))
          });
        } else if (someFailed) {
          // Log individual failures
          results.forEach((result, index) => {
            if (result.status === 'rejected') {
              console.error(`Failed to send ${notificationPromises[index].name} for contact form:`, {
                contactId: created.id,
                userEmail: data.email,
                error: result.reason?.message || result.reason
              });
            }
          });
        } else {
          console.log('✅ All contact form notifications sent successfully for:', {
            contactId: created.id,
            userEmail: data.email
          });
        }
      } catch (error) {
        // This should never happen with allSettled, but handle just in case
        console.error('Unexpected error in notification tracking:', {
          contactId: created.id,
          error: error.message || error
        });
      }
    })();
    
    res.status(201).json({ 
      ok: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      id: created.id 
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ 
        message: e.errors[0]?.message || 'Invalid data',
        errors: e.errors 
      });
    }
    next(e);
  }
});

export default router;
