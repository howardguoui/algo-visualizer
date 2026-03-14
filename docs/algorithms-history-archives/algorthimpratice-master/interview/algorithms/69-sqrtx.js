/**
 * Problem: https://leetcode.com/problems/sqrtx
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-24
 * 
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {

    if (x <= 1) return x;
    // Solution 1
    // =========================
    // return parseInt(Math.sqrt(x));

    // Solution 2
    // =========================
    // var n = 1;
    // while (n * n <= x)
    //     n++;
    // return n-1;

    // Solution 3 (optimise, binary search) 
    // =========================
    var start = 1,
        end = x;
    while (start <= end) {
        var mid = parseInt(start + ((end - start) / 2));
        if (mid * mid === x)
            return mid;
        else if (mid * mid > x)
            end = mid - 1;
        else
            start = mid + 1;

        // console.log(start, end, mid);
    }
    return end;
};