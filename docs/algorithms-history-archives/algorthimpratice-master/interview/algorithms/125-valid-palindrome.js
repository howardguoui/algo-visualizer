/**
 * Problem: https://leetcode.com/problems/valid-palindrome
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-28
 * 
 * Testcase example:
 * 
 * "09"
 * "A man, a plan, a canal: Panama"
 * "race a car"
 * 
 * 
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {

    // Solution 1.
    // =====================================
    var ss = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    return ss === ss.split("").reverse().join("");

    // Solution 2.
    // =====================================
    // var i = 0, j = s.length - 1;
    // while (i <= j) {
    //     if (!/^[a-z0-9]+$/i.test(s[i]))
    //         i++;
    //     else if (!/^[a-z0-9]+$/i.test(s[j]))
    //         j--;
    //     else {
    //         console.log(s[i], " VS ", s[j]);
    //         if (s[i].toLowerCase() === s[j].toLowerCase()) {
    //             i++;
    //             j--;
    //         }
    //         else
    //             return false;
    //     }
    // }
    // return true;
};