/**
 * Problem: https://leetcode.com/problems/letter-combinations-of-a-phone-number
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-14
 * 
 * 
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    var ans = [];
    var KEYS = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

    for (var i = 0; i < digits.length; i++) {
        var updateAns = [];

        if (digits[i].length > 0) {
            var d = digits[i];

            for (var a = 0; a < ans.length; a++) {
                for (var j = 0; j < KEYS[d].length; j++) {
                    updateAns.push(ans[a] + KEYS[d][j]);
                }
            }
            if (ans.length === 0) {
                for (var n = 0; n < KEYS[d].length; n++) {
                    updateAns.push(KEYS[d][n]);
                }
            }
        }
        ans = updateAns;
    }

    return ans;
};