/**
 * Problem: https://leetcode.com/problems/remove-nth-node-from-end-of-list
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-14
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {

    var dummy = new ListNode(0);
    dummy.next = head; // 預留第一個Node就是要移除的Node
    var walk = dummy;
    var count = 0;

    for (var i = 1, countWalk = head; countWalk; i++, countWalk = countWalk.next)
        count++;

    while (walk) {

        if ((n - count) === 0)
            walk.next = walk.next.next; // pass this node
        else
            walk = walk.next;

        count--;
    }
    return dummy.next;
};