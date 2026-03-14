/**
 * Problem: https://leetcode.com/problems/zigzag-conversion
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-08
 * 
 * 
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 * 
 * Ref: https://skyyen999.gitbooks.io/-leetcode-with-javascript/content/questions/6md.html
 */
var convert = function (s, numRows) {
    if (!s) return "";
    if (numRows === 1) return s;
    var n = (2 * numRows) - 2; // 每一個字母排序回到第一列所要經過的次數
    var ary = [];
    for (var row = 0; row < numRows; row++)
        ary.push(""); // 初始化成類似二維陣列

    for (var i = 0; i < s.length; i++) {
        if (i % n < numRows) { // 此字母在ZigZag排序上是直線上的，直接加入 i%n 列
            ary[i % n] += s[i];
        } else { // i%n >= numRows 
            ary[(2 * numRows) - (i % n) - 2] += s[i]; // 此字母在ZigZag排序上是斜線上的，加入公式 (2*numRows)-(i%n)-2
        }
    }
    // console.log(ary.join(""));
    return ary.join("");
};