/**
 * Problem: https://leetcode.com/problems/container-with-most-water
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-10 
 * 
 * 
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    var maxarea = 0;
    var i = 0,
        j = height.length - 1;
    while (i < j) {
        maxarea = Math.max(maxarea, Math.min(height[i], height[j]) * (j - i));
        if (height[i] < height[j])
            i++;
        else
            j--;
    }
    return maxarea;
};