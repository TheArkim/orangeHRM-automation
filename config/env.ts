import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: required('ORANGEHRM_BASE_URL'),
  username: required('ORANGEHRM_USERNAME'),
  password: required('ORANGEHRM_PASSWORD'),
} as const;
