import express from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { config } from './lib/config.mjs';
import { baseMiddleware, sessionMiddleware, csrfMiddleware, limiters } from './lib/middleware.mjs';
import authRoutes from './routes/auth.mjs';
import contentRoutes from './routes/content.mjs';
import donationRoutes from './routes/donations.mjs';

const app = express();
const PORT = config.port;

// Base security/cors/body parsing
baseMiddleware(app);
// Sessions
sessionMiddleware(app);
// CSRF protection and token cookie
csrfMiddleware(app);

// General rate limiter
app.use(limiters().general);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/api/donations', donationRoutes);
// Back-compat: expose /api/session directly as used by frontend
import authRouter from './routes/auth.mjs';
app.get('/api/session', (req, res, next) => authRouter.handle({ ...req, url: '/session' }, res, next));

// Error handler

app.use((err, req, res, _next) => {
  console.error(err); // Log all errors for debugging

  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const field = err.meta?.target?.[0];
        return res.status(409).json({ message: `An account with this ${field} already exists.` });
      }
      case 'P2025':
        return res.status(404).json({ message: 'The requested resource was not found.' });
      default:
        console.error(`Unhandled Prisma Error Code: ${err.code}`, err);
        return res.status(500).json({ message: `A database error occurred. Code: ${err.code}` });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: 'Invalid data provided for database operation.' });
  }

  res.status(500).json({ message: 'An unexpected internal server error occurred.' });
});


app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});