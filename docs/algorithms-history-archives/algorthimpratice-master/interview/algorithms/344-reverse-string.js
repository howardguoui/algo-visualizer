/**
 * Problem: https://leetcode.com/problems/reverse-string
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * @param {string} s
 * @return {string}
 */
var reverseString = function (s) {
    // method 1
    // ========================================
    return s.split("").reverse().join("");

    // method 2
    // ========================================
    // var ans = "";
    // for ( var i = s.length-1; i >=0 ; i-- ){
    //     ans+=s[i];
    // }
    // return ans;

    // method 3
    // ========================================
    // var ans1 = "",
    //     ans2 = "";
    // for (var i = 0; i < s.length / 2; i++) {
    //     if (i < s.length - i - 1) {
    //         ans1 = ans1 + s[s.length - i - 1];
    //         ans2 = s[i] + ans2;
    //     } else {
    //         ans2 = s[i] + ans2; // i === s.length-i-1
    //     }
    // }
    // return ans1 + ans2;

};