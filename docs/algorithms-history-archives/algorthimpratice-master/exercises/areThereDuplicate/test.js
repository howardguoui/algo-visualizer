const areThereDuplicates = require('./index');

test('duplicate', () => {
  expect(areThereDuplicates(1, 2, 2)).toEqual(true);
});
