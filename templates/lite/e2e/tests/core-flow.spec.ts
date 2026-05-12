import { test, expect } from '@playwright/test';

// Seed a unique email per run so tests are self-contained.
const email = `test-${Date.now()}@example.com`;
const password = 'Test1234!';

test.describe('Core user flow', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('sign up', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('dashboard renders after login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('logout returns to landing', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.click('button:has-text("Sign out")');
    await expect(page).toHaveURL('/');
  });
});
