// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// function anagrams(stringA, stringB) {
//   const a = buildCharMap(stringA);
//   const b = buildCharMap(stringB);
//   if (Object.keys(a).length !== Object.keys(b).length) {
//     return false;
//   }
//   for (let element in a) {
//     // console.log(a[element], b[element]);
//     if (a[element] !== b[element]) {
//       return false;
//     }
//   }
//   return true;
// }
// function buildCharMap(str) {
//   const chars = {};

//   // of loop string
//   for (let char of str.replace(/[^\w]/g).toLowerCase()) {
//     if (!chars[char]) {
//       chars[char] = 1;
//     } else {
//       chars[char]++;
//     }
//     //   chars[char] = chars[char] + 1 || 1;
//   }
//   return chars;
// }
function anagrams(stringA, stringB) {
  const a = buildCharMap(stringA);
  const b = buildCharMap(stringB);
  return a === b;
}
function buildCharMap(str) {
  return str.replace(/[^\w]/g).toLowerCase().split('').sort().join('');
}
module.exports = anagrams;
