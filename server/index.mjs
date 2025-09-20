import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5174;

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());

// Sessions via httpOnly cookie (MemoryStore for demo only)
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true behind HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// CSRF: use cookie-based tokens (double-submit pattern)
const csrfProtection = csrf({
  cookie: {
    key: 'csrf.secret',
    sameSite: 'lax',
    secure: false, // set true behind HTTPS in production
    httpOnly: true, // secret cookie should be httpOnly
  },
});

// Issue a readable token cookie on GETs after csrf middleware computes a token
app.use((req, res, next) => {
  next();
});

app.use(csrfProtection);

app.use((req, res, next) => {
  // Expose token to frontend via a non-httpOnly cookie (JS can read it)
  // On safe methods to avoid replays
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
      sameSite: 'lax',
      secure: false,
      httpOnly: false,
      path: '/',
    });
  }
  next();
});

// Rate limit for login endpoint
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// Demo user store (replace with DB)
const USERS = [
  { id: '1', role: 'admin', email: 'admin@example.com', password: 'Admin1234' },
  { id: '2', role: 'donor', email: 'donor@example.com', password: 'Donor1234' },
];

// Helpers
function isAuthenticated(req) {
  return !!req.session.user;
}

// Endpoints
app.get('/api/session', (req, res) => {
  if (isAuthenticated(req)) {
    res.json({ authenticated: true, role: req.session.user.role });
  } else {
    res.json({ authenticated: false });
  }
});

app.post('/api/auth/login', loginLimiter, (req, res) => {
  // csurf middleware already validates token; support common header names if a token is provided
  const csrfHeader =
    req.get('x-csrf-token') ||
    req.get('X-CSRF-Token') ||
    req.get('x-xsrf-token') ||
    req.get('X-XSRF-Token') ||
    req.get('csrf-token') ||
    req.get('CSRF-Token') ||
    req.get('xsrf-token') ||
    req.get('XSRF-Token');
  const { email, password, role } = req.body || {};
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Missing credentials' });
  }
  const user = USERS.find((u) => u.email.toLowerCase() === String(email).toLowerCase() && u.role === role);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  req.session.user = { id: user.id, email: user.email, role: user.role };
  res.json({ ok: true, role: user.role });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
