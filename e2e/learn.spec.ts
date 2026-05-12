import {expect, test} from '@playwright/test';

test.describe('Learn Page', () => {
  test('should display page title and letter format', async ({page}) => {
    await page.goto('/learn');
    await expect(page.getByRole('heading', {name: 'Learn'})).toBeVisible();

    // Should show format "X = WORD" (uppercase via CSS text-transform)
    await expect(page.locator('text=/[A-Z] = [A-Z-]+/')).toBeVisible();
  });

  test('should start with Alpha (A)', async ({page}) => {
    await page.goto('/learn');
    // Starts at index 0 which is Alpha
    await expect(page.getByText(/A\s*=\s*ALPHA/i)).toBeVisible();
  });

  test('should navigate to next letter', async ({page}) => {
    await page.goto('/learn');

    await expect(page.getByText(/A\s*=\s*ALPHA/i)).toBeVisible();

    await page.getByRole('button', {name: 'Next'}).click();
    await expect(page.getByText(/B\s*=\s*BRAVO/i)).toBeVisible();
  });

  test('should navigate to previous letter (wraps around)', async ({page}) => {
    await page.goto('/learn');

    // Start at A, go to previous (wraps to Z)
    await page.getByRole('button', {name: 'Previous'}).click();
    await expect(page.getByText(/Z\s*=\s*ZULU/i)).toBeVisible();
  });

  test('should show random letter when clicking Random', async ({page}) => {
    await page.goto('/learn');

    // Click random multiple times and verify different letters appear
    const seenLetters = new Set<string>();

    for (let i = 0; i < 10; i++) {
      const text = await page
        .locator('text=/[A-Z] = [A-Z-]+/')
        .textContent();
      if (text) {
        seenLetters.add(text.charAt(0));
      }
      await page.getByRole('button', {name: 'Random'}).click();
    }

    // Should have seen at least 2 different letters
    expect(seenLetters.size).toBeGreaterThan(1);
  });

  test('should have Previous, Random, and Next buttons', async ({page}) => {
    await page.goto('/learn');

    await expect(page.getByRole('button', {name: 'Previous'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Random'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Next'})).toBeVisible();
  });
});
