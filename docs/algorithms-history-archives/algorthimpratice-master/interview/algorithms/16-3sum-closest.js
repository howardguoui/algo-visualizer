/**
 * Problem: https://leetcode.com/problems/3sum-closest
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-11
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {

    nums = nums.sort(function (a, b) {
        return a - b
    }); // javascript .sort() 負數會有問題

    var ans = null;
    for (var i = 0; i < nums.length; i++) {
        var j = i + 1,
            k = nums.length - 1;
        while (j < k) {
            var sum = nums[i] + nums[j] + nums[k];
            if (sum > target)
                k--;
            else
                j++;

            if (Math.abs(sum - target) <= Math.abs(ans - target) || ans === null)
                ans = sum;
        }
    }
    return ans;
};