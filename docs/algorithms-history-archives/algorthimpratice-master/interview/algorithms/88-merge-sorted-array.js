/**
 * Problem: https://leetcode.com/problems/merge-sorted-array
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-28
 * 
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    // Tips: 把nums1 當作夠長的陣列，從最後一個位置(m+n-1)開始挑大的數字放進nums1
    // 只要將nums2 n個數字處理完畢，即完成。
    while (n > 0) {
        if (nums1[m - 1] > nums2[n - 1]) {
            nums1[m + n - 1] = nums1[m - 1];
            m--;
        }
        else {
            nums1[m + n - 1] = nums2[n - 1];
            n--;
        }
    }

};