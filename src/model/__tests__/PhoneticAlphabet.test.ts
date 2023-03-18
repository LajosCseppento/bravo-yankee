import phoneticAlphabet from '../xphoneticAlphabet';

test('Test that the alphabet is covered', () => {
  expect(phoneticAlphabet.map(codeWord => codeWord.letter)).toEqual(
    'abcdefghijklmnopqrstuvwxyz'.split('')
  );
});
