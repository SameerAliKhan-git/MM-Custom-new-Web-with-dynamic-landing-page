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
  
  // Dynamic CORS configuration for development and production
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      
      // Ensure corsOrigin is an array
      const allowedOrigins = Array.isArray(config.corsOrigin) 
        ? config.corsOrigin 
        : [config.corsOrigin].filter(Boolean);
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Development: Allow localhost, ngrok, and tunneling services
      if (config.env === 'development') {
        const devPatterns = [
          /^https?:\/\/localhost(:\d+)?$/,
          /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
          /^https?:\/\/.*\.ngrok-free\.(app|dev)$/,    // ngrok free domains (.app or .dev)
          /^https?:\/\/.*\.ngrok\.io$/,                // ngrok legacy domains
          /^https?:\/\/.*\.ngrok\.app$/,               // ngrok app domains
          /^https?:\/\/.*\.loca\.lt$/,                 // localtunnel domains
        ];
        
        if (devPatterns.some(pattern => pattern.test(origin))) {
          return callback(null, true);
        }
      }
      
      // Production: Only allow exact matches
      console.warn('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    },
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
  
  // Add additional allowed patterns for development/staging
  const allowedPatterns = [
    /^https?:\/\/localhost(:\d+)?$/,           // localhost with any port
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/,        // 127.0.0.1 with any port
    /^https?:\/\/.*\.ngrok-free\.(app|dev)$/,  // ngrok free domains (.app or .dev)
    /^https?:\/\/.*\.ngrok\.io$/,              // ngrok legacy domains
    /^https?:\/\/.*\.ngrok\.app$/,             // ngrok app domains
    /^https?:\/\/.*\.loca\.lt$/,               // localtunnel domains
  ];
  
  // Check if origin/referer matches allowed patterns (for mobile testing)
  const isAllowedPattern = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      const urlOrigin = `${urlObj.protocol}//${urlObj.host}`;
      return allowedPatterns.some(pattern => pattern.test(urlOrigin));
    } catch {
      return false;
    }
  };
  
  // Allow requests from same origin, configured CORS origins, or allowed patterns
  if (origin) {
    const originHost = new URL(origin).host;
    const isAllowed = originHost === host || 
                      allowedOrigins.includes(origin) || 
                      isAllowedPattern(origin);
    
    if (!isAllowed) {
      console.warn('Blocked request - invalid origin:', {
        origin,
        host,
        allowedOrigins,
        ip: req.ip
      });
      return res.status(403).json({ 
        error: 'Invalid origin header' 
      });
    }
  }
  
  // Validate referer if present
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      const isAllowed = refererHost === host || 
                        allowedOrigins.some(allowed => {
                          try {
                            return new URL(allowed).host === refererHost;
                          } catch {
                            return false;
                          }
                        }) ||
                        isAllowedPattern(referer);
      
      if (!isAllowed) {
        console.warn('Blocked request - invalid referer:', {
          referer,
          host,
          allowedOrigins,
          ip: req.ip
        });
        return res.status(403).json({ 
          error: 'Invalid referer header' 
        });
      }
    } catch (e) {
      // Invalid referer URL format
      console.warn('Blocked request - invalid referer format:', {
        referer,
        error: e.message,
        ip: req.ip
      });
      return res.status(403).json({ 
        error: 'Invalid referer header format' 
      });
    }
  }
  
  // RELAXED: Allow requests without Origin/Referer for mobile compatibility
  // Mobile browsers (especially WebView, in-app browsers) sometimes don't send these headers
  // Other security layers (rate limiting, honeypot, input validation) still apply
  if (!origin && !referer) {
    console.warn('Request without Origin/Referer headers (mobile browser?):', {
      path: req.path,
      userAgent: req.get('user-agent'),
      ip: req.ip
    });
    // Allow the request but log it for monitoring
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
