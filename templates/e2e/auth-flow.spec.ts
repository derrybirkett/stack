import { test, expect } from '@playwright/test';

// Core user flow: landing → sign up → dashboard → logout.
// This test must always pass. It is the minimum bar for every bloom-built product.
//
// Salvaged from the retired hatch repo's e2e test suite; rewritten for the
// lite profile (single Next.js app, Supabase auth, no port-splitting).
//
// To use: copy into your product's e2e/tests/core-flow.spec.ts and adjust
// selectors to match your UI.

const TEST_EMAIL = `test-${Date.now()}@example.com`;
const TEST_PASSWORD = 'Test1234!';

test.describe('Core user flow', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('sign up', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('dashboard renders after login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('logout returns to landing', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await page.click('[data-testid="logout"]');
    await expect(page).toHaveURL('/');
  });
});
