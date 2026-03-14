/**
 * Problem: https://leetcode.com/problems/string-to-integer-atoi
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-21
 * @param {string} str
 * @return {number}
 * 
 * Testcase Example
 * 
 * ""
 * 
 * "+1"
 * 
 * "-2147483647"
 * 
 */
var myAtoi = function (str) {
    var INT_MAX = 2147483647,
        INT_MIN = -2147483648;
    if (!str) return 0;

    // Solution 1.
    // var num = parseInt(str); 
    // if(isNaN(num)) return = 0;
    // else if(num > INT_MAX) return = INT_MAX;     // INT_MAX (2147483647) 
    // else if(num <= INT_MIN) return = INT_MIN;    // INT_MIN (-2147483648)
    // else return num;

    // Solution 2.
    var num = 0,
        flag = 1;
    str = str.trim();
    if (str.charAt(i) === '-') {
        flag = -1;
        str = str.slice(1);
    } else if (str.charAt(i) === '+') {
        str = str.slice(1);
    }

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9') break;

        var tmp = num * 10 + (str.charAt(i) - '0');
        num = tmp;

        if (num > INT_MAX) {
            if (flag === 1) return INT_MAX;
            else return INT_MIN;
        }
    }

    return num * flag;
};