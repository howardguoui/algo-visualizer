/**
 * Problem: https://leetcode.com/problems/integer-to-roman
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    // if(isNaN(num) || num > 3999 || num < 0) return false;

    var M = ["", "M", "MM", "MMM"];
    var C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    var X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    var I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return M[parseInt(num / 1000)] + C[parseInt((num % 1000) / 100)] + X[parseInt((num % 100) / 10)] + I[parseInt(num % 10)];
};