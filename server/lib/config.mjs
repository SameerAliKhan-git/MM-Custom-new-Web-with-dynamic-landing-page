import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5174),
  sessionSecret: process.env.SESSION_SECRET || 'change-me-in-.env',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  isProd: (process.env.NODE_ENV || 'development') === 'production',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  databaseProvider: process.env.DATABASE_PROVIDER || 'sqlite',
};
