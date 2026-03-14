/**
 * Problem: https://leetcode.com/problems/merge-two-sorted-lists
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-17
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    var listComb = new ListNode(0);
    var walk = listComb;
    while (l1 && l2) {
        // 選擇較小的 Node 加入結果
        if (l1.val < l2.val) {
            walk.next = l1;
            l1 = l1.next;
        } else {
            walk.next = l2;
            l2 = l2.next;
        }
        walk = walk.next;
    }
    // 將剩餘的 ListNode 加入結果
    if (l1)
        walk.next = l1;
    if (l2)
        walk.next = l2;
    return listComb.next;
};