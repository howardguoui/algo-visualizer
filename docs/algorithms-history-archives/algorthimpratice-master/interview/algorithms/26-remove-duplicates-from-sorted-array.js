/**
 * Problem: https://leetcode.com/problems/remove-duplicates-from-sorted-array
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-17
 * 
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return 1;

    var i = 0;
    for (var j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
};