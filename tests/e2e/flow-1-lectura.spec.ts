import { expect, test } from '@playwright/test';

/**
 * Flujo 1 — Lectura: Home → scroll completo → dropdown Servicios → /utilidad → scroll.
 * Valida la ruta principal de discovery sin formularios ni tracking events.
 */
test.describe('Flujo 1 — Lectura', () => {
  test('home scroll completo y navegación a /utilidad vía dropdown Servicios', async ({ page, isMobile }) => {
    await page.goto('/');
    await expect(page.locator('#hero-h1')).toHaveText(/Vendo pero no gano dinero/i);

    // Scroll del 0% al 100% en steps deterministas (LCP, lazy-load, sticky CTA).
    await page.evaluate(async () => {
      const steps = 10;
      const height = document.body.scrollHeight;
      for (let i = 1; i <= steps; i++) {
        window.scrollTo({ top: (height * i) / steps, behavior: 'instant' as ScrollBehavior });
        await new Promise((r) => setTimeout(r, 80));
      }
    });

    // En mobile el dropdown vive dentro del drawer.
    if (isMobile) {
      const drawerToggle = page.getByRole('button', { name: /menú|abrir/i }).first();
      if (await drawerToggle.isVisible().catch(() => false)) {
        await drawerToggle.click();
      }
    }

    // Servicios dropdown → /utilidad.
    const utilidadLink = page.getByRole('link', { name: /utilidad/i }).first();
    await utilidadLink.scrollIntoViewIfNeeded();
    await utilidadLink.click();
    await expect(page).toHaveURL(/\/utilidad/);

    // Verificar landing rendea con H1 esperado.
    await expect(page.locator('h1').first()).toBeVisible();

    // Scroll completo en /utilidad.
    await page.evaluate(async () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' as ScrollBehavior });
      await new Promise((r) => setTimeout(r, 150));
    });
  });
});
