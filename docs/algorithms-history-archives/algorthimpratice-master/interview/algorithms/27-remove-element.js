/**
 * Problem: https://leetcode.com/problems/remove-element
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-17
 * 
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    var i = 0;
    for (var j = 0; j < nums.length; j++) {
        if (nums[j] != val) {
            nums[i] = nums[j];
            i++;
        }
    }
    return i;
};