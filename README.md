# Mahima Ministries Website

Full-stack website for Mahima Ministries built with Vite + React + TypeScript frontend and Express + Prisma backend.

**Live Site:** [https://mahimaministries.org](https://mahimaministries.org)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing Mobile](#testing-mobile)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Public Features
- **Home Page** - Hero carousel, impact numbers, featured programmes
- **About Us** - Organization history, vision, mission, values
- **Our Programmes** - Child welfare, elderly care, sustainability, youth skilling
- **Governance** - Board members, transparency reports
- **Partnerships** - Corporate and institutional partnership opportunities
- **Contact Form** - Integrated with email notifications and WhatsApp alerts
- **Donation System** - Secure donation forms with multiple payment options
- **Responsive Design** - Mobile-first, works on all devices

### Admin Features
- **Admin Dashboard** - Manage donations, view analytics
- **User Management** - View and manage donors
- **Content Management** - Update stories, programmes, impact statistics
- **Donor Portal** - Track donations, download receipts

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library (Radix UI primitives)
- **Lucide React** - Icon library
- **Recharts** - Charts and data visualization
- **Embla Carousel** - Carousel/slider component
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM (SQLite for dev, PostgreSQL for production)
- **TypeScript (via .mjs)** - ES modules
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **CSRF Protection** - Token-based CSRF protection
- **Express Session** - Session management
- **Express Rate Limit** - Rate limiting for APIs

### Email & Notifications
- **Nodemailer** - Email sending
- **Twilio** - WhatsApp notifications (optional)

### Authentication & Security
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-sqlite3** - SQLite session store
- **cookie-parser** - Cookie parsing
- **csurf** - CSRF token generation
- **Zod** - Schema validation

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Gmail Account** (for email notifications) with App Password enabled

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SameerAliKhan-git/MM-Custom-new-Web-with-dynamic-landing-page.git
cd MM-Custom-new-Web-with-dynamic-landing-page
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React and related libraries
- Express and backend dependencies
- Prisma ORM
- UI components (Radix UI, shadcn/ui)
- Development tools

### 3. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and configure the following:

```bash
# Server Configuration
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-random-secret-here-change-this-in-production
CORS_ORIGIN=http://localhost:5173
WEBSITE_URL=http://localhost:5173

# Database (SQLite for development)
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./prisma/dev.db

# Email Configuration (REQUIRED)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=mahimaministriesindia@gmail.com

# Optional: WhatsApp Notifications via Twilio
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+919246502264
```

**Important:** For Gmail, you need to generate an [App Password](https://myaccount.google.com/apppasswords).

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with initial data (optional)
npm run seed
```

The seed command creates:
- Admin user: `admin@example.com` / `Admin1234!`
- Sample programmes and stories

---

## 💻 Development

### Start Development Servers

#### Option 1: Start Both Servers Together (Recommended)

```bash
npm run dev
```

This starts:
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend**: `http://localhost:3000` (Express API server)

#### Option 2: Start Servers Separately

Terminal 1 - Frontend:
```bash
npm run dev:client
```

Terminal 2 - Backend:
```bash
npm run serve:api
```

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:client       # Start only frontend (Vite)
npm run serve:api        # Start only backend (Express)

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio (DB GUI)
npm run seed             # Seed database with sample data

# Production
npm run build            # Build frontend for production
npm run preview          # Preview production build locally

# Utilities
npm run lint             # Run linter (not configured yet)
```

### Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)
- **Admin Login**: [http://localhost:5173/admin](http://localhost:5173/admin)
  - Email: `admin@example.com`
  - Password: `Admin1234!`

---

## 📱 Testing Mobile

### Using ngrok (Recommended)

```bash
# Install ngrok globally
npm install -g ngrok

# Start ngrok tunnel
ngrok http 5173 --host-header="localhost:5173"
```

This will generate a URL like:
```
https://your-subdomain.ngrok-free.dev
```

Access this URL from your mobile device to test the website.

**Note:** The CORS configuration already allows ngrok domains in development mode.

---

## 🌐 Deployment

### Deployment Options

#### Option 1: Vercel (Recommended for Easy Deployment)

**Prerequisites:**
- Vercel account ([sign up](https://vercel.com))
- GitHub repository

**Steps:**

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Set Environment Variables in Vercel**
   
   Go to Project Settings → Environment Variables and add:
   
   ```bash
   NODE_ENV=production
   DATABASE_URL=your-production-database-url
   SESSION_SECRET=your-long-random-secret
   CORS_ORIGIN=https://mahimaministries.org
   WEBSITE_URL=https://mahimaministries.org
   EMAIL_USER=mahimaministriesindia@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=mahimaministriesindia@gmail.com
   ```

4. **Database Setup**
   
   For production, use PostgreSQL instead of SQLite:
   - Add Vercel Postgres or use external provider (Supabase, Railway, PlanetScale)
   - Update `DATABASE_URL` in environment variables
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"  // Changed from sqlite
       url      = env("DATABASE_URL")
     }
     ```
   - Run migrations:
     ```bash
     npx prisma migrate deploy
     ```

5. **Connect Custom Domain**
   
   In Vercel:
   - Go to Project Settings → Domains
   - Add `mahimaministries.org` and `www.mahimaministries.org`
   - Vercel will provide DNS records

   In GoDaddy:
   - Go to DNS Management
   - Add the records provided by Vercel:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     TTL: 600
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     TTL: 600
     ```

6. **Deploy**
   - Click "Deploy" in Vercel
   - Wait for build to complete
   - Your site will be live at `https://mahimaministries.org`

#### Option 2: Traditional VPS (DigitalOcean, AWS, Linode)

**Prerequisites:**
- VPS with Ubuntu 20.04+ or similar
- SSH access to server
- Domain pointed to server IP

**Steps:**

1. **Server Setup**
   ```bash
   # SSH into your server
   ssh root@your-server-ip

   # Update system
   apt update && apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt install -y nodejs

   # Install PM2 (process manager)
   npm install -g pm2

   # Install Nginx
   apt install -y nginx

   # Install SSL certificate (Let's Encrypt)
   apt install -y certbot python3-certbot-nginx
   ```

2. **Clone and Setup Project**
   ```bash
   # Create app directory
   mkdir -p /var/www/mahimaministries
   cd /var/www/mahimaministries

   # Clone repository
   git clone https://github.com/SameerAliKhan-git/MM-Custom-new-Web-with-dynamic-landing-page.git .

   # Install dependencies
   npm install

   # Build frontend
   npm run build

   # Setup environment
   cp .env.example .env
   nano .env  # Edit with production values

   # Setup database
   npx prisma generate
   npx prisma migrate deploy
   npm run seed
   ```

3. **Configure PM2**
   ```bash
   # Start backend with PM2
   pm2 start server/index.mjs --name mahima-api
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/mahimaministries.org
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name mahimaministries.org www.mahimaministries.org;

       # Frontend (built React app)
       location / {
           root /var/www/mahimaministries/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/mahimaministries.org /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

5. **Setup SSL Certificate**
   ```bash
   certbot --nginx -d mahimaministries.org -d www.mahimaministries.org
   ```

6. **Configure Firewall**
   ```bash
   ufw allow 'Nginx Full'
   ufw allow OpenSSH
   ufw enable
   ```

7. **Point Domain to Server**
   
   In GoDaddy DNS Management:
   ```
   Type: A
   Name: @
   Value: your-server-ip
   TTL: 600
   
   Type: A
   Name: www
   Value: your-server-ip
   TTL: 600
   ```

---

## 🔐 Environment Variables

### Development

```bash
NODE_ENV=development
PORT=3000
SESSION_SECRET=dev-secret-change-in-production
CORS_ORIGIN=http://localhost:5173
WEBSITE_URL=http://localhost:5173
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./prisma/dev.db
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@example.com
```

### Production

```bash
NODE_ENV=production
PORT=3000
SESSION_SECRET=long-random-secret-minimum-32-characters
CORS_ORIGIN=https://mahimaministries.org
WEBSITE_URL=https://mahimaministries.org
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:password@host:5432/database
EMAIL_USER=mahimaministriesindia@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=mahimaministriesindia@gmail.com
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+919246502264
```

---

## 📚 API Documentation

### Public Endpoints

#### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "countryCode": "+91",
  "whatsapp": "9876543210",
  "whatsappCountryCode": "+91",
  "donate": "Yes",
  "message": "I want to support your cause"
}
```

#### Partnership Inquiry
```http
POST /api/partnerships
Content-Type: application/json

{
  "name": "Company Name",
  "email": "contact@company.com",
  "phone": "9876543210",
  "countryCode": "+91",
  "whatsapp": "9876543210",
  "whatsappCountryCode": "+91",
  "company": "Company Inc",
  "address": "123 Street, City",
  "partnerType": "CORPORATE"
}
```

#### Get Programmes
```http
GET /api/programs
```

#### Get Stories
```http
GET /api/stories
```

#### Get Impact Stats
```http
GET /api/impact
```

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "User Name"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin1234!"
}
```

#### Get Session
```http
GET /api/session
```

#### Logout
```http
POST /api/auth/logout
```

### Protected Endpoints (Require Authentication)

#### Create Donation
```http
POST /api/donations
Authorization: Required (session)
Content-Type: application/json

{
  "amount": 1000,
  "type": "ONE_TIME",
  "programId": "optional-program-id"
}
```

#### Get My Donations
```http
GET /api/donations/me
Authorization: Required (session)
```

### Admin Endpoints (Require Admin Role)

#### Get All Donations
```http
GET /api/donations
Authorization: Required (admin session)
```

---

## 📁 Project Structure

```
MM-Custom-new-Web-with-dynamic-landing-page/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── figma/           # Figma-generated components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── DonationPage.tsx
│   ├── AdminDashboard.tsx
│   └── ...
├── server/              # Backend code
│   ├── routes/          # API route handlers
│   │   ├── auth.mjs
│   │   ├── contact.mjs
│   │   ├── donations.mjs
│   │   └── partnerships.mjs
│   ├── lib/             # Utility modules
│   │   ├── config.mjs   # Environment configuration
│   │   ├── db.mjs       # Prisma client
│   │   └── middleware.mjs # Express middleware
│   ├── index.mjs        # Server entry point
│   └── seed.mjs         # Database seeding
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Prisma schema
│   ├── migrations/      # Migration files
│   └── dev.db          # SQLite database (dev)
├── src/                 # React app entry
│   └── main.tsx        # Main app component
├── styles/              # Global styles
│   └── globals.css     # Tailwind CSS imports
├── public/              # Static assets
│   ├── robots.txt
│   └── sitemap.xml
├── .env                 # Environment variables (not in git)
├── .env.example        # Example environment file
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Windows (PowerShell)
$processId = (Get-NetTCPConnection -LocalPort 3000).OwningProcess
Stop-Process -Id $processId -Force

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

#### Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

#### CORS Error on Mobile

**Error:** `CORS blocked origin`

**Solution:** Make sure your ngrok URL matches the patterns in `server/lib/middleware.mjs`. The server already allows:
- `*.ngrok-free.app`
- `*.ngrok-free.dev`
- `*.ngrok.io`

#### Email Not Sending

**Error:** `Error sending email`

**Solutions:**
1. Check Gmail App Password is correct
2. Enable "Less secure app access" (if using regular password)
3. Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
4. Verify internet connection

#### Build Fails

**Error:** `TypeScript errors`

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📞 Contact & Support

**Mahima Ministries**
- **Email:** mahimaministriesindia@gmail.com, rdmaharaju@gmail.com
- **Phone:** +91 9246502264, +91 9246272675, 040-23032675
- **Address:** H.No: 2-38/8/2/9/4/1, NTR Nagar colony, Ameenpur, Sangareddy, Telangana - 502032
- **Website:** [https://mahimaministries.org](https://mahimaministries.org)

---

## 📄 License

© 2025 Mahima Ministries. All rights reserved.

---

## 🙏 Acknowledgments

- Built with ❤️ for Mahima Ministries
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)
- Images: [Unsplash](https://unsplash.com/)
