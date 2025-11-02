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

export function csrfMiddleware(app) {
  const csrfProtection = csrf({
    cookie: {
      key: 'csrf.secret',
      sameSite: 'lax',
      secure: config.isProd,
      httpOnly: true,
    },
  });
  
  // Apply CSRF protection but exempt public forms
  app.use((req, res, next) => {
    // Exempt public forms from CSRF
    if ((req.path === '/api/partnerships' || req.path === '/api/contact') && req.method === 'POST') {
      return next();
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
