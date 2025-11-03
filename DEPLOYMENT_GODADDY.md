# Deploying to GoDaddy Domain (mahimaministries.org)

This guide walks you through deploying your Mahima Ministries website to your GoDaddy domain using Vercel (recommended) or VPS hosting.

---

## 🎯 Deployment Strategy

Since you own `mahimaministries.org` on GoDaddy, you have two main options:

### **Option 1: Vercel + GoDaddy DNS (Recommended)**
✅ **Easiest** - Automatic deployments, SSL, CDN, serverless functions  
✅ **Free tier available** - Generous limits for most websites  
✅ **Best for React/Node.js** - Optimized for your tech stack  
✅ **No server management** - Focus on code, not infrastructure

### **Option 2: VPS Hosting (Traditional)**
⚠️ More complex - Requires server setup and maintenance  
⚠️ Monthly costs - $5-20/month for VPS  
✅ Full control - Complete access to server  
✅ Good for complex backends - If you need custom services

**Recommendation:** Use **Option 1 (Vercel)** unless you have specific requirements that need a VPS.

---

## 🚀 Option 1: Deploy with Vercel (Recommended)

### Prerequisites
- ✅ GitHub account
- ✅ Vercel account (free) - [Sign up](https://vercel.com)
- ✅ GoDaddy account with mahimaministries.org
- ✅ PostgreSQL database (Vercel Postgres or external provider)

---

### Step 1: Prepare Your Code

#### 1.1 Update Prisma Schema for PostgreSQL

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

#### 1.2 Create Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.mjs"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

Create `.vercelignore`:

```
node_modules
.env
.env.local
*.log
.DS_Store
.vscode
prisma/dev.db
.data
```

#### 1.3 Update package.json

Add Vercel build script:

```json
{
  "scripts": {
    "dev": "concurrently \"npm:serve:api\" \"vite\"",
    "serve:api": "node server/index.mjs",
    "dev:client": "vite",
    "build": "tsc -b && vite build",
    "vercel-build": "npm run build",
    "preview": "vite preview"
  }
}
```

#### 1.4 Commit and Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin master
```

---

### Step 2: Setup Database

#### Option A: Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Choose region closest to your users (e.g., Mumbai for India)
4. Copy the `DATABASE_URL` connection string

#### Option B: Supabase (Free PostgreSQL)

1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection String → URI
4. Copy the connection string (looks like `postgresql://postgres:[password]@[host]:5432/postgres`)

#### Option C: Railway (Alternative)

1. Go to [Railway](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy connection string from database settings

---

### Step 3: Deploy to Vercel

#### 3.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select `MM-Custom-new-Web-with-dynamic-landing-page`

#### 3.2 Configure Build Settings

Vercel should auto-detect these settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run vercel-build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Root Directory:** `./` (leave empty)

#### 3.3 Add Environment Variables

Click "Environment Variables" and add:

```bash
# Core Settings
NODE_ENV=production
SESSION_SECRET=generate-random-32-char-string-here
PORT=3000

# URLs
CORS_ORIGIN=https://mahimaministries.org
WEBSITE_URL=https://mahimaministries.org

# Database
DATABASE_PROVIDER=postgresql
DATABASE_URL=your-postgresql-connection-string-here

# Email (Required)
EMAIL_USER=mahimaministriesindia@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=mahimaministriesindia@gmail.com

# SMTP (Optional - uses Gmail by default)
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# WhatsApp (Optional - Twilio)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+919246502264
```

**Important Notes:**

- **SESSION_SECRET:** Generate a random 32+ character string. Use [this generator](https://www.random.org/strings/)
- **DATABASE_URL:** From Step 2 (your PostgreSQL connection string)
- **EMAIL_PASSWORD:** Gmail App Password (not your regular password)
  - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
  - Generate new app password for "Mail"
  - Use that 16-character password

#### 3.4 Deploy

Click "Deploy" button. Vercel will:
1. Install dependencies
2. Build your React frontend
3. Set up API routes
4. Deploy to a `.vercel.app` URL (e.g., `mahima-ministries.vercel.app`)

Wait 2-5 minutes for first deployment.

---

### Step 4: Run Database Migrations

After first deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Functions
2. Or use Vercel CLI locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Set environment variables locally
vercel env pull .env.production

# Run migrations
DATABASE_URL="your-production-database-url" npx prisma migrate deploy

# Seed database (optional)
DATABASE_URL="your-production-database-url" npm run seed
```

Alternatively, add a migration script to `package.json`:

```json
{
  "scripts": {
    "migrate:deploy": "prisma migrate deploy",
    "postinstall": "prisma generate"
  }
}
```

---

### Step 5: Connect Custom Domain (GoDaddy)

#### 5.1 Add Domain in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → **Domains**
2. Click "Add Domain"
3. Enter: `mahimaministries.org`
4. Click "Add"
5. Add another: `www.mahimaministries.org`
6. Click "Add"

Vercel will show you DNS records to add.

#### 5.2 Configure DNS in GoDaddy

1. **Login to GoDaddy**
   - Go to [GoDaddy DNS Management](https://dcc.godaddy.com/manage/dns)
   - Select `mahimaministries.org`

2. **Add/Update DNS Records**

   Delete any existing A, AAAA, or CNAME records for `@` and `www`, then add:

   **Record 1: Root Domain (@)**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600 seconds (or default)
   ```

   **Record 2: WWW Subdomain**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 1 Hour (or default)
   ```

   **Optional: IPv6 Support**
   ```
   Type: AAAA
   Name: @
   Value: 2606:4700:4700::1111
   TTL: 600 seconds
   ```

3. **Save Changes**

   Click "Save" for each record.

#### 5.3 Verify Domain

Back in Vercel:
- Wait 5-10 minutes for DNS propagation
- Vercel will automatically verify the domain
- Once verified, SSL certificate will be issued automatically (Let's Encrypt)
- Your site will be live at `https://mahimaministries.org` 🎉

Check propagation status: [DNS Checker](https://dnschecker.org/#A/mahimaministries.org)

---

### Step 6: Post-Deployment Checklist

#### ✅ Test Everything

1. **Visit Your Site**
   - https://mahimaministries.org
   - https://www.mahimaministries.org

2. **Test Features**
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] Contact form submits (check email)
   - [ ] Partnership form submits
   - [ ] Admin login works
   - [ ] Donation page loads
   - [ ] All images display
   - [ ] Mobile responsiveness

3. **Check Email Notifications**
   - Submit contact form
   - Verify you receive:
     - Admin notification email
     - User confirmation email
     - WhatsApp notification (if configured)

4. **Test on Multiple Devices**
   - Desktop browsers (Chrome, Firefox, Safari, Edge)
   - Mobile browsers (iOS Safari, Chrome Android)
   - Tablet

#### ⚙️ Configure Redirects (Optional)

In Vercel Dashboard → Settings → Redirects:

```
# Redirect www to non-www (or vice versa)
www.mahimaministries.org → mahimaministries.org (308)

# Redirect old URLs if you had a previous website
/old-page → /new-page (301)
```

#### 📊 Setup Analytics (Optional)

1. **Vercel Analytics** (Built-in)
   - Go to Vercel Dashboard → Your Project → Analytics
   - Enable Web Analytics
   - Free up to 10k visitors/month

2. **Google Analytics**
   - Add Google Analytics tracking code to `index.html`

#### 🔒 Security Headers (Already Configured)

Your app already uses:
- Helmet.js for security headers
- CORS protection
- CSRF tokens
- Rate limiting
- Session cookies with httpOnly

#### 🔄 Setup Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin master

# Vercel automatically deploys
# Check deployment status in dashboard
```

---

### Step 7: Monitor & Maintain

#### Logs & Debugging

View logs in Vercel:
1. Dashboard → Your Project → Deployments
2. Click on a deployment → View Function Logs

Or use CLI:
```bash
vercel logs
```

#### Update Content

To update the website:
```bash
# Edit files locally
# Test with npm run dev

# Push to GitHub
git add .
git commit -m "Update programmes page"
git push origin master

# Vercel deploys automatically
```

#### Database Backups

**Vercel Postgres:**
- Automatic backups included
- Access via dashboard → Storage → Your Database → Backups

**Supabase:**
- Daily automatic backups on paid plans
- Manual backups: Settings → Database → Backup

**Manual Backup:**
```bash
# Dump database
pg_dump "your-database-url" > backup.sql

# Restore
psql "your-database-url" < backup.sql
```

---

## 🆘 Troubleshooting

### Issue: Domain not verifying in Vercel

**Solution:**
1. Wait 24-48 hours for full DNS propagation
2. Check DNS records are correct in GoDaddy
3. Use [DNS Checker](https://dnschecker.org) to verify propagation
4. Remove and re-add domain in Vercel

### Issue: SSL Certificate error

**Solution:**
- Wait for Vercel to automatically issue certificate (5-10 minutes)
- Ensure domain is verified first
- Clear browser cache and try incognito mode

### Issue: API routes returning 404

**Solution:**
1. Check `vercel.json` configuration
2. Verify API routes in `server/routes/`
3. Check deployment logs for errors
4. Ensure `vercel-build` script runs successfully

### Issue: Database connection fails

**Solution:**
1. Verify `DATABASE_URL` is correct in environment variables
2. Check database is accessible from Vercel's region
3. Ensure database allows external connections
4. Test connection locally with production credentials

### Issue: Emails not sending

**Solution:**
1. Verify Gmail App Password (not regular password)
2. Check `EMAIL_USER` and `EMAIL_PASSWORD` in Vercel env vars
3. View function logs for email errors
4. Test with different email provider if Gmail fails

### Issue: Forms not submitting on mobile

**Solution:**
- Already fixed in code (CORS configured for all devices)
- Clear mobile browser cache
- Ensure HTTPS is working (not HTTP)

---

## 📞 Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **GoDaddy DNS Help:** https://www.godaddy.com/help/manage-dns-680
- **Prisma Documentation:** https://www.prisma.io/docs

---

## ✅ Deployment Complete!

Your website is now live at:
- **Primary:** https://mahimaministries.org
- **WWW:** https://www.mahimaministries.org

**Next Steps:**
1. Share the website with your team
2. Monitor analytics and user feedback
3. Regularly update content
4. Keep dependencies updated
5. Backup database regularly

---

**Congratulations! Your Mahima Ministries website is now live! 🎉**
