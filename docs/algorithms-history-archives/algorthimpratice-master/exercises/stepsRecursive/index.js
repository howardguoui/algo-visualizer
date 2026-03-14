// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

function steps(n, row = 0, stair = '') {
  //recursive number
  // if row equal n then hit end of the problem,
  // if the stair string has a length equal n then we are at the end of the row
  //if the length of the stair string is less than or equal to row then add //#
  // else add space
  if (n == row) {
    return;
  }

  if (stair.length == n) {
    console.log(stair);
    return steps(n, row + 1);
  }
  if (stair.length <= row) {
    stair = stair + '#';
  } else {
    stair = stair + ' ';
  }
  // const add = stair.length <= row ? '#' : ' ';
  // steps(n, row, stair + add);
  steps(n, row, stair);
}
// function steps(n) {
//   //iterate row
//   for (let row = 0; row < n; row++) {
//     let stair = '';
//     //iterate column
//     for (let column = 0; column < n; column++) {
//       //if current column is equal to or less than the current row
//       //add #
//       if (column <= row) {
//         stair = stair + '#';
//       } else {
//         stair = stair + ' ';
//       }
//     }
//     console.log(stair);
//   }
// }
module.exports = steps;
