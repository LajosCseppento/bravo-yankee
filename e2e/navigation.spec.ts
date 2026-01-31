import {expect, test} from '@playwright/test';

test.describe('Navigation', () => {
  test('should have correct page titles', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Home.*Bravo-Yankee/);

    await page.goto('/learn');
    await expect(page).toHaveTitle(/Learn.*Bravo-Yankee/);

    await page.goto('/quiz');
    await expect(page).toHaveTitle(/Quiz.*Bravo-Yankee/);
  });

  test('should highlight active menu item', async ({page}) => {
    await page.goto('/');
    const homeLink = page.getByRole('link', {name: 'Home'});
    await expect(homeLink).toHaveClass(/Mui-selected/);

    await page.goto('/learn');
    const learnLink = page.getByRole('link', {name: 'Learn'});
    await expect(learnLink).toHaveClass(/Mui-selected/);

    await page.goto('/quiz');
    const quizLink = page.getByRole('link', {name: 'Quiz'});
    await expect(quizLink).toHaveClass(/Mui-selected/);
  });

  test('should open GitHub link in new tab', async ({page}) => {
    await page.goto('/');

    const sourceCodeLink = page.getByRole('link', {name: 'Source Code'});
    await expect(sourceCodeLink).toHaveAttribute('target', '_blank');
    await expect(sourceCodeLink).toHaveAttribute(
      'href',
      'https://github.com/LajosCseppento/bravo-yankee'
    );
  });
});
