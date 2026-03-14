/**
 * Problem: https://leetcode.com/problems/generate-parentheses
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-18
 * 
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {

    var result = [];
    var generate = function (n, comb, left, right) {
        // console.log(n, comb, left, right);
        if (left === n && left === right) {
            // console.log("comb:", comb);
            result.push(comb);
            return comb;
        }

        if (left <= n && right == left) {
            var comb0 = comb + '('
            generate(n, comb0, left + 1, right);
        }

        if (left < n && right < left) {
            var comb1 = comb + '('
            generate(n, comb1, left + 1, right);

            var comb2 = comb + ')'
            generate(n, comb2, left, right + 1);
        }

        if (left == n && right < left) {
            var comb3 = comb + ')'
            generate(n, comb3, left, right + 1);
        }
    }

    generate(n, "", 0, 0);
    // console.log(result);
    return result;
};