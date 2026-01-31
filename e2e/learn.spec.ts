import {expect, test} from '@playwright/test';

test.describe('Learn Page', () => {
  test('should display letter and code word', async ({page}) => {
    await page.goto('/learn');

    // Should start with 'A = Alpha'
    await expect(page.getByText('A = Alpha', {exact: false})).toBeVisible();
  });

  test('should navigate to next letter', async ({page}) => {
    await page.goto('/learn');

    await expect(page.getByText('A = Alpha', {exact: false})).toBeVisible();

    await page.getByRole('button', {name: 'Next'}).click();
    await expect(page.getByText('B = Bravo', {exact: false})).toBeVisible();
  });

  test('should navigate to previous letter', async ({page}) => {
    await page.goto('/learn');

    // Start at A, go to previous (wraps to Z)
    await page.getByRole('button', {name: 'Previous'}).click();
    await expect(page.getByText('Z = Zulu', {exact: false})).toBeVisible();
  });

  test('should show random letter', async ({page}) => {
    await page.goto('/learn');

    // Click random multiple times and verify different letters appear
    const seenLetters = new Set<string>();

    for (let i = 0; i < 10; i++) {
      const text = await page.locator('text=/[A-Z] = [A-Za-z-]+/').textContent();
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
