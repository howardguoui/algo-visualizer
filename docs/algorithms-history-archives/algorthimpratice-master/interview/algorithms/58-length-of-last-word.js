/**
 * Problem: https://leetcode.com/problems/length-of-last-word
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-19
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    var ary = s.trim().split(" ");
    return ary[ary.length - 1].length;
};