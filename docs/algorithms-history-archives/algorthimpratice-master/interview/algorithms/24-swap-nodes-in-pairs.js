/**
 * Problem: https://leetcode.com/problems/swap-nodes-in-pairs
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-18
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (!head || !head.next) return head;
    var prev = head;
    var cur = head.next;


    while (prev && cur) {
        var temp = prev.val;
        prev.val = cur.val;
        cur.val = temp;
        if (cur.next && cur.next.next) {
            prev = cur.next;
            cur = cur.next.next;
        } else
            break;

    }
    return head;


};