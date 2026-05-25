import { expect, test } from '@playwright/test';

/**
 * Flujo 2 — Quiz: Home → CTA ghost → /diagnostico → carga.
 *
 * El submit real con email/WA requiere HUBSPOT_TOKEN + CAPI server-side y se
 * delega a BrowserStack manual (DH-09 + Test Events). Este smoke valida que
 * la UI del quiz monta y la pregunta 1 es interactiva.
 */
test.describe('Flujo 2 — Quiz UI', () => {
  test('home → CTA ghost → /diagnostico carga y muestra pregunta 1', async ({ page }) => {
    await page.goto('/');

    const ghostCTA = page.locator('[data-cta="diagnostico"]').first();
    await ghostCTA.scrollIntoViewIfNeeded();
    await ghostCTA.click();
    await expect(page).toHaveURL(/\/diagnostico/);

    // Quiz container debe estar montado.
    await expect(page.locator('#quiz')).toBeVisible();
    await expect(page.locator('#quiz-step-label')).toContainText(/Pregunta 1/i);
    await expect(page.locator('#quiz-progress')).toBeVisible();

    // Step 1 visible (no hidden), botón Siguiente presente.
    await expect(page.locator('[data-step="1"]').first()).toBeVisible();
    await expect(page.locator('#quiz-next')).toBeVisible();
  });
});
