import {expect, test} from '@playwright/test';

test.describe('Home Page', () => {
  test('should display header with app title', async ({page}) => {
    await page.goto('/');
    await expect(
      page.getByText('Bravo-Yankee - Master the Phonetic Alphabet!')
    ).toBeVisible();
    await expect(page.getByText('Fair winds!')).toBeVisible();
  });

  test('should display welcome message', async ({page}) => {
    await page.goto('/');
    await expect(page.getByRole('heading', {name: 'Home'})).toBeVisible();
    await expect(
      page.getByText('Whiskey Echo Lima Charlie Oscar Mike Echo! Welcome!')
    ).toBeVisible();
    await expect(
      page.getByText('Refer to the table below or check out the menu')
    ).toBeVisible();
  });

  test('should display phonetic alphabet table with all 26 letters', async ({
    page,
  }) => {
    await page.goto('/');

    // Check that all 26 code words are displayed (capitalized via CSS)
    const codeWords = [
      'alpha',
      'bravo',
      'charlie',
      'delta',
      'echo',
      'foxtrot',
      'golf',
      'hotel',
      'india',
      'juliett',
      'kilo',
      'lima',
      'mike',
      'november',
      'oscar',
      'papa',
      'quebec',
      'romeo',
      'sierra',
      'tango',
      'uniform',
      'victor',
      'whiskey',
      'x-ray',
      'yankee',
      'zulu',
    ];

    for (const word of codeWords) {
      // CSS text-transform: capitalize is applied, but we match case-insensitive
      await expect(page.getByText(word, {exact: false}).first()).toBeVisible();
    }
  });

  test('should display footer', async ({page}) => {
    await page.goto('/');
    await expect(page.getByText('Built with React, MUI and')).toBeVisible();
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
