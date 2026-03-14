/**
 * Problem: https://leetcode.com/problems/excel-sheet-column-title
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-25
 * 
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function (n) {

    var table = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
        "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (!n || n <= 0) return "";
    var column = "";
    while (true) {
        if (n <= 26) {
            column = table[n - 1] + column;
            return column;
        }
        else {
            column = table[(n - 1) % 26] + column;
            n = parseInt((n - 1) / 26);
        }
    }
};