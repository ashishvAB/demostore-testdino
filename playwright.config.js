// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 4 : 6,
  timeout: 60 * 1000, // ⏱️ each test fails after 1 min

  reporter: [
    ['html', {outputFolder: 'playwright-report',open: 'never'}], // for html report
    ['json', { outputFile: './playwright-report/report.json' }], // must for sending results to TestDino
  ],

  use: {
    baseURL: 'https://demo.alphabin.co/',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});