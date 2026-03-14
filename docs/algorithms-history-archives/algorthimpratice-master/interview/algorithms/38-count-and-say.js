/**
 * Problem: https://leetcode.com/problems/count-and-say
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-24
 * 
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    if (n === 1) return "1";

    var currentNumStr = "1" // init
    for (var i = 1; i < n; i++) {
        // console.log("currentNumStr",currentNumStr, "i",i);
        var currentNum = 0; // init
        var currentCount = 0; // init
        var tempNumStr = ""; // init
        for (var j = 0; j < currentNumStr.length; j++) {
            if (currentCount === 0) {
                currentNum = currentNumStr[j];
                currentCount = 1;
            } else if (currentNum == currentNumStr[j]) {
                currentCount++;
            }

            if (currentNum != currentNumStr[j]) {
                tempNumStr = tempNumStr + currentCount.toString() + currentNum.toString();
                currentNum = currentNumStr[j];
                currentCount = 1;
            }
            if (j === currentNumStr.length - 1) {
                tempNumStr = tempNumStr + currentCount.toString() + currentNum.toString();
            }

        }
        currentNumStr = tempNumStr;
    }
    return currentNumStr;
};