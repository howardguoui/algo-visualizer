const countUniqueValues = require('./index');

test('Capitalize is a function', () => {
  expect(countUniqueValues([1, 2, 2, 5, 7, 7, 99])).toEqual(5);
});
