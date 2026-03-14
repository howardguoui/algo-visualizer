/**
 * Problem: https://leetcode.com/problems/palindrome-number
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-10
 * 
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    var str = x.toString();
    return str == str.split("").reverse().join(""); // 判斷 isPalindrome
};