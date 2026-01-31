import {expect, test} from 'vitest';

import phoneticAlphabet from '../phoneticAlphabet';

test('Test that the alphabet is covered', () => {
  expect(phoneticAlphabet.map(codeWord => codeWord.letter)).toEqual(
    'abcdefghijklmnopqrstuvwxyz'.split('')
  );
});
