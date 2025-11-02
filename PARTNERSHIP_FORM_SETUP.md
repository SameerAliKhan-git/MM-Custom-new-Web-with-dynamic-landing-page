# Partnership Form Email Setup Instructions

## ✅ What's Been Completed

1. **Database Schema** - Added `PartnershipInquiry` model to Prisma schema
2. **API Endpoint** - Created `/api/partnerships` route that:
   - Saves form submissions to database
   - Sends email notification to admin (mahimaministriesindia@gmail.com)
   - Sends confirmation email to user
3. **Frontend Forms** - Updated both Corporate and Institutional forms with:
   - Form state management
   - Submit handlers with loading states
   - Success/error toast notifications
   - Auto-reset after successful submission

## 📧 Email Configuration Required

### Step 1: Create Gmail App Password

Since the forms send emails, you need to set up a Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** > **2-Step Verification** (you must enable this first)
3. Scroll down to **App passwords**
4. Click **App passwords**
5. Enter a name like "Mahima Ministries Website"
6. Click **Create**
7. Google will generate a 16-character password - **copy this!**

### Step 2: Update .env File

Open the `.env` file in the project root and update:

```env
EMAIL_USER=mahimaministriesindia@gmail.com
EMAIL_PASSWORD=your-16-character-app-password-here
```

Replace `your-16-character-app-password-here` with the password from Step 1.

## 🔄 Restart the Server

After updating the .env file:

1. **Stop the current dev server** (Ctrl+C in the terminal)
2. Run: `npm run dev`

## 📝 What Happens When Someone Submits the Form

### 1. User Submits Form
- Form data is validated
- Submit button shows "Submitting..." state
- Data is sent to `/api/partnerships` endpoint

### 2. Backend Processing
- Data is saved to SQLite database (dev.db)
- Two emails are sent:

#### Email to Admin (mahimaministriesindia@gmail.com)
- Subject: "New Partnership Inquiry - CORPORATE" (or INSTITUTIONAL)
- Contains all form details in a formatted table
- Timestamp of submission

#### Email to User (their provided email)
- Subject: "Thank You for Your Interest in Partnering with Mahima Ministries"
- Professional thank you message
- Confirmation of their submission details
- Contact information for follow-up
- Branded email template with orange theme

### 3. User Feedback
- Success: Green toast notification thanking them
- Error: Red toast notification with error message
- Form is cleared after successful submission

## 🗄️ Database Storage

All submissions are stored in the database with:
- Unique ID
- Name, Email, Phone, Company, Address
- Partnership Type (CORPORATE or INSTITUTIONAL)
- Submission timestamp
- Handled status (false by default)

## 👨‍💼 Admin Dashboard (Future Enhancement)

You can view all submissions in the admin dashboard at:
`/admin/partnerships` (requires admin login)

Or manually view the database using:
```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all partnership inquiries
- Mark them as handled
- Add notes
- Export data

## 🧪 Testing the Forms

1. **Start the server**: `npm run dev`
2. Navigate to: http://localhost:5173/partnerships
3. Click either "Corporate Partnerships" or "Institutional Partnerships"
4. Fill in the form and submit
5. Check:
   - Toast notification appears
   - Form clears
   - Email arrives in mahimaministriesindia@gmail.com
   - User receives confirmation email
   - Database has the record (check with `npx prisma studio`)

## ⚠️ Important Notes

- **Gmail App Password**: Without this, emails won't send (but data will still save)
- **Daily Limit**: Gmail has a daily sending limit (~500 emails/day)
- **Spam Folder**: First few emails might go to spam - mark as "Not Spam"
- **Production**: For production, consider using a dedicated email service like:
  - SendGrid
  - Amazon SES
  - Mailgun
  - Postmark

## 🐛 Troubleshooting

### Form submits but no emails sent
- Check EMAIL_PASSWORD in .env is correct
- Verify 2-Step Verification is enabled on Google Account
- Check spam folder
- Look at server console for error messages

### Database error on submit
- Run: `npx prisma generate` (stop server first)
- Run: `npx prisma migrate deploy`

### CSRF Token Error
- Make sure you're submitting from the same domain
- Clear cookies and refresh page

## 📧 Email Templates

The email templates are fully customized and include:
- Mahima Ministries branding
- Orange color scheme (#f97316)
- Professional layout
- All submission details
- Contact information
- Responsive design

You can customize the email content in:
`server/routes/partnerships.mjs`

Functions:
- `sendAdminNotification()` - Email to admin
- `sendUserConfirmation()` - Email to user

## 🎉 Ready to Use!

Once you:
1. ✅ Add Gmail App Password to .env
2. ✅ Restart the server
3. ✅ Test a form submission

Your partnership inquiry system is fully operational with:
- ✅ Database storage
- ✅ Email notifications to admin
- ✅ Confirmation emails to users
- ✅ Beautiful UI with loading states
- ✅ Toast notifications
- ✅ Form validation
- ✅ Auto-reset after submission
