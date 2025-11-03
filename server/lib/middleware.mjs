import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import fs from 'node:fs';
import SQLiteStoreFactory from 'connect-sqlite3';
import csrf from 'csurf';
import { config } from './config.mjs';

const SQLiteStore = SQLiteStoreFactory(session);

export function baseMiddleware(app) {
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));
}

export function sessionMiddleware(app) {
  // Ensure the session directory exists
  try { fs.mkdirSync('./.data', { recursive: true }); } catch {}
  app.use(
    session({
      name: 'sid',
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new SQLiteStore({ db: 'sessions.sqlite', dir: './.data' }),
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: config.isProd,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
}

// Helper function to normalize and match paths (handles trailing slashes)
function matchesPath(requestPath, targetPath) {
  // Normalize both paths by stripping trailing slashes (preserving root "/")
  const normalizeTrailingSlash = (path) => path === '/' ? path : path.replace(/\/+$/, '');
  const normalizedRequest = normalizeTrailingSlash(requestPath);
  const normalizedTarget = normalizeTrailingSlash(targetPath);
  return normalizedRequest === normalizedTarget;
}

// Validate Origin/Referer headers for CSRF-exempt routes
function validateOriginHeaders(req, res) {
  const origin = req.get('origin');
  const referer = req.get('referer');
  const host = req.get('host');
  
  // Ensure corsOrigin is an array
  const allowedOrigins = Array.isArray(config.corsOrigin) 
    ? config.corsOrigin 
    : [config.corsOrigin].filter(Boolean);
  
  // Allow requests from same origin or configured CORS origins
  if (origin) {
    const originHost = new URL(origin).host;
    if (originHost !== host && !allowedOrigins.includes(origin)) {
      return res.status(403).json({ 
        error: 'Invalid origin header' 
      });
    }
  }
  
  // Validate referer if present
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost !== host && !allowedOrigins.some(allowed => {
        try {
          return new URL(allowed).host === refererHost;
        } catch {
          return false;
        }
      })) {
        return res.status(403).json({ 
          error: 'Invalid referer header' 
        });
      }
    } catch (e) {
      // Invalid referer URL format
      return res.status(403).json({ 
        error: 'Invalid referer header format' 
      });
    }
  }
  
  // Require at least one header for CSRF protection
  if (!origin && !referer) {
    return res.status(403).json({ 
      error: 'Missing origin or referer header' 
    });
  }
  
  return null; // Validation passed
}      });
    }
  }
  
  // Require at least one header for CSRF protection
  // Prevents requests without Origin or Referer from bypassing validation
  if (!origin && !referer) {
    return res.status(403).json({ 
      error: 'Missing origin or referer header' 
    });
  }
  
  return null; // Validation passed
}

// Check for honeypot field (bot detection)
function checkHoneypot(req, res) {
  // Common honeypot field names
  const honeypotFields = ['website', 'url', 'homepage', 'company_url'];
  
  for (const field of honeypotFields) {
    if (req.body[field] !== undefined && req.body[field] !== '') {
      // Honeypot triggered - likely a bot
      console.warn('Honeypot field triggered:', {
        field,
        ip: req.ip,
        path: req.path
      });
      // Return success to bot but don't process
      return res.status(200).json({ 
        ok: true, 
        message: 'Form submitted successfully' 
      });
    }
  }
  
  return null; // No honeypot triggered
}

export function csrfMiddleware(app) {
  const csrfProtection = csrf({
    cookie: {
      key: 'csrf.secret',
      sameSite: 'lax',
      secure: config.isProd,
      httpOnly: true,
    },
  });
  
  const publicFormLimiter = limiters().publicForm;
  
  // Apply CSRF protection but exempt public forms with compensating controls
  app.use((req, res, next) => {
    // CSRF EXEMPTION: Public contact/partnership forms are exempt to allow unauthenticated submissions
    // COMPENSATING CONTROLS:
    // 1. Rate limiting (10 requests per 15 minutes per IP)
    // 2. Origin/Referer header validation
    // 3. Honeypot field detection for bot prevention
    // 4. SameSite cookie protection (Lax mode)
    // 5. Input validation via Zod schemas in route handlers
    
    if (req.method === 'POST') {
      // Normalize path and check if it matches exempt routes
      if (matchesPath(req.path, '/api/partnerships') || matchesPath(req.path, '/api/contact')) {
        // Apply rate limiting first
        return publicFormLimiter(req, res, (err) => {
          if (err) return next(err);
          
          // Validate Origin/Referer headers
          const originError = validateOriginHeaders(req, res);
          if (originError) return; // Response already sent
          
          // Check honeypot fields
          const honeypotError = checkHoneypot(req, res);
          if (honeypotError) return; // Response already sent (fake success to bot)
          
          // All compensating controls passed
          return next();
        });
      }
    }
    
    // Apply CSRF protection to all other routes
    csrfProtection(req, res, next);
  });
  
  app.use((req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      try {
        res.cookie('XSRF-TOKEN', req.csrfToken(), {
          sameSite: 'lax',
          secure: config.isProd,
          httpOnly: false,
          path: '/',
        });
      } catch (err) {
        // If csrfToken is not available (exempted route), skip
      }
    }
    next();
  });
}

export function limiters() {
  return {
    login: rateLimit({ windowMs: 5 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false }),
    general: rateLimit({ windowMs: 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false }),
    publicForm: rateLimit({ 
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 10 requests per windowMs
      message: 'Too many submissions from this IP, please try again later.',
      standardHeaders: true, 
      legacyHeaders: false 
    }),
  };
}

export function authRequired(role) {
  return (req, res, next) => {
    const user = req.session?.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (role && user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
