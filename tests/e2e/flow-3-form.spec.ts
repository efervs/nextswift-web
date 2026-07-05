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

  test('/auditoria directo (sin quiz) conserva los 6 pasos', async ({ page }) => {
    await page.goto('/auditoria');
    await expect(page.locator('#audit-step-label')).toHaveText('Paso 1 de 6');
    await expect(page.locator('[data-step="1"]').first()).toBeVisible();
  });
});

/**
 * Flujo 3b — Handoff quiz → auditoria (M8, plan_de_mejoras_v3.md, TC-05).
 *
 * El quiz ya capturó facturación (ventas_totales) y dolor (cuello); /auditoria
 * NO debe volver a preguntarlos cuando llega vía el CTA del resultado del quiz.
 * El handoff viaja por sessionStorage (nextswift_quiz_handoff_v1), no por query
 * params, para no exponer datos de negocio en la URL.
 */
test.describe('Flujo 3b — Handoff quiz → auditoria UI', () => {
  const HANDOFF_KEY = 'nextswift_quiz_handoff_v1';

  test('con handoff válido, /auditoria?from=diagnostico salta pasos 1-2 (4 pasos totales)', async ({ page }) => {
    await page.addInitScript(
      ({ key, value }) => sessionStorage.setItem(key, value),
      { key: HANDOFF_KEY, value: JSON.stringify({ salesrange: '500k-1M', painprimary: 'personal' }) },
    );
    await page.goto('/auditoria?from=diagnostico&eid=test-eid-123');

    // Arranca directo en el paso 3 (unidades) — NO vuelve a preguntar facturación ni dolor.
    await expect(page.locator('#audit-step-label')).toHaveText('Paso 1 de 4');
    await expect(page.locator('[data-step="3"]').first()).toBeVisible();
    await expect(page.locator('[data-step="1"]').first()).toBeHidden();
    await expect(page.locator('[data-step="2"]').first()).toBeHidden();

    // No hay "Atrás" en el primer paso visible (steps 1-2 no son navegables).
    await expect(page.locator('#audit-back')).toBeHidden();

    // Avanza los 4 pasos visibles y confirma que el contador llega a "4 de 4" en el submit.
    await page.locator('#q-units').fill('2');
    await page.locator('#audit-next').click();
    await expect(page.locator('#audit-step-label')).toHaveText('Paso 2 de 4');

    await page.locator('input[name="decisor_role"][value="dueno"]').check();
    await page.locator('#audit-next').click();
    await expect(page.locator('#audit-step-label')).toHaveText('Paso 3 de 4');

    await page.locator('input[name="timing"][value="inmediata"]').check();
    await page.locator('#audit-next').click();
    await expect(page.locator('#audit-step-label')).toHaveText('Paso 4 de 4');
    await expect(page.locator('#audit-submit')).toBeVisible();
  });

  test('con handoff "<300k" (disqualify), rebota a no-fit sin mostrar el form', async ({ page }) => {
    await page.addInitScript(
      ({ key, value }) => sessionStorage.setItem(key, value),
      { key: HANDOFF_KEY, value: JSON.stringify({ salesrange: '<300k', painprimary: 'personal' }) },
    );
    await page.goto('/auditoria?from=diagnostico&eid=test-eid-456');

    await expect(page.locator('.audit__step--nofit')).toBeVisible();
    await expect(page.locator('#audit-next')).toBeHidden();
    await expect(page.locator('#audit-submit')).toBeHidden();
  });

  test('sin handoff en sessionStorage, from=diagnostico degrada a los 6 pasos normales', async ({ page }) => {
    await page.goto('/auditoria?from=diagnostico&eid=test-eid-789');
    await expect(page.locator('#audit-step-label')).toHaveText('Paso 1 de 6');
    await expect(page.locator('[data-step="1"]').first()).toBeVisible();
  });
});
