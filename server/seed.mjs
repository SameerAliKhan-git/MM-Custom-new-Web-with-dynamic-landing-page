import bcrypt from 'bcryptjs';
import { prisma } from './lib/db.mjs';

async function main() {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'Admin1234!';

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({ data: { email: adminEmail, password: hashed, name: 'Admin', role: 'ADMIN' } });
    console.log('Seeded admin user: ', adminEmail, ' password:', adminPassword);
  } else {
    console.log('Admin already exists.');
  }

  // Sample program & impact
  const program = await prisma.program.upsert({
    where: { id: 'seed-prog-1' },
    update: {},
    create: { id: 'seed-prog-1', title: 'Child Education', description: 'Support education initiatives', active: true },
  });

  await prisma.impactStat.create({ data: { label: 'Children Educated', value: 1200 } }).catch(() => {});
  console.log('Seeded program:', program.title);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
