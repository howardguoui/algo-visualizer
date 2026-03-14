/**
 * Problem: https://leetcode.com/problems/search-insert-position
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-24
 * 
 * Testcase example:
 * [1]
 * 0
 * [1]
 * 2
 * [1, 3]
 * 2
 * [1,3,5]
 * 4
 * [1,3]
 * 3
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {

    if (nums.length === 0 || nums[0] >= target) return 0;
    if (nums[nums.length - 1] < target) return nums.length;
    for (var i = 0; i < nums.length - 1; i++) {
        if (target >= nums[i] && target <= nums[i + 1])
            return i + 1;
    }
};