import { Router } from 'express';
import { prisma } from '../lib/db.mjs';
import { authRequired } from '../lib/middleware.mjs';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

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

// Partnership inquiry schema
const partnershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
  countryCode: z.string().default('+91'),
  whatsapp: z.string().optional(),
  whatsappCountryCode: z.string().default('+91'),
  company: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  partnerType: z.enum(['CORPORATE', 'INSTITUTIONAL'], { required_error: 'Partner type is required' })
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
  const sanitizedPartnerType = sanitizePlainText(data.partnerType);
  
  // Escape HTML for email body content to prevent XSS
  const escapedName = escapeHtml(data.name);
  const escapedEmail = escapeHtml(data.email);
  const escapedPhone = escapeHtml(data.phone);
  const escapedCountryCode = escapeHtml(data.countryCode);
  const escapedWhatsapp = escapeHtml(data.whatsapp);
  const escapedWhatsappCountryCode = escapeHtml(data.whatsappCountryCode);
  const escapedCompany = escapeHtml(data.company);
  const escapedAddress = escapeHtml(data.address);
  const escapedPartnerType = escapeHtml(data.partnerType);
  const escapedPartnerTypeLower = escapeHtml(data.partnerType.toLowerCase());
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Partnership Inquiry - ${sanitizedPartnerType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">New Partnership Inquiry Received</h2>
        <p>A new ${escapedPartnerTypeLower} partnership inquiry has been submitted:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedEmail}</td>
          </tr>
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedCountryCode} ${escapedPhone}</td>
          </tr>
          ${data.whatsapp ? `<tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">WhatsApp:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedWhatsappCountryCode} ${escapedWhatsapp}</td>
          </tr>` : ''}
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedCompany}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Address:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedAddress}</td>
          </tr>
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Partnership Type:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapedPartnerType}</td>
          </tr>
        </table>
        
        <p style="color: #6b7280; font-size: 14px;">
          This inquiry was submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    // Don't throw error - we still want to save to database even if email fails
  }
}

// Send confirmation email to user
async function sendUserConfirmation(data) {
  // Escape user-supplied data to prevent XSS
  const escapedName = escapeHtml(data.name);
  const escapedEmail = escapeHtml(data.email);
  const escapedPhone = escapeHtml(data.phone);
  const escapedCountryCode = escapeHtml(data.countryCode);
  const escapedWhatsapp = escapeHtml(data.whatsapp);
  const escapedWhatsappCountryCode = escapeHtml(data.whatsappCountryCode);
  const escapedCompany = escapeHtml(data.company);
  const escapedPartnerType = escapeHtml(data.partnerType);
  
  // Use trusted config value directly (no escaping needed for environment variables)
  const websiteUrl = process.env.WEBSITE_URL || 'http://localhost:5173';
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Thank You for Your Interest in Partnering with Mahima Ministries',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f97316; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Mahima Ministries</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Thank You, ${escapedName}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We have received your partnership inquiry and greatly appreciate your interest in partnering with Mahima Ministries.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <p style="color: #1f2937; margin: 0; font-weight: bold;">Your submission details:</p>
            <ul style="color: #4b5563; line-height: 1.8;">
              <li><strong>Partnership Type:</strong> ${escapedPartnerType}</li>
              <li><strong>Company:</strong> ${escapedCompany}</li>
              <li><strong>Email:</strong> ${escapedEmail}</li>
              <li><strong>Phone:</strong> ${escapedCountryCode} ${escapedPhone}</li>
              ${data.whatsapp ? `<li><strong>WhatsApp:</strong> ${escapedWhatsappCountryCode} ${escapedWhatsapp}</li>` : ''}
            </ul>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Our team will review your inquiry and get in touch with you soon to discuss how we can work together to make a meaningful impact.
          </p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            If you have any immediate questions, please feel free to reach out to us:
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
            <a href="${websiteUrl}/#contact" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Visit Our Contact Page
            </a>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6; margin-top: 30px;">
            <strong>Thank you for your interest in partnering with Mahima Ministries!</strong>
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
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ User confirmation email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending user confirmation:', error);
    // Don't throw error - we still want to save to database even if email fails
  }
}

// Send WhatsApp notification to admin
async function sendWhatsAppNotification(data) {
  if (!twilioClient || !process.env.TWILIO_WHATSAPP_FROM || !process.env.ADMIN_WHATSAPP_NUMBER) {
    console.log('WhatsApp notification skipped - Twilio not configured');
    return;
  }

  // Sanitize user data for plain text (strip potential control characters)
  const sanitize = (text) => String(text || '').replace(/[\x00-\x1F\x7F]/g, '');
  
  const sanitizedName = sanitize(data.name);
  const sanitizedCompany = sanitize(data.company);
  const sanitizedEmail = sanitize(data.email);
  const sanitizedPhone = sanitize(data.phone);
  const sanitizedCountryCode = sanitize(data.countryCode);
  const sanitizedWhatsapp = sanitize(data.whatsapp);
  const sanitizedWhatsappCountryCode = sanitize(data.whatsappCountryCode);
  const sanitizedAddress = sanitize(data.address);
  const sanitizedPartnerType = sanitize(data.partnerType);

  const message = `🔔 *New Partnership Inquiry*

*Type:* ${sanitizedPartnerType}
*Name:* ${sanitizedName}
*Company:* ${sanitizedCompany}
*Email:* ${sanitizedEmail}
*Phone:* ${sanitizedCountryCode} ${sanitizedPhone}${data.whatsapp ? `\n*WhatsApp:* ${sanitizedWhatsappCountryCode} ${sanitizedWhatsapp}` : ''}
*Address:* ${sanitizedAddress}

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
    // Don't throw error - we still want to save to database even if WhatsApp fails
  }
}

// POST: Create new partnership inquiry
router.post('/partnerships', async (req, res, next) => {
  try {
    const data = partnershipSchema.parse(req.body);
    
    // Save to database
    const created = await prisma.partnershipInquiry.create({ data });
    
    // Send notifications (don't await - run in background with error handling)
    Promise.resolve(sendAdminNotification(data))
      .catch(error => {
        console.error('Failed to send admin notification for partnership inquiry:', {
          inquiryId: created.id,
          error: error.message || error
        });
      });
    
    Promise.resolve(sendUserConfirmation(data))
      .catch(error => {
        console.error('Failed to send user confirmation for partnership inquiry:', {
          inquiryId: created.id,
          userEmail: data.email,
          error: error.message || error
        });
      });
    
    Promise.resolve(sendWhatsAppNotification(data))
      .catch(error => {
        console.error('Failed to send WhatsApp notification for partnership inquiry:', {
          inquiryId: created.id,
          error: error.message || error
        });
      });
    
    res.status(201).json({ 
      ok: true, 
      message: 'Partnership inquiry submitted successfully',
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

// GET: List all partnership inquiries (Admin only)
router.get('/partnerships', authRequired('ADMIN'), async (_req, res, next) => {
  try {
    const inquiries = await prisma.partnershipInquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(inquiries);
  } catch (e) {
    next(e);
  }
});

// POST: Mark inquiry as handled (Admin only)
router.post('/partnerships/:id/resolve', authRequired('ADMIN'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await prisma.partnershipInquiry.update({
      where: { id },
      data: { handled: true }
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// PATCH: Add notes to inquiry (Admin only)
router.patch('/partnerships/:id', authRequired('ADMIN'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { notes, handled } = req.body;
    
    // Validate and prepare data object
    const data = {};
    
    // Validate notes field
    if (notes !== undefined) {
      if (typeof notes !== 'string') {
        return res.status(400).json({ 
          error: 'Invalid notes field: must be a string' 
        });
      }
      
      const trimmedNotes = notes.trim();
      const MAX_NOTES_LENGTH = 5000;
      
      if (trimmedNotes.length > MAX_NOTES_LENGTH) {
        return res.status(400).json({ 
          error: `Invalid notes field: exceeds maximum length of ${MAX_NOTES_LENGTH} characters` 
        });
      }
      
      data.notes = trimmedNotes;
    }
    
    // Validate handled field
    if (handled !== undefined) {
      let validatedHandled;
      
      if (typeof handled === 'boolean') {
        validatedHandled = handled;
      } else if (typeof handled === 'string') {
        const lowerHandled = handled.toLowerCase();
        if (lowerHandled === 'true') {
          validatedHandled = true;
        } else if (lowerHandled === 'false') {
          validatedHandled = false;
        } else {
          return res.status(400).json({ 
            error: 'Invalid handled field: must be a boolean or "true"/"false" string' 
          });
        }
      } else {
        return res.status(400).json({ 
          error: 'Invalid handled field: must be a boolean or "true"/"false" string' 
        });
      }
      
      data.handled = validatedHandled;
    }
    
    // Ensure at least one field is being updated
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ 
        error: 'No valid fields provided for update' 
      });
    }
    
    const updated = await prisma.partnershipInquiry.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
