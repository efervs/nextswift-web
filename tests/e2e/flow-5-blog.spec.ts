import { expect, test } from '@playwright/test';

/**
 * Flujo 5 — Blog: /blog → filtrar por pillar → abrir post → CTA contextual.
 */
test.describe('Flujo 5 — Blog', () => {
  test('/blog → filtro pillar utilidad → primer post → CTA contextual', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1').first()).toBeVisible();

    // Filtro por pillar "utilidad".
    const chip = page.locator('button.chip[data-pillar="utilidad"]').first();
    if (await chip.count()) {
      await chip.click();
      await expect(chip).toHaveClass(/chip--active/);
    }

    // Click en el primer post visible del grid.
    const firstCard = page.locator('.blog-grid__item:not([hidden])').first();
    await expect(firstCard).toBeVisible();
    const link = firstCard.locator('a').first();
    await link.click();

    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator('h1').first()).toBeVisible();

    // CTA contextual: cualquier anchor a /utilidad, /auditoria o /diagnostico en el post.
    const contextualCTA = page.locator(
      'a[href^="/utilidad"], a[href^="/auditoria"], a[href^="/diagnostico"]',
    );
    await expect(contextualCTA.first()).toBeVisible();
  });
});
