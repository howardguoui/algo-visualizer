/**
 * Problem: https://leetcode.com/problems/3sum
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums = nums.sort(function (a, b) {
        return a - b
    }); // javascript .sort() 負數會有問題
    var ans = [];
    for (var i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        var j = i + 1,
            k = nums.length - 1;
        while (j < k) {
            if (nums[i] + nums[j] + nums[k] === 0) {
                ans.push([nums[i], nums[j], nums[k]]);

                j++;
                k--;
                while ((j < k) && (nums[j] == nums[j - 1]))
                    j++; // avoid duplicates
                while ((j < k) && (nums[k] == nums[k + 1]))
                    k--; // avoid duplicates
            } else if (nums[i] + nums[j] + nums[k] > 0)
                k--;
            else
                j++;
        }
    }
    return ans;
};