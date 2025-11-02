import { Router } from 'express';
import { prisma } from '../lib/db.mjs';
import { authRequired } from '../lib/middleware.mjs';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const router = Router();

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
  company: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  partnerType: z.enum(['CORPORATE', 'INSTITUTIONAL'], { required_error: 'Partner type is required' })
});

// Email configuration
// For Gmail, you need to use an App Password (not your regular password)
// Go to: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mahimaministriesindia@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '' // Set this in .env file
  }
});

// Send email notification to admin
async function sendAdminNotification(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'mahimaministriesindia@gmail.com',
    to: 'mahimaministriesindia@gmail.com',
    subject: `New Partnership Inquiry - ${data.partnerType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">New Partnership Inquiry Received</h2>
        <p>A new ${data.partnerType.toLowerCase()} partnership inquiry has been submitted:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.email}</td>
          </tr>
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.countryCode} ${data.phone}</td>
          </tr>
          ${data.whatsapp ? `<tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">WhatsApp:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.countryCode} ${data.whatsapp}</td>
          </tr>` : ''}
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Address:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.address}</td>
          </tr>
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Partnership Type:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.partnerType}</td>
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
  const mailOptions = {
    from: process.env.EMAIL_USER || 'mahimaministriesindia@gmail.com',
    to: data.email,
    subject: 'Thank You for Your Interest in Partnering with Mahima Ministries',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f97316; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Mahima Ministries</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Thank You, ${data.name}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We have received your partnership inquiry and greatly appreciate your interest in partnering with Mahima Ministries.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <p style="color: #1f2937; margin: 0; font-weight: bold;">Your submission details:</p>
            <ul style="color: #4b5563; line-height: 1.8;">
              <li><strong>Partnership Type:</strong> ${data.partnerType}</li>
              <li><strong>Company:</strong> ${data.company}</li>
              <li><strong>Email:</strong> ${data.email}</li>
              <li><strong>Phone:</strong> ${data.countryCode} ${data.phone}</li>
              ${data.whatsapp ? `<li><strong>WhatsApp:</strong> ${data.countryCode} ${data.whatsapp}</li>` : ''}
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
            <a href="${process.env.WEBSITE_URL || 'http://localhost:5176'}/#contact" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
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

  const message = `🔔 *New Partnership Inquiry*

*Type:* ${data.partnerType}
*Name:* ${data.name}
*Company:* ${data.company}
*Email:* ${data.email}
*Phone:* ${data.countryCode} ${data.phone}${data.whatsapp ? `\n*WhatsApp:* ${data.countryCode} ${data.whatsapp}` : ''}
*Address:* ${data.address}

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
    
    // Send notifications (don't await - run in background)
    sendAdminNotification(data);
    sendUserConfirmation(data);
    sendWhatsAppNotification(data);
    
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
    const updated = await prisma.partnershipInquiry.update({
      where: { id },
      data: { 
        ...(notes !== undefined && { notes }),
        ...(handled !== undefined && { handled })
      }
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
