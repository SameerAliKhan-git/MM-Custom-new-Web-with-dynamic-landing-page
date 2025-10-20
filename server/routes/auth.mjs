import { prisma } from '../lib/db.mjs';
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { limiters } from '../lib/middleware.mjs';
import { z } from 'zod';
import crypto from 'node:crypto';

const router = Router();
const { login } = limiters();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
const resetRequestSchema = z.object({ email: z.string().email() });
const resetConfirmSchema = z.object({ token: z.string().min(10), password: z.string().min(8) });

router.get('/session', (req, res) => {
  const user = req.session?.user;
  if (user) return res.json({ authenticated: true, role: user.role?.toLowerCase?.(), email: user.email, id: user.id });
  return res.json({ authenticated: false });
});

router.post('/register', async (req, res) => {
  const data = registerSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return res.status(409).json({ message: 'Email already in use' });
  const hashed = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: { email: data.email, password: hashed, name: data.name, role: 'DONOR' },
    select: { id: true, email: true, role: true, name: true },
  });
  req.session.user = user;
  res.status(201).json(user);
});

router.post('/login', login, async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
  const sessionUser = { id: user.id, email: user.email, role: user.role };
  req.session.user = sessionUser;
  res.json({ ...sessionUser, role: sessionUser.role?.toLowerCase?.() });
});

router.post('/logout', (req, res) => {
  req.session?.destroy(() => {
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

// Request password reset: creates a token and returns it (in real deployments, email it)
router.post('/password/request', async (req, res) => {
  const { email } = resetRequestSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.json({ ok: true }); // do not leak existence
  const token = crypto.randomBytes(24).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
  await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt: expires } });
  // In production, you would send an email with the token.
  // For development, we'll log it to the console.
  console.log(`Password reset token for ${email}: ${token}`);
  res.json({ ok: true, message: 'If a user with that email exists, a password reset link has been sent.' });
});

// Confirm password reset with token
router.post('/password/confirm', async (req, res) => {
  const { token, password } = resetConfirmSchema.parse(req.body);
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.used || record.expiresAt < new Date()) return res.status(400).json({ message: 'Invalid or expired token' });
  const hashed = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { password: hashed } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { used: true } }),
  ]);
  res.json({ ok: true });
});

export default router;