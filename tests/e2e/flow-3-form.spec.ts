import { expect, test } from '@playwright/test';

/**
 * Flujo 3 — Form auditoría: /utilidad → CTA primario → /auditoria → form monta.
 *
 * El submit real (Contact en HubSpot + CAPI CompleteRegistration) se valida
 * manualmente en BrowserStack — requiere tokens reales y crea contactos.
 * Este smoke valida que el form renderea con paso 1 visible y validación
 * client-side activa.
 */
test.describe('Flujo 3 — Form auditoría UI', () => {
  test('/utilidad → CTA primario → /auditoria → paso 1 visible', async ({ page }) => {
    await page.goto('/utilidad');

    const primary = page.locator('[data-cta-primary]').first();
    await primary.scrollIntoViewIfNeeded();
    await primary.click();
    await expect(page).toHaveURL(/\/auditoria/);

    await expect(page.locator('#audit')).toBeVisible();
    await expect(page.locator('#audit-step-label')).toContainText(/Paso 1/i);
    await expect(page.locator('#audit-next')).toBeVisible();
    await expect(page.locator('#audit-submit')).toBeHidden();

    // Validación: avanzar sin seleccionar debe NO avanzar el paso.
    const initialLabel = await page.locator('#audit-step-label').innerText();
    await page.locator('#audit-next').click();
    await expect(page.locator('#audit-step-label')).toHaveText(initialLabel);
  });
});
