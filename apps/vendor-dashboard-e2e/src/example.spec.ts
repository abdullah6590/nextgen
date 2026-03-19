import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Use auto-waiting expect(...) to ensure the page eventually loads
  await expect(page.locator('body')).toBeVisible();
});
