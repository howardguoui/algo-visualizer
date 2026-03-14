export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface TestCase {
  label: string
  args: unknown[]
  expected: unknown
}

export interface PracticeProblem {
  id: number
  title: string
  titleZh: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  leetcodeSlug: string
  tags: string[]
  description: string
  examples: Example[]
  constraints: string[]
  starterCode: string
  starterCodePython: string
  testCases: TestCase[]
  hint?: string
}

export const practiceProblems: Record<number, PracticeProblem> = {
  125: {
    id: 125,
    title: 'Valid Palindrome',
    titleZh: '验证回文串',
    difficulty: 'Easy',
    leetcodeSlug: 'valid-palindrome',
    tags: ['Two Pointers', 'String'],
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true', explanation: 'An empty string after filtering reads the same forward and backward.' },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {

}`,
    starterCodePython: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass`,
    testCases: [
      { label: 'Example 1', args: ['A man, a plan, a canal: Panama'], expected: true },
      { label: 'Example 2', args: ['race a car'], expected: false },
      { label: 'Empty after filter', args: [' '], expected: true },
      { label: 'Single char', args: ['a'], expected: true },
      { label: 'Mixed alphanumeric', args: ['0P'], expected: false },
    ],
    hint: 'Use two pointers from both ends. Skip non-alphanumeric chars and compare lowercase letters.',
  },

  167: {
    id: 167,
    title: 'Two Sum II - Input Array Is Sorted',
    titleZh: '两数之和 II - 输入有序数组',
    difficulty: 'Medium',
    leetcodeSlug: 'two-sum-ii-input-array-is-sorted',
    tags: ['Two Pointers', 'Array', 'Binary Search'],
    description: `Given a **1-indexed** array of integers \`numbers\` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific \`target\` number.

Return the indices of the two numbers (1-indexed) as an integer array \`[index1, index2]\` where \`1 <= index1 < index2 <= numbers.length\`.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.`,
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: '2 + 7 = 9. index1 = 1, index2 = 2.' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: '2 + 4 = 6. index1 = 1, index3 = 3.' },
      { input: 'numbers = [-1,0], target = -1', output: '[1,2]', explanation: '-1 + 0 = -1.' },
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order.',
      '-1000 <= target <= 1000',
      'Exactly one solution exists.',
    ],
    starterCode: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {

}`,
    starterCodePython: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { label: 'Example 2', args: [[2, 3, 4], 6], expected: [1, 3] },
      { label: 'Example 3', args: [[-1, 0], -1], expected: [1, 2] },
      { label: 'Last two', args: [[1, 2, 3, 4, 5], 9], expected: [4, 5] },
    ],
    hint: 'Use left and right pointers. If sum < target, move left pointer right. If sum > target, move right pointer left.',
  },

  11: {
    id: 11,
    title: 'Container With Most Water',
    titleZh: '盛最多水的容器',
    difficulty: 'Medium',
    leetcodeSlug: 'container-with-most-water',
    tags: ['Two Pointers', 'Array', 'Greedy'],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the **maximum amount of water** a container can store.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 (height 8) and index 8 (height 7). Area = 7 * min(8,7) = 49.' },
      { input: 'height = [1,1]', output: '1' },
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {

}`,
    starterCodePython: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { label: 'Example 2', args: [[1, 1]], expected: 1 },
      { label: 'Increasing', args: [[1, 2, 3, 4, 5]], expected: 6 },
      { label: 'Decreasing', args: [[5, 4, 3, 2, 1]], expected: 6 },
    ],
    hint: 'Move the pointer with the smaller height. Moving the taller pointer can only decrease the container area.',
  },

  15: {
    id: 15,
    title: '3Sum',
    titleZh: '三数之和',
    difficulty: 'Medium',
    leetcodeSlug: '3sum',
    tags: ['Two Pointers', 'Array', 'Sorting'],
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {

}`,
    starterCodePython: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { label: 'No result', args: [[0, 1, 1]], expected: [] },
      { label: 'All zeros', args: [[0, 0, 0]], expected: [[0, 0, 0]] },
    ],
    hint: 'Sort first, then for each element use two pointers on the rest. Skip duplicates to avoid duplicate triplets.',
  },

  1: {
    id: 1,
    title: 'Two Sum',
    titleZh: '两数之和',
    difficulty: 'Easy',
    leetcodeSlug: 'two-sum',
    tags: ['Hash Table', 'Array'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {

}`,
    starterCodePython: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { label: 'Example 2', args: [[3, 2, 4], 6], expected: [1, 2] },
      { label: 'Example 3', args: [[3, 3], 6], expected: [0, 1] },
      { label: 'Negative', args: [[-3, 4, 3, 90], 0], expected: [0, 2] },
    ],
    hint: 'Use a hash map to store each number\'s index. For each number, check if (target - number) is already in the map.',
  },

  704: {
    id: 704,
    title: 'Binary Search',
    titleZh: '二分查找',
    difficulty: 'Easy',
    leetcodeSlug: 'binary-search',
    tags: ['Binary Search', 'Array'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {

}`,
    starterCodePython: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { label: 'Example 2', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { label: 'First element', args: [[1, 2, 3, 4, 5], 1], expected: 0 },
      { label: 'Last element', args: [[1, 2, 3, 4, 5], 5], expected: 4 },
      { label: 'Single element', args: [[5], 5], expected: 0 },
    ],
    hint: 'Maintain left and right boundaries. Compare mid element with target and halve the search space each iteration.',
  },

  27: {
    id: 27,
    title: 'Remove Element',
    titleZh: '移除元素',
    difficulty: 'Easy',
    leetcodeSlug: 'remove-element',
    tags: ['Array', 'Two Pointers'],
    description: `Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` in \`nums\` **in-place**. The order of the elements may be changed. Then return the number of elements in \`nums\` which are not equal to \`val\`.

Consider the number of elements in \`nums\` which are not equal to \`val\` to be \`k\`. To get accepted, you need to return \`k\`.`,
    examples: [
      { input: 'nums = [3,2,2,3], val = 3', output: '2', explanation: 'The first two elements of nums are [2,2]. Return k = 2.' },
      { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', output: '5', explanation: 'The first five elements are [0,1,4,0,3]. Return k = 5.' },
    ],
    constraints: ['0 <= nums.length <= 100', '0 <= nums[i] <= 50', '0 <= val <= 100'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {

}`,
    starterCodePython: `class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[3, 2, 2, 3], 3], expected: 2 },
      { label: 'Example 2', args: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5 },
      { label: 'All removed', args: [[1, 1, 1], 1], expected: 0 },
      { label: 'None removed', args: [[1, 2, 3], 4], expected: 3 },
    ],
    hint: 'Use a slow pointer that only advances when the current element is not val (fast-slow pointer pattern).',
  },

  26: {
    id: 26,
    title: 'Remove Duplicates from Sorted Array',
    titleZh: '删除排序数组中的重复项',
    difficulty: 'Easy',
    leetcodeSlug: 'remove-duplicates-from-sorted-array',
    tags: ['Array', 'Two Pointers'],
    description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same.

Return \`k\` after placing the final result in the first \`k\` slots of \`nums\`.`,
    examples: [
      { input: 'nums = [1,1,2]', output: '2', explanation: 'nums = [1,2,_]. Return k = 2.' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5', explanation: 'nums = [0,1,2,3,4,_,_,_,_,_]. Return k = 5.' },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', 'nums is sorted in non-decreasing order.'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {

}`,
    starterCodePython: `class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[1, 1, 2]], expected: 2 },
      { label: 'Example 2', args: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 },
      { label: 'No duplicates', args: [[1, 2, 3]], expected: 3 },
      { label: 'All same', args: [[5, 5, 5, 5]], expected: 1 },
    ],
    hint: 'Use a slow pointer for the write position. Only write when nums[fast] != nums[slow].',
  },

  3: {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    titleZh: '无重复字符的最长子串',
    difficulty: 'Medium',
    leetcodeSlug: 'longest-substring-without-repeating-characters',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {

}`,
    starterCodePython: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: ['abcabcbb'], expected: 3 },
      { label: 'Example 2', args: ['bbbbb'], expected: 1 },
      { label: 'Example 3', args: ['pwwkew'], expected: 3 },
      { label: 'Empty string', args: [''], expected: 0 },
      { label: 'All unique', args: ['abcde'], expected: 5 },
    ],
    hint: 'Use a sliding window with a Set. Expand right pointer, shrink left when a duplicate is found.',
  },

  509: {
    id: 509,
    title: 'Fibonacci Number',
    titleZh: 'Fibonacci 数',
    difficulty: 'Easy',
    leetcodeSlug: 'fibonacci-number',
    tags: ['Dynamic Programming', 'Recursion', 'Memoization'],
    description: `The **Fibonacci numbers**, commonly denoted \`F(n)\` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is:

\`F(0) = 0, F(1) = 1\`
\`F(n) = F(n - 1) + F(n - 2), for n > 1\`

Given \`n\`, calculate \`F(n)\`.`,
    examples: [
      { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.' },
      { input: 'n = 3', output: '2', explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2.' },
      { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
    ],
    constraints: ['0 <= n <= 30'],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function fib(n) {

}`,
    starterCodePython: `class Solution:
    def fib(self, n: int) -> int:
        pass`,
    testCases: [
      { label: 'n = 0', args: [0], expected: 0 },
      { label: 'n = 1', args: [1], expected: 1 },
      { label: 'n = 2', args: [2], expected: 1 },
      { label: 'n = 4', args: [4], expected: 3 },
      { label: 'n = 10', args: [10], expected: 55 },
    ],
    hint: 'Try bottom-up DP: build from F(0) and F(1) up to F(n), storing only the last two values.',
  },

  70: {
    id: 70,
    title: 'Climbing Stairs',
    titleZh: '爬楼梯',
    difficulty: 'Easy',
    leetcodeSlug: 'climbing-stairs',
    tags: ['Dynamic Programming', 'Memoization'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1, 2 — two ways.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1 — three ways.' },
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {

}`,
    starterCodePython: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
    testCases: [
      { label: 'n = 1', args: [1], expected: 1 },
      { label: 'n = 2', args: [2], expected: 2 },
      { label: 'n = 3', args: [3], expected: 3 },
      { label: 'n = 5', args: [5], expected: 8 },
      { label: 'n = 10', args: [10], expected: 89 },
    ],
    hint: 'This is Fibonacci in disguise. ways(n) = ways(n-1) + ways(n-2).',
  },

  303: {
    id: 303,
    title: 'Range Sum Query - Immutable',
    titleZh: '区间和检索 - 数组不可变',
    difficulty: 'Easy',
    leetcodeSlug: 'range-sum-query-immutable',
    tags: ['Prefix Sum', 'Array', 'Design'],
    description: `Given an integer array \`nums\`, handle multiple queries of the following type:

Calculate the **sum** of the elements of \`nums\` between indices \`left\` and \`right\` **inclusive** where \`left <= right\`.

Implement the \`NumArray\` class:
- \`NumArray(int[] nums)\` Initializes the object with the integer array \`nums\`.
- \`int sumRange(int left, int right)\` Returns the sum of the elements of \`nums\` between indices \`left\` and \`right\` inclusive.`,
    examples: [
      {
        input: 'nums = [-2,0,3,-5,2,-1]\nsumRange(0,2)\nsumRange(2,5)\nsumRange(0,5)',
        output: '[null,1,-1,-3]',
        explanation: 'sumRange(0,2) = -2+0+3 = 1. sumRange(2,5) = 3-5+2-1 = -1. sumRange(0,5) = -2+0+3-5+2-1 = -3.',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5', '0 <= left <= right < nums.length', 'At most 10^4 calls to sumRange.'],
    starterCode: `/**
 * @param {number[]} nums
 */
function NumArray(nums) {
  // Initialize prefix sum array

}

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {

};`,
    starterCodePython: `def sumRange(nums: list[int], left: int, right: int) -> int:
    # Build prefix sum and return sum from left to right (inclusive)
    pass`,
    testCases: [
      { label: 'sumRange(0,2)', args: [[-2, 0, 3, -5, 2, -1], 0, 2], expected: 1 },
      { label: 'sumRange(2,5)', args: [[-2, 0, 3, -5, 2, -1], 2, 5], expected: -1 },
      { label: 'sumRange(0,5)', args: [[-2, 0, 3, -5, 2, -1], 0, 5], expected: -3 },
    ],
    hint: 'Build a prefix sum array. prefix[i] = sum of nums[0..i-1]. sumRange(l,r) = prefix[r+1] - prefix[l].',
  },

  // ─── Arrays ───────────────────────────────────────────────────────────────

  977: {
    id: 977,
    title: 'Squares of a Sorted Array',
    titleZh: '有序数组的平方',
    difficulty: 'Easy',
    leetcodeSlug: 'squares-of-a-sorted-array',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: `Given an integer array \`nums\` sorted in **non-decreasing** order, return an array of the **squares of each number** sorted in non-decreasing order.`,
    examples: [
      { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]' },
      { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order.'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortedSquares(nums) {

}`,
    starterCodePython: `class Solution:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[-4,-1,0,3,10]], expected: [0,1,9,16,100] },
      { label: 'Example 2', args: [[-7,-3,2,3,11]], expected: [4,9,9,49,121] },
      { label: 'All negative', args: [[-3,-2,-1]], expected: [1,4,9] },
      { label: 'All positive', args: [[1,2,3]], expected: [1,4,9] },
    ],
    hint: 'Use two pointers from both ends. The largest square comes from either the leftmost or rightmost element. Fill the result array from right to left.',
  },

  84: {
    id: 84,
    title: 'Largest Rectangle in Histogram',
    titleZh: '柱状图中最大的矩形',
    difficulty: 'Hard',
    leetcodeSlug: 'largest-rectangle-in-histogram',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the **area of the largest rectangle** in the histogram.`,
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10', explanation: 'The above is a histogram where width of each bar is 1. The largest rectangle has area = 10 units.' },
      { input: 'heights = [2,4]', output: '4' },
    ],
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    starterCode: `/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {

}`,
    starterCodePython: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[2,1,5,6,2,3]], expected: 10 },
      { label: 'Example 2', args: [[2,4]], expected: 4 },
      { label: 'Single bar', args: [[5]], expected: 5 },
      { label: 'Equal heights', args: [[3,3,3]], expected: 9 },
    ],
    hint: 'Use a monotonic stack. For each bar, find the nearest smaller bar to left and right. The rectangle area using that bar as height = height × (rightSmaller - leftSmaller - 1).',
  },

  // ─── Sliding Window ───────────────────────────────────────────────────────

  76: {
    id: 76,
    title: 'Minimum Window Substring',
    titleZh: '最小覆盖子串',
    difficulty: 'Hard',
    leetcodeSlug: 'minimum-window-substring',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes "A", "B", and "C" from string t.' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""', explanation: 'Both a\'s from t must be included in the window. Since s has only one a, return empty string.' },
    ],
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {

}`,
    starterCodePython: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        pass`,
    testCases: [
      { label: 'Example 1', args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
      { label: 'Single char', args: ['a', 'a'], expected: 'a' },
      { label: 'Not possible', args: ['a', 'aa'], expected: '' },
      { label: 'Same string', args: ['abc', 'abc'], expected: 'abc' },
    ],
    hint: 'Use a sliding window with two frequency maps. Expand right pointer, shrink left when all characters are covered. Track the minimum valid window.',
  },

  567: {
    id: 567,
    title: 'Permutation in String',
    titleZh: '字符串的排列',
    difficulty: 'Medium',
    leetcodeSlug: 'permutation-in-string',
    tags: ['Sliding Window', 'Hash Table', 'String', 'Two Pointers'],
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a **permutation** of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.`,
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains one permutation of s1 ("ba").' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' },
    ],
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters.'],
    starterCode: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {

}`,
    starterCodePython: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        pass`,
    testCases: [
      { label: 'Example 1', args: ['ab', 'eidbaooo'], expected: true },
      { label: 'Example 2', args: ['ab', 'eidboaoo'], expected: false },
      { label: 'Same length match', args: ['ab', 'ba'], expected: true },
      { label: 'Longer s1', args: ['abc', 'ab'], expected: false },
    ],
    hint: 'Use a fixed-size sliding window of length s1.length. Compare character frequencies in the window with s1\'s frequencies.',
  },

  438: {
    id: 438,
    title: 'Find All Anagrams in a String',
    titleZh: '找到字符串中所有字母异位词',
    difficulty: 'Medium',
    leetcodeSlug: 'find-all-anagrams-in-a-string',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    description: `Given two strings \`s\` and \`p\`, return an array of all the **start indices** of \`p\`'s anagrams in \`s\`. You may return the answer in **any order**.`,
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]', explanation: '"cba" starts at 0, "bac" starts at 6.' },
      { input: 's = "abab", p = "ab"', output: '[0,1,2]' },
    ],
    constraints: ['1 <= s.length, p.length <= 3 * 10^4', 's and p consist of lowercase English letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
function findAnagrams(s, p) {

}`,
    starterCodePython: `class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: ['cbaebabacd', 'abc'], expected: [0,6] },
      { label: 'Example 2', args: ['abab', 'ab'], expected: [0,1,2] },
      { label: 'No match', args: ['aa', 'bb'], expected: [] },
    ],
    hint: 'Same as Permutation in String but collect all starting indices. Use a fixed sliding window of length p.length.',
  },

  // ─── Binary Search ────────────────────────────────────────────────────────

  33: {
    id: 33,
    title: 'Search in Rotated Sorted Array',
    titleZh: '搜索旋转排序数组',
    difficulty: 'Medium',
    leetcodeSlug: 'search-in-rotated-sorted-array',
    tags: ['Array', 'Binary Search'],
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values). Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\`.

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
      { input: 'nums = [1], target = 0', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10^4 <= target <= 10^4'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {

}`,
    starterCodePython: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { label: 'Not found', args: [[4,5,6,7,0,1,2], 3], expected: -1 },
      { label: 'Single element', args: [[1], 0], expected: -1 },
      { label: 'Not rotated', args: [[1,2,3,4,5], 3], expected: 2 },
    ],
    hint: 'At each midpoint, one half must be sorted. Determine which half is sorted, then check if target falls in that half to decide which side to search.',
  },

  34: {
    id: 34,
    title: 'Find First and Last Position of Element in Sorted Array',
    titleZh: '在排序数组中查找元素的第一个和最后一个位置',
    difficulty: 'Medium',
    leetcodeSlug: 'find-first-and-last-position-of-element-in-sorted-array',
    tags: ['Array', 'Binary Search'],
    description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.

If \`target\` is not found in the array, return \`[-1, -1]\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' },
      { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]' },
      { input: 'nums = [], target = 0', output: '[-1,-1]' },
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'nums is a non-decreasing array.', '-10^9 <= target <= 10^9'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {

}`,
    starterCodePython: `class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[5,7,7,8,8,10], 8], expected: [3,4] },
      { label: 'Not found', args: [[5,7,7,8,8,10], 6], expected: [-1,-1] },
      { label: 'Empty array', args: [[], 0], expected: [-1,-1] },
      { label: 'Single match', args: [[1], 1], expected: [0,0] },
    ],
    hint: 'Run two binary searches: one to find the leftmost position and one to find the rightmost position of target.',
  },

  162: {
    id: 162,
    title: 'Find Peak Element',
    titleZh: '寻找峰值',
    difficulty: 'Medium',
    leetcodeSlug: 'find-peak-element',
    tags: ['Array', 'Binary Search'],
    description: `A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that \`nums[-1] = nums[n] = -∞\`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '2', explanation: '3 is a peak element and your function should return the index number 2.' },
      { input: 'nums = [1,2,1,3,5,6,4]', output: '5', explanation: 'Your function can return either index 1 or 5, but 5 is the last peak.' },
    ],
    constraints: ['1 <= nums.length <= 1000', '-2^31 <= nums[i] <= 2^31 - 1', 'nums[i] != nums[i + 1] for all valid i.'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums) {

}`,
    starterCodePython: `class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[1,2,3,1]], expected: 2 },
      { label: 'Single element', args: [[1]], expected: 0 },
      { label: 'Two elements', args: [[1,2]], expected: 1 },
      { label: 'Descending', args: [[3,2,1]], expected: 0 },
    ],
    hint: 'Binary search: if nums[mid] < nums[mid+1], the peak is on the right side. Otherwise it\'s on the left (or at mid).',
  },

  // ─── Prefix Sum ──────────────────────────────────────────────────────────

  560: {
    id: 560,
    title: 'Subarray Sum Equals K',
    titleZh: '和为K的子数组',
    difficulty: 'Medium',
    leetcodeSlug: 'subarray-sum-equals-k',
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
    description: `Given an array of integers \`nums\` and an integer \`k\`, return the **total number of subarrays** whose sum equals to \`k\`.

A subarray is a contiguous **non-empty** sequence of elements within an array.`,
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2' },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {

}`,
    starterCodePython: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[1,1,1], 2], expected: 2 },
      { label: 'Example 2', args: [[1,2,3], 3], expected: 2 },
      { label: 'Negative numbers', args: [[-1,-1,1], 0], expected: 1 },
      { label: 'Single match', args: [[1], 1], expected: 1 },
    ],
    hint: 'Use prefix sum + hash map. If prefix[j] - prefix[i] == k, then subarray [i+1..j] sums to k. Count prefixSum - k in the map.',
  },

  304: {
    id: 304,
    title: 'Range Sum Query 2D - Immutable',
    titleZh: '二维区间和检索 - 数组不可变',
    difficulty: 'Medium',
    leetcodeSlug: 'range-sum-query-2d-immutable',
    tags: ['Array', 'Design', 'Prefix Sum', 'Matrix'],
    description: `Given a 2D matrix \`matrix\`, handle multiple queries of the following type:

Calculate the **sum** of the elements of \`matrix\` inside the rectangle defined by its upper left corner \`(row1, col1)\` and lower right corner \`(row2, col2)\`.

For this practice problem, implement a function \`sumRegion(matrix, row1, col1, row2, col2)\` that returns the region sum directly.`,
    examples: [
      { input: 'matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]\nsumRegion(2,1,4,3)', output: '8' },
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '-10^4 <= matrix[i][j] <= 10^4', '0 <= row1 <= row2 < m', '0 <= col1 <= col2 < n'],
    starterCode: `/**
 * @param {number[][]} matrix
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
function sumRegion(matrix, row1, col1, row2, col2) {

}`,
    starterCodePython: `def sumRegion(matrix: list[list[int]], row1: int, col1: int, row2: int, col2: int) -> int:
    pass`,
    testCases: [
      { label: 'Region [2,1,4,3]', args: [[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], 2, 1, 4, 3], expected: 8 },
      { label: 'Region [1,1,2,2]', args: [[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], 1, 1, 2, 2], expected: 11 },
      { label: 'Single cell', args: [[[1,2],[3,4]], 0, 0, 0, 0], expected: 1 },
      { label: 'Full matrix', args: [[[1,2],[3,4]], 0, 0, 1, 1], expected: 10 },
    ],
    hint: 'Build a 2D prefix sum table. prefix[i][j] = sum of all cells from (0,0) to (i-1,j-1). Use inclusion-exclusion to answer range queries in O(1).',
  },

  // ─── Stack / Queue ────────────────────────────────────────────────────────

  20: {
    id: 20,
    title: 'Valid Parentheses',
    titleZh: '有效的括号',
    difficulty: 'Easy',
    leetcodeSlug: 'valid-parentheses',
    tags: ['String', 'Stack'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is **valid**.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {

}`,
    starterCodePython: `class Solution:
    def isValid(self, s: str) -> bool:
        pass`,
    testCases: [
      { label: 'Example 1', args: ['()'], expected: true },
      { label: 'Example 2', args: ['()[]{}'], expected: true },
      { label: 'Mismatch', args: ['(]'], expected: false },
      { label: 'Wrong order', args: ['([)]'], expected: false },
      { label: 'Nested', args: ['{[]}'], expected: true },
    ],
    hint: 'Use a stack. Push open brackets. On a close bracket, check if the top of the stack is the matching open bracket.',
  },

  739: {
    id: 739,
    title: 'Daily Temperatures',
    titleZh: '每日温度',
    difficulty: 'Medium',
    leetcodeSlug: 'daily-temperatures',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
      { input: 'temperatures = [30,60,90]', output: '[1,1,0]' },
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    starterCode: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {

}`,
    starterCodePython: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { label: 'Ascending', args: [[30,40,50,60]], expected: [1,1,1,0] },
      { label: 'Descending', args: [[60,50,40,30]], expected: [0,0,0,0] },
    ],
    hint: 'Use a monotonic decreasing stack of indices. When a warmer day is found, pop the stack and compute the difference in indices.',
  },

  496: {
    id: 496,
    title: 'Next Greater Element I',
    titleZh: '下一个更大元素 I',
    difficulty: 'Easy',
    leetcodeSlug: 'next-greater-element-i',
    tags: ['Array', 'Hash Table', 'Stack', 'Monotonic Stack'],
    description: `The **next greater element** of some element \`x\` in an array is the **first greater** element that is to the right of \`x\` in the same array.

You are given two distinct 0-indexed integer arrays \`nums1\` and \`nums2\`, where \`nums1\` is a subset of \`nums2\`.

For each \`0 <= i < nums1.length\`, find the index \`j\` such that \`nums1[i] == nums2[j]\` and determine the **next greater element** of \`nums2[j]\` in \`nums2\`. If there is no next greater element, then the answer for this query is \`-1\`.

Return an array \`ans\` of length \`nums1.length\` such that \`ans[i]\` is the next greater element as described above.`,
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]' },
    ],
    constraints: ['1 <= nums1.length <= nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 10^4', 'All integers in nums1 and nums2 are unique.', 'All the integers of nums1 also appear in nums2.'],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function nextGreaterElement(nums1, nums2) {

}`,
    starterCodePython: `class Solution:
    def nextGreaterElement(self, nums1: list[int], nums2: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[4,1,2], [1,3,4,2]], expected: [-1,3,-1] },
      { label: 'Example 2', args: [[2,4], [1,2,3,4]], expected: [3,-1] },
      { label: 'All found', args: [[1,3], [1,3,5,2,4]], expected: [3,5] },
    ],
    hint: 'Build a map of next greater element for every number in nums2 using a monotonic stack. Then look up each element of nums1 in the map.',
  },

  // ─── Hash Table ───────────────────────────────────────────────────────────

  49: {
    id: 49,
    title: 'Group Anagrams',
    titleZh: '字母异位词分组',
    difficulty: 'Medium',
    leetcodeSlug: 'group-anagrams',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
    starterCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // Hint: sort each string as a key. Return groups sorted for testing.
}`,
    starterCodePython: `class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        pass`,
    testCases: [
      { label: 'Single element', args: [['a']], expected: [['a']] },
      { label: 'Empty string', args: [['']], expected: [['']] },
      { label: 'Two groups', args: [['ab','ba','cd']], expected: [['ab','ba'],['cd']] },
    ],
    hint: 'Use a hash map with sorted string as key. Group words that produce the same sorted string. Sort each group and return.',
  },

  128: {
    id: 128,
    title: 'Longest Consecutive Sequence',
    titleZh: '最长连续序列',
    difficulty: 'Medium',
    leetcodeSlug: 'longest-consecutive-sequence',
    tags: ['Array', 'Hash Table', 'Union Find'],
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in \`O(n)\` time.`,
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'The longest consecutive sequence is [1,2,3,4]. Therefore its length is 4.' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {

}`,
    starterCodePython: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[100,4,200,1,3,2]], expected: 4 },
      { label: 'Example 2', args: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 },
      { label: 'Empty', args: [[]], expected: 0 },
      { label: 'Single', args: [[1]], expected: 1 },
    ],
    hint: 'Add all numbers to a Set. For each number that has no predecessor (num-1 not in set), count consecutive from there. Only start counting at sequence beginnings.',
  },

  // ─── Linked List (solve adapter: array ↔ ListNode) ────────────────────────

  206: {
    id: 206,
    title: 'Reverse Linked List',
    titleZh: '反转链表',
    difficulty: 'Easy',
    leetcodeSlug: 'reverse-linked-list',
    tags: ['Linked List', 'Recursion'],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

**Note:** The starter code includes a \`ListNode\` class and helper functions. Implement \`reverseList(head)\` and the \`solve(arr)\` adapter calls it automatically for testing.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    starterCode: `class ListNode {
  constructor(val, next) { this.val = val===undefined?0:val; this.next = next===undefined?null:next; }
}
const buildList = arr => { if(!arr?.length)return null; let h=new ListNode(arr[0]),c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next;} return h; };
const listToArr = h => { const r=[]; while(h){r.push(h.val);h=h.next;} return r; };

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {

}

// Test adapter (do not remove)
function solve(arr) { return listToArr(reverseList(buildList(arr))); }`,
    starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None): self.val = val; self.next = next

def build_list(arr):
    if not arr: return None
    head = ListNode(arr[0]); cur = head
    for v in arr[1:]: cur.next = ListNode(v); cur = cur.next
    return head

def list_to_arr(head):
    res = []
    while head: res.append(head.val); head = head.next
    return res

class Solution:
    def reverseList(self, head):
        pass

def solve(arr): return list_to_arr(Solution().reverseList(build_list(arr)))`,
    testCases: [
      { label: 'Example 1', args: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { label: 'Two nodes', args: [[1,2]], expected: [2,1] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Single node', args: [[1]], expected: [1] },
    ],
    hint: 'Use three pointers: prev (null), curr (head), next. Iterate: save next, point curr.next to prev, advance both.',
  },

  876: {
    id: 876,
    title: 'Middle of the Linked List',
    titleZh: '链表的中间结点',
    difficulty: 'Easy',
    leetcodeSlug: 'middle-of-the-linked-list',
    tags: ['Linked List', 'Two Pointers'],
    description: `Given the \`head\` of a singly linked list, return the **middle node** of the linked list.

If there are two middle nodes, return **the second middle** node.

**Note:** The \`solve(arr)\` adapter returns the values of the list starting from the middle node.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explanation: 'The middle node of the list is node 3.' },
      { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explanation: 'Since the list has two middle nodes with values 3 and 4, we return the second one.' },
    ],
    constraints: ['The number of nodes in the list is in the range [1, 100].', '1 <= Node.val <= 100'],
    starterCode: `class ListNode {
  constructor(val, next) { this.val = val===undefined?0:val; this.next = next===undefined?null:next; }
}
const buildList = arr => { if(!arr?.length)return null; let h=new ListNode(arr[0]),c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next;} return h; };
const listToArr = h => { const r=[]; while(h){r.push(h.val);h=h.next;} return r; };

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode(head) {

}

// Test adapter (do not remove)
function solve(arr) { return listToArr(middleNode(buildList(arr))); }`,
    starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None): self.val = val; self.next = next

def build_list(arr):
    if not arr: return None
    head = ListNode(arr[0]); cur = head
    for v in arr[1:]: cur.next = ListNode(v); cur = cur.next
    return head

def list_to_arr(head):
    res = []
    while head: res.append(head.val); head = head.next
    return res

class Solution:
    def middleNode(self, head):
        pass

def solve(arr): return list_to_arr(Solution().middleNode(build_list(arr)))`,
    testCases: [
      { label: 'Odd length', args: [[1,2,3,4,5]], expected: [3,4,5] },
      { label: 'Even length', args: [[1,2,3,4,5,6]], expected: [4,5,6] },
      { label: 'Single', args: [[1]], expected: [1] },
      { label: 'Two nodes', args: [[1,2]], expected: [2] },
    ],
    hint: 'Use fast and slow pointers. Slow moves one step, fast moves two steps. When fast reaches the end, slow is at the middle.',
  },

  19: {
    id: 19,
    title: 'Remove Nth Node From End of List',
    titleZh: '删除链表的倒数第N个结点',
    difficulty: 'Medium',
    leetcodeSlug: 'remove-nth-node-from-end-of-list',
    tags: ['Linked List', 'Two Pointers'],
    description: `Given the \`head\` of a linked list, remove the \`n\`th node from the end of the list and return its head.

**Note:** The \`solve(arr, n)\` adapter handles conversion for testing.`,
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' },
      { input: 'head = [1,2], n = 1', output: '[1]' },
    ],
    constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    starterCode: `class ListNode {
  constructor(val, next) { this.val = val===undefined?0:val; this.next = next===undefined?null:next; }
}
const buildList = arr => { if(!arr?.length)return null; let h=new ListNode(arr[0]),c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next;} return h; };
const listToArr = h => { const r=[]; while(h){r.push(h.val);h=h.next;} return r; };

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {

}

// Test adapter (do not remove)
function solve(arr, n) { return listToArr(removeNthFromEnd(buildList(arr), n)); }`,
    starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None): self.val = val; self.next = next

def build_list(arr):
    if not arr: return None
    head = ListNode(arr[0]); cur = head
    for v in arr[1:]: cur.next = ListNode(v); cur = cur.next
    return head

def list_to_arr(head):
    res = []
    while head: res.append(head.val); head = head.next
    return res

class Solution:
    def removeNthFromEnd(self, head, n: int):
        pass

def solve(arr, n): return list_to_arr(Solution().removeNthFromEnd(build_list(arr), n))`,
    testCases: [
      { label: 'Remove 2nd from end', args: [[1,2,3,4,5], 2], expected: [1,2,3,5] },
      { label: 'Remove only node', args: [[1], 1], expected: [] },
      { label: 'Remove last', args: [[1,2], 1], expected: [1] },
      { label: 'Remove first', args: [[1,2,3], 3], expected: [2,3] },
    ],
    hint: 'Use two pointers with a gap of n. Move fast pointer n steps ahead, then move both until fast reaches the end. The slow pointer is just before the node to remove.',
  },

  21: {
    id: 21,
    title: 'Merge Two Sorted Lists',
    titleZh: '合并两个有序链表',
    difficulty: 'Easy',
    leetcodeSlug: 'merge-two-sorted-lists',
    tags: ['Linked List', 'Recursion'],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Note:** The \`solve(arr1, arr2)\` adapter converts arrays for testing.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
    starterCode: `class ListNode {
  constructor(val, next) { this.val = val===undefined?0:val; this.next = next===undefined?null:next; }
}
const buildList = arr => { if(!arr?.length)return null; let h=new ListNode(arr[0]),c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next;} return h; };
const listToArr = h => { const r=[]; while(h){r.push(h.val);h=h.next;} return r; };

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {

}

// Test adapter (do not remove)
function solve(a1, a2) { return listToArr(mergeTwoLists(buildList(a1), buildList(a2))); }`,
    starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None): self.val = val; self.next = next

def build_list(arr):
    if not arr: return None
    head = ListNode(arr[0]); cur = head
    for v in arr[1:]: cur.next = ListNode(v); cur = cur.next
    return head

def list_to_arr(head):
    res = []
    while head: res.append(head.val); head = head.next
    return res

class Solution:
    def mergeTwoLists(self, list1, list2):
        pass

def solve(a1, a2): return list_to_arr(Solution().mergeTwoLists(build_list(a1), build_list(a2)))`,
    testCases: [
      { label: 'Example 1', args: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
      { label: 'Both empty', args: [[], []], expected: [] },
      { label: 'One empty', args: [[], [0]], expected: [0] },
      { label: 'One element each', args: [[1], [2]], expected: [1,2] },
    ],
    hint: 'Use a dummy head node. Compare list1.val and list2.val, append the smaller one. Advance that pointer. Attach the remaining list at the end.',
  },

  141: {
    id: 141,
    title: 'Linked List Cycle',
    titleZh: '环形链表',
    difficulty: 'Easy',
    leetcodeSlug: 'linked-list-cycle',
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a **cycle** in it.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

**Note:** The \`solve(arr, pos)\` adapter builds a list with a cycle at index \`pos\` (-1 means no cycle).`,
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle, the tail connects to the 1st node (0-indexed).' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    constraints: ['The number of the nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid index in the linked-list.'],
    starterCode: `class ListNode {
  constructor(val, next) { this.val = val===undefined?0:val; this.next = next===undefined?null:next; }
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {

}

// Test adapter: builds list with cycle at pos (-1 = no cycle)
function solve(arr, pos) {
  if (!arr?.length) return false;
  const nodes = arr.map(v => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i+1];
  if (pos >= 0) nodes[nodes.length-1].next = nodes[pos];
  return hasCycle(nodes[0]);
}`,
    starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None): self.val = val; self.next = next

class Solution:
    def hasCycle(self, head) -> bool:
        pass

def solve(arr, pos):
    if not arr: return False
    nodes = [ListNode(v) for v in arr]
    for i in range(len(nodes)-1): nodes[i].next = nodes[i+1]
    if pos >= 0: nodes[-1].next = nodes[pos]
    return Solution().hasCycle(nodes[0])`,
    testCases: [
      { label: 'Cycle at 1', args: [[3,2,0,-4], 1], expected: true },
      { label: 'Cycle at 0', args: [[1,2], 0], expected: true },
      { label: 'No cycle', args: [[1], -1], expected: false },
      { label: 'Two nodes no cycle', args: [[1,2], -1], expected: false },
    ],
    hint: 'Use fast and slow pointers (Floyd\'s Cycle Detection). Slow moves 1 step, fast moves 2 steps. If they meet, there\'s a cycle. If fast reaches null, no cycle.',
  },

  // ─── Trees (solve adapter: level-order array ↔ TreeNode) ─────────────────

  104: {
    id: 104,
    title: 'Maximum Depth of Binary Tree',
    titleZh: '二叉树的最大深度',
    difficulty: 'Easy',
    leetcodeSlug: 'maximum-depth-of-binary-tree',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return its **maximum depth**.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Note:** Tree is passed as a level-order array. The \`solve(arr)\` adapter converts it to a TreeNode.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {

}

// Test adapter (do not remove)
function solve(arr) { return maxDepth(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def maxDepth(self, root) -> int:
        pass

def solve(arr): return Solution().maxDepth(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[3,9,20,null,null,15,7]], expected: 3 },
      { label: 'Right skewed', args: [[1,null,2]], expected: 2 },
      { label: 'Empty', args: [[]], expected: 0 },
      { label: 'Single node', args: [[1]], expected: 1 },
    ],
    hint: 'Recursively: maxDepth(root) = 1 + max(maxDepth(left), maxDepth(right)). Base case: null → 0.',
  },

  111: {
    id: 111,
    title: 'Minimum Depth of Binary Tree',
    titleZh: '二叉树的最小深度',
    difficulty: 'Easy',
    leetcodeSlug: 'minimum-depth-of-binary-tree',
    tags: ['Tree', 'BFS', 'DFS', 'Binary Tree'],
    description: `Given a binary tree, find its **minimum depth**.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest **leaf** node.

**Note:** A leaf is a node with no children.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '2' },
      { input: 'root = [2,null,3,null,4,null,5,null,6]', output: '5' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^5].', '-1000 <= Node.val <= 1000'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth(root) {

}

// Test adapter (do not remove)
function solve(arr) { return minDepth(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def minDepth(self, root) -> int:
        pass

def solve(arr): return Solution().minDepth(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[3,9,20,null,null,15,7]], expected: 2 },
      { label: 'Right skewed 5 deep', args: [[2,null,3,null,4,null,5,null,6]], expected: 5 },
      { label: 'Empty', args: [[]], expected: 0 },
      { label: 'Single node', args: [[1]], expected: 1 },
    ],
    hint: 'Careful: if a node has only one child, the minimum depth goes through that child (not 1). A leaf has NO children.',
  },

  94: {
    id: 94,
    title: 'Binary Tree Inorder Traversal',
    titleZh: '二叉树中序遍历',
    difficulty: 'Easy',
    leetcodeSlug: 'binary-tree-inorder-traversal',
    tags: ['Stack', 'Tree', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **inorder traversal** of its nodes' values (left → root → right).`,
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]' },
      { input: 'root = []', output: '[]' },
      { input: 'root = [1]', output: '[1]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversal(root) {

}

// Test adapter (do not remove)
function solve(arr) { return inorderTraversal(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def inorderTraversal(self, root) -> list[int]:
        pass

def solve(arr): return Solution().inorderTraversal(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[1,null,2,3]], expected: [1,3,2] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Single node', args: [[1]], expected: [1] },
      { label: 'Full tree', args: [[1,2,3]], expected: [2,1,3] },
    ],
    hint: 'Recursively: inorder(left) → visit root → inorder(right). Or use an explicit stack iteratively.',
  },

  144: {
    id: 144,
    title: 'Binary Tree Preorder Traversal',
    titleZh: '二叉树前序遍历',
    difficulty: 'Easy',
    leetcodeSlug: 'binary-tree-preorder-traversal',
    tags: ['Stack', 'Tree', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **preorder traversal** of its nodes' values (root → left → right).`,
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,2,3]' },
      { input: 'root = []', output: '[]' },
      { input: 'root = [1]', output: '[1]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function preorderTraversal(root) {

}

// Test adapter (do not remove)
function solve(arr) { return preorderTraversal(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def preorderTraversal(self, root) -> list[int]:
        pass

def solve(arr): return Solution().preorderTraversal(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[1,null,2,3]], expected: [1,2,3] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Single node', args: [[1]], expected: [1] },
      { label: 'Full tree', args: [[1,2,3]], expected: [1,2,3] },
    ],
    hint: 'Recursively: visit root → preorder(left) → preorder(right). Or use a stack: push root, pop and visit, push right then left.',
  },

  226: {
    id: 226,
    title: 'Invert Binary Tree',
    titleZh: '翻转二叉树',
    difficulty: 'Easy',
    leetcodeSlug: 'invert-binary-tree',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.

**Note:** The \`solve(arr)\` adapter returns the inverted tree as a level-order array.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };
const treeToArr = root => { if(!root)return[]; const res=[],q=[root]; while(q.length){const n=q.shift();res.push(n?n.val:null);if(n){q.push(n.left);q.push(n.right);}} while(res.length&&res[res.length-1]===null)res.pop(); return res; };

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {

}

// Test adapter (do not remove)
function solve(arr) { return treeToArr(invertTree(buildTree(arr))); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

def tree_to_arr(root):
    if not root: return []
    res=[]; q=[root]
    while q:
        node=q.pop(0); res.append(node.val if node else None)
        if node: q.append(node.left); q.append(node.right)
    while res and res[-1] is None: res.pop()
    return res

class Solution:
    def invertTree(self, root):
        pass

def solve(arr): return tree_to_arr(Solution().invertTree(build_tree(arr)))`,
    testCases: [
      { label: 'Example 1', args: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] },
      { label: 'Simple', args: [[2,1,3]], expected: [2,3,1] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Single', args: [[1]], expected: [1] },
    ],
    hint: 'Swap left and right children for every node, then recursively invert each subtree.',
  },

  102: {
    id: 102,
    title: 'Binary Tree Level Order Traversal',
    titleZh: '二叉树的层序遍历',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-tree-level-order-traversal',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **level order traversal** of its nodes' values (i.e., from left to right, level by level).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {

}

// Test adapter (do not remove)
function solve(arr) { return levelOrder(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def levelOrder(self, root) -> list[list[int]]:
        pass

def solve(arr): return Solution().levelOrder(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] },
      { label: 'Single', args: [[1]], expected: [[1]] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Two levels', args: [[1,2,3]], expected: [[1],[2,3]] },
    ],
    hint: 'Use a queue (BFS). Process nodes level by level. At each level, record the size of the queue, then process exactly that many nodes.',
  },

  103: {
    id: 103,
    title: 'Binary Tree Zigzag Level Order Traversal',
    titleZh: '二叉树的锯齿形层序遍历',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-tree-zigzag-level-order-traversal',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **zigzag level order traversal** of its nodes' values (i.e., from left to right, then right to left for the next level and alternate between).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function zigzagLevelOrder(root) {

}

// Test adapter (do not remove)
function solve(arr) { return zigzagLevelOrder(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def zigzagLevelOrder(self, root) -> list[list[int]]:
        pass

def solve(arr): return Solution().zigzagLevelOrder(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[3,9,20,null,null,15,7]], expected: [[3],[20,9],[15,7]] },
      { label: 'Single', args: [[1]], expected: [[1]] },
      { label: 'Empty', args: [[]], expected: [] },
    ],
    hint: 'BFS level by level. Track a left-to-right boolean. Reverse odd levels before appending to result.',
  },

  199: {
    id: 199,
    title: 'Binary Tree Right Side View',
    titleZh: '二叉树的右视图',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-tree-right-side-view',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.`,
    examples: [
      { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
      { input: 'root = [1,null,3]', output: '[1,3]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {

}

// Test adapter (do not remove)
function solve(arr) { return rightSideView(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def rightSideView(self, root) -> list[int]:
        pass

def solve(arr): return Solution().rightSideView(build_tree(arr))`,
    testCases: [
      { label: 'Example 1', args: [[1,2,3,null,5,null,4]], expected: [1,3,4] },
      { label: 'Right only', args: [[1,null,3]], expected: [1,3] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Single', args: [[1]], expected: [1] },
    ],
    hint: 'BFS level by level. The rightmost node of each level is visible from the right side.',
  },

  98: {
    id: 98,
    title: 'Validate Binary Search Tree',
    titleZh: '验证二叉搜索树',
    difficulty: 'Medium',
    leetcodeSlug: 'validate-binary-search-tree',
    tags: ['Tree', 'DFS', 'BST', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, determine if it is a valid **binary search tree (BST)**.

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node\'s value is 5 but its right child\'s value is 4.' },
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {

}

// Test adapter (do not remove)
function solve(arr) { return isValidBST(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def build_tree(arr):
    if not arr: return None
    root=TreeNode(arr[0]); q=[root]; i=1
    while i<len(arr):
        node=q.pop(0)
        if i<len(arr) and arr[i] is not None: node.left=TreeNode(arr[i]); q.append(node.left)
        i+=1
        if i<len(arr) and arr[i] is not None: node.right=TreeNode(arr[i]); q.append(node.right)
        i+=1
    return root

class Solution:
    def isValidBST(self, root) -> bool:
        pass

def solve(arr): return Solution().isValidBST(build_tree(arr))`,
    testCases: [
      { label: 'Valid BST', args: [[2,1,3]], expected: true },
      { label: 'Invalid BST', args: [[5,1,4,null,null,3,6]], expected: false },
      { label: 'Duplicate values', args: [[1,1]], expected: false },
      { label: 'Single node', args: [[1]], expected: true },
    ],
    hint: 'Pass min and max bounds down the recursion. Each node\'s value must be strictly between its inherited bounds.',
  },

  215: {
    id: 215,
    title: 'Kth Largest Element in an Array',
    titleZh: '数组中的第K个最大元素',
    difficulty: 'Medium',
    leetcodeSlug: 'kth-largest-element-in-an-array',
    tags: ['Array', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the **k-th largest element** in the array.

Note that it is the k-th largest element in the sorted order, not the k-th distinct element.`,
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {

}`,
    starterCodePython: `class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        pass`,
    testCases: [
      { label: 'k=2', args: [[3,2,1,5,6,4], 2], expected: 5 },
      { label: 'k=4', args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
      { label: 'Single element', args: [[1], 1], expected: 1 },
      { label: 'Negatives', args: [[-1,-2,3,0,1], 2], expected: 1 },
    ],
    hint: 'Use a min-heap of size k. Iterate through nums, push each element. When heap exceeds k, pop the minimum. The heap\'s minimum is the kth largest.',
  },

  347: {
    id: 347,
    title: 'Top K Frequent Elements',
    titleZh: '前K个高频元素',
    difficulty: 'Medium',
    leetcodeSlug: 'top-k-frequent-elements',
    tags: ['Array', 'Hash Table', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the **k most frequent elements**. You may return the answer in any order.

**Note:** For testing purposes, the \`solve\` function returns results sorted in ascending order.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, number of unique elements]'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {

}

function solve(nums, k) {
  return topKFrequent(nums, k).slice().sort((a, b) => a - b)
}`,
    starterCodePython: `class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        pass

def solve(nums, k): return sorted(Solution().topKFrequent(nums, k))`,
    testCases: [
      { label: 'k=2', args: [[1,1,1,2,2,3], 2], expected: [1,2] },
      { label: 'Single', args: [[1], 1], expected: [1] },
      { label: 'Tie freq', args: [[4,1,-1,2,-1,2,3], 2], expected: [-1,2] },
    ],
    hint: 'Count frequencies with a hash map. Use a min-heap of size k tracking (freq, num). When heap exceeds k, pop. Return remaining elements.',
  },

  200: {
    id: 200,
    title: 'Number of Islands',
    titleZh: '岛屿数量',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-islands',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the **number of islands**.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\''],
    starterCode: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {

}`,
    starterCodePython: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        pass`,
    testCases: [
      { label: '1 island', args: [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]], expected: 1 },
      { label: '3 islands', args: [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]], expected: 3 },
      { label: 'All water', args: [[["0","0"],["0","0"]]], expected: 0 },
      { label: 'All land', args: [[["1","1"],["1","1"]]], expected: 1 },
    ],
    hint: 'Use DFS/BFS. When you find a \'1\', increment count and flood-fill all connected \'1\'s to \'0\' (mark visited). Repeat until grid is fully scanned.',
  },

  207: {
    id: 207,
    title: 'Course Schedule',
    titleZh: '课程表',
    difficulty: 'Medium',
    leetcodeSlug: 'course-schedule',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    description: `There are \`numCourses\` courses labeled \`0\` to \`numCourses - 1\`. You are given \`prerequisites[i] = [a, b]\` meaning you must take course \`b\` before course \`a\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Circular dependency.' },
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', '0 <= a, b < numCourses'],
    starterCode: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {

}`,
    starterCodePython: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        pass`,
    testCases: [
      { label: 'Possible', args: [2, [[1,0]]], expected: true },
      { label: 'Cycle', args: [2, [[1,0],[0,1]]], expected: false },
      { label: 'No prereqs', args: [3, []], expected: true },
      { label: 'Chain', args: [4, [[1,0],[2,1],[3,2]]], expected: true },
      { label: 'Cycle in chain', args: [3, [[1,0],[2,1],[0,2]]], expected: false },
    ],
    hint: 'Build adjacency list. DFS with 3 states per node: 0=unvisited, 1=in-progress (on current path), 2=done. If you reach a node with state 1, there\'s a cycle.',
  },

  547: {
    id: 547,
    title: 'Number of Provinces',
    titleZh: '省份数量',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-provinces',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    description: `There are \`n\` cities. \`isConnected[i][j] = 1\` if city \`i\` and city \`j\` are directly connected. A **province** is a group of directly or indirectly connected cities.

Return the total number of provinces.`,
    examples: [
      { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
      { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' },
    ],
    constraints: ['1 <= n <= 200', 'n == isConnected.length', 'n == isConnected[i].length', 'isConnected[i][j] is 1 or 0', 'isConnected[i][i] == 1'],
    starterCode: `/**
 * @param {number[][]} isConnected
 * @return {number}
 */
function findCircleNum(isConnected) {

}`,
    starterCodePython: `class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        pass`,
    testCases: [
      { label: '2 provinces', args: [[[1,1,0],[1,1,0],[0,0,1]]], expected: 2 },
      { label: '3 provinces', args: [[[1,0,0],[0,1,0],[0,0,1]]], expected: 3 },
      { label: 'All connected', args: [[[1,1,1],[1,1,1],[1,1,1]]], expected: 1 },
    ],
    hint: 'Union-Find: initialize n parents. For each pair (i,j) where isConnected[i][j]==1, union i and j. Count nodes where parent[i]==i (unique roots).',
  },

  684: {
    id: 684,
    title: 'Redundant Connection',
    titleZh: '冗余连接',
    difficulty: 'Medium',
    leetcodeSlug: 'redundant-connection',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find', 'Graph'],
    description: `A tree is an undirected graph that is connected and has no cycles. Given a graph with one extra edge added, return the edge that can be removed to restore the tree.

If there are multiple answers, return the one that occurs **last** in the input.`,
    examples: [
      { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]' },
      { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]' },
    ],
    constraints: ['n == edges.length', '3 <= n <= 1000', '1 <= a < b <= n', 'No repeated edges'],
    starterCode: `/**
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {

}`,
    starterCodePython: `class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        pass`,
    testCases: [
      { label: 'Example 1', args: [[[1,2],[1,3],[2,3]]], expected: [2,3] },
      { label: 'Example 2', args: [[[1,2],[2,3],[3,4],[1,4],[1,5]]], expected: [1,4] },
      { label: 'Triangle', args: [[[1,2],[2,3],[1,3]]], expected: [1,3] },
    ],
    hint: 'Union-Find: process edges in order. For each edge [u,v], check if find(u)==find(v). If yes, this edge creates a cycle — return it. Otherwise, union u and v.',
  },

  1584: {
    id: 1584,
    title: 'Min Cost to Connect All Points',
    titleZh: '连接所有点的最小费用',
    difficulty: 'Medium',
    leetcodeSlug: 'min-cost-to-connect-all-points',
    tags: ['Array', 'Union Find', 'Minimum Spanning Tree'],
    description: `You are given \`points[i] = [x, y]\`. The cost of connecting two points is their **Manhattan distance**: \`|x1-x2| + |y1-y2|\`.

Return the **minimum cost** to connect all points (build a minimum spanning tree).`,
    examples: [
      { input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' },
      { input: 'points = [[3,12],[-2,5],[-4,1]]', output: '18' },
    ],
    constraints: ['1 <= points.length <= 1000', '-10^6 <= x, y <= 10^6', 'All points are distinct'],
    starterCode: `/**
 * @param {number[][]} points
 * @return {number}
 */
function minCostConnectPoints(points) {

}`,
    starterCodePython: `class Solution:
    def minCostConnectPoints(self, points: list[list[int]]) -> int:
        pass`,
    testCases: [
      { label: '5 points', args: [[[0,0],[2,2],[3,10],[5,2],[7,0]]], expected: 20 },
      { label: '3 points', args: [[[3,12],[-2,5],[-4,1]]], expected: 18 },
      { label: '2 points', args: [[[0,0],[1,1]]], expected: 2 },
      { label: 'Collinear', args: [[[0,0],[0,1],[0,2]]], expected: 2 },
    ],
    hint: 'Prim\'s MST: maintain a minDist array (cheapest edge to each unvisited node). Start from node 0. Greedily pick the unvisited node with minimum distance, then update distances to its neighbors.',
  },

  46: {
    id: 46,
    title: 'Permutations',
    titleZh: '全排列',
    difficulty: 'Medium',
    leetcodeSlug: 'permutations',
    tags: ['Array', 'Backtracking'],
    description: `Given an array \`nums\` of distinct integers, return all possible **permutations**. You can return the answer in any order.

**Note:** For testing purposes, the \`solve\` function returns permutations sorted lexicographically.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
    ],
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All integers are unique'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {

}

function solve(nums) {
  return permute(nums).sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1)
}`,
    starterCodePython: `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        pass

def solve(nums): return sorted(Solution().permute(nums))`,
    testCases: [
      { label: '[1,2,3]', args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { label: '[0,1]', args: [[0,1]], expected: [[0,1],[1,0]] },
      { label: 'Single', args: [[1]], expected: [[1]] },
    ],
    hint: 'Backtracking: maintain a "used" boolean array and current path. At each step, try all unused numbers. When path length == nums.length, add to result.',
  },

  47: {
    id: 47,
    title: 'Permutations II',
    titleZh: '全排列 II',
    difficulty: 'Medium',
    leetcodeSlug: 'permutations-ii',
    tags: ['Array', 'Backtracking'],
    description: `Given a collection of numbers \`nums\` that might contain **duplicates**, return all possible **unique permutations** in any order.

**Note:** For testing purposes, the \`solve\` function returns permutations sorted lexicographically.`,
    examples: [
      { input: 'nums = [1,1,2]', output: '[[1,1,2],[1,2,1],[2,1,1]]' },
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
    ],
    constraints: ['1 <= nums.length <= 8', '-10 <= nums[i] <= 10'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permuteUnique(nums) {

}

function solve(nums) {
  return permuteUnique(nums).sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1)
}`,
    starterCodePython: `class Solution:
    def permuteUnique(self, nums: list[int]) -> list[list[int]]:
        pass

def solve(nums): return sorted(Solution().permuteUnique(nums))`,
    testCases: [
      { label: '[1,1,2]', args: [[1,1,2]], expected: [[1,1,2],[1,2,1],[2,1,1]] },
      { label: '[1,2,3]', args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { label: 'All same', args: [[1,1]], expected: [[1,1]] },
    ],
    hint: 'Sort nums first. Use backtracking with a "used" boolean array. Skip duplicates: if nums[i]==nums[i-1] and !used[i-1], skip to avoid duplicate permutations.',
  },

  77: {
    id: 77,
    title: 'Combinations',
    titleZh: '组合',
    difficulty: 'Medium',
    leetcodeSlug: 'combinations',
    tags: ['Backtracking'],
    description: `Given two integers \`n\` and \`k\`, return all possible combinations of \`k\` numbers chosen from the range \`[1, n]\`.

**Note:** For testing purposes, the \`solve\` function returns combinations sorted lexicographically.`,
    examples: [
      { input: 'n = 4, k = 2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]' },
      { input: 'n = 1, k = 1', output: '[[1]]' },
    ],
    constraints: ['1 <= n <= 20', '1 <= k <= n'],
    starterCode: `/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function combine(n, k) {

}

function solve(n, k) {
  return combine(n, k).sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1)
}`,
    starterCodePython: `class Solution:
    def combine(self, n: int, k: int) -> list[list[int]]:
        pass

def solve(n, k): return sorted(Solution().combine(n, k))`,
    testCases: [
      { label: 'n=4,k=2', args: [4, 2], expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] },
      { label: 'n=1,k=1', args: [1, 1], expected: [[1]] },
      { label: 'n=3,k=3', args: [3, 3], expected: [[1,2,3]] },
      { label: 'n=4,k=3', args: [4, 3], expected: [[1,2,3],[1,2,4],[1,3,4],[2,3,4]] },
    ],
    hint: 'Backtracking: start from number `start`, try each number from start to n. Prune: if remaining numbers < k-path.length, stop early.',
  },

  78: {
    id: 78,
    title: 'Subsets',
    titleZh: '子集',
    difficulty: 'Medium',
    leetcodeSlug: 'subsets',
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    description: `Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets.

**Note:** For testing purposes, the \`solve\` function returns subsets sorted lexicographically.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' },
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All numbers are unique'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {

}

function solve(nums) {
  return subsets(nums).sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1)
}`,
    starterCodePython: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        pass

def solve(nums): return sorted(Solution().subsets(nums))`,
    testCases: [
      { label: '[1,2,3]', args: [[1,2,3]], expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]] },
      { label: 'Single', args: [[0]], expected: [[],[0]] },
      { label: '[1,2]', args: [[1,2]], expected: [[],[1],[1,2],[2]] },
    ],
    hint: 'Backtracking: include the current element in path, recurse, then exclude it. Add the current path to result at every step (not just leaf nodes).',
  },

  51: {
    id: 51,
    title: 'N-Queens',
    titleZh: 'N 皇后',
    difficulty: 'Hard',
    leetcodeSlug: 'n-queens',
    tags: ['Array', 'Backtracking'],
    description: `Place \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other (no same row, column, or diagonal).

Return all distinct solutions. Each solution is a list of strings where \`'Q'\` is a queen and \`'.'\` is empty.

**Note:** For testing purposes, the \`solve\` function returns solutions sorted lexicographically.`,
    examples: [
      { input: 'n = 4', output: '[["..Q.","Q...","...Q",".Q.."],[ ".Q..","...Q","Q...","..Q."]]' },
      { input: 'n = 1', output: '[["Q"]]' },
    ],
    constraints: ['1 <= n <= 9'],
    starterCode: `/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {

}

function solve(n) {
  return solveNQueens(n).sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1)
}`,
    starterCodePython: `class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        pass

def solve(n): return sorted(Solution().solveNQueens(n))`,
    testCases: [
      { label: 'n=4', args: [4], expected: [["..Q.","Q...","...Q",".Q.."],[ ".Q..","...Q","Q...","..Q."]] },
      { label: 'n=1', args: [1], expected: [["Q"]] },
    ],
    hint: 'Backtrack row by row. For each row, try each column. Use sets to track used columns, diagonals (row-col), anti-diagonals (row+col). Build board string when n queens placed.',
  },

  322: {
    id: 322,
    title: 'Coin Change',
    titleZh: '零钱兑换',
    difficulty: 'Medium',
    leetcodeSlug: 'coin-change',
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    description: `You are given integer array \`coins\` (coin denominations) and integer \`amount\`.

Return the **fewest number of coins** needed to make up \`amount\`. If not possible, return \`-1\`.

You have an infinite number of each coin.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    starterCode: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {

}`,
    starterCodePython: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        pass`,
    testCases: [
      { label: 'coins=[1,2,5],amount=11', args: [[1,2,5], 11], expected: 3 },
      { label: 'No solution', args: [[2], 3], expected: -1 },
      { label: 'amount=0', args: [[1], 0], expected: 0 },
      { label: 'coins=[2,5,10,1],amount=27', args: [[2,5,10,1], 27], expected: 4 },
    ],
    hint: 'Classic unbounded knapsack. dp[i] = min coins for amount i. Initialize dp[0]=0, dp[1..amount]=Infinity. For each amount i and each coin: dp[i] = min(dp[i], dp[i-coin]+1).',
  },

  518: {
    id: 518,
    title: 'Coin Change II',
    titleZh: '零钱兑换 II',
    difficulty: 'Medium',
    leetcodeSlug: 'coin-change-ii',
    tags: ['Array', 'Dynamic Programming'],
    description: `Given integer array \`coins\` and integer \`amount\`, return the **number of combinations** that make up that amount.

You have an infinite number of each coin.`,
    examples: [
      { input: 'amount = 5, coins = [1,2,5]', output: '4', explanation: '5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1' },
      { input: 'amount = 3, coins = [2]', output: '0' },
      { input: 'amount = 10, coins = [10]', output: '1' },
    ],
    constraints: ['1 <= coins.length <= 300', '1 <= coins[i] <= 5000', 'All coin values are unique', '0 <= amount <= 5000'],
    starterCode: `/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
function change(amount, coins) {

}`,
    starterCodePython: `class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        pass`,
    testCases: [
      { label: 'amount=5, coins=[1,2,5]', args: [5, [1,2,5]], expected: 4 },
      { label: 'No combination', args: [3, [2]], expected: 0 },
      { label: 'amount=10, coins=[10]', args: [10, [10]], expected: 1 },
      { label: 'amount=0', args: [0, [1,2,3]], expected: 1 },
    ],
    hint: 'Unbounded knapsack counting. dp[i] = ways to make amount i. dp[0]=1. For each coin (outer loop), for each amount i from coin to amount (inner): dp[i] += dp[i-coin].',
  },

  416: {
    id: 416,
    title: 'Partition Equal Subset Sum',
    titleZh: '分割等和子集',
    difficulty: 'Medium',
    leetcodeSlug: 'partition-equal-subset-sum',
    tags: ['Array', 'Dynamic Programming'],
    description: `Given integer array \`nums\`, return \`true\` if you can partition it into two subsets with **equal sum**, or \`false\` otherwise.`,
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11]' },
      { input: 'nums = [1,2,3,5]', output: 'false' },
    ],
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {

}`,
    starterCodePython: `class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        pass`,
    testCases: [
      { label: '[1,5,11,5]', args: [[1,5,11,5]], expected: true },
      { label: '[1,2,3,5]', args: [[1,2,3,5]], expected: false },
      { label: 'Odd sum', args: [[1,2,4]], expected: false },
      { label: '[3,3,3,4,5]', args: [[3,3,3,4,5]], expected: true },
    ],
    hint: '0/1 knapsack. Target = sum/2 (return false if odd). dp[j] = can we achieve sum j? dp[0]=true. For each num, iterate j from target down to num: dp[j] |= dp[j-num].',
  },

  494: {
    id: 494,
    title: 'Target Sum',
    titleZh: '目标和',
    difficulty: 'Medium',
    leetcodeSlug: 'target-sum',
    tags: ['Array', 'Dynamic Programming', 'Backtracking'],
    description: `You are given integer array \`nums\` and integer \`target\`. Assign \`+\` or \`-\` to each number. Return the **number of ways** to build an expression that evaluates to \`target\`.`,
    examples: [
      { input: 'nums = [1,1,1,1,1], target = 3', output: '5' },
      { input: 'nums = [1], target = 1', output: '1' },
    ],
    constraints: ['1 <= nums.length <= 20', '0 <= nums[i] <= 1000', '0 <= sum(nums) <= 1000', '-1000 <= target <= 1000'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findTargetSumWays(nums, target) {

}`,
    starterCodePython: `class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        pass`,
    testCases: [
      { label: '[1,1,1,1,1], target=3', args: [[1,1,1,1,1], 3], expected: 5 },
      { label: '[1], target=1', args: [[1], 1], expected: 1 },
      { label: '[1], target=-1', args: [[1], -1], expected: 1 },
      { label: 'Zeros', args: [[0,0,0,0,0,0,0,0,1], 1], expected: 256 },
    ],
    hint: 'DP with hash map: dp[sum] = ways to achieve sum. Start dp[0]=1. For each num, create new_dp: new_dp[s+num]+=dp[s], new_dp[s-num]+=dp[s]. Return dp[target] at end.',
  },

  1049: {
    id: 1049,
    title: 'Last Stone Weight II',
    titleZh: '最后一块石头的重量 II',
    difficulty: 'Medium',
    leetcodeSlug: 'last-stone-weight-ii',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given an array \`stones\`. On each turn, smash any two stones: if weights are x ≤ y, weight y-x remains (or both destroyed if equal). Return the **smallest possible remaining weight**.`,
    examples: [
      { input: 'stones = [2,7,4,1,8,1]', output: '1' },
      { input: 'stones = [31,26,33,21,40]', output: '5' },
    ],
    constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 100'],
    starterCode: `/**
 * @param {number[]} stones
 * @return {number}
 */
function lastStoneWeightII(stones) {

}`,
    starterCodePython: `class Solution:
    def lastStoneWeightII(self, stones: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[2,7,4,1,8,1]', args: [[2,7,4,1,8,1]], expected: 1 },
      { label: '[31,26,33,21,40]', args: [[31,26,33,21,40]], expected: 5 },
      { label: 'Single', args: [[1]], expected: 1 },
      { label: 'Two equal', args: [[2,2]], expected: 0 },
    ],
    hint: 'Partition stones into two groups minimizing |sum(A)-sum(B)|. This equals: find largest subset sum <= total/2. 0/1 knapsack: dp[j]=achievable? Answer = total - 2*max achievable.',
  },

  // ── Batch B1 ─────────────────────────────────────────────────────────────

  61: {
    id: 61,
    title: 'Rotate List',
    titleZh: '旋转链表',
    difficulty: 'Medium',
    leetcodeSlug: 'rotate-list',
    tags: ['Linked List', 'Two Pointers'],
    description: `Given the head of a linked list, rotate the list to the **right** by \`k\` places.

**Note:** \`solve(arr, k)\` converts array → list → array for testing.`,
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[4,5,1,2,3]' },
      { input: 'head = [0,1,2], k = 4', output: '[2,0,1]' },
    ],
    constraints: ['The number of nodes in the list is in the range [0, 500].', '-100 <= Node.val <= 100', '0 <= k <= 2 * 10^9'],
    starterCode: `class ListNode {
  constructor(val, next) { this.val = val===undefined?0:val; this.next = next===undefined?null:next; }
}
const buildList = arr => { if(!arr?.length)return null; let h=new ListNode(arr[0]),c=h; for(let i=1;i<arr.length;i++){c.next=new ListNode(arr[i]);c=c.next;} return h; };
const listToArr = h => { const r=[]; while(h){r.push(h.val);h=h.next;} return r; };

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function rotateRight(head, k) {

}

// Test adapter (do not remove)
function solve(arr, k) { return listToArr(rotateRight(buildList(arr), k)); }`,
    starterCodePython: `class ListNode:
    def __init__(self, val=0, next=None): self.val = val; self.next = next

def build_list(arr):
    if not arr: return None
    head = ListNode(arr[0]); cur = head
    for v in arr[1:]: cur.next = ListNode(v); cur = cur.next
    return head

def list_to_arr(head):
    res = []
    while head: res.append(head.val); head = head.next
    return res

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        pass

def solve(arr, k): return list_to_arr(Solution().rotateRight(build_list(arr), k))`,
    testCases: [
      { label: '[1,2,3,4,5], k=2', args: [[1,2,3,4,5], 2], expected: [4,5,1,2,3] },
      { label: '[0,1,2], k=4', args: [[0,1,2], 4], expected: [2,0,1] },
      { label: 'Empty', args: [[], 0], expected: [] },
      { label: 'Single, k=1', args: [[1], 1], expected: [1] },
      { label: 'k=0', args: [[1,2,3], 0], expected: [1,2,3] },
    ],
    hint: 'Find length n, reduce k = k % n. Connect tail to head (circular). Walk (n - k) steps to find new tail; newHead = newTail.next; newTail.next = null.',
  },

  901: {
    id: 901,
    title: 'Online Stock Span',
    titleZh: '股票价格跨度',
    difficulty: 'Medium',
    leetcodeSlug: 'online-stock-span',
    tags: ['Stack', 'Design', 'Monotonic Stack', 'Data Stream'],
    description: `Design an algorithm that collects daily price quotes and returns the **span** of the stock's price for the current day.

The span is the number of consecutive days (ending today) where the price was **≤ today's price**.

**Note:** \`solve(prices)\` creates a \`StockSpanner\`, calls \`next\` on each price, and returns all spans.`,
    examples: [
      { input: 'prices = [100,80,60,70,60,75,85]', output: '[1,1,1,2,1,4,6]' },
    ],
    constraints: ['1 <= price <= 10^5', 'At most 10^4 calls to next.'],
    starterCode: `var StockSpanner = function() {

};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {

};

// Test adapter (do not remove)
function solve(prices) {
  const s = new StockSpanner();
  return prices.map(p => s.next(p));
}`,
    starterCodePython: `class StockSpanner:
    def __init__(self):
        pass

    def next(self, price: int) -> int:
        pass

def solve(prices):
    s = StockSpanner()
    return [s.next(p) for p in prices]`,
    testCases: [
      { label: '[100,80,60,70,60,75,85]', args: [[100,80,60,70,60,75,85]], expected: [1,1,1,2,1,4,6] },
      { label: '[30,40,100,90,110]', args: [[30,40,100,90,110]], expected: [1,2,3,1,5] },
      { label: 'All same', args: [[5,5,5,5]], expected: [1,2,3,4] },
      { label: 'Descending', args: [[5,4,3,2,1]], expected: [1,1,1,1,1] },
    ],
    hint: 'Monotonic stack of (price, span) pairs. For each new price, pop all entries with price ≤ current, accumulating spans. Push (currentPrice, totalSpan). O(1) amortized.',
  },

  523: {
    id: 523,
    title: 'Continuous Subarray Sum',
    titleZh: '连续的子数组和',
    difficulty: 'Medium',
    leetcodeSlug: 'continuous-subarray-sum',
    tags: ['Array', 'Hash Table', 'Math', 'Prefix Sum'],
    description: `Given an integer array \`nums\` and integer \`k\`, return \`true\` if \`nums\` has a **good subarray** — length **≥ 2** with sum that is a **multiple of k**.`,
    examples: [
      { input: 'nums = [23,2,4,6,7], k = 6', output: 'true', explanation: '[2,4] sums to 6.' },
      { input: 'nums = [23,2,6,4,7], k = 6', output: 'true', explanation: '[23,2,6,4,7] sums to 42.' },
      { input: 'nums = [23,2,6,4,7], k = 13', output: 'false' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '0 <= nums[i] <= 10^9', '1 <= k <= 2^31 - 1'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function checkSubarraySum(nums, k) {

}`,
    starterCodePython: `class Solution:
    def checkSubarraySum(self, nums: list[int], k: int) -> bool:
        pass`,
    testCases: [
      { label: '[23,2,4,6,7], k=6', args: [[23,2,4,6,7], 6], expected: true },
      { label: '[23,2,6,4,7], k=6', args: [[23,2,6,4,7], 6], expected: true },
      { label: '[23,2,6,4,7], k=13', args: [[23,2,6,4,7], 13], expected: false },
      { label: '[0,0], k=1', args: [[0,0], 1], expected: true },
      { label: '[1,0], k=2', args: [[1,0], 2], expected: false },
    ],
    hint: 'Prefix sum mod k. If prefix[j] % k == prefix[i] % k and j-i >= 2, then sum(i+1..j) is a multiple of k. Store first index of each remainder (seed {0: -1}). When same remainder seen again with gap ≥ 2, return true.',
  },

  525: {
    id: 525,
    title: 'Contiguous Array',
    titleZh: '连续数组',
    difficulty: 'Medium',
    leetcodeSlug: 'contiguous-array',
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
    description: `Given a binary array \`nums\`, return the maximum length of a contiguous subarray with **equal numbers of 0s and 1s**.`,
    examples: [
      { input: 'nums = [0,1]', output: '2' },
      { input: 'nums = [0,1,0]', output: '2', explanation: '[0,1] or [1,0].' },
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1.'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxLength(nums) {

}`,
    starterCodePython: `class Solution:
    def findMaxLength(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[0,1]', args: [[0,1]], expected: 2 },
      { label: '[0,1,0]', args: [[0,1,0]], expected: 2 },
      { label: '[0,0,0,1,1,1]', args: [[0,0,0,1,1,1]], expected: 6 },
      { label: '[0,1,1,0,1,1,1,0]', args: [[0,1,1,0,1,1,1,0]], expected: 4 },
      { label: 'All zeros', args: [[0,0,0]], expected: 0 },
    ],
    hint: 'Replace 0s with -1s. Now find longest subarray with sum 0. Use prefix sum + map: if prefix[i] == prefix[j], subarray (i+1..j) has sum 0. Map stores first occurrence index of each prefix sum (seed {0: -1}).',
  },

  724: {
    id: 724,
    title: 'Find Pivot Index',
    titleZh: '寻找数组的中心下标',
    difficulty: 'Easy',
    leetcodeSlug: 'find-pivot-index',
    tags: ['Array', 'Prefix Sum'],
    description: `Given array \`nums\`, return the **leftmost pivot index** — the index where the sum of all numbers **strictly to the left** equals the sum **strictly to the right**.

Return \`-1\` if no such index exists.`,
    examples: [
      { input: 'nums = [1,7,3,6,5,6]', output: '3', explanation: 'leftSum = 11, rightSum = 11.' },
      { input: 'nums = [1,2,3]', output: '-1' },
      { input: 'nums = [2,1,-1]', output: '0', explanation: 'leftSum = 0, rightSum = 0.' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-1000 <= nums[i] <= 1000'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function pivotIndex(nums) {

}`,
    starterCodePython: `class Solution:
    def pivotIndex(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[1,7,3,6,5,6]', args: [[1,7,3,6,5,6]], expected: 3 },
      { label: '[1,2,3]', args: [[1,2,3]], expected: -1 },
      { label: '[2,1,-1]', args: [[2,1,-1]], expected: 0 },
      { label: '[0]', args: [[0]], expected: 0 },
      { label: '[-1,-1,-1,-1,-1,0]', args: [[-1,-1,-1,-1,-1,0]], expected: 2 },
    ],
    hint: 'Compute total sum. For each i, leftSum = running sum before i, rightSum = total - leftSum - nums[i]. Return i when leftSum == rightSum.',
  },

  1016: {
    id: 1016,
    title: 'Binary String With Substrings Representing 1 to N',
    titleZh: '子串能表示从 1 到 N 数字的二进制串',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-string-with-substrings-representing-1-to-n',
    tags: ['String'],
    description: `Given a binary string \`s\` and a positive integer \`n\`, return \`true\` if the binary representations of **all** integers in the range \`[1, n]\` are **substrings** of \`s\`.`,
    examples: [
      { input: 's = "0110", n = 3', output: 'true', explanation: '"1", "10", "11" are all substrings.' },
      { input: 's = "0110", n = 4', output: 'false', explanation: '"100" is not a substring.' },
    ],
    constraints: ['1 <= s.length <= 1000', '1 <= n <= 10^9'],
    starterCode: `/**
 * @param {string} s
 * @param {number} n
 * @return {boolean}
 */
function queryString(s, n) {

}`,
    starterCodePython: `class Solution:
    def queryString(self, s: str, n: int) -> bool:
        pass`,
    testCases: [
      { label: '"0110", n=3', args: ['0110', 3], expected: true },
      { label: '"0110", n=4', args: ['0110', 4], expected: false },
      { label: '"1", n=1', args: ['1', 1], expected: true },
      { label: '"11", n=2', args: ['11', 2], expected: false },
      { label: '"11011", n=3', args: ['11011', 3], expected: true },
    ],
    hint: 'Key insight: if n > 2*s.length, return false immediately (pigeonhole). Otherwise check each i from 1..n: convert i to binary and test s.includes(i.toString(2)).',
  },

  1219: {
    id: 1219,
    title: 'Path with Maximum Gold',
    titleZh: '黄金矿工',
    difficulty: 'Medium',
    leetcodeSlug: 'path-with-maximum-gold',
    tags: ['Array', 'Backtracking', 'Matrix'],
    description: `In a gold mine \`grid\`, each cell has gold (0 = no gold). Starting at any non-zero cell, move in 4 directions without revisiting. Stop at 0 or boundary.

Return the **maximum gold** collectible.`,
    examples: [
      { input: 'grid = [[0,6,0],[5,8,7],[0,9,0]]', output: '24', explanation: '9 → 8 → 7.' },
      { input: 'grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]', output: '28' },
    ],
    constraints: ['1 <= m, n <= 15', '0 <= grid[i][j] <= 100', 'At most 25 non-zero cells.'],
    starterCode: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function getMaximumGold(grid) {

}`,
    starterCodePython: `class Solution:
    def getMaximumGold(self, grid: list[list[int]]) -> int:
        pass`,
    testCases: [
      { label: '[[0,6,0],[5,8,7],[0,9,0]]', args: [[[0,6,0],[5,8,7],[0,9,0]]], expected: 24 },
      { label: '[[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]', args: [[[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]], expected: 28 },
      { label: '[[1]]', args: [[[1]]], expected: 1 },
      { label: '[[0,1],[0,0]]', args: [[[0,1],[0,0]]], expected: 1 },
    ],
    hint: 'DFS + backtracking. From each non-zero cell, set cell to 0, recurse in 4 directions, restore cell. Track max gold. O(4^25) bounded by at-most-25 non-zero cells.',
  },

  1242: {
    id: 1242,
    title: 'Web Crawler Multithreaded',
    titleZh: '多线程网页爬虫',
    difficulty: 'Hard',
    leetcodeSlug: 'web-crawler-multithreaded',
    tags: ['Depth-First Search', 'Breadth-First Search', 'Concurrency'],
    description: `Given a \`startUrl\` and a \`HtmlParser\` interface (\`getUrls(url)\`), crawl all URLs with the **same hostname** as \`startUrl\`. Return all visited URLs in any order.

Hostname = the URL up to and including the 3rd \`/\` (e.g. \`"http://news.yahoo.com"\`).

**Note:** \`solve(startUrl, urlMap)\` uses a mock parser; result is sorted for comparison.`,
    examples: [
      { input: 'startUrl = "http://news.yahoo.com/news/topics/"', output: 'all reachable same-hostname URLs (sorted)' },
    ],
    constraints: ['1 <= urls.length <= 1000'],
    starterCode: `/**
 * @param {string} startUrl
 * @param {HtmlParser} htmlParser
 * @return {string[]}
 */
function crawl(startUrl, htmlParser) {

}

// Test adapter (do not remove)
function solve(startUrl, urlMap) {
  const htmlParser = { getUrls: url => urlMap[url] || [] };
  return crawl(startUrl, htmlParser).sort();
}`,
    starterCodePython: `class Solution:
    def crawl(self, startUrl: str, htmlParser) -> list[str]:
        pass

def solve(start_url, url_map):
    class Parser:
        def getUrls(self, url): return url_map.get(url, [])
    return sorted(Solution().crawl(start_url, Parser()))`,
    testCases: [
      {
        label: 'Basic crawl',
        args: [
          'http://news.yahoo.com/news/topics/',
          {
            'http://news.yahoo.com/news/topics/': ['http://news.yahoo.com/news/topics/', 'http://news.yahoo.com/news'],
            'http://news.yahoo.com/news': ['http://news.yahoo.com/news/topics/', 'http://news.yahoo.com/us'],
            'http://news.yahoo.com/us': [],
          },
        ],
        expected: ['http://news.yahoo.com/news', 'http://news.yahoo.com/news/topics/', 'http://news.yahoo.com/us'],
      },
      {
        label: 'Cross-domain filtered',
        args: [
          'http://news.yahoo.com/news',
          {
            'http://news.yahoo.com/news': ['http://news.yahoo.com/us', 'http://en.wikipedia.org/wiki/Internet'],
            'http://news.yahoo.com/us': [],
          },
        ],
        expected: ['http://news.yahoo.com/news', 'http://news.yahoo.com/us'],
      },
    ],
    hint: 'BFS from startUrl. Extract hostname: url.split("/").slice(0,3).join("/"). Only enqueue URLs with the same hostname. Use a visited Set. (Multithreading is optional; single-thread BFS is accepted.)',
  },

  1477: {
    id: 1477,
    title: 'Find Two Non-overlapping Sub-arrays Each With Target Sum',
    titleZh: '找两个和为目标值且不重叠的子数组',
    difficulty: 'Medium',
    leetcodeSlug: 'find-two-non-overlapping-sub-arrays-each-with-target-sum',
    tags: ['Array', 'Hash Table', 'Binary Search', 'Dynamic Programming', 'Sliding Window'],
    description: `Given array \`arr\` (all **positive**) and integer \`target\`, find two **non-overlapping** subarrays each summing to \`target\`, minimizing the sum of their lengths.

Return the **minimum total length**, or \`-1\` if impossible.`,
    examples: [
      { input: 'arr = [3,2,2,4,3], target = 3', output: '2', explanation: '[3] + [3], length 1+1.' },
      { input: 'arr = [7,3,4,7], target = 7', output: '2' },
      { input: 'arr = [4,3,2,6,2,3,4], target = 6', output: '-1' },
    ],
    constraints: ['1 <= arr.length <= 10^5', '1 <= arr[i] <= 1000', '1 <= target <= 10^8'],
    starterCode: `/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
function minSumOfLengths(arr, target) {

}`,
    starterCodePython: `class Solution:
    def minSumOfLengths(self, arr: list[int], target: int) -> int:
        pass`,
    testCases: [
      { label: '[3,2,2,4,3], target=3', args: [[3,2,2,4,3], 3], expected: 2 },
      { label: '[7,3,4,7], target=7', args: [[7,3,4,7], 7], expected: 2 },
      { label: '[4,3,2,6,2,3,4], target=6', args: [[4,3,2,6,2,3,4], 6], expected: -1 },
      { label: '[1,2,3,1,2,3], target=6', args: [[1,2,3,1,2,3], 6], expected: 6 },
      { label: '[1,1,1,2,1,1,1], target=3', args: [[1,1,1,2,1,1,1], 3], expected: 6 },
    ],
    hint: 'Sliding window (all positive) to find windows with sum=target. Maintain best[i] = min subarray length ending at or before i. For each valid window ending at r with left=l: answer = min(answer, windowLen + best[l-1]); then update best[r] = min(best[r-1], windowLen).',
  },

  370: {
    id: 370,
    title: 'Range Addition',
    titleZh: '区间加法',
    difficulty: 'Medium',
    leetcodeSlug: 'range-addition',
    tags: ['Array', 'Prefix Sum'],
    description: `You have an integer array of size \`length\` initialized with zeros. Given \`updates\` where each is \`[startIndex, endIndex, inc]\`, add \`inc\` to each element from \`startIndex\` to \`endIndex\` inclusive.

Return the modified array after all updates.`,
    examples: [
      { input: 'length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]', output: '[-2,0,3,5,3]' },
    ],
    constraints: ['1 <= length <= 10^5', '0 <= updates.length <= 10^4', '0 <= startIndex <= endIndex < length', '-1000 <= inc <= 1000'],
    starterCode: `/**
 * @param {number} length
 * @param {number[][]} updates
 * @return {number[]}
 */
function getModifiedArray(length, updates) {

}`,
    starterCodePython: `class Solution:
    def getModifiedArray(self, length: int, updates: list[list[int]]) -> list[int]:
        pass`,
    testCases: [
      { label: 'length=5, [[1,3,2],[2,4,3],[0,2,-2]]', args: [5, [[1,3,2],[2,4,3],[0,2,-2]]], expected: [-2,0,3,5,3] },
      { label: 'length=3, [[0,2,1]]', args: [3, [[0,2,1]]], expected: [1,1,1] },
      { label: 'No updates', args: [4, []], expected: [0,0,0,0] },
      { label: 'Point update', args: [5, [[2,2,5]]], expected: [0,0,5,0,0] },
    ],
    hint: 'Difference array: for update [s,e,inc], set diff[s]+=inc and diff[e+1]-=inc. After all updates, take prefix sum of diff[] to build the result. O(length + updates) total.',
  },

  28: {
    id: 28,
    title: 'Find the Index of the First Occurrence in a String',
    titleZh: '找出字符串中第一个匹配项的下标',
    difficulty: 'Easy',
    leetcodeSlug: 'find-the-index-of-the-first-occurrence-in-a-string',
    tags: ['Two Pointers', 'String', 'String Matching'],
    description: `Given two strings \`haystack\` and \`needle\`, return the index of the **first occurrence** of \`needle\` in \`haystack\`, or \`-1\` if not found.`,
    examples: [
      { input: 'haystack = "sadbutsad", needle = "sad"', output: '0' },
      { input: 'haystack = "leetcode", needle = "leeto"', output: '-1' },
    ],
    constraints: ['1 <= haystack.length, needle.length <= 10^4', 'All lowercase English letters.'],
    starterCode: `/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {

}`,
    starterCodePython: `class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        pass`,
    testCases: [
      { label: '"sadbutsad","sad"', args: ['sadbutsad', 'sad'], expected: 0 },
      { label: '"leetcode","leeto"', args: ['leetcode', 'leeto'], expected: -1 },
      { label: '"aaa","aa"', args: ['aaa', 'aa'], expected: 0 },
      { label: 'needle longer', args: ['ab', 'abc'], expected: -1 },
      { label: 'full match', args: ['hello', 'hello'], expected: 0 },
    ],
    hint: 'Sliding window of size needle.length across haystack. Check each slice. For O(n+m) use KMP: build failure function, then scan haystack without backtracking.',
  },

  187: {
    id: 187,
    title: 'Repeated DNA Sequences',
    titleZh: '重复的DNA序列',
    difficulty: 'Medium',
    leetcodeSlug: 'repeated-dna-sequences',
    tags: ['Hash Table', 'String', 'Sliding Window', 'Rolling Hash', 'Bit Manipulation'],
    description: `Given a DNA string \`s\` (A, C, G, T), return all **10-letter-long** substrings that appear **more than once**. Return in any order.

**Note:** \`solve(s)\` sorts the result for deterministic comparison.`,
    examples: [
      { input: 's = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"', output: '["AAAAACCCCC","CCCCCAAAAA"]' },
      { input: 's = "AAAAAAAAAAAAA"', output: '["AAAAAAAAAA"]' },
    ],
    constraints: ['1 <= s.length <= 10^5', 's[i] is A, C, G, or T.'],
    starterCode: `/**
 * @param {string} s
 * @return {string[]}
 */
function findRepeatedDnaSequences(s) {

}

// Test adapter — sorts result for deterministic comparison
function solve(s) { return findRepeatedDnaSequences(s).sort(); }`,
    starterCodePython: `class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        pass

def solve(s): return sorted(Solution().findRepeatedDnaSequences(s))`,
    testCases: [
      { label: 'Two repeats', args: ['AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT'], expected: ['AAAAACCCCC','CCCCCAAAAA'] },
      { label: 'One repeat', args: ['AAAAAAAAAAAAA'], expected: ['AAAAAAAAAA'] },
      { label: 'Short — no window', args: ['ACGT'], expected: [] },
      { label: 'Exactly 10 — no repeat', args: ['AAAAAAAAAA'], expected: [] },
    ],
    hint: 'Slide a window of size 10. Count each substring with a Map; add to result Set when count becomes exactly 2 (avoids duplicates at count 3+).',
  },

  81: {
    id: 81,
    title: 'Search in Rotated Sorted Array II',
    titleZh: '搜索旋转排序数组 II',
    difficulty: 'Medium',
    leetcodeSlug: 'search-in-rotated-sorted-array-ii',
    tags: ['Array', 'Binary Search'],
    description: `Given a rotated sorted array \`nums\` that may contain **duplicates** and a \`target\`, return \`true\` if \`target\` is in \`nums\`, otherwise \`false\`.`,
    examples: [
      { input: 'nums = [2,5,6,0,0,1,2], target = 0', output: 'true' },
      { input: 'nums = [2,5,6,0,0,1,2], target = 3', output: 'false' },
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i], target <= 10^4'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
function search(nums, target) {

}`,
    starterCodePython: `class Solution:
    def search(self, nums: list[int], target: int) -> bool:
        pass`,
    testCases: [
      { label: '[2,5,6,0,0,1,2], target=0', args: [[2,5,6,0,0,1,2], 0], expected: true },
      { label: '[2,5,6,0,0,1,2], target=3', args: [[2,5,6,0,0,1,2], 3], expected: false },
      { label: '[1,1,3,1], target=3', args: [[1,1,3,1], 3], expected: true },
      { label: '[1,3,1,1,1], target=3', args: [[1,3,1,1,1], 3], expected: true },
      { label: 'Single match', args: [[5], 5], expected: true },
    ],
    hint: 'Binary search with duplicate handling: when nums[lo]==nums[mid], just lo++ (cannot determine sorted half). Otherwise check which half is sorted and narrow the search range.',
  },

  392: {
    id: 392,
    title: 'Is Subsequence',
    titleZh: '判断子序列',
    difficulty: 'Easy',
    leetcodeSlug: 'is-subsequence',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    description: `Given strings \`s\` and \`t\`, return \`true\` if \`s\` is a **subsequence** of \`t\` (characters appear in order, not necessarily contiguous).`,
    examples: [
      { input: 's = "ace", t = "abcde"', output: 'true' },
      { input: 's = "aec", t = "abcde"', output: 'false' },
    ],
    constraints: ['0 <= s.length <= 100', '0 <= t.length <= 10^4', 'All lowercase letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(s, t) {

}`,
    starterCodePython: `class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        pass`,
    testCases: [
      { label: '"ace","abcde"', args: ['ace', 'abcde'], expected: true },
      { label: '"aec","abcde"', args: ['aec', 'abcde'], expected: false },
      { label: 'Empty s', args: ['', 'ahbgdc'], expected: true },
      { label: 'Same strings', args: ['abc', 'abc'], expected: true },
      { label: 's longer than t', args: ['axc', 'ah'], expected: false },
    ],
    hint: 'Two pointers: pointer i on s, j on t. Advance i when s[i]==t[j]. Always advance j. Return i==s.length when j exhausted.',
  },

  566: {
    id: 566,
    title: 'Reshape the Matrix',
    titleZh: '重塑矩阵',
    difficulty: 'Easy',
    leetcodeSlug: 'reshape-the-matrix',
    tags: ['Array', 'Matrix', 'Simulation'],
    description: `Given matrix \`mat\` and integers \`r\`, \`c\`, reshape it to \`r x c\` in row-major order. If impossible (different total elements), return the original matrix.`,
    examples: [
      { input: 'mat = [[1,2],[3,4]], r = 1, c = 4', output: '[[1,2,3,4]]' },
      { input: 'mat = [[1,2],[3,4]], r = 2, c = 4', output: '[[1,2],[3,4]]', explanation: 'Cannot reshape — return original.' },
    ],
    constraints: ['1 <= m, n <= 100', '1 <= r, c <= 300', '-1000 <= mat[i][j] <= 1000'],
    starterCode: `/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
function matrixReshape(mat, r, c) {

}`,
    starterCodePython: `class Solution:
    def matrixReshape(self, mat: list[list[int]], r: int, c: int) -> list[list[int]]:
        pass`,
    testCases: [
      { label: '[[1,2],[3,4]], r=1, c=4', args: [[[1,2],[3,4]], 1, 4], expected: [[1,2,3,4]] },
      { label: 'Impossible shape', args: [[[1,2],[3,4]], 2, 4], expected: [[1,2],[3,4]] },
      { label: '[[1,2,3],[4,5,6]], r=3, c=2', args: [[[1,2,3],[4,5,6]], 3, 2], expected: [[1,2],[3,4],[5,6]] },
      { label: 'Same shape', args: [[[1,2],[3,4]], 2, 2], expected: [[1,2],[3,4]] },
    ],
    hint: 'Check m*n == r*c. Use flat index k = row*cols+col. For each k: new[k/c][k%c] = mat[k/oldCols][k%oldCols]. Or flatten then chunk into rows of c.',
  },

  658: {
    id: 658,
    title: 'Find K Closest Elements',
    titleZh: '找到 K 个最接近的元素',
    difficulty: 'Medium',
    leetcodeSlug: 'find-k-closest-elements',
    tags: ['Array', 'Two Pointers', 'Binary Search', 'Sorting', 'Heap (Priority Queue)'],
    description: `Given a **sorted** array \`arr\`, and integers \`k\` and \`x\`, return the \`k\` closest elements to \`x\` in ascending order. When equidistant, prefer the smaller element.`,
    examples: [
      { input: 'arr = [1,2,3,4,5], k = 4, x = 3', output: '[1,2,3,4]' },
      { input: 'arr = [1,2,3,4,5], k = 4, x = -1', output: '[1,2,3,4]' },
    ],
    constraints: ['1 <= k <= arr.length <= 10^4', 'arr is sorted ascending.', '-10^4 <= arr[i], x <= 10^4'],
    starterCode: `/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
function findClosestElements(arr, k, x) {

}`,
    starterCodePython: `class Solution:
    def findClosestElements(self, arr: list[int], k: int, x: int) -> list[int]:
        pass`,
    testCases: [
      { label: '[1,2,3,4,5], k=4, x=3', args: [[1,2,3,4,5], 4, 3], expected: [1,2,3,4] },
      { label: '[1,2,3,4,5], k=4, x=-1', args: [[1,2,3,4,5], 4, -1], expected: [1,2,3,4] },
      { label: '[1,2,3,4,5], k=4, x=100', args: [[1,2,3,4,5], 4, 100], expected: [2,3,4,5] },
      { label: '[1,1,2,3,4], k=3, x=2', args: [[1,1,2,3,4], 3, 2], expected: [1,2,3] },
      { label: 'k=1', args: [[1,3,5,7,9], 1, 4], expected: [3] },
    ],
    hint: 'Binary search for left boundary lo of the k-window. Compare arr[mid] vs arr[mid+k]: if x-arr[mid] > arr[mid+k]-x, move window right (lo=mid+1). Return arr.slice(lo, lo+k).',
  },

  808: {
    id: 808,
    title: 'Soup Servings',
    titleZh: '汤',
    difficulty: 'Medium',
    leetcodeSlug: 'soup-servings',
    tags: ['Math', 'Dynamic Programming', 'Probability and Statistics'],
    description: `Two soups A and B, each starting with \`n\` ml. Four equally likely operations (each prob 0.25):
1. Serve 100ml A, 0ml B
2. Serve 75ml A, 25ml B
3. Serve 50ml A, 50ml B
4. Serve 25ml A, 75ml B

Stop when a soup runs empty. Return: **P(A empty first) + 0.5 × P(both empty simultaneously)**.

**Note:** \`solve(n)\` rounds to 5 decimal places.`,
    examples: [
      { input: 'n = 50', output: '0.62500' },
      { input: 'n = 100', output: '0.71875' },
    ],
    constraints: ['0 <= n <= 10^9'],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function soupServings(n) {

}

// Test adapter — rounds to 5 decimal places
function solve(n) { return parseFloat(soupServings(n).toFixed(5)); }`,
    starterCodePython: `class Solution:
    def soupServings(self, n: int) -> float:
        pass

def solve(n): return round(Solution().soupServings(n), 5)`,
    testCases: [
      { label: 'n=50', args: [50], expected: 0.625 },
      { label: 'n=100', args: [100], expected: 0.71875 },
      { label: 'n=0', args: [0], expected: 0.5 },
      { label: 'Large n', args: [1000000], expected: 1.0 },
    ],
    hint: 'Scale n by ceil division by 25. Memoized dp(a, b) = probability with a, b units left (in 25ml chunks). For n large enough (scaled ≥ 179), the answer is always 1.0. Base cases: a≤0,b≤0 → 0.5; a≤0 → 1.0; b≤0 → 0.',
  },

  882: {
    id: 882,
    title: 'Reachable Nodes In Subdivided Graph',
    titleZh: '细分图中的可抵达节点',
    difficulty: 'Hard',
    leetcodeSlug: 'reachable-nodes-in-subdivided-graph',
    tags: ['Graph', 'Heap (Priority Queue)', 'Shortest Path'],
    description: `Given an undirected graph where each edge \`[u, v, cnt]\` has \`cnt\` subdivision nodes inserted between \`u\` and \`v\`. Starting at node \`0\`, you can travel at most \`maxMoves\` steps.

Return the **total number of nodes** (original + subdivision) reachable.`,
    examples: [
      { input: 'edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3', output: '13' },
      { input: 'edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,12]], maxMoves = 10, n = 4', output: '23' },
    ],
    constraints: ['0 <= edges.length <= n*(n-1)/2', '0 <= u < v < n', 'cnt > 0', '0 <= maxMoves <= 10^9', '1 <= n <= 3000'],
    starterCode: `/**
 * @param {number[][]} edges
 * @param {number} maxMoves
 * @param {number} n
 * @return {number}
 */
function reachableNodes(edges, maxMoves, n) {

}`,
    starterCodePython: `class Solution:
    def reachableNodes(self, edges: list[list[int]], maxMoves: int, n: int) -> int:
        pass`,
    testCases: [
      { label: '[[0,1,10],[0,2,1],[1,2,2]], moves=6, n=3', args: [[[0,1,10],[0,2,1],[1,2,2]], 6, 3], expected: 13 },
      { label: '[[0,1,4],[1,2,6],[0,2,8],[1,3,12]], moves=10, n=4', args: [[[0,1,4],[1,2,6],[0,2,8],[1,3,12]], 10, 4], expected: 23 },
      { label: 'No edges', args: [[], 10, 3], expected: 1 },
      { label: '[[0,1,0]], moves=1, n=2', args: [[[0,1,0]], 1, 2], expected: 2 },
    ],
    hint: 'Dijkstra from node 0 → dist[]. Count original nodes where dist[v] <= maxMoves. For each edge (u,v,cnt): subdivision nodes reachable = min(cnt, max(0, maxMoves-dist[u])) + min(cnt, max(0, maxMoves-dist[v])), capped at cnt.',
  },

  // ── Batch B2 ─────────────────────────────────────────────────────────────

  232: {
    id: 232,
    title: 'Implement Queue using Stacks',
    titleZh: '用栈实现队列',
    difficulty: 'Easy',
    leetcodeSlug: 'implement-queue-using-stacks',
    tags: ['Stack', 'Design', 'Queue'],
    description: `Implement a FIFO queue using only two stacks, supporting \`push(x)\`, \`pop()\`, \`peek()\`, and \`empty()\`.

**Note:** \`solve(ops, vals)\` runs the operation sequence and returns results.`,
    examples: [
      { input: 'ops=["MyQueue","push","push","peek","pop","empty"], vals=[[],[1],[2],[],[],[]]', output: '[null,null,null,1,1,false]' },
    ],
    constraints: ['1 <= x <= 9', 'At most 100 calls.', 'peek/pop called only on non-empty queue.'],
    starterCode: `var MyQueue = function() {

};

MyQueue.prototype.push = function(x) {

};

MyQueue.prototype.pop = function() {

};

MyQueue.prototype.peek = function() {

};

MyQueue.prototype.empty = function() {

};

// Test adapter (do not remove)
function solve(ops, vals) {
  let q;
  return ops.map((op, i) => {
    if (op === 'MyQueue') { q = new MyQueue(); return null; }
    if (op === 'push') { q.push(vals[i][0]); return null; }
    if (op === 'pop') return q.pop();
    if (op === 'peek') return q.peek();
    if (op === 'empty') return q.empty();
  });
}`,
    starterCodePython: `class MyQueue:
    def __init__(self): pass
    def push(self, x: int) -> None: pass
    def pop(self) -> int: pass
    def peek(self) -> int: pass
    def empty(self) -> bool: pass

def solve(ops, vals):
    q = None; results = []
    for op, val in zip(ops, vals):
        if op == 'MyQueue': q = MyQueue(); results.append(None)
        elif op == 'push': q.push(val[0]); results.append(None)
        elif op == 'pop': results.append(q.pop())
        elif op == 'peek': results.append(q.peek())
        elif op == 'empty': results.append(q.empty())
    return results`,
    testCases: [
      { label: 'push,push,peek,pop,empty', args: [['MyQueue','push','push','peek','pop','empty'], [[],[1],[2],[],[],[]]], expected: [null,null,null,1,1,false] },
      { label: 'push,pop,empty', args: [['MyQueue','push','pop','empty'], [[],[5],[],[]]], expected: [null,null,5,true] },
      { label: 'FIFO order', args: [['MyQueue','push','push','push','pop','pop','pop'], [[],[1],[2],[3],[],[],[]]], expected: [null,null,null,null,1,2,3] },
    ],
    hint: 'Two stacks: inStack and outStack. push → inStack. pop/peek: if outStack empty, pour all from inStack into outStack (reverses order). Amortized O(1) per operation.',
  },

  503: {
    id: 503,
    title: 'Next Greater Element II',
    titleZh: '下一个更大元素 II',
    difficulty: 'Medium',
    leetcodeSlug: 'next-greater-element-ii',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    description: `Given a **circular** array \`nums\`, return the **next greater number** for every element. The next greater number is the first greater number found by searching circularly. Return \`-1\` if no such number exists.`,
    examples: [
      { input: 'nums = [1,2,1]', output: '[2,-1,2]', explanation: '1→2, 2→-1, 1→2 (wraps around).' },
      { input: 'nums = [1,2,3,4,3]', output: '[2,3,4,-1,4]' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function nextGreaterElements(nums) {

}`,
    starterCodePython: `class Solution:
    def nextGreaterElements(self, nums: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: '[1,2,1]', args: [[1,2,1]], expected: [2,-1,2] },
      { label: '[1,2,3,4,3]', args: [[1,2,3,4,3]], expected: [2,3,4,-1,4] },
      { label: '[5,4,3,2,1]', args: [[5,4,3,2,1]], expected: [-1,5,5,5,5] },
      { label: 'Single', args: [[1]], expected: [-1] },
    ],
    hint: 'Monotonic decreasing stack storing indices. Iterate twice (i % n) to simulate the circular wrap. Initialize result to -1. When nums[i%n] > nums[stack.top()], pop and record the answer.',
  },

  957: {
    id: 957,
    title: 'Prison Cells After N Days',
    titleZh: 'N天后的牢房',
    difficulty: 'Medium',
    leetcodeSlug: 'prison-cells-after-n-days',
    tags: ['Array', 'Hash Table', 'Math', 'Bit Manipulation'],
    description: `There are 8 prison cells. Each day, a cell becomes occupied iff both its neighbors were the same state (both occupied or both free); otherwise free. The first and last cells are always free after each day.

Given the initial \`cells\` and integer \`n\`, return the state after \`n\` days.`,
    examples: [
      { input: 'cells = [0,1,0,1,1,0,0,1], n = 7', output: '[0,0,1,1,0,0,0,0]' },
      { input: 'cells = [1,0,0,1,0,0,1,0], n = 1000000000', output: '[0,0,1,1,1,1,1,0]' },
    ],
    constraints: ['cells.length == 8', '0 <= n <= 10^9'],
    starterCode: `/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */
function prisonAfterNDays(cells, n) {

}`,
    starterCodePython: `class Solution:
    def prisonAfterNDays(self, cells: list[int], n: int) -> list[int]:
        pass`,
    testCases: [
      { label: '[0,1,0,1,1,0,0,1], n=7', args: [[0,1,0,1,1,0,0,1], 7], expected: [0,0,1,1,0,0,0,0] },
      { label: 'Large n=1000000000', args: [[1,0,0,1,0,0,1,0], 1000000000], expected: [0,0,1,1,1,1,1,0] },
      { label: 'n=1', args: [[1,1,0,1,1,0,1,1], 1], expected: [0,1,0,0,1,0,1,0] },
    ],
    hint: 'States cycle with period ≤ 256. Detect the cycle: store seen states in a map. Once a repeat is found, reduce n by cycle length, then simulate the remaining days.',
  },

  1286: {
    id: 1286,
    title: 'Iterator for Combination',
    titleZh: '字母组合迭代器',
    difficulty: 'Medium',
    leetcodeSlug: 'iterator-for-combination',
    tags: ['String', 'Backtracking', 'Design', 'Iterator'],
    description: `Design the \`CombinationIterator\` class that iterates over all combinations of sorted characters of a given length in **lexicographical order**.

**Note:** \`solve(ops, vals)\` runs the operation sequence.`,
    examples: [
      { input: 'CombinationIterator("abc", 2): next()→"ab", next()→"ac", next()→"bc", hasNext()→false', output: '[null,"ab","ac","bc",false]' },
    ],
    constraints: ['1 <= combinationLength <= characters.length <= 15', 'characters is sorted ascending.', 'At most 10^4 calls.'],
    starterCode: `/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function(characters, combinationLength) {

};

CombinationIterator.prototype.next = function() {

};

CombinationIterator.prototype.hasNext = function() {

};

// Test adapter (do not remove)
function solve(ops, vals) {
  let iter;
  return ops.map((op, i) => {
    if (op === 'CombinationIterator') { iter = new CombinationIterator(...vals[i]); return null; }
    if (op === 'next') return iter.next();
    if (op === 'hasNext') return iter.hasNext();
  });
}`,
    starterCodePython: `class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int): pass
    def next(self) -> str: pass
    def hasNext(self) -> bool: pass

def solve(ops, vals):
    it = None; results = []
    for op, val in zip(ops, vals):
        if op == 'CombinationIterator': it = CombinationIterator(*val); results.append(None)
        elif op == 'next': results.append(it.next())
        elif op == 'hasNext': results.append(it.hasNext())
    return results`,
    testCases: [
      {
        label: '"abc" len=2',
        args: [['CombinationIterator','next','next','next','hasNext'], [['abc',2],[],[],[],[]]],
        expected: [null,'ab','ac','bc',false],
      },
      {
        label: '"ab" len=1',
        args: [['CombinationIterator','hasNext','next','hasNext','next','hasNext'], [['ab',1],[],[],[],[],[]]],
        expected: [null,true,'a',true,'b',false],
      },
    ],
    hint: 'Pre-generate all combinations via DFS/backtracking in sorted order, store in array. next() returns combinations[idx++], hasNext() checks idx < combinations.length.',
  },

  1648: {
    id: 1648,
    title: 'Sell Diminishing-Valued Colored Balls',
    titleZh: '销售价值减少的颜色球',
    difficulty: 'Medium',
    leetcodeSlug: 'sell-diminishing-valued-colored-balls',
    tags: ['Array', 'Math', 'Binary Search', 'Sorting', 'Greedy', 'Heap (Priority Queue)'],
    description: `You have \`inventory[i]\` balls of color \`i\`. Selling a ball from a pile of size \`k\` earns \`k\` coins (that pile shrinks to \`k-1\`).

Sell exactly \`orders\` balls to **maximize** total value. Return the answer mod \`10^9 + 7\`.`,
    examples: [
      { input: 'inventory = [2,5], orders = 4', output: '14', explanation: 'Sell at prices 5,4,3,2 = 14.' },
      { input: 'inventory = [3,5], orders = 6', output: '19' },
    ],
    constraints: ['1 <= inventory.length <= 10^5', '1 <= inventory[i] <= 10^9', '1 <= orders <= min(sum, 10^9)'],
    starterCode: `/**
 * @param {number[]} inventory
 * @param {number} orders
 * @return {number}
 */
function maxProfit(inventory, orders) {

}`,
    starterCodePython: `class Solution:
    def maxProfit(self, inventory: list[int], orders: int) -> int:
        pass`,
    testCases: [
      { label: '[2,5], orders=4', args: [[2,5], 4], expected: 14 },
      { label: '[3,5], orders=6', args: [[3,5], 6], expected: 19 },
      { label: '[1000000000], orders=1000000000', args: [[1000000000], 1000000000], expected: 21 },
      { label: '[2,8,4,10,6], orders=20', args: [[2,8,4,10,6], 20], expected: 110 },
    ],
    hint: 'Sort descending. Between consecutive inventory levels, compute how many balls can be sold at each "height" using arithmetic sum. Track remaining orders. Apply mod carefully to avoid overflow.',
  },

  1814: {
    id: 1814,
    title: 'Count Nice Pairs in an Array',
    titleZh: '统计一个数组中好对子的数目',
    difficulty: 'Medium',
    leetcodeSlug: 'count-nice-pairs-in-an-array',
    tags: ['Array', 'Hash Table', 'Math', 'Counting'],
    description: `Let \`rev(x)\` reverse the decimal digits of \`x\`. A pair \`(i, j)\` with \`i < j\` is **nice** if \`nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])\`.

Return the count of nice pairs modulo \`10^9 + 7\`.`,
    examples: [
      { input: 'nums = [42,11,1,97]', output: '2', explanation: 'Pairs (0,3) and (1,2).' },
      { input: 'nums = [13,10,35,24,76]', output: '4' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '0 <= nums[i] <= 10^9'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function countNicePairs(nums) {

}`,
    starterCodePython: `class Solution:
    def countNicePairs(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[42,11,1,97]', args: [[42,11,1,97]], expected: 2 },
      { label: '[13,10,35,24,76]', args: [[13,10,35,24,76]], expected: 4 },
      { label: '[1,1,1,1]', args: [[1,1,1,1]], expected: 6 },
      { label: 'No pairs', args: [[1,2,3,4]], expected: 0 },
    ],
    hint: 'Rearrange: nice pair iff nums[i]-rev(nums[i]) == nums[j]-rev(nums[j]). Group by diff value. For a group of size k, pairs = k*(k-1)/2. Sum all groups mod 10^9+7.',
  },

  133: {
    id: 133,
    title: 'Clone Graph',
    titleZh: '克隆图',
    difficulty: 'Medium',
    leetcodeSlug: 'clone-graph',
    tags: ['Hash Table', 'Depth-First Search', 'Breadth-First Search', 'Graph'],
    description: `Given a reference to a node in a **connected undirected graph**, return a **deep copy** (clone) of the graph. Each node has a \`val\` (unique int 1-100) and \`neighbors\` list.

**Note:** \`solve(adjList)\` builds a graph from an adjacency list, clones it, and returns the adjacency list of the clone.`,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' },
      { input: 'adjList = [[]]', output: '[[]]' },
    ],
    constraints: ['0 <= nodes <= 100', '1 <= Node.val <= 100', 'All node values are unique.'],
    starterCode: `function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

/**
 * @param {Node} node
 * @return {Node}
 */
function cloneGraph(node) {

}

// Test adapter: builds graph from adjList, clones, returns adjList of clone
function solve(adjList) {
  if (!adjList || adjList.length === 0) return [];
  const nodes = adjList.map((_, i) => new Node(i + 1));
  adjList.forEach((neighbors, i) => { nodes[i].neighbors = neighbors.map(v => nodes[v - 1]); });
  const cloned = cloneGraph(nodes[0]);
  if (!cloned) return [];
  const visited = new Map();
  const queue = [cloned];
  visited.set(cloned.val, cloned);
  while (queue.length) {
    const cur = queue.shift();
    for (const nb of cur.neighbors) {
      if (!visited.has(nb.val)) { visited.set(nb.val, nb); queue.push(nb); }
    }
  }
  const result = new Array(visited.size);
  for (const [val, node] of visited) result[val - 1] = node.neighbors.map(n => n.val).sort((a,b)=>a-b);
  return result;
}`,
    starterCodePython: `class Node:
    def __init__(self, val=0, neighbors=None): self.val = val; self.neighbors = neighbors or []

class Solution:
    def cloneGraph(self, node: Node) -> Node:
        pass

def solve(adj_list):
    if not adj_list: return []
    nodes = [Node(i+1) for i in range(len(adj_list))]
    for i, neighbors in enumerate(adj_list): nodes[i].neighbors = [nodes[v-1] for v in neighbors]
    from collections import deque
    cloned = Solution().cloneGraph(nodes[0])
    if not cloned: return []
    visited = {}; queue = deque([cloned]); visited[cloned.val] = cloned
    while queue:
        cur = queue.popleft()
        for nb in cur.neighbors:
            if nb.val not in visited: visited[nb.val] = nb; queue.append(nb)
    result = [None] * len(visited)
    for val, node in visited.items(): result[val-1] = sorted(n.val for n in node.neighbors)
    return result`,
    testCases: [
      { label: '[[2,4],[1,3],[2,4],[1,3]]', args: [[[2,4],[1,3],[2,4],[1,3]]], expected: [[2,4],[1,3],[2,4],[1,3]] },
      { label: '[[]]', args: [[[]]], expected: [[]] },
      { label: '[[2],[1]]', args: [[[2],[1]]], expected: [[2],[1]] },
    ],
    hint: 'DFS or BFS with a visited map (original node → cloned node). When visiting a node, create its clone and recurse on neighbors. The map handles revisits and cycles.',
  },

  242: {
    id: 242,
    title: 'Valid Anagram',
    titleZh: '有效的字母异位词',
    difficulty: 'Easy',
    leetcodeSlug: 'valid-anagram',
    tags: ['Hash Table', 'String', 'Sorting'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\` (same characters, same counts).`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {

}`,
    starterCodePython: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        pass`,
    testCases: [
      { label: '"anagram","nagaram"', args: ['anagram', 'nagaram'], expected: true },
      { label: '"rat","car"', args: ['rat', 'car'], expected: false },
      { label: 'Different lengths', args: ['ab', 'a'], expected: false },
      { label: 'Same string', args: ['abc', 'abc'], expected: true },
      { label: '"aacc","ccac"', args: ['aacc', 'ccac'], expected: false },
    ],
    hint: 'Count character frequencies: increment for s, decrement for t. If all counts are 0 at the end, it\'s an anagram. Or sort both strings and compare.',
  },

  290: {
    id: 290,
    title: 'Word Pattern',
    titleZh: '单词规律',
    difficulty: 'Easy',
    leetcodeSlug: 'word-pattern',
    tags: ['Hash Table', 'String'],
    description: `Given a \`pattern\` and string \`s\`, return \`true\` if \`s\` follows the **same pattern** (bijective mapping between each letter and each word).`,
    examples: [
      { input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true' },
      { input: 'pattern = "abba", s = "dog cat cat fish"', output: 'false' },
      { input: 'pattern = "aaaa", s = "dog cat cat dog"', output: 'false' },
    ],
    constraints: ['1 <= pattern.length <= 300', '1 <= s.length <= 3000', 'All chars are lowercase.'],
    starterCode: `/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
function wordPattern(pattern, s) {

}`,
    starterCodePython: `class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        pass`,
    testCases: [
      { label: '"abba","dog cat cat dog"', args: ['abba', 'dog cat cat dog'], expected: true },
      { label: '"abba","dog cat cat fish"', args: ['abba', 'dog cat cat fish'], expected: false },
      { label: '"aaaa","dog cat cat dog"', args: ['aaaa', 'dog cat cat dog'], expected: false },
      { label: '"ab","dog dog"', args: ['ab', 'dog dog'], expected: false },
      { label: 'Length mismatch', args: ['aaa', 'aa bb cc dd'], expected: false },
    ],
    hint: 'Two maps: char→word and word→char. For each (char, word) pair, check consistency in both directions. Return false on any mismatch.',
  },

  380: {
    id: 380,
    title: 'Insert Delete GetRandom O(1)',
    titleZh: 'O(1) 时间插入、删除和获取随机元素',
    difficulty: 'Medium',
    leetcodeSlug: 'insert-delete-getrandom-o1',
    tags: ['Array', 'Hash Table', 'Math', 'Design', 'Randomized'],
    description: `Implement \`RandomizedSet\` with O(1) average:
- \`insert(val)\`: Insert if absent → \`true\`; already present → \`false\`
- \`remove(val)\`: Remove if present → \`true\`; absent → \`false\`
- \`getRandom()\`: Return a uniformly random element

**Note:** \`solve\` adapter marks getRandom calls as \`"random"\` (non-deterministic).`,
    examples: [
      { input: '["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]', output: '[null,true,false,true,rand,true,false,rand]' },
    ],
    constraints: ['-2^31 <= val <= 2^31-1', 'At most 2*10^5 calls.', 'getRandom called when non-empty.'],
    starterCode: `var RandomizedSet = function() {

};

RandomizedSet.prototype.insert = function(val) {

};

RandomizedSet.prototype.remove = function(val) {

};

RandomizedSet.prototype.getRandom = function() {

};

// Test adapter — getRandom results marked "random" (not checked for value)
function solve(ops, vals) {
  let rs;
  return ops.map((op, i) => {
    if (op === 'RandomizedSet') { rs = new RandomizedSet(); return null; }
    if (op === 'insert') return rs.insert(vals[i][0]);
    if (op === 'remove') return rs.remove(vals[i][0]);
    if (op === 'getRandom') { rs.getRandom(); return 'random'; }
  });
}`,
    starterCodePython: `class RandomizedSet:
    def __init__(self): pass
    def insert(self, val: int) -> bool: pass
    def remove(self, val: int) -> bool: pass
    def getRandom(self) -> int: pass

def solve(ops, vals):
    rs = None; results = []
    for op, val in zip(ops, vals):
        if op == 'RandomizedSet': rs = RandomizedSet(); results.append(None)
        elif op == 'insert': results.append(rs.insert(val[0]))
        elif op == 'remove': results.append(rs.remove(val[0]))
        elif op == 'getRandom': rs.getRandom(); results.append('random')
    return results`,
    testCases: [
      {
        label: 'Basic flow',
        args: [
          ['RandomizedSet','insert','remove','insert','getRandom','remove','insert','getRandom'],
          [[],[1],[2],[2],[],[1],[2],[]],
        ],
        expected: [null,true,false,true,'random',true,false,'random'],
      },
      {
        label: 'Insert duplicate',
        args: [['RandomizedSet','insert','insert','remove','remove'], [[],[1],[1],[1],[1]]],
        expected: [null,true,false,true,false],
      },
    ],
    hint: 'HashMap(val → arrayIndex) + array. Insert: append to array, map val→lastIdx. Remove: swap val with last element, update map, pop last. getRandom: random index into array. All O(1).',
  },

  387: {
    id: 387,
    title: 'First Unique Character in a String',
    titleZh: '字符串中的第一个唯一字符',
    difficulty: 'Easy',
    leetcodeSlug: 'first-unique-character-in-a-string',
    tags: ['Hash Table', 'String', 'Queue'],
    description: `Given a string \`s\`, find the **first non-repeating** character and return its index. If none exists, return \`-1\`.`,
    examples: [
      { input: 's = "leetcode"', output: '0' },
      { input: 's = "loveleetcode"', output: '2' },
      { input: 's = "aabb"', output: '-1' },
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase letters.'],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function firstUniqChar(s) {

}`,
    starterCodePython: `class Solution:
    def firstUniqChar(self, s: str) -> int:
        pass`,
    testCases: [
      { label: '"leetcode"', args: ['leetcode'], expected: 0 },
      { label: '"loveleetcode"', args: ['loveleetcode'], expected: 2 },
      { label: '"aabb"', args: ['aabb'], expected: -1 },
      { label: 'Single char', args: ['z'], expected: 0 },
      { label: 'All repeating', args: ['aadadaad'], expected: -1 },
    ],
    hint: 'Count character frequencies in one pass. Then scan left to right and return the first index where the count is 1.',
  },

  389: {
    id: 389,
    title: 'Find the Difference',
    titleZh: '找不同',
    difficulty: 'Easy',
    leetcodeSlug: 'find-the-difference',
    tags: ['Hash Table', 'String', 'Bit Manipulation', 'Sorting'],
    description: `String \`t\` is generated by randomly shuffling \`s\` then adding **one extra** character. Find and return that added character.`,
    examples: [
      { input: 's = "abcd", t = "abcde"', output: '"e"' },
      { input: 's = "", t = "y"', output: '"y"' },
    ],
    constraints: ['0 <= s.length <= 1000', 't.length == s.length + 1', 'All lowercase letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
function findTheDifference(s, t) {

}`,
    starterCodePython: `class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        pass`,
    testCases: [
      { label: '"abcd","abcde"', args: ['abcd', 'abcde'], expected: 'e' },
      { label: '"","y"', args: ['', 'y'], expected: 'y' },
      { label: '"a","aa"', args: ['a', 'aa'], expected: 'a' },
      { label: '"ae","aea"', args: ['ae', 'aea'], expected: 'a' },
    ],
    hint: 'XOR all characters in s and t — every matched pair cancels, leaving only the extra char. Or count char frequencies and find the one with an odd total count.',
  },

  442: {
    id: 442,
    title: 'Find All Duplicates in an Array',
    titleZh: '数组中重复的数据',
    difficulty: 'Medium',
    leetcodeSlug: 'find-all-duplicates-in-an-array',
    tags: ['Array', 'Hash Table'],
    description: `Given an array \`nums\` of length \`n\` where each integer is in \`[1, n]\` and appears **once or twice**, return all integers that appear **twice**.

Must run in O(n) time with O(1) extra space.`,
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' },
      { input: 'nums = [1,1,2]', output: '[1]' },
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^5', '1 <= nums[i] <= n'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function findDuplicates(nums) {

}`,
    starterCodePython: `class Solution:
    def findDuplicates(self, nums: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: '[4,3,2,7,8,2,3,1]', args: [[4,3,2,7,8,2,3,1]], expected: [2,3] },
      { label: '[1,1,2]', args: [[1,1,2]], expected: [1] },
      { label: '[1]', args: [[1]], expected: [] },
      { label: '[2,2]', args: [[2,2]], expected: [2] },
    ],
    hint: 'Use the index as a hash: for each num, negate nums[abs(num)-1]. If it\'s already negative, abs(num) appeared twice → add to result. O(n) time, O(1) extra space.',
  },

  448: {
    id: 448,
    title: 'Find All Numbers Disappeared in an Array',
    titleZh: '找到所有数组中消失的数字',
    difficulty: 'Easy',
    leetcodeSlug: 'find-all-numbers-disappeared-in-an-array',
    tags: ['Array', 'Hash Table'],
    description: `Given array \`nums\` of length \`n\` where each integer is in \`[1, n]\`, return all integers in \`[1, n]\` that do **not** appear in \`nums\`.`,
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' },
      { input: 'nums = [1,1]', output: '[2]' },
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^5', '1 <= nums[i] <= n'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function findDisappearedNumbers(nums) {

}`,
    starterCodePython: `class Solution:
    def findDisappearedNumbers(self, nums: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: '[4,3,2,7,8,2,3,1]', args: [[4,3,2,7,8,2,3,1]], expected: [5,6] },
      { label: '[1,1]', args: [[1,1]], expected: [2] },
      { label: '[2,2]', args: [[2,2]], expected: [1] },
      { label: 'No missing', args: [[1,2,3,4]], expected: [] },
    ],
    hint: 'Mark visited: negate nums[nums[i]-1] for each i. Then scan: indices with positive values (1-indexed) are the missing numbers. O(n) time, O(1) extra space.',
  },

  894: {
    id: 894,
    title: 'All Possible Full Binary Trees',
    titleZh: '所有可能的真二叉树',
    difficulty: 'Medium',
    leetcodeSlug: 'all-possible-full-binary-trees',
    tags: ['Dynamic Programming', 'Tree', 'Recursion', 'Memoization'],
    description: `A **full binary tree** has every node with 0 or 2 children. Given \`n\`, return all structurally unique full binary trees with \`n\` nodes (each value = 0).

**Note:** \`solve(n)\` returns the **count** of unique trees.`,
    examples: [
      { input: 'n = 7', output: '5 trees' },
      { input: 'n = 3', output: '1 tree' },
    ],
    constraints: ['1 <= n <= 20'],
    starterCode: `function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
function allPossibleFBT(n) {

}

// Test adapter — returns count of trees
function solve(n) { return allPossibleFBT(n).length; }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

class Solution:
    def allPossibleFBT(self, n: int) -> list[TreeNode]:
        pass

def solve(n): return len(Solution().allPossibleFBT(n))`,
    testCases: [
      { label: 'n=7', args: [7], expected: 5 },
      { label: 'n=3', args: [3], expected: 1 },
      { label: 'n=1', args: [1], expected: 1 },
      { label: 'n=2 (even → impossible)', args: [2], expected: 0 },
      { label: 'n=5', args: [5], expected: 2 },
    ],
    hint: 'For n nodes: root + left(i) + right(n-1-i). i must be odd (1,3,5,...,n-2). Memoize by n. Even n → return []. The count follows Catalan numbers.',
  },

  913: {
    id: 913,
    title: 'Cat and Mouse',
    titleZh: '猫和老鼠',
    difficulty: 'Hard',
    leetcodeSlug: 'cat-and-mouse',
    tags: ['Math', 'Dynamic Programming', 'Graph', 'Topological Sort', 'Game Theory', 'Memoization'],
    description: `A game on an undirected graph. Mouse starts at node 1, Cat at node 2, hole at node 0. Players alternate (Mouse first). Mouse wins if it reaches node 0; Cat wins if it reaches the Mouse's node (Cat can't enter node 0). Return 1 (Mouse wins), 2 (Cat wins), or 0 (Draw) with optimal play.`,
    examples: [
      { input: 'graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]', output: '0' },
      { input: 'graph = [[1,3],[0],[3],[0,2]]', output: '1' },
    ],
    constraints: ['3 <= graph.length <= 50', 'graph[i] does not contain duplicates.'],
    starterCode: `/**
 * @param {number[][]} graph
 * @return {number}
 */
function catMouseGame(graph) {

}`,
    starterCodePython: `class Solution:
    def catMouseGame(self, graph: list[list[int]]) -> int:
        pass`,
    testCases: [
      { label: '[[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]', args: [[[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]], expected: 0 },
      { label: '[[1,3],[0],[3],[0,2]]', args: [[[1,3],[0],[3],[0,2]]], expected: 1 },
      { label: 'Mouse wins in one move', args: [[[1],[0,2],[1]]], expected: 1 },
    ],
    hint: 'State = (mouse_pos, cat_pos, turn). BFS backward from terminal states: mouse@0 → 1 (win), mouse@cat → 2 (loss). Propagate "color" backwards. Draw if state never resolved after 2*n*n steps.',
  },

  355: {
    id: 355,
    title: 'Design Twitter',
    titleZh: '设计推特',
    difficulty: 'Medium',
    leetcodeSlug: 'design-twitter',
    tags: ['Hash Table', 'Linked List', 'Design', 'Heap (Priority Queue)'],
    description: `Design a simplified Twitter with:
- \`postTweet(userId, tweetId)\`
- \`getNewsFeed(userId)\` → 10 most recent tweet IDs from the user and their followees
- \`follow(followerId, followeeId)\`
- \`unfollow(followerId, followeeId)\`

**Note:** \`solve(ops, vals)\` runs the operation sequence.`,
    examples: [
      { input: 'postTweet(1,5), getNewsFeed(1) → [5], follow(1,2), postTweet(2,6), getNewsFeed(1) → [6,5]', output: '[null,null,[5],null,null,[6,5],null,[5]]' },
    ],
    constraints: ['1 <= userId, tweetId <= 500', 'All tweetIds are unique.', 'At most 3*10^4 calls.'],
    starterCode: `var Twitter = function() {

};

Twitter.prototype.postTweet = function(userId, tweetId) {

};

Twitter.prototype.getNewsFeed = function(userId) {

};

Twitter.prototype.follow = function(followerId, followeeId) {

};

Twitter.prototype.unfollow = function(followerId, followeeId) {

};

// Test adapter (do not remove)
function solve(ops, vals) {
  let tw;
  return ops.map((op, i) => {
    if (op === 'Twitter') { tw = new Twitter(); return null; }
    if (op === 'postTweet') { tw.postTweet(...vals[i]); return null; }
    if (op === 'getNewsFeed') return tw.getNewsFeed(...vals[i]);
    if (op === 'follow') { tw.follow(...vals[i]); return null; }
    if (op === 'unfollow') { tw.unfollow(...vals[i]); return null; }
  });
}`,
    starterCodePython: `class Twitter:
    def __init__(self): pass
    def postTweet(self, userId: int, tweetId: int) -> None: pass
    def getNewsFeed(self, userId: int) -> list[int]: pass
    def follow(self, followerId: int, followeeId: int) -> None: pass
    def unfollow(self, followerId: int, followeeId: int) -> None: pass

def solve(ops, vals):
    tw = None; results = []
    for op, val in zip(ops, vals):
        if op == 'Twitter': tw = Twitter(); results.append(None)
        elif op == 'postTweet': tw.postTweet(*val); results.append(None)
        elif op == 'getNewsFeed': results.append(tw.getNewsFeed(*val))
        elif op == 'follow': tw.follow(*val); results.append(None)
        elif op == 'unfollow': tw.unfollow(*val); results.append(None)
    return results`,
    testCases: [
      {
        label: 'Basic twitter flow',
        args: [
          ['Twitter','postTweet','getNewsFeed','follow','postTweet','getNewsFeed','unfollow','getNewsFeed'],
          [[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]],
        ],
        expected: [null,null,[5],null,null,[6,5],null,[5]],
      },
      {
        label: 'Self follow ignored',
        args: [['Twitter','postTweet','follow','getNewsFeed'], [[],[1,1],[1,1],[1]]],
        expected: [null,null,null,[1]],
      },
    ],
    hint: 'Global timestamp counter. User → Set(followees), User → list of (timestamp, tweetId). getNewsFeed: merge up to 10 latest tweets from self + followees using a max-heap.',
  },

  451: {
    id: 451,
    title: 'Sort Characters By Frequency',
    titleZh: '根据字符出现频率排序',
    difficulty: 'Medium',
    leetcodeSlug: 'sort-characters-by-frequency',
    tags: ['Hash Table', 'String', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort', 'Counting'],
    description: `Given a string \`s\`, sort it in **decreasing order** based on character frequency. Ties are broken **alphabetically** (for deterministic output).

**Note:** \`solve(s)\` normalizes output (freq-desc, then alpha) for comparison.`,
    examples: [
      { input: 's = "tree"', output: '"eert"', explanation: 'e×2, then r,t alphabetically.' },
      { input: 's = "Aabb"', output: '"bbAa"', explanation: 'b×2, then A,a.' },
    ],
    constraints: ['1 <= s.length <= 5*10^5', 's consists of uppercase/lowercase letters and digits.'],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function frequencySort(s) {

}

// Test adapter — normalizes by (freq desc, char asc) for deterministic comparison
function solve(s) {
  const out = frequencySort(s);
  const freq = {};
  for (const c of out) freq[c] = (freq[c] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .map(([c, f]) => c.repeat(f))
    .join('');
}`,
    starterCodePython: `class Solution:
    def frequencySort(self, s: str) -> str:
        pass

def solve(s):
    out = Solution().frequencySort(s)
    from collections import Counter
    freq = Counter(out)
    return ''.join(c * f for c, f in sorted(freq.items(), key=lambda x: (-x[1], x[0])))`,
    testCases: [
      { label: '"tree"', args: ['tree'], expected: 'eert' },
      { label: '"Aabb"', args: ['Aabb'], expected: 'bbAa' },
      { label: '"aab"', args: ['aab'], expected: 'aab' },
      { label: 'Single char', args: ['a'], expected: 'a' },
    ],
    hint: 'Count frequencies. Sort by (-frequency, char). Build result by repeating each character by its count. Bucket sort also works in O(n).',
  },

  692: {
    id: 692,
    title: 'Top K Frequent Words',
    titleZh: '前K个高频单词',
    difficulty: 'Medium',
    leetcodeSlug: 'top-k-frequent-words',
    tags: ['Hash Table', 'String', 'Trie', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort', 'Counting'],
    description: `Given an array of strings \`words\` and integer \`k\`, return the \`k\` most frequent words sorted by frequency (highest first). Ties broken **alphabetically**.`,
    examples: [
      { input: 'words = ["i","love","leetcode","i","love","coding"], k = 2', output: '["i","love"]' },
      { input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4', output: '["the","sunny","is","day"]' },
    ],
    constraints: ['1 <= words.length <= 500', '1 <= words[i].length <= 10', '1 <= k <= unique word count'],
    starterCode: `/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
function topKFrequent(words, k) {

}`,
    starterCodePython: `class Solution:
    def topKFrequent(self, words: list[str], k: int) -> list[str]:
        pass`,
    testCases: [
      { label: '["i","love","leetcode","i","love","coding"], k=2', args: [['i','love','leetcode','i','love','coding'], 2], expected: ['i','love'] },
      { label: '4-word test', args: [['the','day','is','sunny','the','the','the','sunny','is','is'], 4], expected: ['the','sunny','is','day'] },
      { label: 'k=1', args: [['a','b','a'], 1], expected: ['a'] },
      { label: 'Alphabetical tiebreak', args: [['b','a'], 2], expected: ['a','b'] },
    ],
    hint: 'Count word frequencies. Sort by (-frequency, word) — Python tuple comparison or JS custom comparator. Return first k elements.',
  },

  789: {
    id: 789,
    title: 'Escape The Ghosts',
    titleZh: '逃脱阻碍者',
    difficulty: 'Medium',
    leetcodeSlug: 'escape-the-ghosts',
    tags: ['Array', 'Math'],
    description: `You start at \`(0,0)\` and must reach \`target\`. Ghosts start at given positions. Everyone moves simultaneously (1 Manhattan step per turn).

Return \`true\` if you can reach the target **strictly before** any ghost; \`false\` otherwise.`,
    examples: [
      { input: 'ghosts = [[1,0]], target = [2,0]', output: 'false', explanation: 'Ghost dist=1, you need 2.' },
      { input: 'ghosts = [[1,0]], target = [0,3]', output: 'true', explanation: 'You=3, Ghost=4.' },
      { input: 'ghosts = [[2,0]], target = [1,0]', output: 'false', explanation: 'Tied — ghost blocks target.' },
    ],
    constraints: ['1 <= ghosts.length <= 100', '-10^4 <= coords <= 10^4'],
    starterCode: `/**
 * @param {number[][]} ghosts
 * @param {number[]} target
 * @return {boolean}
 */
function escapeGhosts(ghosts, target) {

}`,
    starterCodePython: `class Solution:
    def escapeGhosts(self, ghosts: list[list[int]], target: list[int]) -> bool:
        pass`,
    testCases: [
      { label: 'ghosts=[[1,0]], target=[2,0]', args: [[[1,0]], [2,0]], expected: false },
      { label: 'ghosts=[[1,0]], target=[0,3]', args: [[[1,0]], [0,3]], expected: true },
      { label: 'Tie — false', args: [[[2,0]], [1,0]], expected: false },
      { label: 'No ghosts', args: [[], [5,5]], expected: true },
      { label: 'Multiple ghosts, safe', args: [[[5,0],[-5,0],[0,5],[0,-5]], [1,1]], expected: true },
    ],
    hint: 'You escape iff your Manhattan distance to target is **strictly less** than every ghost\'s Manhattan distance to target. A ghost that arrives at the same time or earlier can always intercept you there.',
  },

  // ── Batch B3: Heap, Trie & Data Structure Design ──────────────────────────

  1955: {
    id: 1955,
    title: 'Count Number of Special Subsequences',
    titleZh: '统计特殊子序列的数目',
    difficulty: 'Hard',
    leetcodeSlug: 'count-number-of-special-subsequences',
    tags: ['array', 'dynamic-programming'],
    description: 'A sequence is special if it consists of all 0s followed by all 1s followed by all 2s (each part non-empty).\n\nReturn the number of different special subsequences modulo 10^9 + 7.',
    examples: [
      { input: 'nums = [0,1,2,2]', output: '3', explanation: 'Three distinct special subsequences.' },
      { input: 'nums = [2,2,0,0]', output: '0', explanation: 'No valid special subsequences — 2 appears before 0.' },
      { input: 'nums = [0,1,2]', output: '1', explanation: 'Only one special subsequence.' },
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0, 1, or 2'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function countSpecialSubsequences(nums) {

}`,
    starterCodePython: `class Solution:
    def countSpecialSubsequences(self, nums: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[0,1,2,2]', args: [[0,1,2,2]], expected: 3 },
      { label: '[2,2,0,0]', args: [[2,2,0,0]], expected: 0 },
      { label: '[0,1,2]', args: [[0,1,2]], expected: 1 },
      { label: '[0,0,1,2]', args: [[0,0,1,2]], expected: 3 },
    ],
    hint: 'Track dp[0], dp[1], dp[2]. When you see num=k: dp[k] = dp[k]*2 + (k===0 ? 1 : dp[k-1]). Final answer is dp[2] mod 10^9+7.',
  },

  1962: {
    id: 1962,
    title: 'Remove Stones to Minimize the Total',
    titleZh: '移除石子使总数最小',
    difficulty: 'Medium',
    leetcodeSlug: 'remove-stones-to-minimize-the-total',
    tags: ['array', 'heap', 'greedy'],
    description: 'Given a 0-indexed integer array piles and an integer k, apply exactly k operations: choose any pile and remove floor(piles[i] / 2) stones from it. Return the minimum possible total number of stones remaining.',
    examples: [
      { input: 'piles = [5,4,9], k = 2', output: '12', explanation: 'Remove 4 from pile 9 → 5. Remove 2 from largest 5 → 3. Total = 5+4+3=12.' },
      { input: 'piles = [4,3,6,7], k = 3', output: '12', explanation: '' },
    ],
    constraints: ['1 <= piles.length <= 10^5', '1 <= piles[i] <= 10^4', '1 <= k <= 10^5'],
    starterCode: `/**
 * @param {number[]} piles
 * @param {number} k
 * @return {number}
 */
function minStoneSum(piles, k) {

}`,
    starterCodePython: `class Solution:
    def minStoneSum(self, piles: list[int], k: int) -> int:
        pass`,
    testCases: [
      { label: '[5,4,9] k=2 → 12', args: [[5,4,9], 2], expected: 12 },
      { label: '[4,3,6,7] k=3 → 12', args: [[4,3,6,7], 3], expected: 12 },
      { label: '[1] k=5 → 1', args: [[1], 5], expected: 1 },
      { label: '[8,2] k=2 → 4', args: [[8,2], 2], expected: 4 },
    ],
    hint: 'Use a max-heap. Each operation, pop the largest pile, remove floor(largest/2), push back the remainder. Repeat k times. Return the sum of all piles.',
  },

  211: {
    id: 211,
    title: 'Design Add and Search Words Data Structure',
    titleZh: '添加与搜索单词 - 数据结构设计',
    difficulty: 'Medium',
    leetcodeSlug: 'design-add-and-search-words-data-structure',
    tags: ['trie', 'design', 'string', 'depth-first-search'],
    description: 'Design a data structure supporting addWord(word) and search(word), where \'.\' in search matches any single letter.',
    examples: [
      { input: 'ops=["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\nvals=[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', output: '[null,null,null,null,false,true,true,true]', explanation: '' },
    ],
    constraints: ['1 <= word.length <= 25', 'word in addWord consists of lowercase letters', 'word in search consists of lowercase letters or \'.\''],
    starterCode: `class WordDictionary {
  constructor() {

  }

  /** @param {string} word */
  addWord(word) {

  }

  /** @param {string} word @return {boolean} */
  search(word) {

  }
}

function solve(ops, vals) {
  let obj;
  return ops.map((op, i) => {
    if (op === 'WordDictionary') { obj = new WordDictionary(); return null; }
    if (op === 'addWord') { obj.addWord(vals[i][0]); return null; }
    if (op === 'search') return obj.search(vals[i][0]);
  });
}`,
    starterCodePython: `class WordDictionary:
    def __init__(self):
        pass

    def addWord(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass`,
    testCases: [
      { label: 'add bad/dad/mad, search pad/.ad/b..', args: [['WordDictionary','addWord','addWord','addWord','search','search','search','search'],[[], ['bad'],['dad'],['mad'],['pad'],['bad'],['.ad'],['b..']] ], expected: [null,null,null,null,false,true,true,true] },
    ],
    hint: 'Build a Trie for addWord. For search, use DFS — at each \'.\', branch into all children recursively.',
  },

  648: {
    id: 648,
    title: 'Replace Words',
    titleZh: '单词替换',
    difficulty: 'Medium',
    leetcodeSlug: 'replace-words',
    tags: ['trie', 'string', 'hash-table'],
    description: 'Given a list of roots and a sentence, replace each word in the sentence with the shortest root that forms a prefix of that word. If no root matches, keep the original word.',
    examples: [
      { input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"', output: '"the cat was rat by the bat"', explanation: '' },
      { input: 'dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"', output: '"a a b c"', explanation: '' },
    ],
    constraints: ['1 <= dictionary.length <= 1000', '1 <= sentence.length <= 10^6'],
    starterCode: `/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
function replaceWords(dictionary, sentence) {

}`,
    starterCodePython: `class Solution:
    def replaceWords(self, dictionary: list[str], sentence: str) -> str:
        pass`,
    testCases: [
      { label: 'cat/bat/rat', args: [['cat','bat','rat'], 'the cattle was rattled by the battery'], expected: 'the cat was rat by the bat' },
      { label: 'a/b/c', args: [['a','b','c'], 'aadsfasf absbs bbab cadsfafs'], expected: 'a a b c' },
      { label: 'no root match', args: [['xyz'], 'the cat sat'], expected: 'the cat sat' },
    ],
    hint: 'Insert all roots into a Trie. For each word, walk the Trie: if you reach a terminal node (end-of-root), return that prefix. Otherwise return the original word.',
  },

  677: {
    id: 677,
    title: 'Map Sum Pairs',
    titleZh: '键值映射',
    difficulty: 'Medium',
    leetcodeSlug: 'map-sum-pairs',
    tags: ['trie', 'design', 'hash-table', 'string'],
    description: 'Design a map with insert(key, val) (overwrites if key exists) and sum(prefix) returning the sum of all values whose keys start with the given prefix.',
    examples: [
      { input: 'ops=["MapSum","insert","sum","insert","sum"]\nvals=[[],["apple",3],["ap"],["app",2],["ap"]]', output: '[null,null,3,null,5]', explanation: 'After apple=3: sum("ap")=3. After app=2: sum("ap")=3+2=5.' },
    ],
    constraints: ['1 <= key.length, prefix.length <= 50', '1 <= val <= 1000', 'At most 50 calls'],
    starterCode: `class MapSum {
  constructor() {

  }

  /** @param {string} key @param {number} val */
  insert(key, val) {

  }

  /** @param {string} prefix @return {number} */
  sum(prefix) {

  }
}

function solve(ops, vals) {
  let obj;
  return ops.map((op, i) => {
    if (op === 'MapSum') { obj = new MapSum(); return null; }
    if (op === 'insert') { obj.insert(vals[i][0], vals[i][1]); return null; }
    if (op === 'sum') return obj.sum(vals[i][0]);
  });
}`,
    starterCodePython: `class MapSum:
    def __init__(self):
        pass

    def insert(self, key: str, val: int) -> None:
        pass

    def sum(self, prefix: str) -> int:
        pass`,
    testCases: [
      { label: 'apple=3, app=2, sum(ap)=5', args: [['MapSum','insert','sum','insert','sum'],[[], ['apple',3],['ap'],['app',2],['ap']]], expected: [null,null,3,null,5] },
      { label: 'overwrite key: a=3 then a=2, sum(a)=2', args: [['MapSum','insert','insert','sum'],[[], ['a',3],['a',2],['a']]], expected: [null,null,null,2] },
    ],
    hint: 'Use a HashMap or Trie. For sum(prefix), iterate all keys that start with prefix (HashMap) or DFS the prefix subtree (Trie) summing leaf values.',
  },

  1949: {
    id: 1949,
    title: 'Strong Friendship',
    titleZh: '强友谊',
    difficulty: 'Hard',
    leetcodeSlug: 'strong-friendship',
    tags: ['graph', 'hash-table', 'array'],
    description: 'Given n users (numbered 1 to n) and a list of bidirectional friendship pairs, return the number of non-friend pairs (user1, user2) where user1 < user2 and they share at least 3 common friends.',
    examples: [
      { input: 'n = 5, friendships = [[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[3,5]]', output: '1', explanation: 'Pair (4,5): not friends, common friends = {1,2,3} = 3. Only this pair qualifies.' },
      { input: 'n = 3, friendships = [[1,2],[2,3],[1,3]]', output: '0', explanation: 'All pairs are already friends.' },
    ],
    constraints: ['2 <= n <= 1000', '1 <= friendships.length <= 2000', 'Friendships are unique and bidirectional'],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} friendships
 * @return {number}
 */
function strongFriendship(n, friendships) {

}`,
    starterCodePython: `def strongFriendship(n: int, friendships: list[list[int]]) -> int:
    pass`,
    testCases: [
      { label: 'n=5, pair (4,5) qualifies', args: [5, [[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[3,5]]], expected: 1 },
      { label: 'n=3, all pairs friends', args: [3, [[1,2],[2,3],[1,3]]], expected: 0 },
      { label: 'n=4, no pair has 3+ common', args: [4, [[1,2],[1,3],[2,3]]], expected: 0 },
    ],
    hint: 'Build a friend-set for each user. For each non-friend pair (u, v), count |friends(u) ∩ friends(v)|. If >= 3, count it. O(n^2 * k) where k is avg degree.',
  },

  284: {
    id: 284,
    title: 'Peeking Iterator',
    titleZh: '顶端迭代器',
    difficulty: 'Medium',
    leetcodeSlug: 'peeking-iterator',
    tags: ['design', 'iterator', 'array'],
    description: 'Design a PeekingIterator that wraps an existing iterator and supports peek() (return next element without advancing), next() (return and advance), and hasNext().',
    examples: [
      { input: 'arr=[1,2,3], ops=["peek","next","next","peek","next","hasNext"]', output: '[1,1,2,3,3,false]', explanation: 'peek returns 1 without advancing; next returns 1 and advances; etc.' },
    ],
    constraints: ['1 <= arr.length <= 1000', '1 <= arr[i] <= 1000', 'At most 1000 calls to peek, next, hasNext'],
    starterCode: `class PeekingIterator {
  /** @param {{ next: () => {value: number, done: boolean}, hasNext: () => boolean }} iterator */
  constructor(iterator) {

  }

  /** @return {number} */
  peek() {

  }

  /** @return {number} */
  next() {

  }

  /** @return {boolean} */
  hasNext() {

  }
}

function solve(arr, ops) {
  let i = 0;
  const iter = { next: () => ({ value: arr[i++], done: false }), hasNext: () => i < arr.length };
  const obj = new PeekingIterator(iter);
  return ops.map(op => {
    if (op === 'peek') return obj.peek();
    if (op === 'next') return obj.next();
    if (op === 'hasNext') return obj.hasNext();
  });
}`,
    starterCodePython: `class PeekingIterator:
    def __init__(self, iterator):
        pass

    def peek(self) -> int:
        pass

    def next(self) -> int:
        pass

    def hasNext(self) -> bool:
        pass`,
    testCases: [
      { label: '[1,2,3] peek/next/next/peek/next/hasNext', args: [[1,2,3], ['peek','next','next','peek','next','hasNext']], expected: [1,1,2,3,3,false] },
      { label: '[5] next/hasNext', args: [[5], ['next','hasNext']], expected: [5,false] },
    ],
    hint: 'Cache a "peeked" value. On peek(), fetch the next element from the underlying iterator and store it without advancing externally. On next(), return the cached value (fetching if empty). hasNext() checks cache or the underlying iterator.',
  },

  316: {
    id: 316,
    title: 'Remove Duplicate Letters',
    titleZh: '去除重复字母',
    difficulty: 'Medium',
    leetcodeSlug: 'remove-duplicate-letters',
    tags: ['string', 'stack', 'greedy', 'monotonic-stack'],
    description: 'Given a string s, remove duplicate letters so that every letter appears once and only once. Return the smallest lexicographic result among all possible results.',
    examples: [
      { input: 's = "bcabc"', output: '"abc"', explanation: '' },
      { input: 's = "cbacdcbc"', output: '"acdb"', explanation: '' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of lowercase English letters'],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function removeDuplicateLetters(s) {

}`,
    starterCodePython: `class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        pass`,
    testCases: [
      { label: 'bcabc → abc', args: ['bcabc'], expected: 'abc' },
      { label: 'cbacdcbc → acdb', args: ['cbacdcbc'], expected: 'acdb' },
      { label: 'single char', args: ['a'], expected: 'a' },
      { label: 'already unique', args: ['abc'], expected: 'abc' },
    ],
    hint: 'Use a monotonic stack. Track last occurrence of each character. Pop the stack when current char is smaller AND the top still appears later in the string. Use a visited set to skip already-stacked chars.',
  },

  785: {
    id: 785,
    title: 'Is Graph Bipartite?',
    titleZh: '判断二分图',
    difficulty: 'Medium',
    leetcodeSlug: 'is-graph-bipartite',
    tags: ['graph', 'breadth-first-search', 'depth-first-search', 'union-find'],
    description: 'Given an undirected graph as an adjacency list, determine if it is bipartite — i.e., its nodes can be colored with two colors such that no two adjacent nodes share the same color.',
    examples: [
      { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false', explanation: '0-1-2-0 is an odd cycle.' },
      { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true', explanation: 'Color {0,2} red, {1,3} blue.' },
    ],
    constraints: ['1 <= graph.length <= 100', 'graph[i] contains no self-loops and no duplicates'],
    starterCode: `/**
 * @param {number[][]} graph
 * @return {boolean}
 */
function isBipartite(graph) {

}`,
    starterCodePython: `class Solution:
    def isBipartite(self, graph: list[list[int]]) -> bool:
        pass`,
    testCases: [
      { label: 'odd cycle → false', args: [[[1,2,3],[0,2],[0,1,3],[0,2]]], expected: false },
      { label: 'bipartite → true', args: [[[1,3],[0,2],[1,3],[0,2]]], expected: true },
      { label: 'single node', args: [[[]]], expected: true },
      { label: 'two connected nodes', args: [[[1],[0]]], expected: true },
    ],
    hint: 'BFS/DFS with 2-coloring. Color each unvisited node 0, then color its neighbors 1 (and vice versa). If a neighbor already has the same color as the current node, return false.',
  },

  885: {
    id: 885,
    title: 'Spiral Matrix III',
    titleZh: '螺旋矩阵 III',
    difficulty: 'Medium',
    leetcodeSlug: 'spiral-matrix-iii',
    tags: ['array', 'matrix', 'simulation'],
    description: 'Given an rows × cols matrix, starting at (rStart, cStart), walk clockwise in a spiral and collect all grid positions in visited order. Skip out-of-boundary positions but continue the spiral.',
    examples: [
      { input: 'rows=1, cols=4, rStart=0, cStart=0', output: '[[0,0],[0,1],[0,2],[0,3]]', explanation: '' },
      { input: 'rows=5, cols=6, rStart=1, cStart=4', output: '[[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]', explanation: '' },
    ],
    constraints: ['1 <= rows, cols <= 100', '0 <= rStart < rows', '0 <= cStart < cols'],
    starterCode: `/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
function spiralMatrixIII(rows, cols, rStart, cStart) {

}`,
    starterCodePython: `class Solution:
    def spiralMatrixIII(self, rows: int, cols: int, rStart: int, cStart: int) -> list[list[int]]:
        pass`,
    testCases: [
      { label: '1×4 from (0,0)', args: [1, 4, 0, 0], expected: [[0,0],[0,1],[0,2],[0,3]] },
      { label: '1×1 from (0,0)', args: [1, 1, 0, 0], expected: [[0,0]] },
      { label: '2×2 from (0,0)', args: [2, 2, 0, 0], expected: [[0,0],[0,1],[1,1],[1,0]] },
    ],
    hint: 'Simulate the spiral: directions are E, S, W, N. Step counts go 1, 1, 2, 2, 3, 3, ... (increase every 2 turns). For each step, move and add to result only if in bounds. Stop when rows*cols positions are collected.',
  },

  1159: {
    id: 1159,
    title: 'Market Analysis II',
    titleZh: '市场分析 II',
    difficulty: 'Hard',
    leetcodeSlug: 'market-analysis-ii',
    tags: ['array', 'hash-table', 'sorting'],
    description: 'Given a list of transactions [sellerId, itemId] in chronological order, for each seller with at least 2 sales, return [sellerId, secondItemId]. Return the results sorted by sellerId ascending.',
    examples: [
      { input: 'transactions = [[1,3],[2,2],[1,8],[2,10]]', output: '[[1,8],[2,10]]', explanation: 'Seller 1: 2nd item = 8. Seller 2: 2nd item = 10.' },
      { input: 'transactions = [[1,5],[2,3],[3,7],[1,9]]', output: '[[1,9]]', explanation: 'Only seller 1 has >= 2 sales.' },
    ],
    constraints: ['1 <= transactions.length <= 10^5', '1 <= sellerId, itemId <= 10^5'],
    starterCode: `/**
 * @param {number[][]} transactions
 * @return {number[][]}
 */
function marketAnalysis(transactions) {

}`,
    starterCodePython: `def marketAnalysis(transactions: list[list[int]]) -> list[list[int]]:
    pass`,
    testCases: [
      { label: '[[1,3],[2,2],[1,8],[2,10]]', args: [[[1,3],[2,2],[1,8],[2,10]]], expected: [[1,8],[2,10]] },
      { label: '[[1,5],[2,3],[3,7],[1,9]]', args: [[[1,5],[2,3],[3,7],[1,9]]], expected: [[1,9]] },
      { label: 'no seller with 2 sales', args: [[[1,5],[2,3]]], expected: [] },
    ],
    hint: 'Use a HashMap to track each seller\'s sales in order. After all transactions, collect sellers with >= 2 sales and return [sellerId, sales[1]], sorted by sellerId.',
  },

  652: {
    id: 652,
    title: 'Find Duplicate Subtrees',
    titleZh: '寻找重复的子树',
    difficulty: 'Medium',
    leetcodeSlug: 'find-duplicate-subtrees',
    tags: ['tree', 'hash-table', 'depth-first-search'],
    description: 'Given the root of a binary tree, return all duplicate subtrees — one representative root node per unique duplicate structure. Two subtrees are duplicate if they have the same structure and node values.',
    examples: [
      { input: 'root = [1,2,3,4,null,2,4,null,null,4]', output: '[[2,4],[4]]', explanation: 'Subtree [2,4] and leaf [4] each appear more than once.' },
      { input: 'root = [2,1,1]', output: '[[1]]', explanation: 'Leaf node 1 appears twice.' },
    ],
    constraints: ['1 <= nodes <= 10^4', '-200 <= Node.val <= 200'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift();if(arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left)}i++;if(i<arr.length){if(arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right)}i++}}return root; };

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
function findDuplicateSubtrees(root) {

}

function solve(arr) {
  const result = findDuplicateSubtrees(buildTree(arr));
  return result.map(n => n.val).sort((a, b) => a - b);
}`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findDuplicateSubtrees(self, root: TreeNode) -> list[TreeNode]:
        pass`,
    testCases: [
      { label: '[1,2,3,4,null,2,4,null,null,4] → [2,4]', args: [[1,2,3,4,null,2,4,null,null,4]], expected: [2,4] },
      { label: '[2,1,1] → [1]', args: [[2,1,1]], expected: [1] },
      { label: 'no duplicates [1,2,3]', args: [[1,2,3]], expected: [] },
    ],
    hint: 'Post-order DFS: serialize each subtree as a string (e.g., "val,left,right"). Use a HashMap to count occurrences. When count reaches exactly 2, add the root node to results.',
  },

  1475: {
    id: 1475,
    title: 'Final Prices With a Special Discount in a Shop',
    titleZh: '商品折扣后的最终价格',
    difficulty: 'Easy',
    leetcodeSlug: 'final-prices-with-a-special-discount-in-a-shop',
    tags: ['array', 'stack', 'monotonic-stack'],
    description: 'Given an array prices, for each item i, the discount is prices[j] where j > i is the first index with prices[j] <= prices[i]. If no such j exists, no discount. Return the final price array.',
    examples: [
      { input: 'prices = [8,4,6,2,3]', output: '[4,2,4,2,3]', explanation: 'Item 0: 8-4=4. Item 1: 4-2=2. Item 2: 6-2=4. Items 3,4: no discount.' },
      { input: 'prices = [1,2,3,4,5]', output: '[1,2,3,4,5]', explanation: 'No later item is cheaper or equal.' },
      { input: 'prices = [10,1,1,6]', output: '[9,0,1,6]', explanation: '' },
    ],
    constraints: ['1 <= prices.length <= 500', '1 <= prices[i] <= 10^3'],
    starterCode: `/**
 * @param {number[]} prices
 * @return {number[]}
 */
function finalPrices(prices) {

}`,
    starterCodePython: `class Solution:
    def finalPrices(self, prices: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: '[8,4,6,2,3] → [4,2,4,2,3]', args: [[8,4,6,2,3]], expected: [4,2,4,2,3] },
      { label: '[1,2,3,4,5] → same', args: [[1,2,3,4,5]], expected: [1,2,3,4,5] },
      { label: '[10,1,1,6] → [9,0,1,6]', args: [[10,1,1,6]], expected: [9,0,1,6] },
    ],
    hint: 'Use a monotonic stack (non-decreasing). Push indices. When current price <= stack top price, the current item provides the discount for the stack top. Pop and subtract.',
  },

  129: {
    id: 129,
    title: 'Sum Root to Leaf Numbers',
    titleZh: '求根节点到叶节点数字之和',
    difficulty: 'Medium',
    leetcodeSlug: 'sum-root-to-leaf-numbers',
    tags: ['tree', 'depth-first-search', 'math'],
    description: 'Given a binary tree where each node contains a digit (0-9), each root-to-leaf path forms a number. Return the total sum of all such numbers.',
    examples: [
      { input: 'root = [1,2,3]', output: '25', explanation: 'Paths: 12 + 13 = 25.' },
      { input: 'root = [4,9,0,5,1]', output: '1026', explanation: 'Paths: 495 + 491 + 40 = 1026.' },
    ],
    constraints: ['1 <= nodes <= 1000', '0 <= Node.val <= 9', 'depth <= 10'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift();if(arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left)}i++;if(i<arr.length){if(arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right)}i++}}return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumNumbers(root) {

}

function solve(arr) { return sumNumbers(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        pass`,
    testCases: [
      { label: '[1,2,3] → 25', args: [[1,2,3]], expected: 25 },
      { label: '[4,9,0,5,1] → 1026', args: [[4,9,0,5,1]], expected: 1026 },
      { label: 'single node [5] → 5', args: [[5]], expected: 5 },
    ],
    hint: 'DFS with a running number. At each node: current = current * 10 + node.val. At a leaf, add current to the total. Recurse on left and right children.',
  },

  257: {
    id: 257,
    title: 'Binary Tree Paths',
    titleZh: '二叉树的所有路径',
    difficulty: 'Easy',
    leetcodeSlug: 'binary-tree-paths',
    tags: ['tree', 'depth-first-search', 'string', 'backtracking'],
    description: 'Given the root of a binary tree, return all root-to-leaf paths in any order.',
    examples: [
      { input: 'root = [1,2,3,null,5]', output: '["1->2->5","1->3"]', explanation: '' },
      { input: 'root = [1]', output: '["1"]', explanation: '' },
    ],
    constraints: ['1 <= nodes <= 100', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift();if(arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left)}i++;if(i<arr.length){if(arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right)}i++}}return root; };

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
function binaryTreePaths(root) {

}

function solve(arr) { return binaryTreePaths(buildTree(arr)).sort(); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def binaryTreePaths(self, root: TreeNode) -> list[str]:
        pass`,
    testCases: [
      { label: '[1,2,3,null,5]', args: [[1,2,3,null,5]], expected: ['1->2->5','1->3'] },
      { label: 'single node [1]', args: [[1]], expected: ['1'] },
      { label: '[1,2,3]', args: [[1,2,3]], expected: ['1->2','1->3'] },
    ],
    hint: 'DFS with path accumulation. At each leaf, push the current path string. Build path by appending "->node.val" as you recurse; backtrack on return.',
  },

  386: {
    id: 386,
    title: 'Lexicographical Numbers',
    titleZh: '字典序排数',
    difficulty: 'Medium',
    leetcodeSlug: 'lexicographical-numbers',
    tags: ['depth-first-search', 'trie'],
    description: 'Given an integer n, return all numbers from 1 to n sorted in lexicographical order.',
    examples: [
      { input: 'n = 13', output: '[1,10,11,12,13,2,3,4,5,6,7,8,9]', explanation: '' },
      { input: 'n = 2', output: '[1,2]', explanation: '' },
    ],
    constraints: ['1 <= n <= 5 * 10^4'],
    starterCode: `/**
 * @param {number} n
 * @return {number[]}
 */
function lexicalOrder(n) {

}`,
    starterCodePython: `class Solution:
    def lexicalOrder(self, n: int) -> list[int]:
        pass`,
    testCases: [
      { label: 'n=13', args: [13], expected: [1,10,11,12,13,2,3,4,5,6,7,8,9] },
      { label: 'n=2', args: [2], expected: [1,2] },
      { label: 'n=1', args: [1], expected: [1] },
      { label: 'n=20', args: [20], expected: [1,10,11,12,13,14,15,16,17,18,19,2,20,3,4,5,6,7,8,9] },
    ],
    hint: 'DFS on the implicit 10-ary trie. For each prefix curr (1-9 initially), add curr to result, then try curr*10 to curr*10+9 (while <= n). Otherwise increment curr and continue.',
  },

  404: {
    id: 404,
    title: 'Sum of Left Leaves',
    titleZh: '左叶子之和',
    difficulty: 'Easy',
    leetcodeSlug: 'sum-of-left-leaves',
    tags: ['tree', 'depth-first-search', 'breadth-first-search'],
    description: 'Given the root of a binary tree, return the sum of all left leaves (leaf nodes that are left children).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '24', explanation: 'Left leaves are 9 and 15. Sum = 9 + 15 = 24.' },
      { input: 'root = [1]', output: '0', explanation: 'No left leaves.' },
    ],
    constraints: ['1 <= nodes <= 1000', '-1000 <= Node.val <= 1000'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift();if(arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left)}i++;if(i<arr.length){if(arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right)}i++}}return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumOfLeftLeaves(root) {

}

function solve(arr) { return sumOfLeftLeaves(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sumOfLeftLeaves(self, root: TreeNode) -> int:
        pass`,
    testCases: [
      { label: '[3,9,20,null,null,15,7] → 24', args: [[3,9,20,null,null,15,7]], expected: 24 },
      { label: 'single node [1] → 0', args: [[1]], expected: 0 },
      { label: '[1,2,3,4,5] → 4', args: [[1,2,3,4,5]], expected: 4 },
    ],
    hint: 'DFS with an isLeft flag. Pass isLeft=true when recursing left, false for right. Add node.val to the sum only when isLeft is true AND the node is a leaf (no children).',
  },

  513: {
    id: 513,
    title: 'Find Bottom Left Tree Value',
    titleZh: '找树左下角的值',
    difficulty: 'Medium',
    leetcodeSlug: 'find-bottom-left-tree-value',
    tags: ['tree', 'depth-first-search', 'breadth-first-search'],
    description: 'Given the root of a binary tree, return the leftmost value in the last row of the tree.',
    examples: [
      { input: 'root = [2,1,3]', output: '1', explanation: 'Last row has 1 and 3; leftmost is 1.' },
      { input: 'root = [1,2,3,4,null,5,6,null,null,7]', output: '7', explanation: 'Last row has only node 7.' },
    ],
    constraints: ['1 <= nodes <= 10^4', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift();if(arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left)}i++;if(i<arr.length){if(arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right)}i++}}return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function findBottomLeftValue(root) {

}

function solve(arr) { return findBottomLeftValue(buildTree(arr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findBottomLeftValue(self, root: TreeNode) -> int:
        pass`,
    testCases: [
      { label: '[2,1,3] → 1', args: [[2,1,3]], expected: 1 },
      { label: '[1,2,3,4,null,5,6,null,null,7] → 7', args: [[1,2,3,4,null,5,6,null,null,7]], expected: 7 },
      { label: 'single node [1] → 1', args: [[1]], expected: 1 },
    ],
    hint: 'BFS level-order: for each level, record the first (leftmost) node. After BFS, the last recorded leftmost node is the answer. Alternatively, DFS left-first tracking depth and updating result at each new max depth.',
  },

  572: {
    id: 572,
    title: 'Subtree of Another Tree',
    titleZh: '另一棵树的子树',
    difficulty: 'Easy',
    leetcodeSlug: 'subtree-of-another-tree',
    tags: ['tree', 'depth-first-search', 'hash-function', 'string-matching'],
    description: 'Given roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values as subRoot.',
    examples: [
      { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true', explanation: 'Subtree rooted at node 4 matches subRoot.' },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false', explanation: 'Node 2 has an extra left child 0.' },
    ],
    constraints: ['1 <= root nodes <= 2000', '1 <= subRoot nodes <= 1000', '-10^4 <= Node.val <= 10^4'],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift();if(arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left)}i++;if(i<arr.length){if(arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right)}i++}}return root; };

/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {

}

function solve(rootArr, subArr) { return isSubtree(buildTree(rootArr), buildTree(subArr)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:
        pass`,
    testCases: [
      { label: '[3,4,5,1,2] sub [4,1,2] → true', args: [[3,4,5,1,2], [4,1,2]], expected: true },
      { label: '[3,4,5,1,2,null,null,null,null,0] sub [4,1,2] → false', args: [[3,4,5,1,2,null,null,null,null,0], [4,1,2]], expected: false },
      { label: 'identical trees → true', args: [[1,2,3], [1,2,3]], expected: true },
    ],
    hint: 'Write a helper isSameTree(s, t). Then isSubtree = isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot).',
  },
}

export function getPracticeProblem(id: number): PracticeProblem | undefined {
  return practiceProblems[id]
}

export const practiceProblemIds = new Set(Object.keys(practiceProblems).map(Number))
