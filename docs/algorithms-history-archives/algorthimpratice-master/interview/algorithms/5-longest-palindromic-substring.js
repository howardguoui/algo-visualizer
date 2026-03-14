/**
 * Problem: https://leetcode.com/problems/longest-palindromic-substring
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-07
 * 
 * 
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    var expandAroundCenter = function (s, left, right) {
        var L = left,
            R = right;
        while (L >= 0 && R < s.length && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return parseInt(R - L - 1);
    }

    var start = 0,
        end = 0;
    for (var i = 0; i < s.length; i++) {
        var len1 = expandAroundCenter(s, i, i);
        var len2 = expandAroundCenter(s, i, i + 1);
        var len = Math.max(len1, len2);
        // console.log("i="+i, "len="+len,"start="+start, "end="+end);
        if (len > (end - start)) {
            start = parseInt(i - parseInt((len - 1) / 2));
            end = parseInt(i + len / 2);
        }
        // console.log("===================", "start="+start, "end="+end);
    }
    return s.substring(start, end + 1);
}