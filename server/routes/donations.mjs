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

router.post('/', authRequired(), async (req, res) => {
  const user = req.session.user;
  const data = donationSchema.parse(req.body);

  if (data.programId) {
    const program = await prisma.program.findUnique({ where: { id: data.programId } });
    if (!program) {
      return res.status(400).json({ message: 'The specified program does not exist.' });
    }
  }

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
});

router.get('/me', authRequired(), async (req, res) => {
  const user = req.session.user;
  const donations = await prisma.donation.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
  res.json(donations);
});

router.get('/', authRequired('ADMIN'), async (_req, res) => {
  const items = await prisma.donation.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true, program: true } });
  res.json(items);
});

router.get('/:id', authRequired(null, 'donation'), async (req, res) => {
  const { id } = req.params;
  const donation = await prisma.donation.findUnique({ where: { id } });
  res.json(donation);
});

export default router;