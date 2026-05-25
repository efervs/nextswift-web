/**
 * Playwright config — Fase 28 / P23 smoke harness.
 *
 * Cubre los 6 flujos críticos del checklist (qa_nextswift.md §3) en una
 * matriz mínima de proyectos. La matriz cross-browser completa
 * (Chrome / Safari / Firefox / Edge × desktop / tablet / mobile = 24 combos)
 * vive en BrowserStack o equivalente — esta config corre LOCAL contra el
 * preview server para detectar regresiones deterministas.
 *
 * Uso:
 *   npm run build
 *   npx playwright install       # primera vez
 *   npx playwright test          # corre los 6 specs en los 3 proyectos
 *   npx playwright test --ui     # modo UI para debug
 *
 * BASE_URL override:
 *   E2E_BASE_URL=https://preview.nextswift.mx npx playwright test
 */
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:4321';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
    {
      name: 'mobile-iphone-14',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'tablet-ipad',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run preview -- --host 127.0.0.1 --port 4321',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
