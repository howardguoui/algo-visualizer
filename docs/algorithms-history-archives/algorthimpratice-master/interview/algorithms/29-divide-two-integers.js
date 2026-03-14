/**
 * Problem: https://leetcode.com/problems/divide-two-integers
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-20
 * 
 * Testcase example:
 * 
 * 0
 * 1
 * 
 * 1
 * 2
 * 
 * -1
 * 1
 * 
 * -2147483648    // 減法會造成 Time Limit Exceeded
 * -1
 * 
 * -2147483648
 * 1
 * 
 * 2147483647
 * 2
 * 
 * -2147483648
 * 2
 * 
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 * 
 */
var divide = function (dividend, divisor) {
    const MAX_INT = Math.pow(2, 31) - 1; // 2147483647
    const MIN_INT = -Math.pow(2, 31); // -2147483648
    const sign = ((dividend < 0 && divisor < 0) || (dividend > 0 && divisor > 0)) ? 1 : -1;
    // 紀錄商數的正負數

    if (divisor === 0) return MAX_INT;
    if (dividend === 0) return 0;
    if (divisor === 1) {
        if (dividend >= MAX_INT) return MAX_INT;
        else return dividend;
    }
    if (divisor === -1) {
        if (dividend >= MAX_INT) return 0 - MAX_INT;
        else if (dividend >= 0) return 0 - dividend;
        if (dividend <= MIN_INT) return MAX_INT;
        else return 0 - dividend;
    }

    dividend = Math.abs(dividend); // Absolute value
    divisor = Math.abs(divisor); // 移除 sign 方便計算

    if (dividend < divisor) return 0;

    var q = 0; // quotient 商數
    var newDividend = dividend;
    var newDivisor = divisor;
    // 使用減法時間過長，需使用左移運算 shift 的方法
    while (newDividend >= newDivisor) {
        var temp = newDivisor,
            i = 0;
        while (newDividend >= temp << 1) {
            if ((temp << 1) <= 0) {
                break; // overflow 溢位
            }
            temp = temp << 1; // 除數往左 shift 一位 
            i++; // 
            if (sign > 0 && i > 29) // 除數超過最大植
                return MAX_INT;
            if (sign <= 0 && i > 30) // 除數超過最小植
                return MIN_INT;
        }
        newDividend -= temp; // 找到不超過被除數的最大除數 temp，被除數減去除數（可能尚未結束）          
        q += Math.pow(2, i); // 商數為前次值加上本次迴圈計算位移的數 i
    }
    if (sign > 0) return q;
    else return 0 - q;
};