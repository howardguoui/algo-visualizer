/**
 * Problem: https://leetcode.com/problems/valid-perfect-square
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-25
 * 
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    return Math.sqrt(num) % 1 === 0; // ％ 1 判斷是否為整數
};