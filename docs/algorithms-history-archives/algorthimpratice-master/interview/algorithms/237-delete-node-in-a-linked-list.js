/**
 * Problem: https://leetcode.com/problems/delete-node-in-a-linked-list
 * Difficulty: Easy
 * Language: JavaScript
 * Accepted date: 2017-03-25
 * 
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    // 單純將傳進來的Node ref改為下一個，捨棄目前這個Node
    node.val = node.next.val;
    node.next = node.next.next;
};