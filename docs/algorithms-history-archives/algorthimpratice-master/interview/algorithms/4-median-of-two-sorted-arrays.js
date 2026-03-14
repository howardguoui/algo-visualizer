/**
 * Problem: https://leetcode.com/problems/median-of-two-sorted-arrays
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-05
 * 
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {

    var numsCom = [];
    var t1 = 0,
        t2 = 0;
    for (var i = 0; i < (nums1.length + nums2.length); i++) {
        if (t1 < nums1.length && t2 < nums2.length) {
            if (nums1[t1] < nums2[t2]) {
                numsCom.push(nums1[t1++]);
            } else {
                numsCom.push(nums2[t2++]);
            }
        } else if (t1 < nums1.length && t2 >= nums2.length) {
            numsCom.push(nums1[t1++]);
        } else if (t1 >= nums1.length && t2 < nums2.length) {
            numsCom.push(nums2[t2++]);
        }
    }

    var m = parseInt((nums1.length + nums2.length) / 2); // 中位數個數
    if ((nums1.length + nums2.length) % 2 !== 0) // 數字個數是 奇數
        return numsCom[m];
    else
        return ((numsCom[m] + numsCom[m - 1]) / 2);
};