import { Router } from 'express';
import { prisma } from '../lib/db.mjs';
import { authRequired } from '../lib/middleware.mjs';
import { z } from 'zod';

const router = Router();

const donationSchema = z.object({
  amount: z.number().int().positive(),
  currency: z.string().min(1).default('INR'),
  type: z.enum(['ONE_TIME', 'MONTHLY', 'SPONSORSHIP']),
  programId: z.string().optional(),
});

router.post('/', authRequired(), async (req, res, next) => {
  try {
    const user = req.session.user;
    const data = donationSchema.parse(req.body);
    const created = await prisma.donation.create({
      data: {
        amount: data.amount,
        currency: data.currency,
        type: data.type,
        programId: data.programId || null,
        userId: user.id,
        status: 'SUCCESS',
      },
    });
    res.status(201).json(created);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ message: e.errors[0]?.message });
    next(e);
  }
});

router.get('/me', authRequired(), async (req, res, next) => {
  try {
    const user = req.session.user;
    const donations = await prisma.donation.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
    res.json(donations);
  } catch (e) { next(e); }
});

router.get('/', authRequired('ADMIN'), async (_req, res, next) => {
  try {
    const items = await prisma.donation.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true, program: true } });
    res.json(items);
  } catch (e) { next(e); }
});

export default router;
