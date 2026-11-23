import { test, expect } from '@playwright/test';

/**
 * Локатори и идентификација на елементи
 * The same app, located 6 different ways. Order = Playwright's recommended priority.
 */
test.describe('Locator strategies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc');
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Learn locators');
    await input.press('Enter');
  });

  test('1. getByRole: best choice (how users & screen readers see the page)', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).not.toBeChecked();
  });

  test('2. getByText / getByLabel / getByPlaceholder', async ({ page }) => {
    await expect(page.getByText('Learn locators')).toBeVisible();
    await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();
    await expect(page.getByLabel('Mark all as complete')).toBeVisible();
  });

  test('3. getByTestId: stable attributes added for testing (data-testid)', async ({ page }) => {
    await expect(page.getByTestId('todo-title')).toHaveText('Learn locators');
  });

  test('4. CSS selectors: fallback when no user-facing locator exists', async ({ page }) => {
    await expect(page.locator('ul.todo-list > li')).toHaveCount(1);
    await expect(page.locator('input.new-todo')).toBeVisible();
  });

  test('5. XPath: last resort (brittle, hard to read)', async ({ page }) => {
    await expect(page.locator('//label[text()="Learn locators"]')).toBeVisible();
  });

  test('6. Chaining & filtering', async ({ page }) => {
    const row = page.getByTestId('todo-item').filter({ hasText: 'Learn locators' });
    await row.getByRole('checkbox').check();
    await expect(row).toHaveClass(/completed/);
  });
});
