/**
 * Problem: https://leetcode.com/problems/reverse-integer
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    var negative = (x < 0) ? -1 : 1;
    x = x * negative;
    var revNum = parseInt(x.toString().split("").reverse().join(""));
    revNum = revNum * negative;
    return (revNum > 2147483647 || revNum < -2147483647) ? 0 : revNum;
};