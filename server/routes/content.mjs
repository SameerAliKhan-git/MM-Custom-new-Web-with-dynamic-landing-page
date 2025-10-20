import { Router } from 'express';
import { prisma } from '../lib/db.mjs';
import { authRequired } from '../lib/middleware.mjs';
import { z } from 'zod';

const router = Router();

// Programs
const programSchema = z.object({ title: z.string().min(1), description: z.string().min(1), active: z.boolean().optional() });
router.get('/programs', async (_req, res) => {
  const programs = await prisma.program.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' } });
  res.json(programs);
});
router.post('/programs', authRequired('ADMIN'), async (req, res) => {
  const data = programSchema.parse(req.body);
  const created = await prisma.program.create({ data });
  res.status(201).json(created);
});
router.patch('/programs/:id', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  const data = programSchema.partial().parse(req.body);
  const updated = await prisma.program.update({ where: { id }, data });
  res.json(updated);
});
router.delete('/programs/:id', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  await prisma.program.delete({ where: { id } });
  res.json({ ok: true });
});

// Stories
const storySchema = z.object({ title: z.string().min(1), content: z.string().min(1), imageUrl: z.string().url().optional(), published: z.boolean().optional() });
router.get('/stories', async (_req, res) => {
  const stories = await prisma.story.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
  res.json(stories);
});
router.post('/stories', authRequired('ADMIN'), async (req, res) => {
  const data = storySchema.parse(req.body);
  const created = await prisma.story.create({ data });
  res.status(201).json(created);
});
router.patch('/stories/:id', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  const data = storySchema.partial().parse(req.body);
  const updated = await prisma.story.update({ where: { id }, data });
  res.json(updated);
});
router.delete('/stories/:id', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  await prisma.story.delete({ where: { id } });
  res.json({ ok: true });
});

// Impact stats
const impactSchema = z.object({ label: z.string().min(1), value: z.number().int().nonnegative() });
router.get('/impact', async (_req, res) => {
  res.json(await prisma.impactStat.findMany({ orderBy: { createdAt: 'desc' } }));
});
router.post('/impact', authRequired('ADMIN'), async (req, res) => {
  const created = await prisma.impactStat.create({ data: impactSchema.parse(req.body) });
  res.status(201).json(created);
});
router.patch('/impact/:id', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  const updated = await prisma.impactStat.update({ where: { id }, data: impactSchema.partial().parse(req.body) });
  res.json(updated);
});
router.delete('/impact/:id', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  await prisma.impactStat.delete({ where: { id } });
  res.json({ ok: true });
});

// Contact messages
const contactSchema = z.object({ name: z.string().min(1), email: z.string().email(), message: z.string().min(1) });
router.post('/contact', async (req, res) => {
  await prisma.contactMessage.create({ data: contactSchema.parse(req.body) });
  res.status(201).json({ ok: true });
});
router.get('/contact', authRequired('ADMIN'), async (_req, res) => {
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});
router.post('/contact/:id/resolve', authRequired('ADMIN'), async (req, res) => {
  const id = req.params.id;
  const updated = await prisma.contactMessage.update({ where: { id }, data: { handled: true } });
  res.json(updated);
});

export default router;