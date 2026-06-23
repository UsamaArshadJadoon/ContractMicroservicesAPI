import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: {
    baseURL: process.env.MICRO_URL ?? 'https://ms-sb.contracts.com.sa',
    extraHTTPHeaders: {
      'X-Contracts-ClientId': process.env.X_CONTRACTS_CLIENT_ID ?? '',
      'X-Contracts-APIKey': process.env.X_CONTRACTS_API_KEY ?? '',
      'X-Contracts-Secret': process.env.SECRET_KEY ?? '',
    },
    ignoreHTTPSErrors: true,
  },
});
