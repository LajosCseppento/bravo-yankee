import {expect, test} from '@playwright/test';

test.describe('Home Page', () => {
  test('should display welcome message', async ({page}) => {
    await page.goto('/');
    await expect(
      page.getByText('Whiskey Echo Lima Charlie Oscar Mike Echo! Welcome!')
    ).toBeVisible();
  });

  test('should display phonetic alphabet table', async ({page}) => {
    await page.goto('/');

    // Check that all 26 letters are displayed
    const codeWords = [
      'Alpha',
      'Bravo',
      'Charlie',
      'Delta',
      'Echo',
      'Foxtrot',
      'Golf',
      'Hotel',
      'India',
      'Juliett',
      'Kilo',
      'Lima',
      'Mike',
      'November',
      'Oscar',
      'Papa',
      'Quebec',
      'Romeo',
      'Sierra',
      'Tango',
      'Uniform',
      'Victor',
      'Whiskey',
      'X-ray',
      'Yankee',
      'Zulu',
    ];

    for (const word of codeWords) {
      await expect(page.getByText(word, {exact: true}).first()).toBeVisible();
    }
  });

  test('should have navigation sidebar', async ({page}) => {
    await page.goto('/');

    await expect(page.getByRole('link', {name: 'Home'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Learn'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Quiz'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Source Code'})).toBeVisible();
  });

  test('should navigate to Learn page', async ({page}) => {
    await page.goto('/');
    await page.getByRole('link', {name: 'Learn'}).click();
    await expect(page).toHaveURL('/learn');
  });

  test('should navigate to Quiz page', async ({page}) => {
    await page.goto('/');
    await page.getByRole('link', {name: 'Quiz'}).click();
    await expect(page).toHaveURL('/quiz');
  });
});
