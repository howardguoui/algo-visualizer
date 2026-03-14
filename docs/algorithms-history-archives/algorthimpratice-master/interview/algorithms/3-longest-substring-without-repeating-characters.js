/**
 * Problem: https://leetcode.com/problems/longest-substring-without-repeating-characters
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-05
 * 
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    var i = 0,
        j = 0,
        ans = 0,
        n = s.length;
    var subStr = '';
    while (i < n && j < n) {
        if (subStr.indexOf(s.charAt(j)) < 0) {
            subStr += s.charAt(j++);
            ans = Math.max(ans, j - i);
        } else {
            subStr = subStr.replace(s.charAt(i++), '');
        }
    }
    return ans;
};