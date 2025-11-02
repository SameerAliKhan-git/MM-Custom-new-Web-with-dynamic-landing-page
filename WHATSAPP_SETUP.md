# WhatsApp Notification Setup Guide

Partnership inquiries will now be sent to your WhatsApp number **+917416053348** automatically!

## 🚀 Quick Setup (Using Twilio)

### Step 1: Create a Twilio Account
1. Go to: https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Verify your phone number

### Step 2: Get Your Credentials
1. Go to your Twilio Console: https://console.twilio.com/
2. Copy your **Account SID**
3. Copy your **Auth Token**

### Step 3: Set Up WhatsApp Sandbox
1. In Twilio Console, go to: **Messaging > Try it out > Send a WhatsApp message**
2. You'll see a phone number like: **+1 415 523 8886**
3. Follow the instructions to join the sandbox:
   - Send a WhatsApp message to that number
   - Send the code shown (like: "join <code>")
4. Once joined, copy the WhatsApp-enabled phone number

### Step 4: Update Your .env File
Open your `.env` file and replace these values:

```properties
# WhatsApp Notifications (via Twilio)
TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcdef  # Your actual Account SID
TWILIO_AUTH_TOKEN=your_actual_auth_token_here          # Your actual Auth Token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886             # The Twilio WhatsApp number
ADMIN_WHATSAPP_NUMBER=whatsapp:+917416053348           # Your WhatsApp (already set)
```

**Important:** Keep the `whatsapp:` prefix for both numbers!

### Step 5: Restart the Server
```bash
npm run dev
```

### Step 6: Test It!
Submit a test partnership inquiry at: http://localhost:5176/partnerships

You should receive:
1. ✅ Email to mahimaministriesindia@gmail.com
2. ✅ Confirmation email to the user
3. ✅ **WhatsApp message to +917416053348** 📱

## 📝 WhatsApp Message Format

You'll receive messages like this:

```
🔔 New Partnership Inquiry

Type: CORPORATE
Name: John Doe
Company: ABC Corporation
Email: john@example.com
Phone: +91 9876543210
WhatsApp: +91 9876543210
Address: 123 Business Street, Mumbai

Submitted on: 2/11/2025, 8:30:00 pm

Check your email for full details.
```

## 💰 Pricing

### Free Tier (Sandbox):
- Free for testing
- Limited to approved numbers only
- Sandbox prefix in messages

### Production (After Approval):
- Request a dedicated WhatsApp Business number
- No sandbox limitations
- Professional sender profile
- Cost: ~$0.005 per message (very affordable)

## 🔄 Alternative: WhatsApp Business API (Free but Complex)

If you prefer not to use Twilio, you can use WhatsApp Business API directly:
1. Much more complex setup
2. Requires business verification
3. Needs webhook server setup
4. Free but time-consuming

**Recommendation:** Start with Twilio for quick setup!

## 🆘 Troubleshooting

### Issue: "WhatsApp notification skipped - Twilio not configured"
**Solution:** Make sure all 4 environment variables are set correctly in `.env`

### Issue: "Authentication failed"
**Solution:** Double-check your Account SID and Auth Token from Twilio Console

### Issue: "Not receiving WhatsApp messages"
**Solution:** 
- Verify you've joined the Twilio Sandbox
- Check the phone number format includes `whatsapp:` prefix
- Ensure +917416053348 is registered with WhatsApp

### Issue: "Sandbox prefix in messages"
**Solution:** This is normal for sandbox. Upgrade to production for clean messages.

## 📞 Support

Need help? Contact Twilio support or check their documentation:
- Docs: https://www.twilio.com/docs/whatsapp
- Support: https://support.twilio.com/

---

**Note:** The code is already implemented! You just need to add the Twilio credentials to your `.env` file.
