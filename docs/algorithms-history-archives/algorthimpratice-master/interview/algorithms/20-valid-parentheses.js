/**
 * Problem: https://leetcode.com/problems/valid-parentheses
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-14
 * 
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    var stack = [];
    for (var i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(':
                stack.push(')');
                break;
            case '{':
                stack.push('}');
                break;
            case '[':
                stack.push(']');
                break;
            default:
                if (s.length === 0 || stack.pop() !== s[i])
                    return false;
                break;
        }
    }
    return stack.length === 0;
};