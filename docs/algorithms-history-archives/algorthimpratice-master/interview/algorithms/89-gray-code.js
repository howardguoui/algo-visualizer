/**
 * Problem: https://leetcode.com/problems/gray-code
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-28
 * 
 * Reference and tips: http://bangbingsyb.blogspot.tw/2014/11/leetcode-gray-code.html
 * 
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
    var result = [];
    var increase = 1;
    result.push(0);
    for (var i = 1; i <= n; i++) {
        for (var j = result.length - 1; j >= 0; j--) {
            result.push(result[j] + increase);
        }
        increase = increase << 1;
    }
    return result;
};