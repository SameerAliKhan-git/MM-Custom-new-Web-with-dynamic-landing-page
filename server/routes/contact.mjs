import { Router } from 'express';
import { prisma } from '../lib/db.mjs';
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

// Contact form schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
  countryCode: z.string().optional(),
  whatsapp: z.string().optional(),
  donate: z.enum(['Yes', 'No', 'Maybe']).optional(),
  message: z.string().min(1, 'Message is required')
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mahimaministriesindia@gmail.com',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

// Send email notification to admin
async function sendAdminNotification(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'mahimaministriesindia@gmail.com',
    to: 'mahimaministriesindia@gmail.com',
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">New Contact Form Submission</h2>
        <p>You have received a new message through the contact form:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.email}</td>
          </tr>
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.phone}</td>
          </tr>
          ${data.whatsapp ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">WhatsApp:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.countryCode || ''} ${data.whatsapp}</td>
          </tr>
          ` : ''}
          <tr ${data.whatsapp ? '' : 'style="background-color: #f3f4f6;"'}>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Interested in Donating:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.donate || 'Not specified'}</td>
          </tr>
          <tr ${data.whatsapp ? 'style="background-color: #f3f4f6;"' : ''}>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Message:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.message}</td>
          </tr>
        </table>
        
        <p style="color: #6b7280; font-size: 14px;">
          This message was submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form admin notification sent:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending contact admin notification:', error);
  }
}

// Send confirmation email to user
async function sendUserConfirmation(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'mahimaministriesindia@gmail.com',
    to: data.email,
    subject: 'Thank You for Contacting Mahima Ministries',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f97316; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Mahima Ministries</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937;">Thank You, ${data.firstName}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We have received your message and appreciate you taking the time to contact us.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <p style="color: #1f2937; margin: 0; font-weight: bold;">Your message:</p>
            <p style="color: #4b5563; margin-top: 10px; font-style: italic;">"${data.message}"</p>
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
            <a href="${process.env.WEBSITE_URL || 'http://localhost:5176'}/" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
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
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form user confirmation sent:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending contact user confirmation:', error);
  }
}

// Send WhatsApp notification to admin
async function sendWhatsAppNotification(data) {
  if (!twilioClient || !process.env.TWILIO_WHATSAPP_FROM || !process.env.ADMIN_WHATSAPP_NUMBER) {
    console.log('WhatsApp notification skipped - Twilio not configured');
    return;
  }

  const whatsappInfo = data.whatsapp ? `\n*WhatsApp:* ${data.countryCode || ''} ${data.whatsapp}` : '';
  
  const message = `🔔 *New Contact Form Submission*

*Name:* ${data.firstName} ${data.lastName}
*Email:* ${data.email}
*Phone:* ${data.phone}${whatsappInfo}
*Interested in Donating:* ${data.donate || 'Not specified'}

*Message:*
${data.message}

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
router.post('/contact', async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    
    // Save to database
    const name = `${data.firstName} ${data.lastName}`;
    const whatsappInfo = data.whatsapp ? `\nWhatsApp: ${data.countryCode || ''} ${data.whatsapp}` : '';
    const created = await prisma.contactMessage.create({ 
      data: {
        name,
        email: data.email,
        message: `Phone: ${data.phone}${whatsappInfo}\nInterested in Donating: ${data.donate || 'Not specified'}\n\n${data.message}`
      }
    });
    
    // Send notifications (don't await - run in background)
    sendAdminNotification(data);
    sendUserConfirmation(data);
    sendWhatsAppNotification(data);
    
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
