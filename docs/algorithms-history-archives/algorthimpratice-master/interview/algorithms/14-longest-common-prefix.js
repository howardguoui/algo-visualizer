/**
 * Problem: https://leetcode.com/problems/longest-common-prefix
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-17
 * 
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length === 0) return "";
    if (strs.length === 1) return strs[0];

    for (var i = 0; i < strs[0].length; i++) {
        for (var j = 1; j < strs.length; j++) {
            if (strs[j].length <= i || strs[j][i] !== strs[0][i]) {
                return strs[0].substring(0, i);
            }
        }
    }
    return strs[0];

};