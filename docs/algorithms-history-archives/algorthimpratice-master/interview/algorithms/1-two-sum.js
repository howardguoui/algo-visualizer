/**
 * Problem: https://leetcode.com/problems/two-sum
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // Hash Map ver. 
    // 將每一個數字與target的差值加入map儲存，新的數字若相符即回傳
    var map = {};
    for (var i = 0; i < nums.length; i++) {
        if (map[nums[i]] || map[nums[i]] === 0)
            return [map[nums[i]], i];
        else
            map[target - nums[i]] = i;
    }
};