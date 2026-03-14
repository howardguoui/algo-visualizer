/**
 * Problem: https://leetcode.com/problems/add-binary
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-24
 * 
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    var m = a.length - 1;
    var n = b.length - 1;
    var carry = 0; // 記錄進位
    var result = "";
    while (m >= 0 || n >= 0 || carry === 1) {
        var x = a[m] ? parseInt(a[m]) : 0;
        var y = b[n] ? parseInt(b[n]) : 0;
        result = (x ^ y ^ carry) + result;
        carry = (x + y + carry > 1) ? 1 : 0;
        m--;
        n--;
    }
    return result;
};