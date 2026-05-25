import { expect, test } from '@playwright/test';

/**
 * Flujo 4 — WhatsApp: Hero → click "Hablar con Efer" → href contiene wa.me + UTMs.
 *
 * Valida que el handler global de [data-wa-cta] reescribe el href con UTMs
 * frescos antes de la navegación. El evento Contact en CAPI Test Events se
 * verifica manualmente (requiere META_CAPI_TOKEN).
 */
test.describe('Flujo 4 — WhatsApp', () => {
  test('CTA WhatsApp del hero abre wa.me con UTMs', async ({ page, context }) => {
    // Sembrar UTMs en sessionStorage simulando arrival desde paid.
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem(
          'nx_utm',
          JSON.stringify({
            source: 'meta',
            medium: 'paid',
            campaign: 'utilidad-test',
            landing: 'home',
            captured_at: Date.now(),
          }),
        );
      } catch {
        /* noop */
      }
    });

    await page.goto('/');

    const waCTA = page.locator('[data-wa-cta]').first();
    await waCTA.scrollIntoViewIfNeeded();

    // Interceptar el click antes de la navegación (target=_blank abre popup).
    const popupPromise = context.waitForEvent('page', { timeout: 5_000 }).catch(() => null);
    await waCTA.click();
    const popup = await popupPromise;

    if (popup) {
      // Si abrió la pestaña: validar URL.
      await popup.waitForLoadState('domcontentloaded').catch(() => null);
      const url = popup.url();
      expect(url).toContain('wa.me');
      expect(url.toLowerCase()).toContain('utm_source=meta');
      await popup.close();
    } else {
      // Fallback: revalidar el href tras el handler sync.
      const href = await waCTA.getAttribute('href');
      expect(href).toContain('wa.me');
      expect(href?.toLowerCase()).toContain('utm_source=meta');
    }
  });
});
