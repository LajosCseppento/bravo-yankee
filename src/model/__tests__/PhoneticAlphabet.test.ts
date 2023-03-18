import phoneticAlphabet from '../PhoneticAlphabet';

test('Test that the alphabet is covered', () => {
  expect(phoneticAlphabet.map(codeWord => codeWord.letter)).toEqual(
    'abcdefghijklmnopqrstuvwxyz'.split('')
  );
});
