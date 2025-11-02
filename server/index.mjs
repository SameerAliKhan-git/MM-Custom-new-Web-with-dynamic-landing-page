import express from 'express';
import { config } from './lib/config.mjs';
import { baseMiddleware, sessionMiddleware, csrfMiddleware, limiters } from './lib/middleware.mjs';
import authRoutes from './routes/auth.mjs';
import contentRoutes from './routes/content.mjs';
import donationRoutes from './routes/donations.mjs';
import partnershipsRoutes from './routes/partnerships.mjs';
import contactRoutes from './routes/contact.mjs';

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
app.use('/api', partnershipsRoutes);
app.use('/api', contactRoutes);
// Back-compat: expose /api/session directly as used by frontend
import authRouter from './routes/auth.mjs';
app.get('/api/session', (req, res, next) => authRouter.handle({ ...req, url: '/session' }, res, next));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
