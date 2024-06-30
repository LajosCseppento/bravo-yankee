import getErrorText from '../error-helper';

const check = (error: unknown, expected: string) => {
  expect(getErrorText(error)).toEqual(expected);
};

test('Test non-error types', () => {
  check('Some string error', 'Some string error');

  check(undefined, '<undefined>');
  check(null, '<null>');
  check(true, 'true');
  check(0, '0');
  check(1, '1');
  check(NaN, 'NaN');
  check(-Infinity, '-Infinity');
  check(Infinity, 'Infinity');
  check(BigInt(123), '123');
  check(Symbol('sym'), 'Symbol(sym)');

  check(
    [1, 'b'],
    `[
  1,
  "b"
]`
  );
  check(
    () => false,
    `{
  "$specialValue": "() => false"
}`
  );
  check(
    {a: 'b'},
    `{
  "a": "b"
}`
  );
});

test('Test Error', () => {
  check(new Error('Error 1'), 'Error: Error 1');
  check(
    Error('Error 2', {cause: Error('Cause 2', {cause: 'Root cause'})}),
    'Error: Error 2\nCaused by: Error: Cause 2\nCaused by: Root cause'
  );
});
