/**
 * Problem: https://leetcode.com/problems/add-two-numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Accepted date: 2017-03-05
 * 
 * 
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
var addTwoNumbers = function (l1, l2) {

    var answer = null // 指向list最新的node
    var head = null; // 指向list第一個node (最終結果)
    var sum = 0; // 
    var val = 0; // 
    var carry = 0; // 進位
    while (l1 || l2 || carry) {
        sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = parseInt(sum / 10);
        val = sum % 10;
        if (head) {
            // 新增list node
            answer.next = new ListNode(val);
            answer = answer.next;
        } else {
            // 建立list第一個 node
            answer = new ListNode(val);
            head = answer;
        }

        if (l1) l1 = l1.next; // next node
        if (l2) l2 = l2.next; // next node
    }

    return head;
};