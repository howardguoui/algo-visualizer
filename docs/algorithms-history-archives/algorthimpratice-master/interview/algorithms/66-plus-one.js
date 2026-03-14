/**
 * Problem: https://leetcode.com/problems/plus-one
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-24
 * 
 * Testcase example:
 * 
 * [0]      // Expected answer: [1]
 * [9]      // Expected answer: [1,0]
 * [1,9,9]  // Expected answer: [2,0,0]
 * [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3] // 會有溢位問題
 * 
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    // Javascript 使用join & split 轉換會發生溢位
    var n = digits.length - 1;
    while (n >= 0) {
        if (digits[n] !== 9) {
            digits[n] = digits[n] + 1; // 一般情況最後數+1不需進位
            return digits;
        } else
            digits[n] = 0; // 進位處理
        n--;
    }
    // 需要進位超過digits目前的位數
    return [1].concat(digits);
};