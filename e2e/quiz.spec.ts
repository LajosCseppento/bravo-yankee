import {expect, test} from '@playwright/test';

test.describe('Quiz Page', () => {
  test('should display a letter and input field', async ({page}) => {
    await page.goto('/quiz');

    // Should show a letter prompt like "A = "
    await expect(page.locator('text=/[A-Z] = /')).toBeVisible();

    // Should have an input field
    await expect(page.locator('input')).toBeVisible();

    // Should show remaining count
    await expect(page.getByText('26 left')).toBeVisible();
  });

  test('should show timer', async ({page}) => {
    await page.goto('/quiz');

    // Timer should be visible in format MM:SS
    await expect(page.getByText(/\d{2}:\d{2}/)).toBeVisible();
  });

  test('should accept correct answer and move to next letter', async ({
    page,
  }) => {
    await page.goto('/quiz');

    // Get the current letter
    const letterText = await page.locator('text=/[A-Z] = /').textContent();
    const letter = letterText?.charAt(0).toLowerCase();

    // Map letters to code words
    const codeWords: Record<string, string> = {
      a: 'alpha',
      b: 'bravo',
      c: 'charlie',
      d: 'delta',
      e: 'echo',
      f: 'foxtrot',
      g: 'golf',
      h: 'hotel',
      i: 'india',
      j: 'juliett',
      k: 'kilo',
      l: 'lima',
      m: 'mike',
      n: 'november',
      o: 'oscar',
      p: 'papa',
      q: 'quebec',
      r: 'romeo',
      s: 'sierra',
      t: 'tango',
      u: 'uniform',
      v: 'victor',
      w: 'whiskey',
      x: 'x-ray',
      y: 'yankee',
      z: 'zulu',
    };

    if (letter && codeWords[letter]) {
      await page.locator('input').fill(codeWords[letter]);
      // Should move to next question, showing 25 left
      await expect(page.getByText('25 left')).toBeVisible();
    }
  });

  test('should accept alternative spellings', async ({page}) => {
    await page.goto('/quiz');

    // Complete quiz until we find 'A' to test 'alfa' alternative
    // For simplicity, we'll refresh until we get 'A' as first letter
    let attempts = 0;
    while (attempts < 30) {
      const letterText = await page.locator('text=/[A-Z] = /').textContent();
      if (letterText?.startsWith('A')) {
        // Test alternative spelling 'alfa' for 'alpha'
        await page.locator('input').fill('alfa');
        await expect(page.getByText('25 left')).toBeVisible();
        return;
      }
      await page.reload();
      attempts++;
    }
  });

  test('should complete quiz and show success message', async ({page}) => {
    await page.goto('/quiz');

    const codeWords: Record<string, string> = {
      a: 'alpha',
      b: 'bravo',
      c: 'charlie',
      d: 'delta',
      e: 'echo',
      f: 'foxtrot',
      g: 'golf',
      h: 'hotel',
      i: 'india',
      j: 'juliett',
      k: 'kilo',
      l: 'lima',
      m: 'mike',
      n: 'november',
      o: 'oscar',
      p: 'papa',
      q: 'quebec',
      r: 'romeo',
      s: 'sierra',
      t: 'tango',
      u: 'uniform',
      v: 'victor',
      w: 'whiskey',
      x: 'x-ray',
      y: 'yankee',
      z: 'zulu',
    };

    // Answer all 26 questions
    for (let i = 0; i < 26; i++) {
      const letterText = await page.locator('text=/[A-Z] = /').textContent();
      const letter = letterText?.charAt(0).toLowerCase();

      if (letter && codeWords[letter]) {
        await page.locator('input').fill(codeWords[letter]);
      }
    }

    // Should show completion message
    await expect(page.getByText('You are done! Great job!')).toBeVisible();
    await expect(page.getByText('Try again!')).toBeVisible();
  });

  test('should allow restarting the quiz', async ({page}) => {
    await page.goto('/quiz');

    const codeWords: Record<string, string> = {
      a: 'alpha',
      b: 'bravo',
      c: 'charlie',
      d: 'delta',
      e: 'echo',
      f: 'foxtrot',
      g: 'golf',
      h: 'hotel',
      i: 'india',
      j: 'juliett',
      k: 'kilo',
      l: 'lima',
      m: 'mike',
      n: 'november',
      o: 'oscar',
      p: 'papa',
      q: 'quebec',
      r: 'romeo',
      s: 'sierra',
      t: 'tango',
      u: 'uniform',
      v: 'victor',
      w: 'whiskey',
      x: 'x-ray',
      y: 'yankee',
      z: 'zulu',
    };

    // Complete quiz
    for (let i = 0; i < 26; i++) {
      const letterText = await page.locator('text=/[A-Z] = /').textContent();
      const letter = letterText?.charAt(0).toLowerCase();
      if (letter && codeWords[letter]) {
        await page.locator('input').fill(codeWords[letter]);
      }
    }

    // Click "Try again!"
    await page.getByText('Try again!').click();

    // Should restart with 26 left
    await expect(page.getByText('26 left')).toBeVisible();
  });
});
