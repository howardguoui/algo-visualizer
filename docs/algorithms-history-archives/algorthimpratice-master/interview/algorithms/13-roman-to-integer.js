/**
 * Problem: https://leetcode.com/problems/roman-to-integer
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var romanVal = {
        'M': 1000,
        'D': 500,
        'C': 100,
        'L': 50,
        'X': 10,
        'V': 5,
        'I': 1
    };
    var sum = 0,
        i = 0;
    while (i < s.length) {
        // if(!romanVal(s[i])) return false;
        if (romanVal[s[i]] < romanVal[s[i + 1]] ? romanVal[s[i + 1]] : 0) {
            sum += (romanVal[s[i + 1]] - romanVal[s[i]]);
            i = i + 2;
        } else {
            sum += romanVal[s[i]];
            i++;
        }
    }
    return sum;

};