import { expect, test } from '@playwright/test';

/**
 * Flujo 6 — Cookies: primera visita → banner aparece → "Solo necesarias" →
 * Pixel NO dispara (ningún request a facebook.com/tr/ ni connect.facebook.net).
 *
 * Compliance LFPDPPP P22: opt-in real. Pre-consent debe ser tracking-cero.
 */
test.describe('Flujo 6 — Cookies', () => {
  test('"Solo necesarias" bloquea Pixel y persiste decisión', async ({ page, context }) => {
    await context.clearCookies();

    const pixelRequests: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (/facebook\.com\/tr|connect\.facebook\.net/.test(url)) {
        pixelRequests.push(url);
      }
    });

    await page.goto('/');

    // Banner visible.
    const banner = page.locator('.cookie-banner');
    await expect(banner).toBeVisible();

    // Click "Solo necesarias".
    await page.locator('#cookie-necessary').click();
    await expect(banner).toBeHidden({ timeout: 3_000 });

    // Forzar render adicional para capturar cualquier disparo tardío.
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight / 2);
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(pixelRequests, `Pixel disparado con consent='necessary': ${pixelRequests.join(', ')}`).toEqual([]);

    // Decisión persistida.
    const consent = await page.evaluate(() => localStorage.getItem('cookieConsent'));
    expect(consent).toBe('necessary');

    // Reload: banner NO reaparece.
    await page.reload();
    await expect(banner).toBeHidden();
  });
});
