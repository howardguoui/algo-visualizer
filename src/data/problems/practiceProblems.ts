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

  // ─── Batch B4 — Binary Tree Traversal & Two Views (21 problems) ───────────

  112: {
    id: 112,
    title: 'Path Sum',
    titleZh: '路径总和',
    difficulty: 'Easy',
    leetcodeSlug: 'path-sum',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: `Given the root of a binary tree and an integer \`targetSum\`, return \`true\` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals \`targetSum\`.

A **leaf** is a node with no children.`,
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true', explanation: 'The path 5→4→11→2 sums to 22.' },
      { input: 'root = [1,2,3], targetSum = 5', output: 'false', explanation: 'The paths are [1,2]=3 and [1,3]=4. Neither equals 5.' },
      { input: 'root = [], targetSum = 0', output: 'false', explanation: 'Empty tree has no root-to-leaf paths.' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000',
    ],
    starterCode: `/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {

}

class TreeNode { constructor(val, left, right) { this.val = val; this.left = left ?? null; this.right = right ?? null; } }
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };
function solve(arr, target) { return hasPathSum(buildTree(arr), target); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
        pass`,
    testCases: [
      { label: '[5,4,8,11,null,13,4,7,2,null,null,null,1], 22 → true', args: [[5,4,8,11,null,13,4,7,2,null,null,null,1], 22], expected: true },
      { label: '[1,2,3], 5 → false', args: [[1,2,3], 5], expected: false },
      { label: 'empty, 0 → false', args: [[], 0], expected: false },
      { label: '[1,2], 1 → false (1 is not a leaf)', args: [[1,2], 1], expected: false },
      { label: '[1], 1 → true (single leaf node)', args: [[1], 1], expected: true },
    ],
    hint: 'DFS: at each leaf node, check if remaining sum equals node.val. Recurse by subtracting current node value. A leaf has no children — do not count non-leaf nodes as valid endpoints.',
  },

  113: {
    id: 113,
    title: 'Path Sum II',
    titleZh: '路径总和 II',
    difficulty: 'Medium',
    leetcodeSlug: 'path-sum-ii',
    tags: ['Tree', 'DFS', 'Backtracking', 'Binary Tree'],
    description: `Given the root of a binary tree and an integer \`targetSum\`, return all **root-to-leaf paths** where the sum of the node values in the path equals \`targetSum\`. Each path should be returned as a list of node values.

A **leaf** is a node with no children.`,
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '[[5,4,11,2],[5,8,4,5]]' },
      { input: 'root = [1,2,3], targetSum = 5', output: '[]' },
      { input: 'root = [1,2], targetSum = 0', output: '[]' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000',
    ],
    starterCode: `/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
function pathSum(root, targetSum) {

}

class TreeNode { constructor(val, left, right) { this.val = val; this.left = left ?? null; this.right = right ?? null; } }
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };
function solve(arr, target) { return pathSum(buildTree(arr), target).sort((a,b)=>a[0]-b[0]||a[1]-b[1]); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def pathSum(self, root: TreeNode, targetSum: int) -> list[list[int]]:
        pass`,
    testCases: [
      { label: '[5,4,8,11,null,13,4,7,2,null,null,5,1], 22 → [[5,4,11,2],[5,8,4,5]]', args: [[5,4,8,11,null,13,4,7,2,null,null,5,1], 22], expected: [[5,4,11,2],[5,8,4,5]] },
      { label: '[1,2,3], 5 → []', args: [[1,2,3], 5], expected: [] },
      { label: '[1,2], 0 → []', args: [[1,2], 0], expected: [] },
      { label: '[1], 1 → [[1]]', args: [[1], 1], expected: [[1]] },
    ],
    hint: 'DFS with backtracking: maintain a current path array. When you reach a leaf and remaining sum equals leaf.val, push a copy of the path to results. After each recursive call, pop the last element to backtrack.',
  },

  617: {
    id: 617,
    title: 'Merge Two Binary Trees',
    titleZh: '合并二叉树',
    difficulty: 'Easy',
    leetcodeSlug: 'merge-two-binary-trees',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: `You are given two binary trees \`root1\` and \`root2\`.

Imagine that when you put one of them to cover the other, some nodes of the two trees overlap while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the non-null node will be used as the node of the new tree.

Return the **merged tree**.`,
    examples: [
      { input: 'root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]', output: '[3,4,5,5,4,null,7]' },
      { input: 'root1 = [1], root2 = [1,2]', output: '[2,2]' },
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 2000].',
      '-10^4 <= Node.val <= 10^4',
    ],
    starterCode: `/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
function mergeTrees(root1, root2) {

}

class TreeNode { constructor(val, left, right) { this.val = val; this.left = left ?? null; this.right = right ?? null; } }
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };
const treeToArr = root => { if(!root)return[]; const res=[],q=[root]; while(q.length){const n=q.shift();res.push(n?n.val:null);if(n){q.push(n.left);q.push(n.right);}} while(res.length&&res[res.length-1]===null)res.pop(); return res; };
function solve(arr1, arr2) { return treeToArr(mergeTrees(buildTree(arr1), buildTree(arr2))); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def mergeTrees(self, root1: TreeNode, root2: TreeNode) -> TreeNode:
        pass`,
    testCases: [
      { label: '[1,3,2,5] + [2,1,3,null,4,null,7] → [3,4,5,5,4,null,7]', args: [[1,3,2,5], [2,1,3,null,4,null,7]], expected: [3,4,5,5,4,null,7] },
      { label: '[1] + [1,2] → [2,2]', args: [[1], [1,2]], expected: [2,2] },
      { label: 'empty + [1] → [1]', args: [[], [1]], expected: [1] },
      { label: '[1] + empty → [1]', args: [[1], []], expected: [1] },
    ],
    hint: 'Recursive: if either node is null, return the other. Otherwise create a node with sum of values, then recursively merge left children and right children.',
  },

  623: {
    id: 623,
    title: 'Add One Row to Tree',
    titleZh: '在二叉树中增加一行',
    difficulty: 'Medium',
    leetcodeSlug: 'add-one-row-to-tree',
    tags: ['Tree', 'BFS', 'DFS', 'Binary Tree'],
    description: `Given the root of a binary tree and two integers \`val\` and \`depth\`, add a row of nodes with value \`val\` at the given depth \`depth\`.

The root node is at depth \`1\`.

The adding rule is: for each node \`cur\` at depth \`depth - 1\`:
- Create two tree nodes with value \`val\` as \`cur\`'s left and right subtree roots.
- \`cur\`'s original left subtree becomes the left subtree of the new left node.
- \`cur\`'s original right subtree becomes the right subtree of the new right node.

If \`depth == 1\`, create a new root with value \`val\` and make the original tree its left subtree.`,
    examples: [
      { input: 'root = [4,2,6,3,1,5], val = 1, depth = 2', output: '[4,1,1,2,null,null,6,3,1,5]' },
      { input: 'root = [4,2,null,3,1], val = 1, depth = 3', output: '[4,2,null,1,1,3,null,null,1]' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-100 <= Node.val <= 100',
      '-10^5 <= val <= 10^5',
      '1 <= depth <= the depth of tree + 1',
    ],
    starterCode: `/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
function addOneRow(root, val, depth) {

}

class TreeNode { constructor(val, left, right) { this.val = val; this.left = left ?? null; this.right = right ?? null; } }
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };
const treeToArr = root => { if(!root)return[]; const res=[],q=[root]; while(q.length){const n=q.shift();res.push(n?n.val:null);if(n){q.push(n.left);q.push(n.right);}} while(res.length&&res[res.length-1]===null)res.pop(); return res; };
function solve(arr, val, depth) { return treeToArr(addOneRow(buildTree(arr), val, depth)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def addOneRow(self, root: TreeNode, val: int, depth: int) -> TreeNode:
        pass`,
    testCases: [
      { label: '[4,2,6,3,1,5], val=1, depth=2 → [4,1,1,2,null,null,6,3,1,5]', args: [[4,2,6,3,1,5], 1, 2], expected: [4,1,1,2,null,null,6,3,1,5] },
      { label: '[4,2,null,3,1], val=1, depth=3 → [4,2,null,1,1,3,null,null,1]', args: [[4,2,null,3,1], 1, 3], expected: [4,2,null,1,1,3,null,null,1] },
      { label: '[1,2,3], val=5, depth=1 → [5,1,null,2,3]', args: [[1,2,3], 5, 1], expected: [5,1,null,2,3] },
    ],
    hint: 'BFS level-by-level until depth-1. For each node at depth-1, insert two new nodes between it and its children. Special case: depth=1 means create a new root with old root as left child.',
  },

  933: {
    id: 933,
    title: 'Number of Recent Calls',
    titleZh: '最近的请求次数',
    difficulty: 'Easy',
    leetcodeSlug: 'number-of-recent-calls',
    tags: ['Design', 'Queue', 'Data Stream'],
    description: `You have a \`RecentCounter\` class which counts the number of recent requests within a certain time frame.

Implement the \`RecentCounter\` class:
- \`RecentCounter()\` Initializes the counter with zero recent requests.
- \`int ping(int t)\` Adds a new request at time \`t\`, where \`t\` represents some time in milliseconds, and returns the number of requests that has happened in the past \`3000\` milliseconds (including the new request). Specifically, return the number of requests in the inclusive range \`[t - 3000, t]\`.

It is **guaranteed** that every call to \`ping\` uses a strictly larger value of \`t\` than the previous call.`,
    examples: [
      { input: 'ping(1), ping(100), ping(3001), ping(3002)', output: '[1, 2, 3, 3]', explanation: 'ping(3001) counts [1,3001]: values 1,100,3001 = 3. ping(3002) counts [2,3002]: values 100,3001,3002 = 3.' },
    ],
    constraints: [
      '1 <= t <= 10^9',
      'Each test case will call ping with strictly increasing values of t.',
      'At most 10^4 calls will be made to ping.',
    ],
    starterCode: `class RecentCounter {
  constructor() {
  }

  /**
   * @param {number} t
   * @return {number}
   */
  ping(t) {
  }
}

function solve(pings) {
  const rc = new RecentCounter();
  return pings.map(t => rc.ping(t));
}`,
    starterCodePython: `from collections import deque

class RecentCounter:
    def __init__(self):
        pass

    def ping(self, t: int) -> int:
        pass`,
    testCases: [
      { label: '[1,100,3001,3002] → [1,2,3,3]', args: [[1,100,3001,3002]], expected: [1,2,3,3] },
      { label: '[1] → [1]', args: [[1]], expected: [1] },
      { label: '[1,3001,3002,6002] → [1,2,2,2]', args: [[1,3001,3002,6002]], expected: [1,2,2,2] },
    ],
    hint: 'Use a queue (array). On each ping(t), push t. Then remove elements from the front while queue[0] < t - 3000. Return queue.length.',
  },

  975: {
    id: 975,
    title: 'Odd Even Jump',
    titleZh: '奇偶跳',
    difficulty: 'Hard',
    leetcodeSlug: 'odd-even-jump',
    tags: ['Array', 'Dynamic Programming', 'Stack', 'Monotonic Stack', 'Ordered Set'],
    description: `You are given an integer array \`arr\`. From some starting index, you can make a series of jumps. The (1st, 3rd, 5th, ...) jumps are called **odd-numbered jumps**, and the (2nd, 4th, 6th, ...) jumps are called **even-numbered jumps**.

- For an **odd-numbered jump** from index \`i\`, find the **minimum** \`arr[j]\` such that \`j > i\` and \`arr[j] >= arr[i]\`. If there are multiple such \`j\`, take the **smallest** \`j\`.
- For an **even-numbered jump** from index \`i\`, find the **maximum** \`arr[j]\` such that \`j > i\` and \`arr[j] <= arr[i]\`. If there are multiple such \`j\`, take the **smallest** \`j\`.

An index \`i\` is **good** if, starting from index \`i\`, you can reach the last index (possibly 0 jumps). Return the **number of good starting indices**.`,
    examples: [
      { input: 'arr = [10,13,12,14,15]', output: '2', explanation: 'Indices 3 and 4 can reach the end.' },
      { input: 'arr = [2,3,1,1,4]', output: '3', explanation: 'Indices 1, 3, and 4 can reach the end.' },
      { input: 'arr = [5,1,3,4,2]', output: '3', explanation: 'Indices 1, 2, and 4 can reach the end.' },
    ],
    constraints: [
      '1 <= arr.length <= 2 * 10^4',
      '0 <= arr[i] < 10^5',
    ],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number}
 */
function oddEvenJumps(arr) {

}`,
    starterCodePython: `class Solution:
    def oddEvenJumps(self, arr: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[10,13,12,14,15] → 2', args: [[10,13,12,14,15]], expected: 2 },
      { label: '[2,3,1,1,4] → 3', args: [[2,3,1,1,4]], expected: 3 },
      { label: '[5,1,3,4,2] → 3', args: [[5,1,3,4,2]], expected: 3 },
      { label: '[1] → 1', args: [[1]], expected: 1 },
    ],
    hint: 'DP + monotonic stack. For each index, precompute next_odd[i] (jump destination on odd jump) and next_even[i] (on even jump) using sorted order. Then dp_odd[i] = can reach end starting with odd jump from i; dp_even[i] = even jump. Work right to left.',
  },

  1011: {
    id: 1011,
    title: 'Capacity To Ship Packages Within D Days',
    titleZh: 'D 天内送达包裹的能力',
    difficulty: 'Medium',
    leetcodeSlug: 'capacity-to-ship-packages-within-d-days',
    tags: ['Array', 'Binary Search'],
    description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`i\`-th package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt in the order given by \`weights\`. We may not load more weight than the maximum weight capacity of the ship.

Return the **least weight capacity** of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.`,
    examples: [
      { input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', output: '15' },
      { input: 'weights = [3,2,2,4,1,4], days = 3', output: '6' },
      { input: 'weights = [1,2,3,1,1], days = 4', output: '3' },
    ],
    constraints: [
      '1 <= days <= weights.length <= 5 * 10^4',
      '1 <= weights[i] <= 500',
    ],
    starterCode: `/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
function shipWithinDays(weights, days) {

}`,
    starterCodePython: `class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> int:
        pass`,
    testCases: [
      { label: '[1..10], days=5 → 15', args: [[1,2,3,4,5,6,7,8,9,10], 5], expected: 15 },
      { label: '[3,2,2,4,1,4], days=3 → 6', args: [[3,2,2,4,1,4], 3], expected: 6 },
      { label: '[1,2,3,1,1], days=4 → 3', args: [[1,2,3,1,1], 4], expected: 3 },
    ],
    hint: 'Binary search on capacity. Left = max(weights) (must fit each package), Right = sum(weights) (ship all in 1 day). For a given capacity, greedily count days needed. If days_needed <= days, try reducing capacity.',
  },

  1029: {
    id: 1029,
    title: 'Two City Scheduling',
    titleZh: '两地调度',
    difficulty: 'Medium',
    leetcodeSlug: 'two-city-scheduling',
    tags: ['Array', 'Greedy', 'Sorting'],
    description: `A company is planning to interview \`2n\` people. Given the array \`costs\` where \`costs[i] = [aCosti, bCosti]\`, the cost of flying the \`i\`th person to city \`a\` is \`aCosti\`, and the cost of flying the \`i\`th person to city \`b\` is \`bCosti\`.

Return the **minimum cost** to fly every person to a city such that exactly \`n\` people arrive in each city.`,
    examples: [
      { input: 'costs = [[10,20],[30,200],[400,50],[30,20]]', output: '110', explanation: 'Persons 0,1 to city A (10+30=40), persons 2,3 to city B (50+20=70). Total=110.' },
      { input: 'costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]', output: '1859' },
    ],
    constraints: [
      '2 * n == costs.length',
      '2 <= costs.length <= 200',
      '0 <= aCosti, bCosti <= 10^4',
    ],
    starterCode: `/**
 * @param {number[][]} costs
 * @return {number}
 */
function twoCitySchedCost(costs) {

}`,
    starterCodePython: `class Solution:
    def twoCitySchedCost(self, costs: list[list[int]]) -> int:
        pass`,
    testCases: [
      { label: '[[10,20],[30,200],[400,50],[30,20]] → 110', args: [[[10,20],[30,200],[400,50],[30,20]]], expected: 110 },
      { label: '6 people → 1859', args: [[[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]], expected: 1859 },
      { label: '[[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]] → 3086', args: [[[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]], expected: 3086 },
    ],
    hint: 'Greedy: sort by (aCost - bCost). Sending someone to city A "costs" aCost but "saves" bCost. Sort by this difference ascending — the first n go to city A (biggest savings), rest to city B.',
  },

  1030: {
    id: 1030,
    title: 'Matrix Cells in Distance Order',
    titleZh: '距离顺序排列矩阵单元格',
    difficulty: 'Easy',
    leetcodeSlug: 'matrix-cells-in-distance-order',
    tags: ['Array', 'Math', 'Geometry', 'Sorting', 'Matrix', 'BFS'],
    description: `You are given four integers \`rows\`, \`cols\`, \`rCenter\`, and \`cCenter\`. There is a \`rows x cols\` matrix and you are on the cell with coordinates \`(rCenter, cCenter)\`.

Return the coordinates of all cells in the matrix, sorted by their **distance** from \`(rCenter, cCenter)\` from the smallest distance to the largest distance.

The **distance** between two cells \`(r1, c1)\` and \`(r2, c2)\` is \`|r1 - r2| + |c1 - c2|\` (Manhattan distance).`,
    examples: [
      { input: 'rows = 1, cols = 2, rCenter = 0, cCenter = 0', output: '[[0,0],[0,1]]' },
      { input: 'rows = 2, cols = 2, rCenter = 0, cCenter = 1', output: '[[0,1],[0,0],[1,1],[1,0]]' },
    ],
    constraints: [
      '1 <= rows, cols <= 100',
      '0 <= rCenter < rows',
      '0 <= cCenter < cols',
    ],
    starterCode: `/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rCenter
 * @param {number} cCenter
 * @return {number[][]}
 */
function allCellsDistOrder(rows, cols, rCenter, cCenter) {

}

function solve(rows, cols, rCenter, cCenter) {
  const res = allCellsDistOrder(rows, cols, rCenter, cCenter);
  return res.sort((a, b) => {
    const da = Math.abs(a[0]-rCenter)+Math.abs(a[1]-cCenter);
    const db = Math.abs(b[0]-rCenter)+Math.abs(b[1]-cCenter);
    return da !== db ? da-db : a[0] !== b[0] ? a[0]-b[0] : a[1]-b[1];
  });
}`,
    starterCodePython: `class Solution:
    def allCellsDistOrder(self, rows: int, cols: int, rCenter: int, cCenter: int) -> list[list[int]]:
        pass`,
    testCases: [
      { label: '1x2, center(0,0) → [[0,0],[0,1]]', args: [1, 2, 0, 0], expected: [[0,0],[0,1]] },
      { label: '2x2, center(0,1) → [[0,1],[0,0],[1,1],[1,0]]', args: [2, 2, 0, 1], expected: [[0,1],[0,0],[1,1],[1,0]] },
      { label: '2x3, center(1,2) sorted', args: [2, 3, 1, 2], expected: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]] },
    ],
    hint: 'Approach 1: generate all cells, sort by Manhattan distance (tie-break by row then col). Approach 2: BFS from the center — BFS naturally expands in distance order.',
  },

  1035: {
    id: 1035,
    title: 'Uncrossed Lines',
    titleZh: '不相交的线',
    difficulty: 'Medium',
    leetcodeSlug: 'uncrossed-lines',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given two integer arrays \`nums1\` and \`nums2\`. We write the integers of \`nums1\` and \`nums2\` (in the order they are given) on two separate horizontal lines.

We may draw connecting lines: a straight line connecting \`nums1[i]\` and \`nums2[j]\` such that:
- \`nums1[i] == nums2[j]\`, and
- the line we draw does not intersect any other connecting lines.

Return the **maximum number of connecting lines** we can draw.`,
    examples: [
      { input: 'nums1 = [1,4,2], nums2 = [1,2,4]', output: '2', explanation: 'We can draw lines 1-1 and 2-2 (or 1-1 and 4-4).' },
      { input: 'nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]', output: '3' },
      { input: 'nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]', output: '2' },
    ],
    constraints: [
      '1 <= nums1.length, nums2.length <= 500',
      '1 <= nums1[i], nums2[j] <= 2000',
    ],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function maxUncrossedLines(nums1, nums2) {

}`,
    starterCodePython: `class Solution:
    def maxUncrossedLines(self, nums1: list[int], nums2: list[int]) -> int:
        pass`,
    testCases: [
      { label: '[1,4,2] vs [1,2,4] → 2', args: [[1,4,2],[1,2,4]], expected: 2 },
      { label: '[2,5,1,2,5] vs [10,5,2,1,5,2] → 3', args: [[2,5,1,2,5],[10,5,2,1,5,2]], expected: 3 },
      { label: '[1,3,7,1,7,5] vs [1,9,2,5,1] → 2', args: [[1,3,7,1,7,5],[1,9,2,5,1]], expected: 2 },
    ],
    hint: 'This is exactly the Longest Common Subsequence (LCS) problem! Non-crossing connecting lines correspond to a common subsequence in relative order. Use 2D DP: dp[i][j] = max lines using nums1[:i] and nums2[:j].',
  },

  1079: {
    id: 1079,
    title: 'Letter Tile Possibilities',
    titleZh: '活字印刷',
    difficulty: 'Medium',
    leetcodeSlug: 'letter-tile-possibilities',
    tags: ['Hash Table', 'Math', 'String', 'Backtracking', 'Counting'],
    description: `You have \`n\` tiles, where each tile has one letter \`tiles[i]\` printed on it.

Return the **number of possible non-empty sequences of letters** you can make using the letters printed on those tiles.`,
    examples: [
      { input: 'tiles = "AAB"', output: '8', explanation: 'Possible sequences: A, B, AA, AB, BA, AAB, ABA, BAA.' },
      { input: 'tiles = "AAABBC"', output: '188' },
      { input: 'tiles = "V"', output: '1' },
    ],
    constraints: [
      '1 <= tiles.length <= 7',
      'tiles consists of uppercase English letters.',
    ],
    starterCode: `/**
 * @param {string} tiles
 * @return {number}
 */
function numTilePossibilities(tiles) {

}`,
    starterCodePython: `class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        pass`,
    testCases: [
      { label: '"AAB" → 8', args: ['AAB'], expected: 8 },
      { label: '"AAABBC" → 188', args: ['AAABBC'], expected: 188 },
      { label: '"V" → 1', args: ['V'], expected: 1 },
      { label: '"AB" → 4', args: ['AB'], expected: 4 },
    ],
    hint: 'Count frequency of each letter. Backtrack: at each step, try placing each unique letter (by count, not position). Decrement its count, add 1 to result, recurse (can place more), then restore count. Every recursive call represents a completed sequence.',
  },

  1194: {
    id: 1194,
    title: 'Tournament Results',
    titleZh: '锦标赛优胜者',
    difficulty: 'Medium',
    leetcodeSlug: 'tournament-results',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: `**Note:** This is an algorithmic adaptation of a database problem.

Given a list of tournament match results where each entry is \`[winner, loser]\`, compute the overall standings.

Return an array of all players sorted by:
1. **Number of wins** (descending)
2. **Player name** (lexicographically ascending) for ties

Each entry in the output should be \`[playerName, wins]\`.`,
    examples: [
      { input: 'results = [["Alice","Bob"],["Alice","Charlie"],["Bob","Charlie"],["Dave","Alice"]]', output: '[["Alice",2],["Bob",1],["Dave",1],["Charlie",0]]', explanation: 'Alice has 2 wins, Bob and Dave have 1 win each (Bob < Dave alphabetically), Charlie has 0 wins.' },
    ],
    constraints: [
      '1 <= results.length <= 10^4',
      'Each result is a pair [winner, loser] of distinct player names.',
    ],
    starterCode: `/**
 * @param {string[][]} results - array of [winner, loser] pairs
 * @return {Array} - array of [playerName, wins] sorted by wins desc, name asc
 */
function tournamentResults(results) {

}`,
    starterCodePython: `class Solution:
    def tournamentResults(self, results: list[list[str]]) -> list:
        pass`,
    testCases: [
      { label: 'basic standings', args: [[['Alice','Bob'],['Alice','Charlie'],['Bob','Charlie'],['Dave','Alice']]], expected: [['Alice',2],['Bob',1],['Dave',1],['Charlie',0]] },
      { label: 'single match', args: [[['A','B']]], expected: [['A',1],['B',0]] },
      { label: 'round-robin (all tie)', args: [[['A','B'],['B','C'],['C','A']]], expected: [['A',1],['B',1],['C',1]] },
    ],
    hint: 'Use a Map to track wins. First collect all unique players from both sides. Then increment winner counts. Finally sort by wins descending, then alphabetically.',
  },

  1243: {
    id: 1243,
    title: 'Array Transformation',
    titleZh: '数组变换',
    difficulty: 'Easy',
    leetcodeSlug: 'array-transformation',
    tags: ['Array', 'Simulation'],
    description: `Given an initial integer array \`arr\`, every day you produce a new array using the following rules:
- If an element is **smaller** than both its left neighbor and its right neighbor, increment it by \`1\`.
- If an element is **larger** than both its left neighbor and its right neighbor, decrement it by \`1\`.
- The first and last elements never change.

After some days, the array does not change. Return that final array.`,
    examples: [
      { input: 'arr = [6,2,3,4]', output: '[6,3,3,4]', explanation: 'Day 1: arr[1]=2 is local min → 3. Day 2 is stable.' },
      { input: 'arr = [1,6,3,4]', output: '[1,4,4,4]', explanation: 'Day 1: [1,5,4,4]. Day 2: [1,4,4,4]. Day 3: stable.' },
    ],
    constraints: [
      '3 <= arr.length <= 100',
      '1 <= arr[i] <= 100',
    ],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function transformArray(arr) {

}`,
    starterCodePython: `class Solution:
    def transformArray(self, arr: list[int]) -> list[int]:
        pass`,
    testCases: [
      { label: '[6,2,3,4] → [6,3,3,4]', args: [[6,2,3,4]], expected: [6,3,3,4] },
      { label: '[1,6,3,4] → [1,4,4,4]', args: [[1,6,3,4]], expected: [1,4,4,4] },
      { label: '[1,2,3] → [1,2,3] (monotonic, no change)', args: [[1,2,3]], expected: [1,2,3] },
    ],
    hint: 'Simulate day by day. Each day, apply all changes simultaneously using a copy. Keep going until no change occurs in a full pass. Track whether anything changed each day.',
  },

  1248: {
    id: 1248,
    title: 'Count Number of Nice Subarrays',
    titleZh: '统计「优美子数组」',
    difficulty: 'Medium',
    leetcodeSlug: 'count-number-of-nice-subarrays',
    tags: ['Array', 'Hash Table', 'Math', 'Sliding Window', 'Prefix Sum'],
    description: `Given an array of integers \`nums\` and an integer \`k\`. A continuous subarray is called **nice** if there are exactly \`k\` odd numbers on it.

Return the **number of nice sub-arrays**.`,
    examples: [
      { input: 'nums = [1,1,2,1,1], k = 3', output: '2', explanation: 'The subarrays [1,1,2,1] and [1,2,1,1] both have 3 odd numbers.' },
      { input: 'nums = [2,4,6], k = 1', output: '0', explanation: 'No odd numbers in the array.' },
      { input: 'nums = [2,2,2,1,2,2,1,2,2,2], k = 2', output: '16' },
    ],
    constraints: [
      '1 <= nums.length <= 50000',
      '1 <= nums[i] <= 10^5',
      '1 <= k <= nums.length',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function numberOfSubarrays(nums, k) {

}`,
    starterCodePython: `class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        pass`,
    testCases: [
      { label: '[1,1,2,1,1], k=3 → 2', args: [[1,1,2,1,1], 3], expected: 2 },
      { label: '[2,4,6], k=1 → 0', args: [[2,4,6], 1], expected: 0 },
      { label: '[2,2,2,1,2,2,1,2,2,2], k=2 → 16', args: [[2,2,2,1,2,2,1,2,2,2], 2], expected: 16 },
    ],
    hint: 'Prefix sum approach: let prefix[i] = number of odd elements in nums[0..i-1]. For each j, count how many i < j have prefix[j]-prefix[i] = k. Use a hash map to store prefix frequencies. Alternatively: "exactly k" = "at most k" - "at most k-1" with sliding window.',
  },

  1387: {
    id: 1387,
    title: 'Sort Integers by The Power Value',
    titleZh: '将整数按权重排序',
    difficulty: 'Medium',
    leetcodeSlug: 'sort-integers-by-the-power-value',
    tags: ['Dynamic Programming', 'Memoization', 'Sorting'],
    description: `The **power** of an integer \`x\` is defined as the number of steps needed to transform \`x\` into \`1\` using:
- if \`x\` is even: \`x = x / 2\`
- if \`x\` is odd: \`x = 3 * x + 1\`

Given three integers \`lo\`, \`hi\` and \`k\`, sort all integers in the interval \`[lo, hi]\` by their power values in **ascending order**. If two or more integers have the **same** power value, sort them by their value in ascending order.

Return the \`k\`-th integer in the range sorted by power value (1-indexed).`,
    examples: [
      { input: 'lo = 12, hi = 15, k = 2', output: '13', explanation: 'Powers: 12→9, 13→9, 14→17, 15→17. Sorted: [12,13,14,15]. k=2 → 13.' },
      { input: 'lo = 7, hi = 11, k = 4', output: '7' },
    ],
    constraints: [
      '1 <= lo <= hi <= 1000',
      '1 <= k <= hi - lo + 1',
    ],
    starterCode: `/**
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
function getKth(lo, hi, k) {

}`,
    starterCodePython: `class Solution:
    def getKth(self, lo: int, hi: int, k: int) -> int:
        pass`,
    testCases: [
      { label: 'lo=12, hi=15, k=2 → 13', args: [12, 15, 2], expected: 13 },
      { label: 'lo=7, hi=11, k=4 → 7', args: [7, 11, 4], expected: 7 },
      { label: 'lo=1, hi=1, k=1 → 1', args: [1, 1, 1], expected: 1 },
    ],
    hint: 'Use memoization to compute power values efficiently (Collatz sequence). Create pairs [power, value] for each number in [lo, hi], sort by (power, value), return the k-th element (1-indexed).',
  },

  1484: {
    id: 1484,
    title: 'Group Sold Products By The Date',
    titleZh: '按日期分组销售产品',
    difficulty: 'Easy',
    leetcodeSlug: 'group-sold-products-by-the-date',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: `**Note:** This is an algorithmic adaptation of a database problem.

Given an array of \`[date, product]\` pairs representing sales records, for each sell date return:
1. The \`sell_date\`
2. The number of **distinct** products sold on that date (\`num_sold\`)
3. The distinct product names sorted **lexicographically** and joined with commas (\`products\`)

Return results sorted by \`sell_date\` ascending. Each result should be \`[sell_date, num_sold, products_string]\`.`,
    examples: [
      { input: 'activities = [["2020-05-30","Headphone"],["2020-06-01","Pencil"],["2020-06-02","Mask"],["2020-05-30","Basketball"],["2020-06-01","Bible"],["2020-06-02","Mask"],["2020-05-30","T-Shirt"]]', output: '[["2020-05-30",3,"Basketball,Headphone,T-Shirt"],["2020-06-01",2,"Bible,Pencil"],["2020-06-02",1,"Mask"]]' },
    ],
    constraints: [
      '1 <= activities.length <= 10^4',
      'activities[i].length == 2',
      '1 <= date.length, product.length <= 10',
    ],
    starterCode: `/**
 * @param {string[][]} activities - array of [date, product] pairs
 * @return {Array} - array of [date, numDistinct, productsStr]
 */
function groupSoldProducts(activities) {

}`,
    starterCodePython: `class Solution:
    def groupSoldProducts(self, activities: list[list[str]]) -> list:
        pass`,
    testCases: [
      { label: 'basic grouping → 3 dates', args: [[['2020-05-30','Headphone'],['2020-06-01','Pencil'],['2020-06-02','Mask'],['2020-05-30','Basketball'],['2020-06-01','Bible'],['2020-06-02','Mask'],['2020-05-30','T-Shirt']]], expected: [['2020-05-30',3,'Basketball,Headphone,T-Shirt'],['2020-06-01',2,'Bible,Pencil'],['2020-06-02',1,'Mask']] },
      { label: 'single record', args: [[['2020-01-01','Apple']]], expected: [['2020-01-01',1,'Apple']] },
    ],
    hint: 'Use a Map<date, Set<product>>. Iterate activities, adding each product to the Set for its date. Sort dates, then for each date: count = Set.size, products = [...Set].sort().join(",").',
  },

  1544: {
    id: 1544,
    title: 'Make The String Great',
    titleZh: '整理字符串',
    difficulty: 'Easy',
    leetcodeSlug: 'make-the-string-great',
    tags: ['String', 'Stack'],
    description: `Given a string \`s\` of lower and upper case English letters.

A good string has no two adjacent characters \`s[i]\` and \`s[i+1]\` where one is the lowercase version of the other.

To make the string good, you can choose two adjacent bad characters and remove them. Repeat until the string becomes good.

Return the string after making it good. The answer is **guaranteed** to be unique.`,
    examples: [
      { input: 's = "leEeetcode"', output: '"leetcode"', explanation: '"Ee" is a bad pair → remove → "leetcode".' },
      { input: 's = "abBAcC"', output: '""', explanation: 'Remove all bad pairs step by step.' },
      { input: 's = "s"', output: '"s"' },
    ],
    constraints: [
      '1 <= s.length <= 100',
      's contains only lower and upper case English letters.',
    ],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function makeGood(s) {

}`,
    starterCodePython: `class Solution:
    def makeGood(self, s: str) -> str:
        pass`,
    testCases: [
      { label: '"leEeetcode" → "leetcode"', args: ['leEeetcode'], expected: 'leetcode' },
      { label: '"abBAcC" → ""', args: ['abBAcC'], expected: '' },
      { label: '"s" → "s"', args: ['s'], expected: 's' },
      { label: '"Aa" → ""', args: ['Aa'], expected: '' },
      { label: '"aAbB" → ""', args: ['aAbB'], expected: '' },
    ],
    hint: 'Use a stack. For each character, check if the stack top and the current char are the same letter in different cases: same char but one upper and one lower (differ by 32 in ASCII, or compare toLowerCase). If so, pop the stack. Otherwise push. Join stack at the end.',
  },

  1568: {
    id: 1568,
    title: 'Minimum Number of Days to Disconnect Island',
    titleZh: '使陆地分离的最少天数',
    difficulty: 'Hard',
    leetcodeSlug: 'minimum-number-of-days-to-disconnect-island',
    tags: ['Array', 'DFS', 'BFS', 'Matrix', 'Strongly Connected Component'],
    description: `You are given an \`m x n\` binary grid \`grid\` where \`1\` represents land and \`0\` represents water. An **island** is a maximal 4-directionally connected group of \`1\`s.

The grid is **connected** if we have **exactly one island**, otherwise it is **disconnected**.

In one day, we are allowed to change **any** single land cell (\`1\`) into a water cell (\`0\`).

Return the **minimum number of days** to disconnect the grid.`,
    examples: [
      { input: 'grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]', output: '2', explanation: 'Need to remove 2 land cells to disconnect.' },
      { input: 'grid = [[1,1]]', output: '2', explanation: 'Must remove both cells to disconnect.' },
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 30',
      'grid[i][j] is either 0 or 1.',
    ],
    starterCode: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function minDays(grid) {

}`,
    starterCodePython: `class Solution:
    def minDays(self, grid: list[list[int]]) -> int:
        pass`,
    testCases: [
      { label: '[[0,1,1,0],[0,1,1,0],[0,0,0,0]] → 2', args: [[[0,1,1,0],[0,1,1,0],[0,0,0,0]]], expected: 2 },
      { label: '[[1,1]] → 2', args: [[[1,1]]], expected: 2 },
      { label: '[[1,0,1,0]] → 0 (already disconnected)', args: [[[1,0,1,0]]], expected: 0 },
      { label: '[[0,0],[0,0]] → 0 (no island)', args: [[[0,0],[0,0]]], expected: 0 },
    ],
    hint: 'The answer is always 0, 1, or 2. Check 0: if already disconnected (0 or 2+ islands). Check 1: try removing each land cell and test connectivity. Otherwise return 2 (any corner or edge cell of the island is an articulation point or you can always disconnect in 2 days).',
  },

  2217: {
    id: 2217,
    title: 'Find Palindrome With Fixed Length',
    titleZh: '找到指定长度的回文数',
    difficulty: 'Medium',
    leetcodeSlug: 'find-palindrome-with-fixed-length',
    tags: ['Array', 'Math'],
    description: `Given an integer array \`queries\` and a positive integer \`intLength\`, return an array \`answer\` where \`answer[i]\` is either the \`queries[i]\`-th smallest **positive palindrome** of length \`intLength\` or \`-1\` if no such palindrome exists.

A **palindrome** is a number that reads the same backwards and forwards. Palindromes cannot have leading zeroes.`,
    examples: [
      { input: 'queries = [1,2,3,4,5,90], intLength = 3', output: '[101,111,121,131,141,999]' },
      { input: 'queries = [2,4,6], intLength = 4', output: '[1111,1331,1551]' },
    ],
    constraints: [
      '1 <= queries.length <= 5 * 10^4',
      '1 <= queries[i] <= 10^9',
      '1 <= intLength <= 15',
    ],
    starterCode: `/**
 * @param {number[]} queries
 * @param {number} intLength
 * @return {number[]}
 */
function kthPalindrome(queries, intLength) {

}`,
    starterCodePython: `class Solution:
    def kthPalindrome(self, queries: list[int], intLength: int) -> list[int]:
        pass`,
    testCases: [
      { label: 'queries=[1,2,3,4,5,90], intLength=3 → [101,111,121,131,141,999]', args: [[1,2,3,4,5,90], 3], expected: [101,111,121,131,141,999] },
      { label: 'queries=[2,4,6], intLength=4 → [1111,1331,1551]', args: [[2,4,6], 4], expected: [1111,1331,1551] },
      { label: 'queries=[1], intLength=1 → [1]', args: [[1], 1], expected: [1] },
      { label: 'queries=[1000000000], intLength=3 → [-1]', args: [[1000000000], 3], expected: [-1] },
    ],
    hint: 'The k-th palindrome of length n is determined by its first half (ceil(n/2) digits). The first valid prefix starts at 10^(halfLen-1). Prefix for k-th = start + (k-1). Mirror the prefix to form the palindrome. Return -1 if prefix exceeds 10^halfLen - 1.',
  },

  774: {
    id: 774,
    title: 'Minimize Max Distance to Gas Station',
    titleZh: '最小化去加油站的最大距离',
    difficulty: 'Hard',
    leetcodeSlug: 'minimize-max-distance-to-gas-station',
    tags: ['Array', 'Binary Search'],
    description: `You are given an integer array \`stations\` representing positions of gas stations on the x-axis. You are also given an integer \`k\`.

You should add \`k\` new gas stations. You can add stations anywhere on the x-axis (not necessarily at integer positions).

Return the **minimum possible value** of the **maximum distance** between adjacent gas stations after adding \`k\` new stations.

Answers within \`10^{-6}\` of the actual answer will be accepted.`,
    examples: [
      { input: 'stations = [1,2,3,4,5,6,7,8,9,10], k = 9', output: '0.500000' },
      { input: 'stations = [23,24,36,39,46,56,57,65,84,98], k = 1', output: '14.000000' },
    ],
    constraints: [
      '10 <= stations.length <= 2000',
      '0 <= stations[i] <= 10^8',
      'stations is sorted in a strictly increasing order.',
      '1 <= k <= 10^6',
    ],
    starterCode: `/**
 * @param {number[]} stations
 * @param {number} k
 * @return {number}
 */
function minmaxGasDist(stations, k) {

}

function solve(stations, k) {
  return Math.round(minmaxGasDist(stations, k) * 1e6) / 1e6;
}`,
    starterCodePython: `class Solution:
    def minmaxGasDist(self, stations: list[int], k: int) -> float:
        pass`,
    testCases: [
      { label: '[1..10], k=9 → 0.5', args: [[1,2,3,4,5,6,7,8,9,10], 9], expected: 0.5 },
      { label: '[23,24,36,39,46,56,57,65,84,98], k=1 → 14', args: [[23,24,36,39,46,56,57,65,84,98], 1], expected: 14 },
    ],
    hint: 'Binary search on the answer (max gap d). For a given d, stations needed for gap g = ceil(g/d) - 1. If total needed <= k, try smaller d. Adjust until within 1e-6 precision.',
  },

  1498: {
    id: 1498,
    title: 'Number of Subsequences That Satisfy the Given Sum Condition',
    titleZh: '满足条件的子序列数目',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-subsequences-that-satisfy-the-given-sum-condition',
    tags: ['Array', 'Two Pointers', 'Binary Search', 'Sorting'],
    description: `You are given an array of integers \`nums\` and an integer \`target\`.

Return the number of **non-empty** subsequences of \`nums\` such that the sum of the minimum and maximum element on it is less than or equal to \`target\`. Since the answer may be too large, return it **modulo \`10^9 + 7\`**.`,
    examples: [
      { input: 'nums = [3,5,6,7], target = 9', output: '4', explanation: 'Valid subsequences: [3],[3,5],[3,5,6],[3,6].' },
      { input: 'nums = [3,3,6,8], target = 10', output: '6' },
      { input: 'nums = [2,3,3,4,6,7], target = 12', output: '61' },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '1 <= nums[i] <= 10^6',
      '1 <= target <= 10^6',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function numSubseq(nums, target) {

}`,
    starterCodePython: `class Solution:
    def numSubseq(self, nums: list[int], target: int) -> int:
        pass`,
    testCases: [
      { label: '[3,5,6,7], target=9 → 4', args: [[3,5,6,7], 9], expected: 4 },
      { label: '[3,3,6,8], target=10 → 6', args: [[3,3,6,8], 10], expected: 6 },
      { label: '[2,3,3,4,6,7], target=12 → 61', args: [[2,3,3,4,6,7], 12], expected: 61 },
    ],
    hint: 'Sort nums. Two pointers: left=0, right=n-1. If nums[left]+nums[right]<=target, all 2^(right-left) subsequences with nums[left] as min are valid (add mod 10^9+7). Move left++. Else move right--. Precompute powers of 2 mod 10^9+7.',
  },

  // ── Batch B5 — Binary Tree Post Order (20 problems) ──────────────────────

  100: {
    id: 100,
    title: 'Same Tree',
    titleZh: '相同的树',
    difficulty: 'Easy',
    leetcodeSlug: 'same-tree',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Note:** The \`solve(arr1, arr2)\` adapter builds both trees from level-order arrays.`,
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
      { input: 'p = [1,2], q = [1,null,2]', output: 'false' },
      { input: 'p = [1,2,1], q = [1,1,2]', output: 'false' },
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].',
      '-10^4 <= Node.val <= 10^4',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {

}

// Test adapter (do not remove)
function solve(arr1, arr2) { return isSameTree(buildTree(arr1), buildTree(arr2)); }`,
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
    def isSameTree(self, p, q):
        pass

def solve(arr1, arr2): return Solution().isSameTree(build_tree(arr1), build_tree(arr2))`,
    testCases: [
      { label: '[1,2,3] vs [1,2,3] → true', args: [[1,2,3], [1,2,3]], expected: true },
      { label: '[1,2] vs [1,null,2] → false', args: [[1,2], [1,null,2]], expected: false },
      { label: '[1,2,1] vs [1,1,2] → false', args: [[1,2,1], [1,1,2]], expected: false },
      { label: 'Both empty → true', args: [[], []], expected: true },
    ],
    hint: 'Recursively compare: if both null → true; if one null → false; if values differ → false; then recurse left & right.',
  },

  110: {
    id: 110,
    title: 'Balanced Binary Tree',
    titleZh: '平衡二叉树',
    difficulty: 'Easy',
    leetcodeSlug: 'balanced-binary-tree',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: `Given a binary tree, determine if it is **height-balanced**.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

**Note:** The \`solve(arr)\` adapter builds the tree from a level-order array.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: 'true' },
      { input: 'root = [1,2,2,3,3,null,null,4,4]', output: 'false' },
      { input: 'root = []', output: 'true' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-10^4 <= Node.val <= 10^4',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced(root) {

}

// Test adapter (do not remove)
function solve(arr) { return isBalanced(buildTree(arr)); }`,
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
    def isBalanced(self, root):
        pass

def solve(arr): return Solution().isBalanced(build_tree(arr))`,
    testCases: [
      { label: '[3,9,20,null,null,15,7] → true', args: [[3,9,20,null,null,15,7]], expected: true },
      { label: '[1,2,2,3,3,null,null,4,4] → false', args: [[1,2,2,3,3,null,null,4,4]], expected: false },
      { label: 'Empty → true', args: [[]], expected: true },
      { label: '[1,2,3,4,5,6,null,8] → true', args: [[1,2,3,4,5,6,null,8]], expected: true },
    ],
    hint: 'Post-order DFS: define a helper that returns -1 if unbalanced, or height otherwise. If |leftH - rightH| > 1, return -1. isBalanced(root) = (helper(root) !== -1).',
  },

  331: {
    id: 331,
    title: 'Verify Preorder Serialization of a Binary Tree',
    titleZh: '验证二叉树的前序序列化',
    difficulty: 'Medium',
    leetcodeSlug: 'verify-preorder-serialization-of-a-binary-tree',
    tags: ['String', 'Stack', 'Tree', 'Binary Tree'],
    description: `One way to serialize a binary tree is to use **preorder traversal**. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as \`'#'\`.

Given a string of comma-separated values \`preorder\`, return \`true\` if it is a correct preorder traversal serialization of some binary tree.`,
    examples: [
      { input: 'preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"', output: 'true' },
      { input: 'preorder = "1,#"', output: 'false' },
      { input: 'preorder = "9,#,#,1"', output: 'false' },
    ],
    constraints: [
      '1 <= preorder.length <= 10^4',
      "preorder consists of integers in the range [0, 100] and '#' separated by commas.",
    ],
    starterCode: `/**
 * @param {string} preorder
 * @return {boolean}
 */
function isValidSerialization(preorder) {

}

function solve(preorder) { return isValidSerialization(preorder); }`,
    starterCodePython: `class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        pass

def solve(preorder): return Solution().isValidSerialization(preorder)`,
    testCases: [
      { label: '"9,3,4,#,#,1,#,#,2,#,6,#,#" → true', args: ['9,3,4,#,#,1,#,#,2,#,6,#,#'], expected: true },
      { label: '"1,#" → false', args: ['1,#'], expected: false },
      { label: '"9,#,#,1" → false', args: ['9,#,#,1'], expected: false },
      { label: '"#" → true', args: ['#'], expected: true },
    ],
    hint: "Track available 'slots'. Start with 1. For each token: slots must be > 0. A non-null node uses 1 slot and creates 2 (net +1). A null '#' uses 1 slot (net -1). End: slots must be exactly 0.",
  },

  508: {
    id: 508,
    title: 'Most Frequent Subtree Sum',
    titleZh: '出现次数最多的子树元素和',
    difficulty: 'Medium',
    leetcodeSlug: 'most-frequent-subtree-sum',
    tags: ['Hash Table', 'Tree', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the most frequent **subtree sum**. If there is a tie, return all the elements with the highest frequency in any order.

The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).

**Note:** The \`solve(arr)\` adapter builds the tree from a level-order array and returns the result sorted.`,
    examples: [
      { input: 'root = [5,2,-3]', output: '[2,-3,4]', explanation: 'All values occur once, return all of them.' },
      { input: 'root = [5,2,-5]', output: '[2]', explanation: '2 occurs twice, -5 occurs once. Return [2].' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-10^5 <= Node.val <= 10^5',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function findFrequentTreeSum(root) {

}

// Test adapter (do not remove)
function solve(arr) { return findFrequentTreeSum(buildTree(arr)).sort((a,b)=>a-b); }`,
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
    def findFrequentTreeSum(self, root):
        pass

def solve(arr): return sorted(Solution().findFrequentTreeSum(build_tree(arr)))`,
    testCases: [
      { label: '[5,2,-3] → [-3,2,4]', args: [[5,2,-3]], expected: [-3,2,4] },
      { label: '[5,2,-5] → [2]', args: [[5,2,-5]], expected: [2] },
    ],
    hint: 'Post-order DFS: compute subtree sum for each node (leftSum + rightSum + node.val), track frequency in a map. Return all sums with the maximum frequency.',
  },

  563: {
    id: 563,
    title: 'Binary Tree Tilt',
    titleZh: '二叉树的坡度',
    difficulty: 'Easy',
    leetcodeSlug: 'binary-tree-tilt',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **sum of every tree node's tilt**.

The **tilt** of a tree node is the **absolute difference** between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, the left subtree sum is \`0\`. Same for the right child.

**Note:** The \`solve(arr)\` adapter builds the tree from a level-order array.`,
    examples: [
      { input: 'root = [1,2,3]', output: '1', explanation: 'Node 2: tilt=0. Node 3: tilt=0. Node 1: |2-3|=1. Total=1.' },
      { input: 'root = [4,2,9,3,5,null,7]', output: '15' },
      { input: 'root = [21,7,14,1,1,2,2,3,3]', output: '9' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-1000 <= Node.val <= 1000',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function findTilt(root) {

}

// Test adapter (do not remove)
function solve(arr) { return findTilt(buildTree(arr)); }`,
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
    def findTilt(self, root):
        pass

def solve(arr): return Solution().findTilt(build_tree(arr))`,
    testCases: [
      { label: '[1,2,3] → 1', args: [[1,2,3]], expected: 1 },
      { label: '[4,2,9,3,5,null,7] → 15', args: [[4,2,9,3,5,null,7]], expected: 15 },
      { label: '[21,7,14,1,1,2,2,3,3] → 9', args: [[21,7,14,1,1,2,2,3,3]], expected: 9 },
    ],
    hint: 'Post-order DFS: have a helper that returns the subtree sum. At each node, accumulate tilt += |leftSum - rightSum|. Return leftSum + rightSum + node.val. Total tilt is a running external variable.',
  },

  606: {
    id: 606,
    title: 'Construct String from Binary Tree',
    titleZh: '根据二叉树创建字符串',
    difficulty: 'Easy',
    leetcodeSlug: 'construct-string-from-binary-tree',
    tags: ['String', 'Tree', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, construct a string using **preorder traversal** with parentheses representing the structure.

Omit all empty parenthesis pairs that do not affect the one-to-one mapping between the string and the original binary tree.

**Note:** The \`solve(arr)\` adapter builds the tree from a level-order array.`,
    examples: [
      { input: 'root = [1,2,3,4]', output: '"1(2(4))(3)"', explanation: 'Empty right child parentheses omitted.' },
      { input: 'root = [1,2,3,null,4]', output: '"1(2()(4))(3)"', explanation: 'Left empty kept since right exists.' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-1000 <= Node.val <= 1000',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {string}
 */
function tree2str(root) {

}

// Test adapter (do not remove)
function solve(arr) { return tree2str(buildTree(arr)); }`,
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
    def tree2str(self, root):
        pass

def solve(arr): return Solution().tree2str(build_tree(arr))`,
    testCases: [
      { label: '[1,2,3,4] → "1(2(4))(3)"', args: [[1,2,3,4]], expected: '1(2(4))(3)' },
      { label: '[1,2,3,null,4] → "1(2()(4))(3)"', args: [[1,2,3,null,4]], expected: '1(2()(4))(3)' },
      { label: '[1] → "1"', args: [[1]], expected: '1' },
    ],
    hint: 'Preorder DFS. For each node: start with str(val). If right child exists, must add both "(left)(right)". If only left, add "(left)". If only right, add "()(right)". If leaf, add nothing.',
  },

  687: {
    id: 687,
    title: 'Longest Univalue Path',
    titleZh: '最长同值路径',
    difficulty: 'Medium',
    leetcodeSlug: 'longest-univalue-path',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the length of the longest path where each node in the path has the same value. This path may or may not pass through the root.

The length of the path between two nodes is represented by the number of **edges** between them.

**Note:** The \`solve(arr)\` adapter builds the tree from a level-order array.`,
    examples: [
      { input: 'root = [5,4,5,1,1,null,5]', output: '2' },
      { input: 'root = [1,4,5,4,4,null,5]', output: '2' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-1000 <= Node.val <= 1000',
      'The depth of the tree will not exceed 1000.',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {number}
 */
function longestUnivaluePath(root) {

}

// Test adapter (do not remove)
function solve(arr) { return longestUnivaluePath(buildTree(arr)); }`,
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
    def longestUnivaluePath(self, root):
        pass

def solve(arr): return Solution().longestUnivaluePath(build_tree(arr))`,
    testCases: [
      { label: '[5,4,5,1,1,null,5] → 2', args: [[5,4,5,1,1,null,5]], expected: 2 },
      { label: '[1,4,5,4,4,null,5] → 2', args: [[1,4,5,4,4,null,5]], expected: 2 },
      { label: '[1] → 0', args: [[1]], expected: 0 },
    ],
    hint: 'Post-order DFS. Helper returns length of longest univalue path going downward from this node. leftPath = (left?.val===node.val) ? helper(left)+1 : 0, same for right. Update global max with leftPath+rightPath. Return max(leftPath, rightPath).',
  },

  832: {
    id: 832,
    title: 'Flipping an Image',
    titleZh: '翻转图像',
    difficulty: 'Easy',
    leetcodeSlug: 'flipping-an-image',
    tags: ['Array', 'Two Pointers', 'Bit Manipulation', 'Matrix', 'Simulation'],
    description: `Given an \`n x n\` binary matrix \`image\`, flip the image **horizontally**, then **invert** it, and return the resulting image.

To flip horizontally: each row is reversed.
To invert: each \`0\` is replaced by \`1\`, and each \`1\` is replaced by \`0\`.`,
    examples: [
      { input: 'image = [[1,1,0],[1,0,1],[0,0,0]]', output: '[[1,0,0],[0,1,0],[1,1,1]]', explanation: 'Row 1: [1,1,0]→flip→[0,1,1]→invert→[1,0,0].' },
      { input: 'image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]', output: '[[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]' },
    ],
    constraints: [
      'n == image.length == image[i].length',
      '1 <= n <= 20',
      'image[i][j] is either 0 or 1.',
    ],
    starterCode: `/**
 * @param {number[][]} image
 * @return {number[][]}
 */
function flipAndInvertImage(image) {

}

function solve(image) { return flipAndInvertImage(image); }`,
    starterCodePython: `class Solution:
    def flipAndInvertImage(self, image: list[list[int]]) -> list[list[int]]:
        pass

def solve(image): return Solution().flipAndInvertImage(image)`,
    testCases: [
      { label: '[[1,1,0],[1,0,1],[0,0,0]] → [[1,0,0],[0,1,0],[1,1,1]]', args: [[[1,1,0],[1,0,1],[0,0,0]]], expected: [[1,0,0],[0,1,0],[1,1,1]] },
      { label: '[[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]] → [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]', args: [[[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]], expected: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]] },
      { label: '[[1]] → [[0]]', args: [[[1]]], expected: [[0]] },
    ],
    hint: 'For each row: reverse it, then XOR each element with 1. Optimize with two pointers: if arr[l]===arr[r], both flip; if different, a swap+flip is a no-op. Flip middle element if odd length.',
  },

  896: {
    id: 896,
    title: 'Monotonic Array',
    titleZh: '单调数列',
    difficulty: 'Easy',
    leetcodeSlug: 'monotonic-array',
    tags: ['Array'],
    description: `An array is **monotonic** if it is either monotone increasing or monotone decreasing.

An array \`nums\` is monotone increasing if for all \`i <= j\`, \`nums[i] <= nums[j]\`. Monotone decreasing if for all \`i <= j\`, \`nums[i] >= nums[j]\`.

Given an integer array \`nums\`, return \`true\` if the given array is monotonic, or \`false\` otherwise.`,
    examples: [
      { input: 'nums = [1,2,2,3]', output: 'true' },
      { input: 'nums = [6,5,4,4]', output: 'true' },
      { input: 'nums = [1,3,2]', output: 'false' },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^5 <= nums[i] <= 10^5',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function isMonotonic(nums) {

}

function solve(nums) { return isMonotonic(nums); }`,
    starterCodePython: `class Solution:
    def isMonotonic(self, nums: list[int]) -> bool:
        pass

def solve(nums): return Solution().isMonotonic(nums)`,
    testCases: [
      { label: '[1,2,2,3] → true', args: [[1,2,2,3]], expected: true },
      { label: '[6,5,4,4] → true', args: [[6,5,4,4]], expected: true },
      { label: '[1,3,2] → false', args: [[1,3,2]], expected: false },
      { label: '[1] → true', args: [[1]], expected: true },
    ],
    hint: 'Track two flags: increasing and decreasing. If any pair has nums[i] > nums[i+1], set increasing=false. If nums[i] < nums[i+1], set decreasing=false. Return increasing || decreasing.',
  },

  930: {
    id: 930,
    title: 'Binary Subarrays With Sum',
    titleZh: '和相同的二元子数组',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-subarrays-with-sum',
    tags: ['Array', 'Hash Table', 'Sliding Window', 'Prefix Sum'],
    description: `Given a binary array \`nums\` and an integer \`goal\`, return the number of non-empty **subarrays** with a sum equal to \`goal\`.

A **subarray** is a contiguous part of the array.`,
    examples: [
      { input: 'nums = [1,0,1,0,1], goal = 2', output: '4' },
      { input: 'nums = [0,0,0,0,0], goal = 0', output: '15' },
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      'nums[i] is either 0 or 1.',
      '0 <= goal <= nums.length',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
function numSubarraysWithSum(nums, goal) {

}

function solve(nums, goal) { return numSubarraysWithSum(nums, goal); }`,
    starterCodePython: `class Solution:
    def numSubarraysWithSum(self, nums: list[int], goal: int) -> int:
        pass

def solve(nums, goal): return Solution().numSubarraysWithSum(nums, goal)`,
    testCases: [
      { label: '[1,0,1,0,1], goal=2 → 4', args: [[1,0,1,0,1], 2], expected: 4 },
      { label: '[0,0,0,0,0], goal=0 → 15', args: [[0,0,0,0,0], 0], expected: 15 },
      { label: '[1,1,1], goal=2 → 2', args: [[1,1,1], 2], expected: 2 },
    ],
    hint: 'Prefix sum + hash map: map[prefixSum] = count. For each element add nums[i] to prefixSum, add map[prefixSum - goal] to result. Alternatively, use atMost(goal) - atMost(goal-1) with a sliding window.',
  },

  988: {
    id: 988,
    title: 'Smallest String Starting From Leaf',
    titleZh: '从叶结点开始的最小字符串',
    difficulty: 'Medium',
    leetcodeSlug: 'smallest-string-starting-from-leaf',
    tags: ['String', 'Tree', 'DFS', 'Binary Tree'],
    description: `You are given the \`root\` of a binary tree where each node has a value in the range \`[0, 25]\` representing the letters \`'a'\` to \`'z'\`.

Return the **lexicographically smallest** string that starts at a leaf of this tree and ends at the root.

**Note:** The \`solve(arr)\` adapter builds the tree from a level-order array of integers (0='a', 25='z').`,
    examples: [
      { input: 'root = [0,1,2,3,4,3,4]', output: '"dba"', explanation: 'Paths leaf→root: "dba","eba","dca","eca". Smallest: "dba".' },
      { input: 'root = [25,1,3,1,3,0,2]', output: '"adz"' },
      { input: 'root = [2,2,1,null,1,0,null,0]', output: '"abc"' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 8500].',
      '0 <= Node.val <= 25',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const buildTree = arr => { if(!arr?.length)return null; const root=new TreeNode(arr[0]),q=[root]; let i=1; while(i<arr.length){const n=q.shift(); if(i<arr.length&&arr[i]!=null){n.left=new TreeNode(arr[i]);q.push(n.left);}i++; if(i<arr.length&&arr[i]!=null){n.right=new TreeNode(arr[i]);q.push(n.right);}i++;} return root; };

/**
 * @param {TreeNode} root
 * @return {string}
 */
function smallestFromLeaf(root) {

}

// Test adapter (do not remove)
function solve(arr) { return smallestFromLeaf(buildTree(arr)); }`,
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
    def smallestFromLeaf(self, root):
        pass

def solve(arr): return Solution().smallestFromLeaf(build_tree(arr))`,
    testCases: [
      { label: '[0,1,2,3,4,3,4] → "dba"', args: [[0,1,2,3,4,3,4]], expected: 'dba' },
      { label: '[25,1,3,1,3,0,2] → "adz"', args: [[25,1,3,1,3,0,2]], expected: 'adz' },
      { label: '[2,2,1,null,1,0,null,0] → "abc"', args: [[2,2,1,null,1,0,null,0]], expected: 'abc' },
    ],
    hint: 'DFS with path tracking. At each leaf, build the leaf-to-root string (reverse of path) and compare with current best. Convert val to char: String.fromCharCode(97 + val).',
  },

  1008: {
    id: 1008,
    title: 'Construct Binary Search Tree from Preorder Traversal',
    titleZh: '从前序遍历重建二叉树',
    difficulty: 'Medium',
    leetcodeSlug: 'construct-binary-search-tree-from-preorder-traversal',
    tags: ['Array', 'Stack', 'Tree', 'Binary Search Tree', 'Monotonic Stack', 'Binary Tree'],
    description: `Given an array of integers \`preorder\`, which represents the **preorder traversal** of a BST, construct the tree and return its root.

It is **guaranteed** that there is always possible to find a BST with the given requirements for the given test cases.

**Note:** The \`solve(arr)\` adapter returns the BST as a level-order array.`,
    examples: [
      { input: 'preorder = [8,5,1,7,10,12]', output: '[8,5,10,1,7,null,12]' },
      { input: 'preorder = [1,3]', output: '[1,null,3]' },
    ],
    constraints: [
      '1 <= preorder.length <= 100',
      '1 <= preorder[i] <= 10^8',
      'All the values of preorder are unique.',
    ],
    starterCode: `class TreeNode {
  constructor(val, left, right) { this.val=val===undefined?0:val; this.left=left===undefined?null:left; this.right=right===undefined?null:right; }
}
const treeToArr = root => { if(!root)return[]; const res=[],q=[root]; while(q.length){const n=q.shift();res.push(n?n.val:null);if(n){q.push(n.left);q.push(n.right);}} while(res.length&&res[res.length-1]===null)res.pop(); return res; };

/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
function bstFromPreorder(preorder) {

}

// Test adapter (do not remove)
function solve(preorder) { return treeToArr(bstFromPreorder(preorder)); }`,
    starterCodePython: `class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val=val; self.left=left; self.right=right

def tree_to_arr(root):
    if not root: return []
    res=[]; q=[root]
    while q:
        node=q.pop(0); res.append(node.val if node else None)
        if node: q.append(node.left); q.append(node.right)
    while res and res[-1] is None: res.pop()
    return res

class Solution:
    def bstFromPreorder(self, preorder):
        pass

def solve(preorder): return tree_to_arr(Solution().bstFromPreorder(preorder))`,
    testCases: [
      { label: '[8,5,1,7,10,12] → [8,5,10,1,7,null,12]', args: [[8,5,1,7,10,12]], expected: [8,5,10,1,7,null,12] },
      { label: '[1,3] → [1,null,3]', args: [[1,3]], expected: [1,null,3] },
      { label: '[5] → [5]', args: [[5]], expected: [5] },
    ],
    hint: 'Recursive partition: first element is root, elements < root go left, elements > root go right. Alternatively, use a monotonic stack: maintain a decreasing stack; when a value is larger than the top, it becomes the right child of the last popped element.',
  },

  1021: {
    id: 1021,
    title: 'Remove Outermost Parentheses',
    titleZh: '删除最外层的括号',
    difficulty: 'Easy',
    leetcodeSlug: 'remove-outermost-parentheses',
    tags: ['String', 'Stack'],
    description: `A valid parentheses string is **primitive** if it is nonempty, and there does not exist a way to split it into two nonempty valid parentheses strings.

Given a valid parentheses string \`s\`, consider its **primitive decomposition**: \`s = P_1 + P_2 + ... + P_k\`, where each \`P_i\` is a primitive valid parentheses string.

Return \`s\` after removing the outermost parentheses of every primitive string in the primitive decomposition of \`s\`.`,
    examples: [
      { input: 's = "(()())(())"', output: '"()()()"', explanation: 'Decomposed into "(()())" and "(())". Removing outermost: "()()" + "()" = "()()()".' },
      { input: 's = "(()())(())(()())"', output: '"()()()()()"' },
      { input: 's = "()()"', output: '""' },
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      "s[i] is either '(' or ')'.",
      's is a valid parentheses string.',
    ],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function removeOuterParentheses(s) {

}

function solve(s) { return removeOuterParentheses(s); }`,
    starterCodePython: `class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        pass

def solve(s): return Solution().removeOuterParentheses(s)`,
    testCases: [
      { label: '"(()())(())" → "()()()"', args: ['(()())(())'], expected: '()()()' },
      { label: '"(()())(())(()())" → "()()()()()"', args: ['(()())(())(()())'], expected: '()()()()()' },
      { label: '"()()" → ""', args: ['()()'], expected: '' },
    ],
    hint: "Track depth. Increment on '(', decrement on ')'. Include '(' when depth > 1 (already incremented), include ')' when depth > 0 (before decrement). The outermost '(' goes from depth 0→1; outermost ')' goes from depth 1→0 — both are excluded.",
  },

  1040: {
    id: 1040,
    title: 'Moving Stones Until Consecutive II',
    titleZh: '移动石子直到连续 II',
    difficulty: 'Hard',
    leetcodeSlug: 'moving-stones-until-consecutive-ii',
    tags: ['Array', 'Math', 'Two Pointers', 'Sorting'],
    description: `There are some stones in different positions on the X-axis. You are given an integer array \`stones\`.

An **endpoint stone** is one with the smallest or largest position. In one move, you pick up an endpoint stone and move it to an unoccupied position so that it is **no longer an endpoint stone**.

The game ends when you cannot make any more moves (i.e., the stones are in consecutive positions).

Return \`[minimum, maximum]\` number of moves to end the game.`,
    examples: [
      { input: 'stones = [7,4,9]', output: '[1,2]' },
      { input: 'stones = [6,5,4,3,10]', output: '[2,3]' },
    ],
    constraints: [
      '3 <= stones.length <= 10^4',
      '1 <= stones[i] <= 10^9',
      'All the values of stones are unique.',
    ],
    starterCode: `/**
 * @param {number[]} stones
 * @return {number[]}
 */
function numMovesStonesII(stones) {

}

function solve(stones) { return numMovesStonesII(stones); }`,
    starterCodePython: `class Solution:
    def numMovesStonesII(self, stones: list[int]) -> list[int]:
        pass

def solve(stones): return Solution().numMovesStonesII(stones)`,
    testCases: [
      { label: '[7,4,9] → [1,2]', args: [[7,4,9]], expected: [1,2] },
      { label: '[6,5,4,3,10] → [2,3]', args: [[6,5,4,3,10]], expected: [2,3] },
      { label: '[1,2,3] → [0,0]', args: [[1,2,3]], expected: [0,0] },
    ],
    hint: 'Sort first. Max = max(stones[n-2]-stones[0]-n+2, stones[n-1]-stones[1]-n+2). Min: sliding window — find largest count of stones fitting in a window of size n. Moves = n - count. Special case: if n-1 stones already fill n-1 consecutive positions, min = 2.',
  },

  1092: {
    id: 1092,
    title: 'Shortest Common Supersequence',
    titleZh: '最短公共超序列',
    difficulty: 'Hard',
    leetcodeSlug: 'shortest-common-supersequence',
    tags: ['String', 'Dynamic Programming'],
    description: `Given two strings \`str1\` and \`str2\`, return the shortest string that has both \`str1\` and \`str2\` as **subsequences**. If there are multiple valid strings, return any of them.

A string \`s\` is a **subsequence** of string \`t\` if deleting some characters from \`t\` results in \`s\`.`,
    examples: [
      { input: 'str1 = "abac", str2 = "cab"', output: '"cabac"', explanation: '"abac" subseq of "cabac": c**abac**. "cab" subseq: **cab**ac.' },
      { input: 'str1 = "aaaaaaaa", str2 = "aaaaaaaa"', output: '"aaaaaaaa"' },
    ],
    constraints: [
      '1 <= str1.length, str2.length <= 1000',
      'str1 and str2 consist of lowercase English letters.',
    ],
    starterCode: `/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
function shortestCommonSupersequence(str1, str2) {

}

function solve(str1, str2) { return shortestCommonSupersequence(str1, str2); }`,
    starterCodePython: `class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        pass

def solve(str1, str2): return Solution().shortestCommonSupersequence(str1, str2)`,
    testCases: [
      { label: '"abac","cab" → "cabac"', args: ['abac', 'cab'], expected: 'cabac' },
      { label: '"aaaaaaaa","aaaaaaaa" → "aaaaaaaa"', args: ['aaaaaaaa', 'aaaaaaaa'], expected: 'aaaaaaaa' },
      { label: '"abc","ac" → "abc"', args: ['abc', 'ac'], expected: 'abc' },
    ],
    hint: 'Build LCS DP table. Backtrack from dp[m][n]: if chars match, include once, go diag; elif dp[i-1][j] >= dp[i][j-1], take str1[i-1] and go up; else take str2[j-1] and go left. Append remaining chars. Reverse the collected result.',
  },

  1157: {
    id: 1157,
    title: 'Online Majority Element In Subarray',
    titleZh: '子数组中占绝大多数的元素',
    difficulty: 'Hard',
    leetcodeSlug: 'online-majority-element-in-subarray',
    tags: ['Array', 'Binary Search', 'Design', 'Segment Tree', 'Random'],
    description: `Design a data structure that efficiently finds the **majority element** of a given subarray.

The majority element of a subarray is an element that occurs \`threshold\` times or more in the subarray.

Implement the \`MajorityChecker\` class:
- \`MajorityChecker(int[] arr)\` Initializes the instance with the given array.
- \`int query(int left, int right, int threshold)\` Returns the majority element in \`arr[left...right]\` that occurs at least \`threshold\` times, or \`-1\` if no such element exists.

**Note:** The \`solve(arr, queries)\` adapter accepts the array and a list of \`[left, right, threshold]\` queries.`,
    examples: [
      { input: 'arr=[1,1,2,2,1,1], queries=[[0,5,4],[0,3,3],[2,3,2]]', output: '[1,-1,2]' },
    ],
    constraints: [
      '2 <= arr.length <= 2 * 10^4',
      '2 * threshold > right - left + 1',
      '1 <= arr[i] <= 2 * 10^4',
      '1 <= queries.length <= 10^4',
    ],
    starterCode: `/**
 * @param {number[]} arr
 */
class MajorityChecker {
  constructor(arr) {

  }

  /**
   * @param {number} left
   * @param {number} right
   * @param {number} threshold
   * @return {number}
   */
  query(left, right, threshold) {

  }
}

function solve(arr, queries) {
  const mc = new MajorityChecker(arr);
  return queries.map(([l, r, t]) => mc.query(l, r, t));
}`,
    starterCodePython: `class MajorityChecker:
    def __init__(self, arr: list[int]):
        pass

    def query(self, left: int, right: int, threshold: int) -> int:
        pass

def solve(arr, queries):
    mc = MajorityChecker(arr)
    return [mc.query(l, r, t) for l, r, t in queries]`,
    testCases: [
      { label: 'arr=[1,1,2,2,1,1], queries=[[0,5,4],[0,3,3],[2,3,2]] → [1,-1,2]', args: [[1,1,2,2,1,1], [[0,5,4],[0,3,3],[2,3,2]]], expected: [1,-1,2] },
      { label: 'arr=[1,1,1,1,1], query=[0,4,3] → [1]', args: [[1,1,1,1,1], [[0,4,3]]], expected: [1] },
    ],
    hint: 'Precompute: for each value, store sorted list of indices. For each query [l,r,threshold]: apply Boyer-Moore voting on arr[l..r] to get a candidate (O(r-l+1)), then binary search in that value\'s index list to count occurrences in [l,r]. If count >= threshold, return candidate; else return -1.',
  },

  1207: {
    id: 1207,
    title: 'Unique Number of Occurrences',
    titleZh: '独一无二的出现次数',
    difficulty: 'Easy',
    leetcodeSlug: 'unique-number-of-occurrences',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers \`arr\`, return \`true\` if the number of occurrences of each value in the array is **unique** or \`false\` otherwise.`,
    examples: [
      { input: 'arr = [1,2,2,1,1,3]', output: 'true', explanation: '1 appears 3 times, 2 appears 2 times, 3 appears 1 time. All unique.' },
      { input: 'arr = [1,2]', output: 'false', explanation: 'Both 1 and 2 appear exactly 1 time.' },
      { input: 'arr = [-3,0,1,-3,1,1,1,-3,10,0]', output: 'true' },
    ],
    constraints: [
      '1 <= arr.length <= 1000',
      '-1000 <= arr[i] <= 1000',
    ],
    starterCode: `/**
 * @param {number[]} arr
 * @return {boolean}
 */
function uniqueOccurrences(arr) {

}

function solve(arr) { return uniqueOccurrences(arr); }`,
    starterCodePython: `class Solution:
    def uniqueOccurrences(self, arr: list[int]) -> bool:
        pass

def solve(arr): return Solution().uniqueOccurrences(arr)`,
    testCases: [
      { label: '[1,2,2,1,1,3] → true', args: [[1,2,2,1,1,3]], expected: true },
      { label: '[1,2] → false', args: [[1,2]], expected: false },
      { label: '[-3,0,1,-3,1,1,1,-3,10,0] → true', args: [[-3,0,1,-3,1,1,1,-3,10,0]], expected: true },
    ],
    hint: 'Count occurrences in a hash map, then check if the set of occurrence counts has the same size as the map (i.e., all counts are distinct).',
  },

  1450: {
    id: 1450,
    title: 'Number of Students Doing Homework at a Given Time',
    titleZh: '在既定时间做作业的学生人数',
    difficulty: 'Easy',
    leetcodeSlug: 'number-of-students-doing-homework-at-a-given-time',
    tags: ['Array'],
    description: `Given two integer arrays \`startTime\` and \`endTime\` and given an integer \`queryTime\`.

The \`ith\` student started doing their homework at the time \`startTime[i]\` and finished it at time \`endTime[i]\`.

Return the number of students doing their homework at time \`queryTime\`. More formally, return the number of students where \`queryTime\` lays in the interval \`[startTime[i], endTime[i]]\` inclusive.`,
    examples: [
      { input: 'startTime = [1,2,3], endTime = [3,2,7], queryTime = 4', output: '1', explanation: 'Only student 3 (start=3, end=7) is doing homework at time 4.' },
      { input: 'startTime = [4], endTime = [4], queryTime = 4', output: '1' },
    ],
    constraints: [
      'startTime.length == endTime.length',
      '1 <= startTime.length <= 100',
      '1 <= startTime[i] <= endTime[i] <= 1000',
      '1 <= queryTime <= 1000',
    ],
    starterCode: `/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
function busyStudent(startTime, endTime, queryTime) {

}

function solve(startTime, endTime, queryTime) { return busyStudent(startTime, endTime, queryTime); }`,
    starterCodePython: `class Solution:
    def busyStudent(self, startTime: list[int], endTime: list[int], queryTime: int) -> int:
        pass

def solve(startTime, endTime, queryTime): return Solution().busyStudent(startTime, endTime, queryTime)`,
    testCases: [
      { label: 'start=[1,2,3],end=[3,2,7],q=4 → 1', args: [[1,2,3], [3,2,7], 4], expected: 1 },
      { label: 'start=[4],end=[4],q=4 → 1', args: [[4], [4], 4], expected: 1 },
      { label: 'start=[1,1,1,1],end=[1,3,2,4],q=7 → 0', args: [[1,1,1,1], [1,3,2,4], 7], expected: 0 },
      { label: 'start=[9,8,7,6,5],end=[10,10,10,10,10],q=5 → 1', args: [[9,8,7,6,5], [10,10,10,10,10], 5], expected: 1 },
    ],
    hint: 'Simple linear scan: count students where startTime[i] <= queryTime <= endTime[i]. O(n) time.',
  },

  1465: {
    id: 1465,
    title: 'Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts',
    titleZh: '切割后面积最大的蛋糕',
    difficulty: 'Medium',
    leetcodeSlug: 'maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts',
    tags: ['Array', 'Greedy', 'Sorting'],
    description: `You are given a rectangular cake of size \`h x w\` and two arrays \`horizontalCuts\` and \`verticalCuts\` where:
- \`horizontalCuts[i]\` is the distance from the top of the cake to the \`ith\` horizontal cut.
- \`verticalCuts[j]\` is the distance from the left of the cake to the \`jth\` vertical cut.

Return the maximum area of a piece of cake after you cut at each horizontal and vertical position. Since the answer can be large, return this **modulo \`10^9 + 7\`**.`,
    examples: [
      { input: 'h=5, w=4, horizontalCuts=[1,2,4], verticalCuts=[1,3]', output: '4', explanation: 'Max height gap=2, max width gap=2. Area=4.' },
      { input: 'h=5, w=4, horizontalCuts=[3,1], verticalCuts=[1]', output: '6' },
      { input: 'h=5, w=4, horizontalCuts=[3], verticalCuts=[3]', output: '9' },
    ],
    constraints: [
      '2 <= h, w <= 10^9',
      '1 <= horizontalCuts.length <= min(h-1, 10^5)',
      '1 <= verticalCuts.length <= min(w-1, 10^5)',
      'All values in horizontalCuts and verticalCuts are distinct.',
    ],
    starterCode: `/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
function maxArea(h, w, horizontalCuts, verticalCuts) {

}

function solve(h, w, horizontalCuts, verticalCuts) { return maxArea(h, w, horizontalCuts, verticalCuts); }`,
    starterCodePython: `class Solution:
    def maxArea(self, h: int, w: int, horizontalCuts: list[int], verticalCuts: list[int]) -> int:
        pass

def solve(h, w, horizontalCuts, verticalCuts): return Solution().maxArea(h, w, horizontalCuts, verticalCuts)`,
    testCases: [
      { label: 'h=5,w=4,hC=[1,2,4],vC=[1,3] → 4', args: [5, 4, [1,2,4], [1,3]], expected: 4 },
      { label: 'h=5,w=4,hC=[3,1],vC=[1] → 6', args: [5, 4, [3,1], [1]], expected: 6 },
      { label: 'h=5,w=4,hC=[3],vC=[3] → 9', args: [5, 4, [3], [3]], expected: 9 },
    ],
    hint: 'Sort both cut arrays. Find max gap in horizontal cuts (including 0 and h) and max gap in vertical cuts (including 0 and w). Answer = (maxHGap * maxVGap) % (10^9+7). Use BigInt in JavaScript to avoid integer overflow.',
  },

  2175: {
    id: 2175,
    title: 'The Change in Global Rankings',
    titleZh: '全球排名的变化',
    difficulty: 'Medium',
    leetcodeSlug: 'the-change-in-global-rankings',
    tags: ['Array', 'Sorting', 'Hash Table'],
    description: `**Note:** This is an algorithmic adaptation of a database problem.

You are given:
- \`teamPoints\`: an array of \`[team_id, name, points]\` entries.
- \`pointsChange\`: an array of \`[team_id, change]\` entries (can be positive or negative).

For each team, add its \`change\` to get new points. Rank teams by points **descending**, with ties broken by name **ascending** (alphabetical).

Return an array of \`[team_id, name, old_rank - new_rank]\` sorted by \`team_id\`. A positive value means the team improved its rank.`,
    examples: [
      { input: 'teamPoints=[[1,"Ater",1300],[2,"Bon",1700],[3,"Cho",1200]], pointsChange=[[1,200],[2,-200],[3,300]]', output: '[[1,"Ater",1],[2,"Bon",-1],[3,"Cho",0]]', explanation: 'Old ranks: Bon=1,Ater=2,Cho=3. New points all 1500 → Ater=1,Bon=2,Cho=3. Changes: 1,−1,0.' },
    ],
    constraints: [
      '1 <= teamPoints.length <= 10^5',
      'All team_id values are unique.',
      'Points are non-negative integers.',
    ],
    starterCode: `/**
 * @param {Array<[number, string, number]>} teamPoints
 * @param {Array<[number, number]>} pointsChange
 * @return {Array<[number, string, number]>}
 */
function changeInRanking(teamPoints, pointsChange) {

}

function solve(teamPoints, pointsChange) { return changeInRanking(teamPoints, pointsChange); }`,
    starterCodePython: `class Solution:
    def changeInRanking(self, teamPoints, pointsChange):
        pass

def solve(teamPoints, pointsChange): return Solution().changeInRanking(teamPoints, pointsChange)`,
    testCases: [
      { label: 'basic ranking change', args: [[[1,'Ater',1300],[2,'Bon',1700],[3,'Cho',1200]], [[1,200],[2,-200],[3,300]]], expected: [[1,'Ater',1],[2,'Bon',-1],[3,'Cho',0]] },
      { label: 'two teams swap', args: [[[1,'A',100],[2,'B',100]], [[1,0],[2,100]]], expected: [[1,'A',-1],[2,'B',1]] },
    ],
    hint: 'Build a map from team_id to change. Compute old ranks by sorting by points desc, name asc. Apply changes, compute new ranks. For each team, rank_change = old_rank - new_rank. Sort output by team_id.',
  },

  // ─── Batch B6 — BT Level Order + BST ────────────────────────────────────────

  107: {
    id: 107,
    title: 'Binary Tree Level Order Traversal II',
    titleZh: '二叉树的层序遍历 II',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-tree-level-order-traversal-ii',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **bottom-up level order traversal** of its nodes' values (i.e., from left to right, level by level from leaf to root).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[15,7],[9,20],[3]]', explanation: 'Levels from bottom to top.' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number[][]}
 */
function levelOrderBottom(root) {

}

// Helper: build tree from array
function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return levelOrderBottom(build(arr)); }`,
    starterCodePython: `class Solution:
    def levelOrderBottom(self, root) -> list[list[int]]:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().levelOrderBottom(build(arr))`,
    testCases: [
      { label: '[3,9,20,null,null,15,7] → [[15,7],[9,20],[3]]', args: [[3,9,20,null,null,15,7]], expected: [[15,7],[9,20],[3]] },
      { label: '[1] → [[1]]', args: [[1]], expected: [[1]] },
      { label: '[] → []', args: [[]], expected: [] },
    ],
    hint: 'BFS level by level, collect each level\'s values into a list, then reverse the entire result at the end.',
  },

  117: {
    id: 117,
    title: 'Populating Next Right Pointers in Each Node II',
    titleZh: '填充每个节点的下一个右侧节点指针 II',
    difficulty: 'Medium',
    leetcodeSlug: 'populating-next-right-pointers-in-each-node-ii',
    tags: ['Tree', 'BFS', 'Linked List', 'Binary Tree'],
    description: `Given a binary tree, populate each node's \`next\` pointer to point to its next right node. If there is no next right node, set \`next\` to \`null\`.

Initially all \`next\` pointers are set to \`null\`. Try to use **O(1) extra space** (excluding recursion stack).`,
    examples: [
      { input: 'root = [1,2,3,4,5,null,7]', output: '[1,#,2,3,#,4,5,7,#]', explanation: 'Each level\'s nodes are linked left→right.' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes is in [0, 6000].', '-100 <= Node.val <= 100'],
    starterCode: `/**
 * @param {Node|null} root
 * @return {Node|null}
 */
function connect(root) {

}

function Node(val, left, right, next) { this.val=val; this.left=left||null; this.right=right||null; this.next=next||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new Node(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function serialize(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let node=q.shift();if(!node){res.push(null);continue;}res.push(node.val);q.push(node.left,node.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr) { return serialize(connect(build(arr))); }`,
    starterCodePython: `class Solution:
    def connect(self, root):
        pass

class Node:
    def __init__(self, val=0, left=None, right=None, next=None):
        self.val=val; self.left=left; self.right=right; self.next=next

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = Node(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def serialize(root):
    if not root: return []
    res, q = [], [root]
    while q:
        node = q.pop(0)
        if not node: res.append(None); continue
        res.append(node.val); q.append(node.left); q.append(node.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr): return serialize(Solution().connect(build(arr)))`,
    testCases: [
      { label: '[1,2,3,4,5,null,7] → level-linked', args: [[1,2,3,4,5,null,7]], expected: [1,2,3,4,5,7] },
      { label: '[] → []', args: [[]], expected: [] },
    ],
    hint: 'Use a dummy head for each next level. Walk current level via next pointers, linking children into the dummy chain. O(1) extra space.',
  },

  515: {
    id: 515,
    title: 'Find Largest Value in Each Tree Row',
    titleZh: '在每个树行中找最大值',
    difficulty: 'Medium',
    leetcodeSlug: 'find-largest-value-in-each-tree-row',
    tags: ['Tree', 'BFS', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return an array of the **largest value** in each row of the tree (0-indexed).`,
    examples: [
      { input: 'root = [1,3,2,5,3,null,9]', output: '[1,3,9]', explanation: 'Row 0: [1]→1, row 1: [3,2]→3, row 2: [5,3,9]→9.' },
      { input: 'root = [1,2,3]', output: '[1,3]' },
    ],
    constraints: ['Number of nodes: [0, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number[]}
 */
function largestValues(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return largestValues(build(arr)); }`,
    starterCodePython: `class Solution:
    def largestValues(self, root) -> list[int]:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().largestValues(build(arr))`,
    testCases: [
      { label: '[1,3,2,5,3,null,9] → [1,3,9]', args: [[1,3,2,5,3,null,9]], expected: [1,3,9] },
      { label: '[1,2,3] → [1,3]', args: [[1,2,3]], expected: [1,3] },
      { label: '[] → []', args: [[]], expected: [] },
    ],
    hint: 'BFS level by level. For each level, track the maximum value seen and append it to result.',
  },

  637: {
    id: 637,
    title: 'Average of Levels in Binary Tree',
    titleZh: '二叉树的层平均值',
    difficulty: 'Easy',
    leetcodeSlug: 'average-of-levels-in-binary-tree',
    tags: ['Tree', 'BFS', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **average value** of the nodes on each level in the form of an array. Answers within \`10^-5\` of the actual answer will be accepted.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[3.00000,14.50000,11.00000]', explanation: '(9+20)/2=14.5, (15+7)/2=11.' },
      { input: 'root = [3,9,20,15,7]', output: '[3.00000,14.50000,11.00000]' },
    ],
    constraints: ['Number of nodes: [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number[]}
 */
function averageOfLevels(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return averageOfLevels(build(arr)); }`,
    starterCodePython: `class Solution:
    def averageOfLevels(self, root) -> list[float]:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().averageOfLevels(build(arr))`,
    testCases: [
      { label: '[3,9,20,null,null,15,7] → [3,14.5,11]', args: [[3,9,20,null,null,15,7]], expected: [3,14.5,11] },
      { label: '[1] → [1]', args: [[1]], expected: [1] },
    ],
    hint: 'BFS: for each level, sum all node values and divide by the count of nodes at that level.',
  },

  662: {
    id: 662,
    title: 'Maximum Width of Binary Tree',
    titleZh: '二叉树最大宽度',
    difficulty: 'Medium',
    leetcodeSlug: 'maximum-width-of-binary-tree',
    tags: ['Tree', 'BFS', 'DFS', 'Binary Tree'],
    description: `Given the \`root\` of a binary tree, return the **maximum width** of the given tree.

The **width** of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where null nodes between them in a complete binary tree are also counted into the length.

The answer is guaranteed to fit in a 32-bit signed integer.`,
    examples: [
      { input: 'root = [1,3,2,5,3,null,9]', output: '4', explanation: 'Level 3 has nodes 5,3,null,9 → width 4.' },
      { input: 'root = [1,3,2,5]', output: '2' },
    ],
    constraints: ['Number of nodes: [1, 3000]', '-100 <= Node.val <= 100'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number}
 */
function widthOfBinaryTree(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return widthOfBinaryTree(build(arr)); }`,
    starterCodePython: `class Solution:
    def widthOfBinaryTree(self, root) -> int:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().widthOfBinaryTree(build(arr))`,
    testCases: [
      { label: '[1,3,2,5,3,null,9] → 4', args: [[1,3,2,5,3,null,9]], expected: 4 },
      { label: '[1,3,2,5] → 2', args: [[1,3,2,5]], expected: 2 },
      { label: '[1] → 1', args: [[1]], expected: 1 },
    ],
    hint: 'BFS with index tracking: assign each node an index (left child = 2*i, right child = 2*i+1). Width at each level = last_index - first_index + 1. Normalize indices each level to prevent overflow.',
  },

  893: {
    id: 893,
    title: 'Groups of Special-Equivalent Strings',
    titleZh: '特殊等价字符串组',
    difficulty: 'Medium',
    leetcodeSlug: 'groups-of-special-equivalent-strings',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: `You are given an array of strings \`words\`.

A move consists of choosing any two even-indexed characters or any two odd-indexed characters in a string and swapping them. Two strings are **special-equivalent** if one can be transformed into the other via any number of moves.

Return the **number of groups** of special-equivalent strings.`,
    examples: [
      { input: 'words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]', output: '3', explanation: 'Three groups: {abcd,cdab,cbad}, {xyzz,zzxy}, {zzyx}.' },
      { input: 'words = ["abc","acb","bac","bca","cab","cba"]', output: '3' },
    ],
    constraints: ['1 <= words.length <= 1000', '1 <= words[i].length <= 20', 'All words have the same length.', 'words[i] consists of lowercase English letters.'],
    starterCode: `/**
 * @param {string[]} words
 * @return {number}
 */
function numSpecialEquivGroups(words) {

}

function solve(words) { return numSpecialEquivGroups(words); }`,
    starterCodePython: `class Solution:
    def numSpecialEquivGroups(self, words: list[str]) -> int:
        pass

def solve(words): return Solution().numSpecialEquivGroups(words)`,
    testCases: [
      { label: '["abcd","cdab","cbad","xyzz","zzxy","zzyx"] → 3', args: [['abcd','cdab','cbad','xyzz','zzxy','zzyx']], expected: 3 },
      { label: '["abc","acb","bac","bca","cab","cba"] → 3', args: [['abc','acb','bac','bca','cab','cba']], expected: 3 },
    ],
    hint: 'For each word, extract even-indexed characters (sorted) and odd-indexed characters (sorted). Use "evens + \'|\' + odds" as a canonical key. Count distinct keys.',
  },

  904: {
    id: 904,
    title: 'Fruit Into Baskets',
    titleZh: '水果成篮',
    difficulty: 'Medium',
    leetcodeSlug: 'fruit-into-baskets',
    tags: ['Array', 'Hash Table', 'Sliding Window'],
    description: `You are given an integer array \`fruits\` where \`fruits[i]\` is the type of fruit on tree \`i\`. You have two baskets, each holding one type of fruit. Starting from any tree, pick one fruit per tree moving in one direction.

Return the **maximum** number of fruits you can pick (longest subarray with at most 2 distinct values).`,
    examples: [
      { input: 'fruits = [1,2,1]', output: '3', explanation: 'Pick all 3 fruits.' },
      { input: 'fruits = [0,1,2,2]', output: '3', explanation: 'Pick [1,2,2].' },
      { input: 'fruits = [1,2,3,2,2]', output: '4', explanation: 'Pick [2,3,2,2].' },
    ],
    constraints: ['1 <= fruits.length <= 10^5', '0 <= fruits[i] < fruits.length'],
    starterCode: `/**
 * @param {number[]} fruits
 * @return {number}
 */
function totalFruit(fruits) {

}

function solve(fruits) { return totalFruit(fruits); }`,
    starterCodePython: `class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        pass

def solve(fruits): return Solution().totalFruit(fruits)`,
    testCases: [
      { label: '[1,2,1] → 3', args: [[1,2,1]], expected: 3 },
      { label: '[0,1,2,2] → 3', args: [[0,1,2,2]], expected: 3 },
      { label: '[1,2,3,2,2] → 4', args: [[1,2,3,2,2]], expected: 4 },
    ],
    hint: 'Sliding window with a frequency map. Shrink window from left whenever the map has more than 2 distinct fruit types. Track max window size.',
  },

  998: {
    id: 998,
    title: 'Maximum Binary Tree II',
    titleZh: '最大二叉树 II',
    difficulty: 'Medium',
    leetcodeSlug: 'maximum-binary-tree-ii',
    tags: ['Tree', 'Binary Tree'],
    description: `A **maximum tree** is one where every node has a value greater than any other value in its subtree.

You are given the \`root\` of a maximum binary tree built from array \`original\`, and an integer \`val\`. Insert \`val\` at the end of \`original\` and rebuild the maximum binary tree.

Return the root of the resulting tree.`,
    examples: [
      { input: 'root = [4,1,3,null,null,2], val = 5', output: '[5,4,null,null,3,2]', explanation: 'val=5 is the largest, becomes new root.' },
      { input: 'root = [5,2,4,null,1], val = 3', output: '[5,2,4,null,1,null,3]' },
    ],
    constraints: ['Number of nodes: [1, 100]', '1 <= Node.val <= 200', 'All values unique.', '1 <= val <= 200'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @param {number} val
 * @return {TreeNode|null}
 */
function insertIntoMaxTree(root, val) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function serialize(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let n=q.shift();if(!n){res.push(null);continue;}res.push(n.val);q.push(n.left,n.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr, val) { return serialize(insertIntoMaxTree(build(arr), val)); }`,
    starterCodePython: `class Solution:
    def insertIntoMaxTree(self, root, val: int):
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def serialize(root):
    if not root: return []
    res, q = [], [root]
    while q:
        n = q.pop(0)
        if not n: res.append(None); continue
        res.append(n.val); q.append(n.left); q.append(n.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr, val): return serialize(Solution().insertIntoMaxTree(build(arr), val))`,
    testCases: [
      { label: '[4,1,3,null,null,2], val=5 → [5,4,null,null,3,2]', args: [[4,1,3,null,null,2], 5], expected: [5,4,null,null,3,2] },
      { label: '[5,2,4,null,1], val=3 → [5,2,4,null,1,null,3]', args: [[5,2,4,null,1], 3], expected: [5,2,4,null,1,null,3] },
    ],
    hint: 'Since val appends to the rightmost position: if val > root.val, create a new node with val as root and old root as left child. Otherwise recursively insert into root.right.',
  },

  1116: {
    id: 1116,
    title: 'Print Zero Even Odd',
    titleZh: '打印零与奇偶数',
    difficulty: 'Medium',
    leetcodeSlug: 'print-zero-even-odd',
    tags: ['Concurrency'],
    description: `**Note:** This is a concurrency problem adapted for algorithmic practice.

Given \`n\`, return the output string produced by alternating threads: "0102030405...0n" — alternating zeros with numbers 1 through n.`,
    examples: [
      { input: 'n = 2', output: '"0102"', explanation: 'Output sequence: 0,1,0,2.' },
      { input: 'n = 5', output: '"0102030405"' },
    ],
    constraints: ['1 <= n <= 1000'],
    starterCode: `/**
 * @param {number} n
 * @return {string}
 */
function printZeroEvenOdd(n) {

}

function solve(n) { return printZeroEvenOdd(n); }`,
    starterCodePython: `class Solution:
    def printZeroEvenOdd(self, n: int) -> str:
        pass

def solve(n): return Solution().printZeroEvenOdd(n)`,
    testCases: [
      { label: 'n=2 → "0102"', args: [2], expected: '0102' },
      { label: 'n=5 → "0102030405"', args: [5], expected: '0102030405' },
      { label: 'n=1 → "01"', args: [1], expected: '01' },
    ],
    hint: 'Iterate i from 1 to n, appending "0" then String(i) each iteration.',
  },

  1254: {
    id: 1254,
    title: 'Number of Closed Islands',
    titleZh: '统计封闭岛屿的数目',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-closed-islands',
    tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
    description: `Given a 2D grid of \`0\`s (land) and \`1\`s (water), return the number of **closed islands**.

A **closed island** is a connected group of 0s totally surrounded by 1s — it must not touch the grid boundary.`,
    examples: [
      { input: 'grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]', output: '2' },
      { input: 'grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]', output: '1' },
    ],
    constraints: ['1 <= grid.length, grid[0].length <= 100', 'grid[i][j] is 0 or 1'],
    starterCode: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function closedIsland(grid) {

}

function solve(grid) { return closedIsland(grid); }`,
    starterCodePython: `class Solution:
    def closedIsland(self, grid: list[list[int]]) -> int:
        pass

def solve(grid): return Solution().closedIsland(grid)`,
    testCases: [
      { label: '5×8 grid → 2', args: [[[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]], expected: 2 },
      { label: '3×5 grid → 1', args: [[[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]], expected: 1 },
    ],
    hint: 'First flood-fill all land cells reachable from the border (these are NOT closed). Then count remaining unvisited land components via DFS/BFS.',
  },

  1474: {
    id: 1474,
    title: 'Delete N Nodes After M Nodes of a Linked List',
    titleZh: '删除链表 M 个节点之后的 N 个节点',
    difficulty: 'Easy',
    leetcodeSlug: 'delete-n-nodes-after-m-nodes-of-a-linked-list',
    tags: ['Linked List'],
    description: `Given the \`head\` of a linked list and two integers \`m\` and \`n\`.

Traverse the list and:
- Keep the first \`m\` nodes.
- Remove the next \`n\` nodes.
- Repeat until the end.

Return the head of the modified list.`,
    examples: [
      { input: 'head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3', output: '[1,2,6,7,11,12]' },
      { input: 'head = [1,2,3,4,5,6,7], m = 1, n = 3', output: '[1,5]' },
    ],
    constraints: ['Number of nodes: [1, 10^4]', '1 <= Node.val <= 10^6', '1 <= m, n <= 1000'],
    starterCode: `/**
 * @param {ListNode|null} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode|null}
 */
function deleteNodes(head, m, n) {

}

function ListNode(val, next) { this.val=val; this.next=next||null; }
function buildList(arr) { let d=new ListNode(0),c=d; arr.forEach(v=>{c.next=new ListNode(v);c=c.next;}); return d.next; }
function listToArr(head) { let r=[]; while(head){r.push(head.val);head=head.next;} return r; }
function solve(arr, m, n) { return listToArr(deleteNodes(buildList(arr), m, n)); }`,
    starterCodePython: `class Solution:
    def deleteNodes(self, head, m: int, n: int):
        pass

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

def buildList(arr):
    d = ListNode(0); c = d
    for v in arr: c.next = ListNode(v); c = c.next
    return d.next

def listToArr(head):
    r = []
    while head: r.append(head.val); head = head.next
    return r

def solve(arr, m, n): return listToArr(Solution().deleteNodes(buildList(arr), m, n))`,
    testCases: [
      { label: '[1..13], m=2, n=3 → [1,2,6,7,11,12]', args: [[1,2,3,4,5,6,7,8,9,10,11,12,13], 2, 3], expected: [1,2,6,7,11,12] },
      { label: '[1..7], m=1, n=3 → [1,5]', args: [[1,2,3,4,5,6,7], 1, 3], expected: [1,5] },
    ],
    hint: 'Walk m steps keeping nodes, then walk n steps skipping nodes (adjust next pointer). Repeat until null.',
  },

  1554: {
    id: 1554,
    title: 'Strings Differ by One Character',
    titleZh: '只有一个不同字符的字符串',
    difficulty: 'Medium',
    leetcodeSlug: 'strings-differ-by-one-character',
    tags: ['Hash Table', 'String', 'Rolling Hash', 'Randomized'],
    description: `Given a list of strings \`dict\` where all strings have the same length, return \`true\` if there are two strings that differ in **exactly one index** (all other characters identical), otherwise return \`false\`.`,
    examples: [
      { input: 'dict = ["abcd","acbd","aacd"]', output: 'true', explanation: '"abcd" and "aacd" differ only at index 1.' },
      { input: 'dict = ["ab","cd","yz"]', output: 'false' },
      { input: 'dict = ["abcd","cccc","abyd","abab"]', output: 'true' },
    ],
    constraints: ['Number of words: [2, 10^5]', '1 <= dict[i].length <= 20', 'All words have same length.'],
    starterCode: `/**
 * @param {string[]} dict
 * @return {boolean}
 */
function differByOne(dict) {

}

function solve(dict) { return differByOne(dict); }`,
    starterCodePython: `class Solution:
    def differByOne(self, dict: list[str]) -> bool:
        pass

def solve(d): return Solution().differByOne(d)`,
    testCases: [
      { label: '["abcd","acbd","aacd"] → true', args: [['abcd','acbd','aacd']], expected: true },
      { label: '["ab","cd","yz"] → false', args: [['ab','cd','yz']], expected: false },
      { label: '["abcd","cccc","abyd","abab"] → true', args: [['abcd','cccc','abyd','abab']], expected: true },
    ],
    hint: 'For each column index i, build a set of strings with that column wildcarded. If any masked string appears twice, return true. O(n*L) time.',
  },

  99: {
    id: 99,
    title: 'Recover Binary Search Tree',
    titleZh: '恢复二叉搜索树',
    difficulty: 'Medium',
    leetcodeSlug: 'recover-binary-search-tree',
    tags: ['Tree', 'DFS', 'BST', 'Binary Tree'],
    description: `You are given the \`root\` of a BST where **exactly two** nodes were swapped by mistake. Recover the tree without changing its structure.`,
    examples: [
      { input: 'root = [1,3,null,null,2]', output: '[3,1,null,null,2]', explanation: '1 and 3 were swapped.' },
      { input: 'root = [3,1,4,null,null,2]', output: '[2,1,4,null,null,3]', explanation: '2 and 3 were swapped.' },
    ],
    constraints: ['Number of nodes: [2, 1000]', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {void}
 */
function recoverTree(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function serialize(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let n=q.shift();if(!n){res.push(null);continue;}res.push(n.val);q.push(n.left,n.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr) { let r=build(arr); recoverTree(r); return serialize(r); }`,
    starterCodePython: `class Solution:
    def recoverTree(self, root) -> None:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def serialize(root):
    if not root: return []
    res, q = [], [root]
    while q:
        n = q.pop(0)
        if not n: res.append(None); continue
        res.append(n.val); q.append(n.left); q.append(n.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr):
    r = build(arr); Solution().recoverTree(r); return serialize(r)`,
    testCases: [
      { label: '[1,3,null,null,2] → [3,1,null,null,2]', args: [[1,3,null,null,2]], expected: [3,1,null,null,2] },
      { label: '[3,1,4,null,null,2] → [2,1,4,null,null,3]', args: [[3,1,4,null,null,2]], expected: [2,1,4,null,null,3] },
    ],
    hint: 'Inorder traversal of BST produces sorted values. Find the two nodes where order is violated: first = node where prev > curr; second = last such curr. Swap their values.',
  },

  109: {
    id: 109,
    title: 'Convert Sorted List to Binary Search Tree',
    titleZh: '有序链表转换二叉搜索树',
    difficulty: 'Medium',
    leetcodeSlug: 'convert-sorted-list-to-binary-search-tree',
    tags: ['Linked List', 'Divide and Conquer', 'Tree', 'BST', 'Binary Tree'],
    description: `Given the \`head\` of a singly linked list where elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree.`,
    examples: [
      { input: 'head = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]', explanation: 'One possible answer.' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: ['Number of nodes: [0, 2 * 10^4]', '-10^5 <= Node.val <= 10^5'],
    starterCode: `/**
 * @param {ListNode|null} head
 * @return {TreeNode|null}
 */
function sortedListToBST(head) {

}

function ListNode(val, next) { this.val=val; this.next=next||null; }
function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function buildList(arr) { let d=new ListNode(0),c=d; arr.forEach(v=>{c.next=new ListNode(v);c=c.next;}); return d.next; }
function serialize(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let n=q.shift();if(!n){res.push(null);continue;}res.push(n.val);q.push(n.left,n.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr) { return serialize(sortedListToBST(buildList(arr))); }`,
    starterCodePython: `class Solution:
    def sortedListToBST(self, head):
        pass

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def buildList(arr):
    d = ListNode(0); c = d
    for v in arr: c.next = ListNode(v); c = c.next
    return d.next

def serialize(root):
    if not root: return []
    res, q = [], [root]
    while q:
        n = q.pop(0)
        if not n: res.append(None); continue
        res.append(n.val); q.append(n.left); q.append(n.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr): return serialize(Solution().sortedListToBST(buildList(arr)))`,
    testCases: [
      { label: '[-10,-3,0,5,9] → balanced BST', args: [[-10,-3,0,5,9]], expected: [0,-3,9,-10,null,5] },
      { label: '[] → []', args: [[]], expected: [] },
      { label: '[1] → [1]', args: [[1]], expected: [1] },
    ],
    hint: 'Use slow/fast pointer to find list midpoint. Mid becomes root. Recursively build left BST from nodes before mid, right BST from nodes after.',
  },

  173: {
    id: 173,
    title: 'Binary Search Tree Iterator',
    titleZh: '二叉搜索树迭代器',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-search-tree-iterator',
    tags: ['Stack', 'Tree', 'Design', 'BST', 'Binary Tree', 'Iterator'],
    description: `Implement \`BSTIterator\` representing an in-order iterator over a BST:
- \`BSTIterator(root)\` — initializes the object.
- \`next()\` — moves to the next smallest number and returns it.
- \`hasNext()\` — returns whether a next number exists.

Use **O(h)** memory where h is the tree height. Each \`next()\` call should run in average O(1).`,
    examples: [
      { input: 'root = [7,3,15,null,null,9,20], ops = ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]', output: '[3,7,true,9,true,15,true,20,false]' },
    ],
    constraints: ['Number of nodes: [1, 10^5]', '0 <= Node.val <= 10^6', 'At most 10^5 calls.'],
    starterCode: `class BSTIterator {
  /**
   * @param {TreeNode|null} root
   */
  constructor(root) {

  }

  /** @return {number} */
  next() {

  }

  /** @return {boolean} */
  hasNext() {

  }
}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr, ops) {
  const it = new BSTIterator(build(arr));
  return ops.map(op => op === 'next' ? it.next() : it.hasNext());
}`,
    starterCodePython: `class BSTIterator:
    def __init__(self, root):
        pass

    def next(self) -> int:
        pass

    def hasNext(self) -> bool:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr, ops):
    it = BSTIterator(build(arr))
    return [it.next() if op == 'next' else it.hasNext() for op in ops]`,
    testCases: [
      {
        label: '[7,3,15,null,null,9,20] iterator → [3,7,true,9,true,15,true,20,false]',
        args: [[7,3,15,null,null,9,20], ['next','next','hasNext','next','hasNext','next','hasNext','next','hasNext']],
        expected: [3,7,true,9,true,15,true,20,false],
      },
    ],
    hint: 'Use an explicit stack. Constructor: push all left-spine nodes. next(): pop top (return its value), then push its right child\'s entire left spine.',
  },

  449: {
    id: 449,
    title: 'Serialize and Deserialize BST',
    titleZh: '序列化和反序列化二叉搜索树',
    difficulty: 'Medium',
    leetcodeSlug: 'serialize-and-deserialize-bst',
    tags: ['String', 'Tree', 'Design', 'BST', 'Binary Tree'],
    description: `Design an algorithm to **serialize** and **deserialize** a BST. The encoded string should be as compact as possible by exploiting BST properties.`,
    examples: [
      { input: 'root = [2,1,3]', output: '[2,1,3]', explanation: 'Serialize then deserialize reproduces the same BST.' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['Number of nodes: [0, 10^4]', '0 <= Node.val <= 10^4', 'Input is a valid BST.', 'All values unique.'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {string}
 */
function serialize(root) {

}

/**
 * @param {string} data
 * @return {TreeNode|null}
 */
function deserialize(data) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function serializeTree(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let n=q.shift();if(!n){res.push(null);continue;}res.push(n.val);q.push(n.left,n.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr) { return serializeTree(deserialize(serialize(build(arr)))); }`,
    starterCodePython: `class Codec:
    def serialize(self, root) -> str:
        pass

    def deserialize(self, data: str):
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def serializeTree(root):
    if not root: return []
    res, q = [], [root]
    while q:
        n = q.pop(0)
        if not n: res.append(None); continue
        res.append(n.val); q.append(n.left); q.append(n.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr):
    c = Codec(); return serializeTree(c.deserialize(c.serialize(build(arr))))`,
    testCases: [
      { label: '[2,1,3] → roundtrip → [2,1,3]', args: [[2,1,3]], expected: [2,1,3] },
      { label: '[] → roundtrip → []', args: [[]], expected: [] },
      { label: '[5,2,7,1,3] → roundtrip', args: [[5,2,7,1,3]], expected: [5,2,7,1,3] },
    ],
    hint: 'Serialize via preorder traversal. Deserialize: use the BST property — for each value in preorder sequence, place it knowing it must be within [min, max] bounds from its ancestors.',
  },

  501: {
    id: 501,
    title: 'Find Mode in Binary Search Tree',
    titleZh: '二叉搜索树中的众数',
    difficulty: 'Easy',
    leetcodeSlug: 'find-mode-in-binary-search-tree',
    tags: ['Tree', 'DFS', 'BST', 'Binary Tree'],
    description: `Given the \`root\` of a BST with possible **duplicates**, return all **mode(s)** (most frequently occurring elements). If multiple modes exist, return them in any order.

Assume left subtree values ≤ root value ≤ right subtree values.`,
    examples: [
      { input: 'root = [1,null,2,2]', output: '[2]' },
      { input: 'root = [0]', output: '[0]' },
    ],
    constraints: ['Number of nodes: [1, 10^4]', '-10^5 <= Node.val <= 10^5'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number[]}
 */
function findMode(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return findMode(build(arr)).sort((a,b)=>a-b); }`,
    starterCodePython: `class Solution:
    def findMode(self, root) -> list[int]:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return sorted(Solution().findMode(build(arr)))`,
    testCases: [
      { label: '[1,null,2,2] → [2]', args: [[1,null,2,2]], expected: [2] },
      { label: '[0] → [0]', args: [[0]], expected: [0] },
    ],
    hint: 'Inorder traversal gives sorted order. Track current value, current count, and max count. No extra hash map needed — collect values achieving max count.',
  },

  530: {
    id: 530,
    title: 'Minimum Absolute Difference in BST',
    titleZh: '二叉搜索树的最小绝对差',
    difficulty: 'Easy',
    leetcodeSlug: 'minimum-absolute-difference-in-bst',
    tags: ['Tree', 'DFS', 'BFS', 'BST', 'Binary Tree'],
    description: `Given the \`root\` of a BST, return the **minimum absolute difference** between the values of any two different nodes.`,
    examples: [
      { input: 'root = [4,2,6,1,3]', output: '1', explanation: 'Min diff is |3-2|=1 or |3-4|=1.' },
      { input: 'root = [1,0,48,null,null,12,49]', output: '1' },
    ],
    constraints: ['Number of nodes: [2, 10^4]', '0 <= Node.val <= 10^5'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number}
 */
function getMinimumDifference(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return getMinimumDifference(build(arr)); }`,
    starterCodePython: `class Solution:
    def getMinimumDifference(self, root) -> int:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().getMinimumDifference(build(arr))`,
    testCases: [
      { label: '[4,2,6,1,3] → 1', args: [[4,2,6,1,3]], expected: 1 },
      { label: '[1,0,48,null,null,12,49] → 1', args: [[1,0,48,null,null,12,49]], expected: 1 },
    ],
    hint: 'Inorder traversal of BST gives sorted values. Min absolute difference must be between two consecutive inorder values. Track prev node and compute diff at each step.',
  },

  653: {
    id: 653,
    title: 'Two Sum IV - Input is a BST',
    titleZh: '两数之和 IV - 输入二叉搜索树',
    difficulty: 'Easy',
    leetcodeSlug: 'two-sum-iv-input-is-a-bst',
    tags: ['Hash Table', 'Two Pointers', 'Tree', 'DFS', 'BFS', 'BST', 'Binary Tree'],
    description: `Given the \`root\` of a BST and an integer \`k\`, return \`true\` if there exist two elements in the BST whose sum equals \`k\`, and \`false\` otherwise.`,
    examples: [
      { input: 'root = [5,3,6,2,4,null,7], k = 9', output: 'true' },
      { input: 'root = [5,3,6,2,4,null,7], k = 28', output: 'false' },
    ],
    constraints: ['Number of nodes: [1, 10^4]', '-10^4 <= Node.val <= 10^4', 'All values unique.', '-10^5 <= k <= 10^5'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @param {number} k
 * @return {boolean}
 */
function findTarget(root, k) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr, k) { return findTarget(build(arr), k); }`,
    starterCodePython: `class Solution:
    def findTarget(self, root, k: int) -> bool:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr, k): return Solution().findTarget(build(arr), k)`,
    testCases: [
      { label: '[5,3,6,2,4,null,7], k=9 → true', args: [[5,3,6,2,4,null,7], 9], expected: true },
      { label: '[5,3,6,2,4,null,7], k=28 → false', args: [[5,3,6,2,4,null,7], 28], expected: false },
    ],
    hint: 'DFS/BFS the tree with a HashSet. For each node value v, check if k-v is already in the set. If yes, return true. Otherwise add v to the set.',
  },

  1050: {
    id: 1050,
    title: 'Actors and Directors Who Cooperated At Least Three Times',
    titleZh: '合作过至少三次的演员和导演',
    difficulty: 'Easy',
    leetcodeSlug: 'actors-and-directors-who-cooperated-at-least-three-times',
    tags: ['Database'],
    description: `**Note:** This is a database problem adapted for algorithmic practice.

You are given a list of \`[actor_id, director_id, timestamp]\` records. Return all \`[actor_id, director_id]\` pairs that cooperated **at least three times**, sorted by actor_id then director_id ascending.`,
    examples: [
      { input: 'records = [[1,1,0],[1,1,1],[1,1,2],[1,2,3],[1,2,4],[2,1,5],[2,1,6]]', output: '[[1,1]]', explanation: 'Actor 1 and Director 1 cooperated 3 times.' },
    ],
    constraints: ['1 <= records.length <= 10^5', 'All timestamps are unique.'],
    starterCode: `/**
 * @param {number[][]} records  each [actor_id, director_id, timestamp]
 * @return {number[][]}  pairs [actor_id, director_id] with count >= 3
 */
function actorDirectorPairs(records) {

}

function solve(records) { return actorDirectorPairs(records); }`,
    starterCodePython: `class Solution:
    def actorDirectorPairs(self, records: list[list[int]]) -> list[list[int]]:
        pass

def solve(records): return Solution().actorDirectorPairs(records)`,
    testCases: [
      { label: '7 records → [[1,1]]', args: [[[1,1,0],[1,1,1],[1,1,2],[1,2,3],[1,2,4],[2,1,5],[2,1,6]]], expected: [[1,1]] },
      { label: '4 same pair → [[1,1]]', args: [[[1,1,0],[1,1,1],[1,1,2],[1,1,3]]], expected: [[1,1]] },
    ],
    hint: 'Use a hash map keyed by "actor_id,director_id" to count cooperations. Collect pairs with count >= 3. Sort by actor_id then director_id.',
  },

  // ─── Batch B7 — BST Advanced + Graph Traversal + Union Find ─────────────────

  315: {
    id: 315,
    title: 'Count of Smaller Numbers After Self',
    titleZh: '计算右侧小于当前元素的个数',
    difficulty: 'Hard',
    leetcodeSlug: 'count-of-smaller-numbers-after-self',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Merge Sort'],
    description: `Given an integer array \`nums\`, return an integer array \`counts\` where \`counts[i]\` is the number of smaller elements to the right of \`nums[i]\`.`,
    examples: [
      { input: 'nums = [5,2,6,1]', output: '[2,1,1,0]', explanation: '5 has 2,1 to its right. 2 has 1. 6 has 1. 1 has none.' },
      { input: 'nums = [-1]', output: '[0]' },
      { input: 'nums = [-1,-1]', output: '[0,0]' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function countSmaller(nums) {

}

function solve(nums) { return countSmaller(nums); }`,
    starterCodePython: `class Solution:
    def countSmaller(self, nums: list[int]) -> list[int]:
        pass

def solve(nums): return Solution().countSmaller(nums)`,
    testCases: [
      { label: '[5,2,6,1] → [2,1,1,0]', args: [[5,2,6,1]], expected: [2,1,1,0] },
      { label: '[-1] → [0]', args: [[-1]], expected: [0] },
      { label: '[-1,-1] → [0,0]', args: [[-1,-1]], expected: [0,0] },
    ],
    hint: 'Merge sort approach: during the merge step, count how many right-half elements are placed before a left-half element — that count is the answer for that element. Alternatively, use a Binary Indexed Tree (BIT) scanning right to left.',
  },

  327: {
    id: 327,
    title: 'Count of Range Sum',
    titleZh: '区间和的个数',
    difficulty: 'Hard',
    leetcodeSlug: 'count-of-range-sum',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Merge Sort'],
    description: `Given an integer array \`nums\` and two integers \`lower\` and \`upper\`, return the number of range sums that lie in \`[lower, upper]\` inclusive.

Range sum \`S(i, j)\` is defined as the sum of the elements in \`nums\` between indices \`i\` and \`j\` inclusive, where \`i <= j\`.`,
    examples: [
      { input: 'nums = [-2,5,-1], lower = -2, upper = 2', output: '3', explanation: 'Ranges: [0,0]→-2, [2,2]→-1, [0,2]→2.' },
      { input: 'nums = [0], lower = 0, upper = 0', output: '1' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '-10^5 <= lower <= upper <= 10^5', 'Answers will fit in a 32-bit integer.'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
function countRangeSum(nums, lower, upper) {

}

function solve(nums, lower, upper) { return countRangeSum(nums, lower, upper); }`,
    starterCodePython: `class Solution:
    def countRangeSum(self, nums: list[int], lower: int, upper: int) -> int:
        pass

def solve(nums, lower, upper): return Solution().countRangeSum(nums, lower, upper)`,
    testCases: [
      { label: '[-2,5,-1], lower=-2, upper=2 → 3', args: [[-2,5,-1], -2, 2], expected: 3 },
      { label: '[0], lower=0, upper=0 → 1', args: [[0], 0, 0], expected: 1 },
    ],
    hint: 'Build prefix sums. For each prefix[j], count prefix[i] in [prefix[j]-upper, prefix[j]-lower] for i<j. Use merge sort on prefix array: during merge, use two pointers to count valid pairs.',
  },

  341: {
    id: 341,
    title: 'Flatten Nested List Iterator',
    titleZh: '扁平化嵌套列表迭代器',
    difficulty: 'Medium',
    leetcodeSlug: 'flatten-nested-list-iterator',
    tags: ['Stack', 'Tree', 'Design', 'Iterator'],
    description: `You are given a nested list of integers. Implement an iterator to flatten it.

Each element is either an integer or a list whose elements may also be integers or other lists.

Implement \`NestedIterator\`:
- \`next()\` — returns the next integer.
- \`hasNext()\` — returns whether there is a next integer.

**For this adaptation:** given a nested array (using real nested JS/Python arrays), flatten it and simulate the iterator with an ops array of \`"next"\` / \`"hasNext"\` calls.`,
    examples: [
      { input: 'nestedList = [[1,1],2,[1,1]], ops = ["next","next","next","next","next"]', output: '[1,1,2,1,1]' },
      { input: 'nestedList = [1,[4,[6]]], ops = ["next","hasNext","next","hasNext","next","hasNext"]', output: '[1,true,4,true,6,false]' },
    ],
    constraints: ['1 <= nestedList.length <= 500', 'Values in [-10^6, 10^6]'],
    starterCode: `class NestedIterator {
  constructor(nestedList) {
    // nestedList is a nested array, e.g. [[1,1],2,[1,1]]
  }

  /** @return {number} */
  next() {

  }

  /** @return {boolean} */
  hasNext() {

  }
}

function solve(nestedList, ops) {
  const it = new NestedIterator(nestedList);
  return ops.map(op => op === 'next' ? it.next() : it.hasNext());
}`,
    starterCodePython: `class NestedIterator:
    def __init__(self, nestedList):
        # nestedList is a nested Python list
        pass

    def next(self) -> int:
        pass

    def hasNext(self) -> bool:
        pass

def solve(nestedList, ops):
    it = NestedIterator(nestedList)
    return [it.next() if op == 'next' else it.hasNext() for op in ops]`,
    testCases: [
      { label: '[[1,1],2,[1,1]] next×5 → [1,1,2,1,1]', args: [[[1,1],2,[1,1]], ['next','next','next','next','next']], expected: [1,1,2,1,1] },
      { label: '[1,[4,[6]]] mixed ops → [1,true,4,true,6,false]', args: [[1,[4,[6]]], ['next','hasNext','next','hasNext','next','hasNext']], expected: [1,true,4,true,6,false] },
    ],
    hint: 'Flatten the nested list eagerly into a plain array in the constructor. Then next()/hasNext() become simple index operations. Advanced: use a stack that lazily expands lists.',
  },

  493: {
    id: 493,
    title: 'Reverse Pairs',
    titleZh: '翻转对',
    difficulty: 'Hard',
    leetcodeSlug: 'reverse-pairs',
    tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Merge Sort'],
    description: `Given an integer array \`nums\`, return the number of **reverse pairs** in the array.

A reverse pair is a pair \`(i, j)\` where \`0 <= i < j < nums.length\` and \`nums[i] > 2 * nums[j]\`.`,
    examples: [
      { input: 'nums = [1,3,2,3,1]', output: '2', explanation: '(1,4): 3>2*1=2 and (3,4): 3>2*1=2.' },
      { input: 'nums = [2,4,3,5,1]', output: '3' },
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function reversePairs(nums) {

}

function solve(nums) { return reversePairs(nums); }`,
    starterCodePython: `class Solution:
    def reversePairs(self, nums: list[int]) -> int:
        pass

def solve(nums): return Solution().reversePairs(nums)`,
    testCases: [
      { label: '[1,3,2,3,1] → 2', args: [[1,3,2,3,1]], expected: 2 },
      { label: '[2,4,3,5,1] → 3', args: [[2,4,3,5,1]], expected: 3 },
    ],
    hint: 'Merge sort: during merge, for each element in the left half, use a pointer to count how many elements in the right half satisfy nums[i] > 2*nums[j] (before merging). Then merge normally.',
  },

  669: {
    id: 669,
    title: 'Trim a Binary Search Tree',
    titleZh: '修剪二叉搜索树',
    difficulty: 'Medium',
    leetcodeSlug: 'trim-a-binary-search-tree',
    tags: ['Tree', 'DFS', 'BST', 'Binary Tree'],
    description: `Given the \`root\` of a BST and two integers \`low\` and \`high\`, return the root of the trimmed tree such that all node values lie in \`[low, high]\`. The structure of the tree should be **preserved** (only remove nodes outside range).`,
    examples: [
      { input: 'root = [1,0,2], low = 1, high = 2', output: '[1,null,2]' },
      { input: 'root = [3,0,4,null,2,null,null,1], low = 1, high = 3', output: '[3,2,null,1]' },
    ],
    constraints: ['Number of nodes: [1, 10^4]', '0 <= Node.val <= 10^4', 'All values unique.', '0 <= low <= high <= 10^4'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode|null}
 */
function trimBST(root, low, high) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function serialize(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let n=q.shift();if(!n){res.push(null);continue;}res.push(n.val);q.push(n.left,n.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr, low, high) { return serialize(trimBST(build(arr), low, high)); }`,
    starterCodePython: `class Solution:
    def trimBST(self, root, low: int, high: int):
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def serialize(root):
    if not root: return []
    res, q = [], [root]
    while q:
        n = q.pop(0)
        if not n: res.append(None); continue
        res.append(n.val); q.append(n.left); q.append(n.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr, low, high): return serialize(Solution().trimBST(build(arr), low, high))`,
    testCases: [
      { label: '[1,0,2], low=1, high=2 → [1,null,2]', args: [[1,0,2], 1, 2], expected: [1,null,2] },
      { label: '[3,0,4,null,2,null,null,1], low=1, high=3 → [3,2,null,1]', args: [[3,0,4,null,2,null,null,1], 1, 3], expected: [3,2,null,1] },
    ],
    hint: 'Recurse: if root.val < low, return trimBST(root.right, low, high) (left subtree is all too small). If root.val > high, return trimBST(root.left, low, high). Otherwise trim both children.',
  },

  671: {
    id: 671,
    title: 'Second Minimum Node In a Binary Tree',
    titleZh: '二叉树中第二小的节点',
    difficulty: 'Easy',
    leetcodeSlug: 'second-minimum-node-in-a-binary-tree',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    description: `Given a non-empty special binary tree where every node has either 0 or 2 children, and the value of each parent node equals the smaller of its two children, find the **second minimum** value in the tree.

If no such value exists, return \`-1\`.`,
    examples: [
      { input: 'root = [2,2,5,null,null,5,7]', output: '5' },
      { input: 'root = [2,2,2]', output: '-1' },
    ],
    constraints: ['Number of nodes: [1, 25]', '1 <= Node.val <= 2^31 - 1'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number}
 */
function findSecondMinimumValue(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return findSecondMinimumValue(build(arr)); }`,
    starterCodePython: `class Solution:
    def findSecondMinimumValue(self, root) -> int:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().findSecondMinimumValue(build(arr))`,
    testCases: [
      { label: '[2,2,5,null,null,5,7] → 5', args: [[2,2,5,null,null,5,7]], expected: 5 },
      { label: '[2,2,2] → -1', args: [[2,2,2]], expected: -1 },
    ],
    hint: 'Root is the minimum. DFS: whenever a node\'s value > root.val, that node is a candidate for second minimum (don\'t recurse deeper — all descendants are >= that value). Return the smallest candidate, or -1 if none found.',
  },

  948: {
    id: 948,
    title: 'Bag of Tokens',
    titleZh: '令牌放置',
    difficulty: 'Medium',
    leetcodeSlug: 'bag-of-tokens',
    tags: ['Array', 'Two Pointers', 'Greedy', 'Sorting'],
    description: `You have \`power\` and an array of \`tokens\`. Each token has a value. You can play them in two ways:
- **Face-up**: spend \`tokens[i]\` power, gain 1 point (if power >= tokens[i]).
- **Face-down**: spend 1 point, gain \`tokens[i]\` power (if points >= 1).

Return the **maximum** number of points you can achieve.`,
    examples: [
      { input: 'tokens = [100], power = 50', output: '0' },
      { input: 'tokens = [200,100], power = 150', output: '1' },
      { input: 'tokens = [100,200,300,400], power = 200', output: '2' },
    ],
    constraints: ['0 <= tokens.length <= 1000', '0 <= tokens[i], power < 10^4'],
    starterCode: `/**
 * @param {number[]} tokens
 * @param {number} power
 * @return {number}
 */
function bagOfTokensScore(tokens, power) {

}

function solve(tokens, power) { return bagOfTokensScore(tokens, power); }`,
    starterCodePython: `class Solution:
    def bagOfTokensScore(self, tokens: list[int], power: int) -> int:
        pass

def solve(tokens, power): return Solution().bagOfTokensScore(tokens, power)`,
    testCases: [
      { label: '[100], power=50 → 0', args: [[100], 50], expected: 0 },
      { label: '[200,100], power=150 → 1', args: [[200,100], 150], expected: 1 },
      { label: '[100,200,300,400], power=200 → 2', args: [[100,200,300,400], 200], expected: 2 },
    ],
    hint: 'Sort tokens. Use two pointers (lo, hi). Greedily play the cheapest token face-up to gain a point, or the most expensive face-down to gain power when you can\'t afford the cheapest. Track max points seen.',
  },

  1285: {
    id: 1285,
    title: 'Find the Start and End Number of Continuous Ranges',
    titleZh: '找到连续区间的开始和结束数字',
    difficulty: 'Easy',
    leetcodeSlug: 'find-the-start-and-end-number-of-continuous-ranges',
    tags: ['Database'],
    description: `**Note:** This is a database problem adapted for algorithmic practice.

Given a sorted array of distinct integers \`nums\`, group them into **consecutive ranges** and return an array of \`[start, end]\` pairs for each range, sorted by start.`,
    examples: [
      { input: 'nums = [0,1,2,4,5,7]', output: '[[0,2],[4,5],[7,7]]', explanation: 'Ranges: 0-2, 4-5, 7.' },
      { input: 'nums = [0,1,2,3,4]', output: '[[0,4]]' },
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums is sorted and all values are distinct.'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function findRanges(nums) {

}

function solve(nums) { return findRanges(nums); }`,
    starterCodePython: `class Solution:
    def findRanges(self, nums: list[int]) -> list[list[int]]:
        pass

def solve(nums): return Solution().findRanges(nums)`,
    testCases: [
      { label: '[0,1,2,4,5,7] → [[0,2],[4,5],[7,7]]', args: [[0,1,2,4,5,7]], expected: [[0,2],[4,5],[7,7]] },
      { label: '[0,1,2,3,4] → [[0,4]]', args: [[0,1,2,3,4]], expected: [[0,4]] },
      { label: '[1,3,5] → [[1,1],[3,3],[5,5]]', args: [[1,3,5]], expected: [[1,1],[3,3],[5,5]] },
    ],
    hint: 'Iterate with a start pointer. Whenever nums[i+1] != nums[i]+1 (or at the end), emit [start, nums[i]] and update start = nums[i+1].',
  },

  1427: {
    id: 1427,
    title: 'Perform String Shifts',
    titleZh: '字符串的左右移',
    difficulty: 'Easy',
    leetcodeSlug: 'perform-string-shifts',
    tags: ['Array', 'Math', 'String'],
    description: `You are given a string \`s\` containing lowercase English letters, and a matrix \`shift\`, where \`shift[i] = [direction, amount]\`:
- \`direction = 0\` means shift left by \`amount\`.
- \`direction = 1\` means shift right by \`amount\`.

Perform all the shifts and return the final string.`,
    examples: [
      { input: 's = "abc", shift = [[0,1],[1,2]]', output: '"cab"', explanation: 'Left 1 → "bca", right 2 → "cab".' },
      { input: 's = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]', output: '"efgabcd"' },
    ],
    constraints: ['1 <= s.length <= 100', '1 <= shift.length <= 100', '0 <= shift[i][0] <= 1', '0 <= shift[i][1] <= 100'],
    starterCode: `/**
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
function stringShift(s, shift) {

}

function solve(s, shift) { return stringShift(s, shift); }`,
    starterCodePython: `class Solution:
    def stringShift(self, s: str, shift: list[list[int]]) -> str:
        pass

def solve(s, shift): return Solution().stringShift(s, shift)`,
    testCases: [
      { label: '"abc", [[0,1],[1,2]] → "cab"', args: ['abc', [[0,1],[1,2]]], expected: 'cab' },
      { label: '"abcdefg", [[1,1],[1,1],[0,2],[1,3]] → "efgabcd"', args: ['abcdefg', [[1,1],[1,1],[0,2],[1,3]]], expected: 'efgabcd' },
    ],
    hint: 'Sum all shifts: left shifts subtract, right shifts add. Take total mod n (handle negative with ((total % n) + n) % n). Rotate the string by that amount to the right.',
  },

  1780: {
    id: 1780,
    title: 'Check if Number is a Sum of Powers of Three',
    titleZh: '判断一个数字是否可以表示成三的幂的和',
    difficulty: 'Medium',
    leetcodeSlug: 'check-if-number-is-a-sum-of-powers-of-three',
    tags: ['Math', 'Greedy'],
    description: `Given an integer \`n\`, return \`true\` if it is possible to represent \`n\` as the sum of **distinct** powers of three. Otherwise, return \`false\`.

An integer \`y\` is a power of three if there exists an integer \`x\` such that \`y == 3^x\`.`,
    examples: [
      { input: 'n = 12', output: 'true', explanation: '12 = 3^1 + 3^2 = 3 + 9.' },
      { input: 'n = 91', output: 'true', explanation: '91 = 3^0 + 3^2 + 3^4 = 1+9+81.' },
      { input: 'n = 21', output: 'false' },
    ],
    constraints: ['1 <= n <= 10^7'],
    starterCode: `/**
 * @param {number} n
 * @return {boolean}
 */
function checkPowersOfThree(n) {

}

function solve(n) { return checkPowersOfThree(n); }`,
    starterCodePython: `class Solution:
    def checkPowersOfThree(self, n: int) -> bool:
        pass

def solve(n): return Solution().checkPowersOfThree(n)`,
    testCases: [
      { label: 'n=12 → true', args: [12], expected: true },
      { label: 'n=91 → true', args: [91], expected: true },
      { label: 'n=21 → false', args: [21], expected: false },
    ],
    hint: 'Convert n to base 3. If any digit is 2, the answer is false (we can\'t use the same power twice). If all digits are 0 or 1, return true.',
  },

  1790: {
    id: 1790,
    title: 'Check if One String Swap Can Make Strings Equal',
    titleZh: '仅执行一次字符串交换能否使两个字符串相等',
    difficulty: 'Easy',
    leetcodeSlug: 'check-if-one-string-swap-can-make-strings-equal',
    tags: ['Hash Table', 'String', 'Counting'],
    description: `You are given two strings \`s1\` and \`s2\` of equal length. A **string swap** is an operation where you choose some index in a string and swap the characters at that index with some other index in the **same** string.

Return \`true\` if it is possible to make both strings equal by performing **at most one** string swap on **exactly one** of the strings. Otherwise, return \`false\`.`,
    examples: [
      { input: 's1 = "bank", s2 = "kanb"', output: 'true', explanation: 'Swap positions 0 and 3 in s1: "bank" → "kanb".' },
      { input: 's1 = "attack", s2 = "defend"', output: 'false' },
      { input: 's1 = "kelb", s2 = "kelb"', output: 'true', explanation: 'Already equal, no swap needed.' },
      { input: 's1 = "abcd", s2 = "dcba"', output: 'false' },
    ],
    constraints: ['1 <= s1.length, s2.length <= 100', 's1.length == s2.length', 's1 and s2 consist of only lowercase English letters.'],
    starterCode: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function areAlmostEqual(s1, s2) {

}

function solve(s1, s2) { return areAlmostEqual(s1, s2); }`,
    starterCodePython: `class Solution:
    def areAlmostEqual(self, s1: str, s2: str) -> bool:
        pass

def solve(s1, s2): return Solution().areAlmostEqual(s1, s2)`,
    testCases: [
      { label: '"bank","kanb" → true', args: ['bank','kanb'], expected: true },
      { label: '"attack","defend" → false', args: ['attack','defend'], expected: false },
      { label: '"kelb","kelb" → true', args: ['kelb','kelb'], expected: true },
      { label: '"abcd","dcba" → false', args: ['abcd','dcba'], expected: false },
    ],
    hint: 'Find all differing positions. There must be 0 or exactly 2 differences. If 2: verify s1[i]==s2[j] and s1[j]==s2[i].',
  },

  1816: {
    id: 1816,
    title: 'Truncate Sentence',
    titleZh: '截断句子',
    difficulty: 'Easy',
    leetcodeSlug: 'truncate-sentence',
    tags: ['Array', 'String'],
    description: `A **sentence** is a list of words separated by spaces. Each word consists of only English letters (no punctuation).

Given a sentence \`s\` and an integer \`k\`, return the sentence truncated to its **first \`k\` words**.`,
    examples: [
      { input: 's = "Hello how are you Contestant", k = 4', output: '"Hello how are you"' },
      { input: 's = "What is the solution to this problem", k = 4', output: '"What is the solution"' },
      { input: 's = "chopper is not a tanuki", k = 5', output: '"chopper is not a tanuki"' },
    ],
    constraints: ['1 <= s.length <= 500', 'k is in the range [1, number of words in s]'],
    starterCode: `/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
function truncateSentence(s, k) {

}

function solve(s, k) { return truncateSentence(s, k); }`,
    starterCodePython: `class Solution:
    def truncateSentence(self, s: str, k: int) -> str:
        pass

def solve(s, k): return Solution().truncateSentence(s, k)`,
    testCases: [
      { label: '"Hello how are you Contestant", k=4', args: ['Hello how are you Contestant', 4], expected: 'Hello how are you' },
      { label: '"What is the solution to this problem", k=4', args: ['What is the solution to this problem', 4], expected: 'What is the solution' },
      { label: '"chopper is not a tanuki", k=5', args: ['chopper is not a tanuki', 5], expected: 'chopper is not a tanuki' },
    ],
    hint: 'Split on spaces, take first k words, join with spaces.',
  },

  130: {
    id: 130,
    title: 'Surrounded Regions',
    titleZh: '被围绕的区域',
    difficulty: 'Medium',
    leetcodeSlug: 'surrounded-regions',
    tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
    description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are **4-directionally surrounded** by \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. \`'O'\`s on the border or connected to a border \`'O'\` are NOT captured.`,
    examples: [
      { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' },
      { input: 'board = [["X"]]', output: '[["X"]]' },
    ],
    constraints: ['m == board.length', 'n == board[0].length', '1 <= m, n <= 200', 'board[i][j] is \'X\' or \'O\'.'],
    starterCode: `/**
 * @param {character[][]} board
 * @return {void} Modify board in-place
 */
function solve_board(board) {

}

function solve(board) {
  // deep copy to avoid mutation of test input
  const b = board.map(r => [...r]);
  solve_board(b);
  return b;
}`,
    starterCodePython: `class Solution:
    def solve(self, board: list[list[str]]) -> None:
        pass

def solve(board):
    import copy
    b = copy.deepcopy(board)
    Solution().solve(b)
    return b`,
    testCases: [
      {
        label: '4×4 board → flip interior Os',
        args: [[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]],
        expected: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']],
      },
      { label: '[["X"]] → [["X"]]', args: [[['X']]], expected: [['X']] },
    ],
    hint: 'Mark all \'O\'s reachable from the border (using DFS/BFS) as safe (e.g., temp marker \'S\'). Then flip remaining \'O\' to \'X\', and \'S\' back to \'O\'.',
  },

  261: {
    id: 261,
    title: 'Graph Valid Tree',
    titleZh: '以图判树',
    difficulty: 'Medium',
    leetcodeSlug: 'graph-valid-tree',
    tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
    description: `Given \`n\` nodes labeled from \`0\` to \`n-1\` and a list of undirected \`edges\` where \`edges[i] = [a, b]\`, return \`true\` if these edges make up a **valid tree**.

A valid tree has exactly \`n-1\` edges and is fully connected (no cycles).`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false', explanation: 'Has a cycle.' },
    ],
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'edges[i].length == 2', 'No self-loops or repeated edges.'],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function validTree(n, edges) {

}

function solve(n, edges) { return validTree(n, edges); }`,
    starterCodePython: `class Solution:
    def validTree(self, n: int, edges: list[list[int]]) -> bool:
        pass

def solve(n, edges): return Solution().validTree(n, edges)`,
    testCases: [
      { label: 'n=5, [[0,1],[0,2],[0,3],[1,4]] → true', args: [5, [[0,1],[0,2],[0,3],[1,4]]], expected: true },
      { label: 'n=5, [[0,1],[1,2],[2,3],[1,3],[1,4]] → false', args: [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]], expected: false },
    ],
    hint: 'A valid tree must have exactly n-1 edges and be connected. Use Union-Find: if adding an edge creates a cycle (both nodes already in the same component), return false. After all edges, check all nodes are connected.',
  },

  277: {
    id: 277,
    title: 'Find the Celebrity',
    titleZh: '搜寻名人',
    difficulty: 'Medium',
    leetcodeSlug: 'find-the-celebrity',
    tags: ['Two Pointers', 'Graph', 'Interactive'],
    description: `**Adapted problem:** There are \`n\` people at a party (0-indexed). A **celebrity** is someone who is known by everyone else but knows nobody else.

Given a \`knows[i][j]\` matrix (knows[i][j]=true means i knows j), find the celebrity. Return their index, or \`-1\` if none exists.`,
    examples: [
      { input: 'knows = [[1,1,0],[0,1,0],[1,1,1]]', output: '1', explanation: 'Person 1 is known by 0 and 2, and knows nobody (knows[1][0]=false, knows[1][2]=false, knows[1][1]=true only self).' },
      { input: 'knows = [[1,0,1],[1,1,0],[0,1,1]]', output: '-1' },
    ],
    constraints: ['n == knows.length == knows[0].length', '2 <= n <= 100', 'knows[i][j] is 0 or 1', 'knows[i][i] == 1'],
    starterCode: `/**
 * @param {number[][]} knows
 * @return {number}
 */
function findCelebrity(knows) {

}

function solve(knows) { return findCelebrity(knows); }`,
    starterCodePython: `class Solution:
    def findCelebrity(self, knows: list[list[int]]) -> int:
        pass

def solve(knows): return Solution().findCelebrity(knows)`,
    testCases: [
      { label: '3×3 matrix → 1', args: [[[1,1,0],[0,1,0],[1,1,1]]], expected: 1 },
      { label: '3×3 matrix → -1', args: [[[1,0,1],[1,1,0],[0,1,1]]], expected: -1 },
    ],
    hint: 'Two-pass: (1) Find candidate — start with 0, if candidate knows i, switch candidate to i (candidate can\'t be celebrity if they know someone). (2) Verify candidate — check everyone knows candidate and candidate knows nobody.',
  },

  323: {
    id: 323,
    title: 'Number of Connected Components in an Undirected Graph',
    titleZh: '无向图中连通分量的数目',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-connected-components-in-an-undirected-graph',
    tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
    description: `Given \`n\` nodes labeled \`0\` to \`n-1\` and a list of undirected \`edges\`, return the number of **connected components** in the graph.`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' },
    ],
    constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000', 'edges[i].length == 2', 'No repeated edges or self-loops.'],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {

}

function solve(n, edges) { return countComponents(n, edges); }`,
    starterCodePython: `class Solution:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
        pass

def solve(n, edges): return Solution().countComponents(n, edges)`,
    testCases: [
      { label: 'n=5, [[0,1],[1,2],[3,4]] → 2', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
      { label: 'n=5, [[0,1],[1,2],[2,3],[3,4]] → 1', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
    ],
    hint: 'Union-Find: initialize n components. For each edge, union both nodes and decrement component count if they were in different sets. Return final count. Alternatively, DFS/BFS from each unvisited node.',
  },

  801: {
    id: 801,
    title: 'Minimum Swaps To Make Sequences Increasing',
    titleZh: '使序列递增的最小交换次数',
    difficulty: 'Hard',
    leetcodeSlug: 'minimum-swaps-to-make-sequences-increasing',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given two integer arrays \`nums1\` and \`nums2\` of the same length. In one operation, you can swap \`nums1[i]\` and \`nums2[i]\`.

Return the minimum number of swaps needed to make both arrays **strictly increasing**.`,
    examples: [
      { input: 'nums1 = [1,3,5,4], nums2 = [1,2,3,7]', output: '1', explanation: 'Swap at index 3.' },
      { input: 'nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]', output: '1' },
    ],
    constraints: ['2 <= nums1.length <= 10^5', '0 <= nums1[i], nums2[i] <= 2 * 10^5'],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function minSwap(nums1, nums2) {

}

function solve(nums1, nums2) { return minSwap(nums1, nums2); }`,
    starterCodePython: `class Solution:
    def minSwap(self, nums1: list[int], nums2: list[int]) -> int:
        pass

def solve(nums1, nums2): return Solution().minSwap(nums1, nums2)`,
    testCases: [
      { label: '[1,3,5,4],[1,2,3,7] → 1', args: [[1,3,5,4],[1,2,3,7]], expected: 1 },
      { label: '[0,3,5,8,9],[2,1,4,6,9] → 1', args: [[0,3,5,8,9],[2,1,4,6,9]], expected: 1 },
    ],
    hint: 'DP with two states per index: keep[i] = min swaps to make both arrays increasing up to i without swapping at i; swap[i] = min swaps with a swap at i. Transition depends on whether keep/swap at i-1 keeps both arrays valid.',
  },

  922: {
    id: 922,
    title: 'Sort Array By Parity II',
    titleZh: '按奇偶排序数组 II',
    difficulty: 'Easy',
    leetcodeSlug: 'sort-array-by-parity-ii',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: `Given an array \`nums\` of integers, half of which are odd and half are even, rearrange the array so that whenever \`nums[i]\` is odd, \`i\` is odd, and whenever \`nums[i]\` is even, \`i\` is even.

You may return any answer array that satisfies this condition.`,
    examples: [
      { input: 'nums = [4,2,5,7]', output: '[4,5,2,7]', explanation: 'Even indices have even numbers, odd indices have odd numbers.' },
      { input: 'nums = [2,3]', output: '[2,3]' },
    ],
    constraints: ['2 <= nums.length <= 2 * 10^4', 'nums.length is even.', 'Half of integers in nums are even.'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParityII(nums) {

}

function solve(nums) { return sortArrayByParityII(nums); }`,
    starterCodePython: `class Solution:
    def sortArrayByParityII(self, nums: list[int]) -> list[int]:
        pass

def solve(nums): return Solution().sortArrayByParityII(nums)`,
    testCases: [
      {
        label: '[4,2,5,7] → even at even idx, odd at odd idx',
        args: [[4,2,5,7]],
        expected: [4,5,2,7],
      },
      { label: '[2,3] → [2,3]', args: [[2,3]], expected: [2,3] },
    ],
    hint: 'Two pointers: one at even indices, one at odd indices. Walk even pointer until you find an odd number; walk odd pointer until you find an even number. Swap. Repeat.',
  },

  984: {
    id: 984,
    title: 'String Without AAA or BBB',
    titleZh: '不含 AAA 或 BBB 的字符串',
    difficulty: 'Medium',
    leetcodeSlug: 'string-without-aaa-or-bbb',
    tags: ['String', 'Greedy'],
    description: `Given two integers \`a\` and \`b\`, return **any** string \`s\` such that:
- \`s\` has length \`a + b\`.
- \`s\` contains exactly \`a\` \`'a'\`s and exactly \`b\` \`'b'\`s.
- \`s\` does not contain \`"aaa"\` or \`"bbb"\`.`,
    examples: [
      { input: 'a = 1, b = 2', output: '"abb"', explanation: '"bab" and "bba" also accepted.' },
      { input: 'a = 4, b = 1', output: '"aabaa"' },
    ],
    constraints: ['0 <= a, b <= 100', 'It is guaranteed that such a string exists for the given a and b.'],
    starterCode: `/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
function strWithout3a3b(a, b) {

}

function solve(a, b) { return strWithout3a3b(a, b); }`,
    starterCodePython: `class Solution:
    def strWithout3a3b(self, a: int, b: int) -> str:
        pass

def solve(a, b): return Solution().strWithout3a3b(a, b)`,
    testCases: [
      {
        label: 'a=1,b=2 → valid string',
        args: [1, 2],
        expected: 'abb',
      },
      {
        label: 'a=4,b=1 → valid string',
        args: [4, 1],
        expected: 'aabaa',
      },
    ],
    hint: 'Greedy: always write the character with more remaining count. If last two chars are the same, switch to the other character. This ensures no three-in-a-row.',
  },

  1275: {
    id: 1275,
    title: 'Find Winner on a Tic Tac Toe Game',
    titleZh: '找出井字棋的获胜者',
    difficulty: 'Easy',
    leetcodeSlug: 'find-winner-on-a-tic-tac-toe-game',
    tags: ['Array', 'Hash Table', 'Matrix', 'Simulation'],
    description: `Tic-tac-toe is played on a 3×3 grid. Two players take turns: Player A uses \`'A'\` and Player B uses \`'B'\`.

Given a list of \`moves\` where \`moves[i] = [row, col]\` (Player A moves first), determine the result:
- Return \`"A"\` if A wins, \`"B"\` if B wins.
- Return \`"Draw"\` if all cells are filled with no winner.
- Return \`"Pending"\` if there are still moves to be made.`,
    examples: [
      { input: 'moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]', output: '"A"', explanation: 'A wins with diagonal.' },
      { input: 'moves = [[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]', output: '"B"' },
      { input: 'moves = [[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]]', output: '"Draw"' },
    ],
    constraints: ['1 <= moves.length <= 9', 'moves[i].length == 2', '0 <= moves[i][j] <= 2', 'No two moves use the same cell.'],
    starterCode: `/**
 * @param {number[][]} moves
 * @return {string}
 */
function tictactoe(moves) {

}

function solve(moves) { return tictactoe(moves); }`,
    starterCodePython: `class Solution:
    def tictactoe(self, moves: list[list[int]]) -> str:
        pass

def solve(moves): return Solution().tictactoe(moves)`,
    testCases: [
      { label: '[[0,0],[2,0],[1,1],[2,1],[2,2]] → "A"', args: [[[0,0],[2,0],[1,1],[2,1],[2,2]]], expected: 'A' },
      { label: '[[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]] → "B"', args: [[[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]], expected: 'B' },
      { label: 'draw → "Draw"', args: [[[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]]], expected: 'Draw' },
    ],
    hint: 'Simulate the board. After each move, check rows, columns, and both diagonals for the current player. If 9 moves played with no winner, return "Draw". Otherwise "Pending".',
  },

  // ─── Batch B8 — DFS/Backtracking + Graph Paths ───────────────────────────────

  89: {
    id: 89,
    title: 'Gray Code',
    titleZh: '格雷编码',
    difficulty: 'Medium',
    leetcodeSlug: 'gray-code',
    tags: ['Math', 'Backtracking', 'Bit Manipulation'],
    description: `An **n-bit gray code sequence** is a sequence of \`2^n\` integers where:
- Every integer is in the range \`[0, 2^n - 1]\`.
- The first integer is \`0\`.
- Each successive pair of integers differs in exactly one bit.
- The first and last integers differ in exactly one bit.

Given an integer \`n\`, return any valid n-bit gray code sequence.`,
    examples: [
      { input: 'n = 2', output: '[0,1,3,2]', explanation: '00→01→11→10, each pair differs by 1 bit.' },
      { input: 'n = 1', output: '[0,1]' },
    ],
    constraints: ['1 <= n <= 16'],
    starterCode: `/**
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {

}

function solve(n) { return grayCode(n); }`,
    starterCodePython: `class Solution:
    def grayCode(self, n: int) -> list[int]:
        pass

def solve(n): return Solution().grayCode(n)`,
    testCases: [
      { label: 'n=2 → [0,1,3,2]', args: [2], expected: [0,1,3,2] },
      { label: 'n=1 → [0,1]', args: [1], expected: [0,1] },
    ],
    hint: 'Formula: i-th Gray code = i ^ (i >> 1). Generate all 2^n values with this formula. Alternatively, build iteratively: start with [0,1], then for each new bit prepend the reverse of the list with that bit set.',
  },

  301: {
    id: 301,
    title: 'Remove Invalid Parentheses',
    titleZh: '删除无效的括号',
    difficulty: 'Hard',
    leetcodeSlug: 'remove-invalid-parentheses',
    tags: ['String', 'DFS', 'BFS', 'Backtracking'],
    description: `Given a string \`s\` that contains parentheses and letters, remove the **minimum** number of invalid parentheses to make the input string valid.

Return a list of **unique** strings that are valid with the minimum number of removals. You may return the answer in any order.`,
    examples: [
      { input: 's = "()())()"', output: '["(())()","()()()"]' },
      { input: 's = "(a)())()"', output: '["(a())()","(a)()()"]' },
      { input: 's = ")("', output: '[""]' },
    ],
    constraints: ['1 <= s.length <= 25', 's consists of lowercase English letters and parentheses.', 'There will be at most 20 parentheses in s.'],
    starterCode: `/**
 * @param {string} s
 * @return {string[]}
 */
function removeInvalidParentheses(s) {

}

function solve(s) { return removeInvalidParentheses(s).sort(); }`,
    starterCodePython: `class Solution:
    def removeInvalidParentheses(self, s: str) -> list[str]:
        pass

def solve(s): return sorted(Solution().removeInvalidParentheses(s))`,
    testCases: [
      { label: '"()())()" → ["(())()","()()()"]', args: ['()())()'], expected: ['(())()', '()()()'] },
      { label: '"(a)())()" → sorted results', args: ['(a)())()'], expected: ['(a())()', '(a)()()'] },
      { label: '")(" → [""]', args: [']('], expected: [''] },
    ],
    hint: 'BFS level by level: generate all strings with one fewer char at each level. Collect all valid strings at the first level that produces any valid string. Use a visited set to avoid duplicates.',
  },

  399: {
    id: 399,
    title: 'Evaluate Division',
    titleZh: '除法求值',
    difficulty: 'Medium',
    leetcodeSlug: 'evaluate-division',
    tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Graph', 'Shortest Path'],
    description: `You are given an array of variable pairs \`equations\` and a real-number array \`values\`, where \`equations[i] = [Ai, Bi]\` and \`values[i]\` represent the equation \`Ai / Bi = values[i]\`.

Given some queries \`queries[i] = [Ci, Di]\`, return the answer to each query. If any answer does not exist, return \`-1.0\`.`,
    examples: [
      { input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]', output: '[6.0,0.5,-1.0,1.0,-1.0]' },
      { input: 'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]', output: '[0.5,2.0,-1.0,-1.0]' },
    ],
    constraints: ['1 <= equations.length <= 20', '1 <= queries.length <= 20'],
    starterCode: `/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
function calcEquation(equations, values, queries) {

}

function solve(equations, values, queries) { return calcEquation(equations, values, queries); }`,
    starterCodePython: `class Solution:
    def calcEquation(self, equations: list[list[str]], values: list[float], queries: list[list[str]]) -> list[float]:
        pass

def solve(equations, values, queries): return Solution().calcEquation(equations, values, queries)`,
    testCases: [
      {
        label: 'a/b=2,b/c=3 → [6,0.5,-1,1,-1]',
        args: [[['a','b'],['b','c']], [2.0,3.0], [['a','c'],['b','a'],['a','e'],['a','a'],['x','x']]],
        expected: [6.0,0.5,-1.0,1.0,-1.0],
      },
      {
        label: 'a/b=0.5 → [0.5,2,-1,-1]',
        args: [[['a','b']], [0.5], [['a','b'],['b','a'],['a','c'],['x','y']]],
        expected: [0.5,2.0,-1.0,-1.0],
      },
    ],
    hint: 'Build a weighted directed graph: a→b with weight v, b→a with weight 1/v. For each query, BFS/DFS from source to target, multiplying edge weights along the path. Return -1 if unreachable or unknown variable.',
  },

  473: {
    id: 473,
    title: 'Matchsticks to Square',
    titleZh: '火柴拼正方形',
    difficulty: 'Medium',
    leetcodeSlug: 'matchsticks-to-square',
    tags: ['Array', 'DFS', 'Backtracking', 'Bit Manipulation', 'Dynamic Programming'],
    description: `You are given an integer array \`matchsticks\` where \`matchsticks[i]\` is the length of the \`i\`th matchstick. You want to use **all** the matchsticks to make one square. You should not break any stick, but you can link them up.

Return \`true\` if you can make this square and \`false\` otherwise.`,
    examples: [
      { input: 'matchsticks = [1,1,2,2,2]', output: 'true', explanation: '1+1+2=4? No. Sides: 2, 2, 2, 2 — perimeter 8, side 2. Sticks [2],[2],[2],[1,1] ✓.' },
      { input: 'matchsticks = [3,3,3,3,4]', output: 'false' },
    ],
    constraints: ['1 <= matchsticks.length <= 15', '1 <= matchsticks[i] <= 10^8'],
    starterCode: `/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
function makesquare(matchsticks) {

}

function solve(matchsticks) { return makesquare(matchsticks); }`,
    starterCodePython: `class Solution:
    def makesquare(self, matchsticks: list[int]) -> bool:
        pass

def solve(matchsticks): return Solution().makesquare(matchsticks)`,
    testCases: [
      { label: '[1,1,2,2,2] → true', args: [[1,1,2,2,2]], expected: true },
      { label: '[3,3,3,3,4] → false', args: [[3,3,3,3,4]], expected: false },
    ],
    hint: 'Total sum must be divisible by 4; side = sum/4. Sort descending (prune early). Backtrack: assign each matchstick to one of 4 buckets. Skip duplicate bucket values to avoid redundant states.',
  },

  526: {
    id: 526,
    title: 'Beautiful Arrangement',
    titleZh: '优美的排列',
    difficulty: 'Medium',
    leetcodeSlug: 'beautiful-arrangement',
    tags: ['Array', 'DFS', 'Backtracking', 'Bit Manipulation'],
    description: `Suppose you have \`n\` integers labeled \`1\` through \`n\`. A permutation of those \`n\` integers \`perm\` is a **beautiful arrangement** if for every \`i\` (1-indexed), either:
- \`perm[i]\` is divisible by \`i\`, or
- \`i\` is divisible by \`perm[i]\`.

Given an integer \`n\`, return the **number** of beautiful arrangements you can construct.`,
    examples: [
      { input: 'n = 2', output: '2', explanation: 'Arrangements: [1,2] and [2,1].' },
      { input: 'n = 1', output: '1' },
    ],
    constraints: ['1 <= n <= 15'],
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
function countArrangement(n) {

}

function solve(n) { return countArrangement(n); }`,
    starterCodePython: `class Solution:
    def countArrangement(self, n: int) -> int:
        pass

def solve(n): return Solution().countArrangement(n)`,
    testCases: [
      { label: 'n=2 → 2', args: [2], expected: 2 },
      { label: 'n=1 → 1', args: [1], expected: 1 },
      { label: 'n=3 → 3', args: [3], expected: 3 },
    ],
    hint: 'Backtrack: fill positions 1..n one by one. At position i, try each unused number k where k%i==0 or i%k==0. Use a visited bitmask or boolean array to track used numbers.',
  },

  638: {
    id: 638,
    title: 'Shopping Offers',
    titleZh: '大礼包',
    difficulty: 'Medium',
    leetcodeSlug: 'shopping-offers',
    tags: ['Array', 'DFS', 'Backtracking', 'Memoization', 'Dynamic Programming'],
    description: `In a store, items are priced individually. You have special \`offers\`, each a bundle of items at a reduced price. You want to buy **exactly** \`needs[i]\` of each item.

You may use any offer multiple times (but cannot buy more than needed). Find the **minimum cost**.

- \`price[i]\` — individual price of item i.
- \`offers[j]\` — array where last element is price, others are quantities of each item.
- \`needs[i]\` — required quantity of item i.`,
    examples: [
      { input: 'price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]', output: '14', explanation: 'Use offer 1 once (cost 10, get 1×A+2×B), then buy 2×A at 2 each = 14.' },
      { input: 'price = [2,3,4], special = [[1,1,0,4],[2,2,1,9]], needs = [1,2,1]', output: '11' },
    ],
    constraints: ['n == price.length == needs.length', '1 <= n <= 6', '0 <= price[i], needs[i] <= 10', '1 <= special.length <= 100'],
    starterCode: `/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
function shoppingOffers(price, special, needs) {

}

function solve(price, special, needs) { return shoppingOffers(price, special, needs); }`,
    starterCodePython: `class Solution:
    def shoppingOffers(self, price: list[int], special: list[list[int]], needs: list[int]) -> int:
        pass

def solve(price, special, needs): return Solution().shoppingOffers(price, special, needs)`,
    testCases: [
      { label: 'price=[2,5],special=[[3,0,5],[1,2,10]],needs=[3,2] → 14', args: [[2,5], [[3,0,5],[1,2,10]], [3,2]], expected: 14 },
      { label: 'price=[2,3,4],special=[[1,1,0,4],[2,2,1,9]],needs=[1,2,1] → 11', args: [[2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1]], expected: 11 },
    ],
    hint: 'DFS with memoization keyed on current needs state. At each state, try every valid offer (that doesn\'t exceed needs) or fall back to buying everything individually. Cache results by needs tuple.',
  },

  694: {
    id: 694,
    title: 'Number of Distinct Islands',
    titleZh: '不同岛屿的数量',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-distinct-islands',
    tags: ['Hash Table', 'DFS', 'BFS', 'Union Find', 'Hash Function'],
    description: `Given a binary grid \`grid\` (1 = land, 0 = water), return the number of **distinct** islands.

Two islands are considered distinct if and only if one island is not equal to another (i.e., you cannot translate one to match the other — rotation and reflection don't count for this problem).`,
    examples: [
      { input: 'grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]', output: '1', explanation: 'Both 2×2 islands have the same shape.' },
      { input: 'grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]', output: '3' },
    ],
    constraints: ['m == grid.length', 'n == grid[0].length', '1 <= m, n <= 50', 'grid[i][j] is 0 or 1.'],
    starterCode: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function numDistinctIslands(grid) {

}

function solve(grid) { return numDistinctIslands(grid); }`,
    starterCodePython: `class Solution:
    def numDistinctIslands(self, grid: list[list[int]]) -> int:
        pass

def solve(grid): return Solution().numDistinctIslands(grid)`,
    testCases: [
      { label: '5×5 grid two identical islands → 1', args: [[[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]], expected: 1 },
      { label: '5×5 grid three distinct → 3', args: [[[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]], expected: 3 },
    ],
    hint: 'DFS each island, recording the path as relative directions from the starting cell (e.g., "RDLB" for right/down/left/backtrack). Store each island\'s path string in a set. The set size is the answer.',
  },

  698: {
    id: 698,
    title: 'Partition to K Equal Sum Subsets',
    titleZh: '划分为k个相等的子集',
    difficulty: 'Medium',
    leetcodeSlug: 'partition-to-k-equal-sum-subsets',
    tags: ['Array', 'DFS', 'Backtracking', 'Bit Manipulation', 'Memoization'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return \`true\` if it is possible to divide this array into \`k\` non-empty subsets whose sums are all equal.`,
    examples: [
      { input: 'nums = [4,3,2,3,5,2,1], k = 4', output: 'true', explanation: 'Subsets: {5},{1,4},{2,3},{2,3}.' },
      { input: 'nums = [1,2,3,4], k = 3', output: 'false' },
    ],
    constraints: ['1 <= k <= nums.length <= 16', '1 <= nums[i] <= 10^4', 'Sum of nums is divisible by k.'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function canPartitionKSubsets(nums, k) {

}

function solve(nums, k) { return canPartitionKSubsets(nums, k); }`,
    starterCodePython: `class Solution:
    def canPartitionKSubsets(self, nums: list[int], k: int) -> bool:
        pass

def solve(nums, k): return Solution().canPartitionKSubsets(nums, k)`,
    testCases: [
      { label: '[4,3,2,3,5,2,1], k=4 → true', args: [[4,3,2,3,5,2,1], 4], expected: true },
      { label: '[1,2,3,4], k=3 → false', args: [[1,2,3,4], 3], expected: false },
    ],
    hint: 'Target = sum/k. Sort descending. Backtrack with k buckets: try adding each unused number to a bucket. Prune: skip if bucket sum + num > target; skip duplicate bucket values. Use bitmask DP for O(2^n * n) solution.',
  },

  800: {
    id: 800,
    title: 'Similar RGB Color',
    titleZh: '相似 RGB 颜色',
    difficulty: 'Easy',
    leetcodeSlug: 'similar-rgb-color',
    tags: ['Math', 'String', 'Enumeration'],
    description: `A RGB color \`"#AABBCC"\` can be represented as a shorthand \`"#ABC"\` only if \`AA == BB == CC\` (each pair is identical digits).

Given a color \`color\` in the form \`"#AABBCC"\`, return a 7-character color that is most similar to \`color\` and has a shorthand representation.

The similarity between colors \`#ABCDEF\` and \`#UVWXYZ\` is \`-(AB-UV)^2 - (CD-WX)^2 - (EF-YZ)^2\`.`,
    examples: [
      { input: 'color = "#09f166"', output: '"#11ee66"', explanation: '09→11 (diff 2^2=4), f1→ee (diff 3^2=9), 66→66 (0). Total similarity -13.' },
    ],
    constraints: ['color.length == 7', 'color[0] == \'#\'', 'All other characters are hex digits.'],
    starterCode: `/**
 * @param {string} color
 * @return {string}
 */
function similarRGB(color) {

}

function solve(color) { return similarRGB(color); }`,
    starterCodePython: `class Solution:
    def similarRGB(self, color: str) -> str:
        pass

def solve(color): return Solution().similarRGB(color)`,
    testCases: [
      { label: '"#09f166" → "#11ee66"', args: ['#09f166'], expected: '#11ee66' },
    ],
    hint: 'For each 2-hex pair (e.g., "09"), find the nearest value of form 0x11*k (k=0..15 → 0x00, 0x11, 0x22,...,0xff). Round parsed value / 17 to nearest integer, then multiply by 17. Format back to hex.',
  },

  803: {
    id: 803,
    title: 'Bricks Falling When Hit',
    titleZh: '打砖块',
    difficulty: 'Hard',
    leetcodeSlug: 'bricks-falling-when-hit',
    tags: ['Array', 'Union Find', 'Matrix'],
    description: `You are given an \`m x n\` binary grid \`grid\`, where each \`1\` represents a brick. A brick is **stable** if it is directly connected to the top of the grid, or at least one of its four adjacent bricks is stable.

You are given an array \`hits\`, which are the positions of bricks to be erased. After each hit, zero or more bricks may fall. Return an array where the \`i\`th element is the number of bricks that fall after the \`i\`th erasure.`,
    examples: [
      { input: 'grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]', output: '[2]', explanation: 'Hitting (1,0) causes 2 bricks to fall.' },
      { input: 'grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]', output: '[0,0]' },
    ],
    constraints: ['m == grid.length', 'n == grid[0].length', '1 <= m, n <= 200', '1 <= hits.length <= 4 * 10^4'],
    starterCode: `/**
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
function hitBricks(grid, hits) {

}

function solve(grid, hits) { return hitBricks(grid, hits); }`,
    starterCodePython: `class Solution:
    def hitBricks(self, grid: list[list[int]], hits: list[list[int]]) -> list[int]:
        pass

def solve(grid, hits): return Solution().hitBricks(grid, hits)`,
    testCases: [
      { label: '[[1,0,0,0],[1,1,1,0]], hits=[[1,0]] → [2]', args: [[[1,0,0,0],[1,1,1,0]], [[1,0]]], expected: [2] },
      { label: '[[1,0,0,0],[1,1,0,0]], hits=[[1,1],[1,0]] → [0,0]', args: [[[1,0,0,0],[1,1,0,0]], [[1,1],[1,0]]], expected: [0,0] },
    ],
    hint: 'Reverse time: apply all hits first, then add bricks back in reverse. Use Union-Find with a virtual "roof" node (index m*n). When adding brick back, measure how many newly become stable (connected to roof).',
  },

  1038: {
    id: 1038,
    title: 'Binary Search Tree to Greater Sum Tree',
    titleZh: '从二叉搜索树到更大和树',
    difficulty: 'Medium',
    leetcodeSlug: 'binary-search-tree-to-greater-sum-tree',
    tags: ['Tree', 'DFS', 'BST', 'Binary Tree'],
    description: `Given the \`root\` of a BST, transform it into a **Greater Sum Tree** where each node's value is replaced by the sum of all values **greater than or equal to** the node's original value in the BST.`,
    examples: [
      { input: 'root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]', output: '[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]' },
      { input: 'root = [0,null,1]', output: '[1,null,1]' },
    ],
    constraints: ['Number of nodes: [1, 100]', '0 <= Node.val <= 100', 'All values unique.', 'root is a valid BST.'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {TreeNode|null}
 */
function bstToGst(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function serialize(root) { if(!root) return []; let res=[],q=[root]; while(q.length){let n=q.shift();if(!n){res.push(null);continue;}res.push(n.val);q.push(n.left,n.right);} while(res[res.length-1]==null)res.pop(); return res; }
function solve(arr) { return serialize(bstToGst(build(arr))); }`,
    starterCodePython: `class Solution:
    def bstToGst(self, root):
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def serialize(root):
    if not root: return []
    res, q = [], [root]
    while q:
        n = q.pop(0)
        if not n: res.append(None); continue
        res.append(n.val); q.append(n.left); q.append(n.right)
    while res and res[-1] is None: res.pop()
    return res

def solve(arr): return serialize(Solution().bstToGst(build(arr)))`,
    testCases: [
      { label: '[0,null,1] → [1,null,1]', args: [[0,null,1]], expected: [1,null,1] },
      { label: '[4,1,6,...] → greater sum tree', args: [[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]], expected: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8] },
    ],
    hint: 'Reverse inorder traversal (right → root → left) accumulates a running suffix sum. At each node, add the running sum to node.val, then update the running sum.',
  },

  1073: {
    id: 1073,
    title: 'Adding Two Negabinary Numbers',
    titleZh: '负二进制数相加',
    difficulty: 'Medium',
    leetcodeSlug: 'adding-two-negabinary-numbers',
    tags: ['Array', 'Math'],
    description: `Given two numbers \`arr1\` and \`arr2\` in **base -2** (negabinary), return the result of adding them together.

Each array represents the number in order of most significant bit to least significant bit (big-endian). The result should also be in big-endian negabinary form with no leading zeros (except the number 0 itself).`,
    examples: [
      { input: 'arr1 = [1,1,1,1,1], arr2 = [1,0,1]', output: '[1,0,0,0,0]', explanation: '(-2)^4 = 16 in negabinary.' },
      { input: 'arr1 = [0], arr2 = [0]', output: '[0]' },
      { input: 'arr1 = [0], arr2 = [1]', output: '[1]' },
    ],
    constraints: ['1 <= arr1.length, arr2.length <= 1000', 'arr1[i] and arr2[i] are 0 or 1.', 'arr1 and arr2 have no leading zeros.'],
    starterCode: `/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
function addNegabinary(arr1, arr2) {

}

function solve(arr1, arr2) { return addNegabinary(arr1, arr2); }`,
    starterCodePython: `class Solution:
    def addNegabinary(self, arr1: list[int], arr2: list[int]) -> list[int]:
        pass

def solve(arr1, arr2): return Solution().addNegabinary(arr1, arr2)`,
    testCases: [
      { label: '[1,1,1,1,1]+[1,0,1] → [1,0,0,0,0]', args: [[1,1,1,1,1],[1,0,1]], expected: [1,0,0,0,0] },
      { label: '[0]+[0] → [0]', args: [[0],[0]], expected: [0] },
      { label: '[0]+[1] → [1]', args: [[0],[1]], expected: [1] },
    ],
    hint: 'Add from LSB (right to left) with a carry. In base -2: sum = a + b + carry. New bit = sum & 1. New carry = -(sum >> 1). Handle carry = -1 specially. Strip leading zeros from result.',
  },

  1100: {
    id: 1100,
    title: 'Find K-Length Substrings With No Repeated Characters',
    titleZh: '长度为 K 的无重复字符子串',
    difficulty: 'Medium',
    leetcodeSlug: 'find-k-length-substrings-with-no-repeated-characters',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: `Given a string \`s\` and an integer \`k\`, return the number of substrings of length \`k\` with **no repeated characters**.`,
    examples: [
      { input: 's = "havefunonleetcode", k = 5', output: '6' },
      { input: 's = "home", k = 5', output: '0', explanation: 'No substring of length 5.' },
    ],
    constraints: ['1 <= s.length <= 10^4', '1 <= k <= 10^4', 's consists of lowercase English letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function numKLenSubstrNoRepeats(s, k) {

}

function solve(s, k) { return numKLenSubstrNoRepeats(s, k); }`,
    starterCodePython: `class Solution:
    def numKLenSubstrNoRepeats(self, s: str, k: int) -> int:
        pass

def solve(s, k): return Solution().numKLenSubstrNoRepeats(s, k)`,
    testCases: [
      { label: '"havefunonleetcode", k=5 → 6', args: ['havefunonleetcode', 5], expected: 6 },
      { label: '"home", k=5 → 0', args: ['home', 5], expected: 0 },
    ],
    hint: 'Fixed-size sliding window of length k. Use a frequency map. When window reaches size k, check if all chars are unique (map size == k). Slide: add right char, remove left char.',
  },

  1160: {
    id: 1160,
    title: 'Find Words That Can Be Formed by Characters',
    titleZh: '拼写单词',
    difficulty: 'Easy',
    leetcodeSlug: 'find-words-that-can-be-formed-by-characters',
    tags: ['Array', 'Hash Table', 'String', 'Counting'],
    description: `You are given an array of strings \`words\` and a string \`chars\`. A word is **good** if it can be formed by characters from \`chars\` (each character can be used only once).

Return the sum of lengths of all good words.`,
    examples: [
      { input: 'words = ["cat","bt","hat","tree"], chars = "atach"', output: '6', explanation: '"cat" (3) and "hat" (3) are good.' },
      { input: 'words = ["hello","world","leetcode"], chars = "welldonehoneyr"', output: '10', explanation: '"hello" and "world" are good.' },
    ],
    constraints: ['1 <= words.length <= 1000', '1 <= words[i].length, chars.length <= 100', 'All strings consist of lowercase English letters.'],
    starterCode: `/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
function countCharacters(words, chars) {

}

function solve(words, chars) { return countCharacters(words, chars); }`,
    starterCodePython: `class Solution:
    def countCharacters(self, words: list[str], chars: str) -> int:
        pass

def solve(words, chars): return Solution().countCharacters(words, chars)`,
    testCases: [
      { label: '["cat","bt","hat","tree"], "atach" → 6', args: [['cat','bt','hat','tree'], 'atach'], expected: 6 },
      { label: '["hello","world","leetcode"], "welldonehoneyr" → 10', args: [['hello','world','leetcode'], 'welldonehoneyr'], expected: 10 },
    ],
    hint: 'Build a frequency map for chars. For each word, build its frequency map. A word is good if for every character, word_count[c] <= chars_count[c].',
  },

  1331: {
    id: 1331,
    title: 'Rank Transform of an Array',
    titleZh: '数组序号转换',
    difficulty: 'Easy',
    leetcodeSlug: 'rank-transform-of-an-array',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: `Given an integer array \`arr\`, replace each element with its **rank**. The rank represents how large the element is. Rules:
- Rank is an integer starting from 1.
- The larger the element, the larger the rank.
- Equal elements must have the same rank.
- Each rank should be as small as possible.`,
    examples: [
      { input: 'arr = [40,10,20,30]', output: '[4,1,2,3]' },
      { input: 'arr = [100,100,100]', output: '[1,1,1]' },
      { input: 'arr = [37,12,28,9,100,56,80,5,12]', output: '[5,3,4,2,8,6,7,1,3]' },
    ],
    constraints: ['0 <= arr.length <= 10^5', '-10^9 <= arr[i] <= 10^9'],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function arrayRankTransform(arr) {

}

function solve(arr) { return arrayRankTransform(arr); }`,
    starterCodePython: `class Solution:
    def arrayRankTransform(self, arr: list[int]) -> list[int]:
        pass

def solve(arr): return Solution().arrayRankTransform(arr)`,
    testCases: [
      { label: '[40,10,20,30] → [4,1,2,3]', args: [[40,10,20,30]], expected: [4,1,2,3] },
      { label: '[100,100,100] → [1,1,1]', args: [[100,100,100]], expected: [1,1,1] },
      { label: '[37,12,28,9,100,56,80,5,12] → [5,3,4,2,8,6,7,1,3]', args: [[37,12,28,9,100,56,80,5,12]], expected: [5,3,4,2,8,6,7,1,3] },
    ],
    hint: 'Sort unique values, assign rank 1,2,3... to each. Build a map from value to rank. Replace each element using the map.',
  },

  1418: {
    id: 1418,
    title: 'Display Table of Food Orders in a Restaurant',
    titleZh: '点菜展示表',
    difficulty: 'Medium',
    leetcodeSlug: 'display-table-of-food-orders-in-a-restaurant',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: `Given a list of \`orders\`, each as \`[customerName, tableNumber, foodItem]\`, display the order count of each food item for each table.

Return a 2D list where:
- The first row is a header: \`["Table", ...sorted food items]\`.
- Each subsequent row starts with the table number (as string), followed by the count of each food item for that table.
- Rows are sorted by table number (ascending as integer).`,
    examples: [
      { input: 'orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]', output: '[["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","3","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]]' },
    ],
    constraints: ['1 <= orders.length <= 5 * 10^4', 'orders[i].length == 3'],
    starterCode: `/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
function displayTable(orders) {

}

function solve(orders) { return displayTable(orders); }`,
    starterCodePython: `class Solution:
    def displayTable(self, orders: list[list[str]]) -> list[list[str]]:
        pass

def solve(orders): return Solution().displayTable(orders)`,
    testCases: [
      {
        label: '6 orders → 4-row table',
        args: [[['David','3','Ceviche'],['Corina','10','Beef Burrito'],['David','3','Fried Chicken'],['Carla','5','Water'],['Carla','5','Ceviche'],['Rous','3','Ceviche']]],
        expected: [['Table','Beef Burrito','Ceviche','Fried Chicken','Water'],['3','0','3','1','0'],['5','0','1','0','1'],['10','1','0','0','0']],
      },
    ],
    hint: 'Collect unique food items (sorted) and unique table numbers (sorted numerically). Build a 2D count map[table][food]. Construct the header row and each table row.',
  },

  1715: {
    id: 1715,
    title: 'Count Apples and Oranges',
    titleZh: '苹果和橘子的个数',
    difficulty: 'Medium',
    leetcodeSlug: 'count-apples-and-oranges',
    tags: ['Database'],
    description: `**Note:** This is a database problem adapted for algorithmic practice.

You are given two tables as arrays:
- \`boxes\`: each entry \`[box_id, chest_id, apple_count, orange_count]\`. A box may optionally contain a chest (chest_id can be null/0).
- \`chests\`: each entry \`[chest_id, apple_count, orange_count]\`.

Each box has its own apple/orange count, and may also contain a chest that adds more. Return the total apple count and total orange count across all boxes (including chests).

Return \`[totalApples, totalOranges]\`.`,
    examples: [
      { input: 'boxes=[[1,0,2,1],[2,1,3,2]], chests=[[1,4,5]]', output: '[9,8]', explanation: 'Box1: 2 apples+1 orange (no chest). Box2: 3+4=7 apples, 2+5=7 oranges. Total: 2+7=9 apples, 1+7=8 oranges.' },
    ],
    constraints: ['1 <= boxes.length <= 1000', '0 <= chests.length <= 1000'],
    starterCode: `/**
 * @param {number[][]} boxes  [box_id, chest_id, apple_count, orange_count]  chest_id=0 means no chest
 * @param {number[][]} chests [chest_id, apple_count, orange_count]
 * @return {number[]} [totalApples, totalOranges]
 */
function countApplesOranges(boxes, chests) {

}

function solve(boxes, chests) { return countApplesOranges(boxes, chests); }`,
    starterCodePython: `class Solution:
    def countApplesOranges(self, boxes: list[list[int]], chests: list[list[int]]) -> list[int]:
        pass

def solve(boxes, chests): return Solution().countApplesOranges(boxes, chests)`,
    testCases: [
      { label: '2 boxes, 1 chest → [9,8]', args: [[[1,0,2,1],[2,1,3,2]], [[1,4,5]]], expected: [9,8] },
      { label: '1 box no chest → box counts', args: [[[1,0,5,3]], []], expected: [5,3] },
    ],
    hint: 'Build a map from chest_id to its apple/orange counts. For each box, add box apples + (chest apples if chest_id != 0) and similarly for oranges. Sum all.',
  },

  1976: {
    id: 1976,
    title: 'Number of Ways to Arrive at Destination',
    titleZh: '到达目的地的方案数',
    difficulty: 'Medium',
    leetcodeSlug: 'number-of-ways-to-arrive-at-destination',
    tags: ['Dynamic Programming', 'Graph', 'Topological Sort', 'Shortest Path'],
    description: `You are in a city with \`n\` intersections labeled \`0\` to \`n-1\`. Given a 2D array \`roads\` where \`roads[i] = [ui, vi, timei]\` (undirected weighted edges), find the number of ways to travel from intersection \`0\` to intersection \`n-1\` in the **shortest time**.

Return the answer modulo \`10^9 + 7\`.`,
    examples: [
      { input: 'n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,2],[0,4,5],[4,6,4]]', output: '4' },
      { input: 'n = 2, roads = [[1,0,10]]', output: '1' },
    ],
    constraints: ['1 <= n <= 200', 'n - 1 <= roads.length <= n * (n - 1) / 2', '0 <= ui, vi <= n - 1', '1 <= timei <= 10^9'],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
function countPaths(n, roads) {

}

function solve(n, roads) { return countPaths(n, roads); }`,
    starterCodePython: `class Solution:
    def countPaths(self, n: int, roads: list[list[int]]) -> int:
        pass

def solve(n, roads): return Solution().countPaths(n, roads)`,
    testCases: [
      { label: 'n=7, 9 roads → 4', args: [7, [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,2],[0,4,5],[4,6,4]]], expected: 4 },
      { label: 'n=2, [[1,0,10]] → 1', args: [2, [[1,0,10]]], expected: 1 },
    ],
    hint: 'Dijkstra from node 0. Track dist[] and ways[]. When relaxing an edge: if shorter path found, update dist[v] and set ways[v] = ways[u]. If equal length path found, add ways[u] to ways[v]. Answer is ways[n-1] mod 10^9+7.',
  },

  1825: {
    id: 1825,
    title: 'Finding MK Average',
    titleZh: '求出 MK 平均值',
    difficulty: 'Hard',
    leetcodeSlug: 'finding-mk-average',
    tags: ['Design', 'Queue', 'Heap (Priority Queue)', 'Data Stream', 'Sorted List', 'Segment Tree'],
    description: `Implement the \`MKAverage\` class:
- \`MKAverage(int m, int k)\` — initializes with parameters \`m\` and \`k\`.
- \`addElement(int num)\` — inserts \`num\` into the data structure.
- \`calculateMKAverage()\` — returns the **MK Average** of the **last m elements**, defined as the floor of the average after removing the \`k\` smallest and \`k\` largest elements. Return \`-1\` if fewer than \`m\` elements have been added.

**For this adaptation:** given a list of operations, simulate and return results of each \`calculateMKAverage\` call.`,
    examples: [
      { input: 'm = 3, k = 1, adds = [3,1,4,1,5,9,2,6], calcsAfter = [3,4,5,6,7,8]', output: '[-1,-1,4,3,5,6]', explanation: 'After 3 adds → avg of [1,4,3] drop min&max = [4] → 4. After 4 adds → last 3 = [4,1,5] drop min&max = [4] → 4? No: [1,4,5] drop 1&5 → [4] → 4 ... etc.' },
    ],
    constraints: ['3 <= m <= 10^5', '1 <= k*2 < m', '1 <= num <= 10^5', 'At most 10^5 calls.'],
    starterCode: `class MKAverage {
  /**
   * @param {number} m
   * @param {number} k
   */
  constructor(m, k) {

  }

  /** @param {number} num */
  addElement(num) {

  }

  /** @return {number} */
  calculateMKAverage() {

  }
}

function solve(m, k, adds, calcsAfterCount) {
  const obj = new MKAverage(m, k);
  const res = [];
  for (let i = 0; i < adds.length; i++) {
    obj.addElement(adds[i]);
    if (calcsAfterCount.includes(i + 1)) res.push(obj.calculateMKAverage());
  }
  return res;
}`,
    starterCodePython: `class MKAverage:
    def __init__(self, m: int, k: int):
        pass

    def addElement(self, num: int) -> None:
        pass

    def calculateMKAverage(self) -> int:
        pass

def solve(m, k, adds, calcs_after_count):
    obj = MKAverage(m, k)
    res = []
    for i, num in enumerate(adds):
        obj.addElement(num)
        if (i + 1) in calcs_after_count: res.append(obj.calculateMKAverage())
    return res`,
    testCases: [
      {
        label: 'm=3,k=1, adds=[3,1,4,1,5,9,2,6], calc after each',
        args: [3, 1, [3,1,4,1,5,9,2,6], [1,2,3,4,5,6,7,8]],
        expected: [-1,-1,4,1,4,5,2,6],
      },
    ],
    hint: 'Use a queue to keep the last m elements. To compute MK average efficiently, use three sorted structures (or a segment tree / order-statistics tree): bottom k, middle m-2k, top k. Track their sums for O(log n) per operation.',
  },

  // ─── Batch B9 — BFS + Classic DP + DP Game ───────────────────────────────────

  115: {
    id: 115,
    title: 'Distinct Subsequences',
    titleZh: '不同的子序列',
    difficulty: 'Hard',
    leetcodeSlug: 'distinct-subsequences',
    tags: ['String', 'Dynamic Programming'],
    description: `Given two strings \`s\` and \`t\`, return the number of distinct subsequences of \`s\` which equals \`t\`.

The test cases are generated so that the answer fits in a 32-bit signed integer.`,
    examples: [
      { input: 's = "rabbbit", t = "rabbit"', output: '3', explanation: 'There are 3 ways to choose which "b" to drop.' },
      { input: 's = "babgbag", t = "bag"', output: '5' },
    ],
    constraints: ['1 <= s.length, t.length <= 1000', 's and t consist of lowercase English letters.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
function numDistinct(s, t) {

}

function solve(s, t) { return numDistinct(s, t); }`,
    starterCodePython: `class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        pass

def solve(s, t): return Solution().numDistinct(s, t)`,
    testCases: [
      { label: '"rabbbit","rabbit" → 3', args: ['rabbbit', 'rabbit'], expected: 3 },
      { label: '"babgbag","bag" → 5', args: ['babgbag', 'bag'], expected: 5 },
    ],
    hint: 'dp[i][j] = number of ways to form t[0..j-1] using s[0..i-1]. If s[i-1]==t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j] (use it or skip it). Otherwise dp[i][j] = dp[i-1][j]. Base: dp[i][0] = 1.',
  },

  140: {
    id: 140,
    title: 'Word Break II',
    titleZh: '单词拆分 II',
    difficulty: 'Hard',
    leetcodeSlug: 'word-break-ii',
    tags: ['Array', 'Hash Table', 'String', 'Dynamic Programming', 'Backtracking', 'Trie', 'Memoization'],
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, add spaces in \`s\` to construct a sentence where each word is a valid dictionary word. Return **all such possible sentences** in any order.

Note that the same word in the dictionary may be reused multiple times.`,
    examples: [
      { input: 's = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]', output: '["cats and dog","cat sand dog"]' },
      { input: 's = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]', output: '["pine apple pen apple","pineapple pen apple","pine applepen apple"]' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: '[]' },
    ],
    constraints: ['1 <= s.length <= 20', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 10'],
    starterCode: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
function wordBreak(s, wordDict) {

}

function solve(s, wordDict) { return wordBreak(s, wordDict).sort(); }`,
    starterCodePython: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        pass

def solve(s, wordDict): return sorted(Solution().wordBreak(s, wordDict))`,
    testCases: [
      { label: '"catsanddog" → sorted sentences', args: ['catsanddog', ['cat','cats','and','sand','dog']], expected: ['cat sand dog', 'cats and dog'] },
      { label: '"catsandog" → []', args: ['catsandog', ['cats','dog','sand','and','cat']], expected: [] },
    ],
    hint: 'Backtrack with memoization: memo[i] = list of sentences formed from s[i:]. At each index, try every word in the dict; if s[i:i+len(word)]==word, recurse on i+len(word) and prepend word to each result.',
  },

  310: {
    id: 310,
    title: 'Minimum Height Trees',
    titleZh: '最小高度树',
    difficulty: 'Medium',
    leetcodeSlug: 'minimum-height-trees',
    tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
    description: `A tree is an undirected graph with no cycles. Given \`n\` nodes labeled \`0\` to \`n-1\` and a list of undirected \`edges\`, find all roots that minimize the tree height.

Return a list of all such root labels. The answer can be returned in any order.`,
    examples: [
      { input: 'n = 4, edges = [[1,0],[1,2],[1,3]]', output: '[1]' },
      { input: 'n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]', output: '[3,4]' },
    ],
    constraints: ['1 <= n <= 2 * 10^4', 'edges.length == n - 1', '0 <= ai, bi <= n - 1'],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function findMinHeightTrees(n, edges) {

}

function solve(n, edges) { return findMinHeightTrees(n, edges).sort((a,b)=>a-b); }`,
    starterCodePython: `class Solution:
    def findMinHeightTrees(self, n: int, edges: list[list[int]]) -> list[int]:
        pass

def solve(n, edges): return sorted(Solution().findMinHeightTrees(n, edges))`,
    testCases: [
      { label: 'n=4, [[1,0],[1,2],[1,3]] → [1]', args: [4, [[1,0],[1,2],[1,3]]], expected: [1] },
      { label: 'n=6, [[3,0],[3,1],[3,2],[3,4],[5,4]] → [3,4]', args: [6, [[3,0],[3,1],[3,2],[3,4],[5,4]]], expected: [3,4] },
      { label: 'n=1, [] → [0]', args: [1, []], expected: [0] },
    ],
    hint: 'Topological trimming: repeatedly remove leaf nodes (degree 1). The remaining 1 or 2 nodes are the roots of minimum height trees. Stop when ≤ 2 nodes remain.',
  },

  417: {
    id: 417,
    title: 'Pacific Atlantic Water Flow',
    titleZh: '太平洋大西洋水流问题',
    difficulty: 'Medium',
    leetcodeSlug: 'pacific-atlantic-water-flow',
    tags: ['Array', 'DFS', 'BFS', 'Matrix'],
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean (top/left edges) and Atlantic Ocean (bottom/right edges). Rain water flows to adjacent cells with equal or lower height, then to the ocean.

Find all cells from which water can flow to **both** oceans. Return their coordinates in any order.`,
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
      { input: 'heights = [[1]]', output: '[[0,0]]' },
    ],
    constraints: ['m == heights.length', 'n == heights[0].length', '1 <= m, n <= 200', '0 <= heights[i][j] <= 10^5'],
    starterCode: `/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {

}

function solve(heights) { return pacificAtlantic(heights).sort((a,b)=>a[0]-b[0]||a[1]-b[1]); }`,
    starterCodePython: `class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        pass

def solve(heights): return sorted(Solution().pacificAtlantic(heights))`,
    testCases: [
      { label: '5×5 grid → 7 cells', args: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]], expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] },
      { label: '[[1]] → [[0,0]]', args: [[[1]]], expected: [[0,0]] },
    ],
    hint: 'BFS/DFS in reverse: starting from Pacific border cells, find all reachable cells (moving to equal or higher). Do the same from Atlantic border. The intersection is the answer.',
  },

  516: {
    id: 516,
    title: 'Longest Palindromic Subsequence',
    titleZh: '最长回文子序列',
    difficulty: 'Medium',
    leetcodeSlug: 'longest-palindromic-subsequence',
    tags: ['String', 'Dynamic Programming'],
    description: `Given a string \`s\`, find the length of the **longest palindromic subsequence** in \`s\`.`,
    examples: [
      { input: 's = "bbbab"', output: '4', explanation: '"bbbb" is the longest palindromic subsequence.' },
      { input: 's = "cbbd"', output: '2', explanation: '"bb".' },
    ],
    constraints: ['1 <= s.length <= 1000', 's consists only of lowercase English letters.'],
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function longestPalindromeSubseq(s) {

}

function solve(s) { return longestPalindromeSubseq(s); }`,
    starterCodePython: `class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        pass

def solve(s): return Solution().longestPalindromeSubseq(s)`,
    testCases: [
      { label: '"bbbab" → 4', args: ['bbbab'], expected: 4 },
      { label: '"cbbd" → 2', args: ['cbbd'], expected: 2 },
    ],
    hint: 'dp[i][j] = LPS length of s[i..j]. If s[i]==s[j]: dp[i][j] = dp[i+1][j-1] + 2. Else: max(dp[i+1][j], dp[i][j-1]). Fill diagonally, or equivalently it equals the LCS of s and reverse(s).',
  },

  542: {
    id: 542,
    title: '01 Matrix',
    titleZh: '01 矩阵',
    difficulty: 'Medium',
    leetcodeSlug: '01-matrix',
    tags: ['Array', 'BFS', 'Dynamic Programming', 'Matrix'],
    description: `Given an \`m x n\` binary matrix \`mat\`, return the distance of the nearest \`0\` for each cell. The distance between two adjacent cells is \`1\`.`,
    examples: [
      { input: 'mat = [[0,0,0],[0,1,0],[0,0,0]]', output: '[[0,0,0],[0,1,0],[0,0,0]]' },
      { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]' },
    ],
    constraints: ['m == mat.length', 'n == mat[0].length', '1 <= m, n <= 10^4', '1 <= m * n <= 10^4', 'mat[i][j] is 0 or 1.', 'At least one 0 in mat.'],
    starterCode: `/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
function updateMatrix(mat) {

}

function solve(mat) { return updateMatrix(mat); }`,
    starterCodePython: `class Solution:
    def updateMatrix(self, mat: list[list[int]]) -> list[list[int]]:
        pass

def solve(mat): return Solution().updateMatrix(mat)`,
    testCases: [
      { label: '[[0,0,0],[0,1,0],[0,0,0]] → [[0,0,0],[0,1,0],[0,0,0]]', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: [[0,0,0],[0,1,0],[0,0,0]] },
      { label: '[[0,0,0],[0,1,0],[1,1,1]] → [[0,0,0],[0,1,0],[1,2,1]]', args: [[[0,0,0],[0,1,0],[1,1,1]]], expected: [[0,0,0],[0,1,0],[1,2,1]] },
    ],
    hint: 'Multi-source BFS: enqueue all 0-cells with distance 0. BFS outward, setting dist[r][c] = dist[neighbor] + 1 for each unvisited cell. Alternatively, two-pass DP (top-left then bottom-right).',
  },

  960: {
    id: 960,
    title: 'Delete Columns to Make Sorted III',
    titleZh: '删列造序 III',
    difficulty: 'Hard',
    leetcodeSlug: 'delete-columns-to-make-sorted-iii',
    tags: ['Array', 'String', 'Dynamic Programming'],
    description: `You are given an array of \`n\` strings \`strs\`, all of the same length. We may choose any deletion indices, and we delete all the characters in those positions for each string.

For example, if we have \`strs = ["abcdef","uvwxyz"]\` and deletion indices \`{0, 2, 3}\`, the final array is \`["bef","vyz"]\`.

After deletions, the final array must be **sorted lexicographically**. Return the minimum number of columns to delete.`,
    examples: [
      { input: 'strs = ["babca","bbazb"]', output: '3', explanation: 'Delete columns 0, 1, 4 to get ["bc","az"] which is sorted.' },
      { input: 'strs = ["edcba"]', output: '4', explanation: 'Delete all but last column.' },
      { input: 'strs = ["ghi","def","abc"]', output: '0' },
    ],
    constraints: ['n == strs.length', '1 <= n <= 100', '1 <= strs[i].length <= 100'],
    starterCode: `/**
 * @param {string[]} strs
 * @return {number}
 */
function minDeletionSize(strs) {

}

function solve(strs) { return minDeletionSize(strs); }`,
    starterCodePython: `class Solution:
    def minDeletionSize(self, strs: list[str]) -> int:
        pass

def solve(strs): return Solution().minDeletionSize(strs)`,
    testCases: [
      { label: '["babca","bbazb"] → 3', args: [['babca','bbazb']], expected: 3 },
      { label: '["edcba"] → 4', args: [['edcba']], expected: 4 },
      { label: '["ghi","def","abc"] → 0', args: [['ghi','def','abc']], expected: 0 },
    ],
    hint: 'LIS variant. dp[j] = max columns we can keep ending at column j. Column j can extend column i if strs[r][i] <= strs[r][j] for all rows r. Answer = cols - max(dp[j]).',
  },

  967: {
    id: 967,
    title: 'Numbers With Same Consecutive Differences',
    titleZh: '连续差相同的数字',
    difficulty: 'Medium',
    leetcodeSlug: 'numbers-with-same-consecutive-differences',
    tags: ['Backtracking', 'BFS'],
    description: `Return all non-negative integers of length \`n\` such that the absolute difference between every two consecutive digits is \`k\`.

Return the answer in any order. Note that every number in the answer must not have leading zeros except for the number \`0\` itself.`,
    examples: [
      { input: 'n = 3, k = 7', output: '[181,292,707,818,929]' },
      { input: 'n = 2, k = 1', output: '[10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]' },
    ],
    constraints: ['2 <= n <= 9', '0 <= k <= 9'],
    starterCode: `/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
function numsSameConsecDiff(n, k) {

}

function solve(n, k) { return numsSameConsecDiff(n, k).sort((a,b)=>a-b); }`,
    starterCodePython: `class Solution:
    def numsSameConsecDiff(self, n: int, k: int) -> list[int]:
        pass

def solve(n, k): return sorted(Solution().numsSameConsecDiff(n, k))`,
    testCases: [
      { label: 'n=3,k=7 → [181,292,707,818,929]', args: [3, 7], expected: [181,292,707,818,929] },
      { label: 'n=2,k=1 → 17 numbers', args: [2, 1], expected: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98] },
    ],
    hint: 'BFS/DFS: start with digits 1-9 (no leading zeros). At each step, the next digit is last_digit ± k (if in [0,9]). Handle k=0 specially to avoid duplicates. Continue until n digits are formed.',
  },

  1437: {
    id: 1437,
    title: 'Check If All 1\'s Are at Least Length K Places Away',
    titleZh: '是否所有 1 都至少相隔 k 位',
    difficulty: 'Easy',
    leetcodeSlug: 'check-if-all-1s-are-at-least-length-k-places-away',
    tags: ['Array'],
    description: `Given a binary array \`nums\` and an integer \`k\`, return \`true\` if all \`1\`'s are at least \`k\` places away from each other, otherwise return \`false\`.`,
    examples: [
      { input: 'nums = [1,0,0,0,1,0,0,1], k = 2', output: 'true' },
      { input: 'nums = [1,0,0,1,0,1], k = 2', output: 'false', explanation: 'The 1s at indices 0 and 3 are only 3 apart, but 3 and 5 are only 2 apart (need ≥ 2 → ok), wait 3 and 5 differ by 2 which equals k so it\'s false.' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '0 <= k <= nums.length', 'nums[i] is 0 or 1.'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function kLengthApart(nums, k) {

}

function solve(nums, k) { return kLengthApart(nums, k); }`,
    starterCodePython: `class Solution:
    def kLengthApart(self, nums: list[int], k: int) -> bool:
        pass

def solve(nums, k): return Solution().kLengthApart(nums, k)`,
    testCases: [
      { label: '[1,0,0,0,1,0,0,1], k=2 → true', args: [[1,0,0,0,1,0,0,1], 2], expected: true },
      { label: '[1,0,0,1,0,1], k=2 → false', args: [[1,0,0,1,0,1], 2], expected: false },
    ],
    hint: 'Track the index of the last seen 1. When you encounter a new 1, check if current_index - last_index - 1 >= k. Update last_index.',
  },

  2206: {
    id: 2206,
    title: 'Divide Array Into Equal Pairs',
    titleZh: '将数组划分成相等数对',
    difficulty: 'Easy',
    leetcodeSlug: 'divide-array-into-equal-pairs',
    tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Counting'],
    description: `You are given an integer array \`nums\` consisting of \`2 * n\` integers. Divide \`nums\` into \`n\` pairs such that each element belongs to exactly one pair and every element in each pair is equal.

Return \`true\` if this is possible, otherwise return \`false\`.`,
    examples: [
      { input: 'nums = [3,2,3,2,2,2]', output: 'true', explanation: 'Pairs: (3,3),(2,2),(2,2).' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
    ],
    constraints: ['nums.length == 2 * n', '1 <= n <= 500', '1 <= nums[i] <= 500'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function divideArray(nums) {

}

function solve(nums) { return divideArray(nums); }`,
    starterCodePython: `class Solution:
    def divideArray(self, nums: list[int]) -> bool:
        pass

def solve(nums): return Solution().divideArray(nums)`,
    testCases: [
      { label: '[3,2,3,2,2,2] → true', args: [[3,2,3,2,2,2]], expected: true },
      { label: '[1,2,3,4] → false', args: [[1,2,3,4]], expected: false },
    ],
    hint: 'Count frequency of each number. Every number must appear an even number of times to form pairs.',
  },

  3092: {
    id: 3092,
    title: 'Most Frequent IDs',
    titleZh: '最频繁的 ID',
    difficulty: 'Medium',
    leetcodeSlug: 'most-frequent-ids',
    tags: ['Array', 'Hash Table', 'Heap (Priority Queue)', 'Ordered Set'],
    description: `You have a collection of IDs that can change over time. Given two integer arrays \`nums\` and \`freq\` of equal length where \`nums[i]\` is an ID and \`freq[i]\` is its frequency change (positive = add, negative = remove), return an array \`ans\` where \`ans[i]\` is the count of the most frequent ID after the \`i\`-th step.`,
    examples: [
      { input: 'nums = [2,3,2,1], freq = [3,2,-3,1]', output: '[3,3,2,2]', explanation: 'After step 1: {2:3}→max 3. After step 2: {2:3,3:2}→3. After step 3: {2:0,3:2}→2. After step 4: {2:0,3:2,1:1}→2.' },
      { input: 'nums = [5,5,3], freq = [2,-2,1]', output: '[2,0,1]' },
    ],
    constraints: ['1 <= nums.length == freq.length <= 10^5', '1 <= nums[i] <= 10^5', '-10^5 <= freq[i] <= 10^5'],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number[]} freq
 * @return {number[]}
 */
function mostFrequentIDs(nums, freq) {

}

function solve(nums, freq) { return mostFrequentIDs(nums, freq); }`,
    starterCodePython: `class Solution:
    def mostFrequentIDs(self, nums: list[int], freq: list[int]) -> list[int]:
        pass

def solve(nums, freq): return Solution().mostFrequentIDs(nums, freq)`,
    testCases: [
      { label: '[2,3,2,1],[3,2,-3,1] → [3,3,2,2]', args: [[2,3,2,1],[3,2,-3,1]], expected: [3,3,2,2] },
      { label: '[5,5,3],[2,-2,1] → [2,0,1]', args: [[5,5,3],[2,-2,1]], expected: [2,0,1] },
    ],
    hint: 'Maintain a count map. Use a max-heap of (count, id). After updating count[id], push the new (count, id) onto heap. On query, pop stale entries (where heap top count != count[id]). Return heap top.',
  },

  10: {
    id: 10,
    title: 'Regular Expression Matching',
    titleZh: '正则表达式匹配',
    difficulty: 'Hard',
    leetcodeSlug: 'regular-expression-matching',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\`:
- \`'.'\` matches any single character.
- \`'*'\` matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).`,
    examples: [
      { input: 's = "aa", p = "a"', output: 'false', explanation: '"a" does not match the entire string "aa".' },
      { input: 's = "aa", p = "a*"', output: 'true', explanation: '"a*" matches zero or more "a"s.' },
      { input: 's = "ab", p = ".*"', output: 'true', explanation: '".*" matches any string.' },
    ],
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30', 's contains only lowercase letters.', 'p contains only lowercase letters, \'.\', and \'*\'.'],
    starterCode: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {

}

function solve(s, p) { return isMatch(s, p); }`,
    starterCodePython: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        pass

def solve(s, p): return Solution().isMatch(s, p)`,
    testCases: [
      { label: '"aa","a" → false', args: ['aa', 'a'], expected: false },
      { label: '"aa","a*" → true', args: ['aa', 'a*'], expected: true },
      { label: '"ab",".*" → true', args: ['ab', '.*'], expected: true },
      { label: '"aab","c*a*b" → true', args: ['aab', 'c*a*b'], expected: true },
    ],
    hint: 'dp[i][j] = s[0..i-1] matches p[0..j-1]. If p[j-1]!="*": dp[i][j] = dp[i-1][j-1] && (s[i-1]==p[j-1] || p[j-1]=="." ). If p[j-1]=="*": zero uses = dp[i][j-2]; or one+ uses (if chars match) = dp[i-1][j].',
  },

  122: {
    id: 122,
    title: 'Best Time to Buy and Sell Stock II',
    titleZh: '买卖股票的最佳时机 II',
    difficulty: 'Medium',
    leetcodeSlug: 'best-time-to-buy-and-sell-stock-ii',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
    description: `You are given an integer array \`prices\` where \`prices[i]\` is the price of a stock on day \`i\`. On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share at a time, but you can buy and sell on the same day.

Return the **maximum profit** you can achieve.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy day2=1, sell day3=5 (+4). Buy day4=3, sell day5=6 (+3). Total 7.' },
      { input: 'prices = [1,2,3,4,5]', output: '4', explanation: 'Buy day1, sell day5. Or sum all upward moves.' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
    constraints: ['1 <= prices.length <= 3 * 10^4', '0 <= prices[i] <= 10^4'],
    starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {

}

function solve(prices) { return maxProfit(prices); }`,
    starterCodePython: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass

def solve(prices): return Solution().maxProfit(prices)`,
    testCases: [
      { label: '[7,1,5,3,6,4] → 7', args: [[7,1,5,3,6,4]], expected: 7 },
      { label: '[1,2,3,4,5] → 4', args: [[1,2,3,4,5]], expected: 4 },
      { label: '[7,6,4,3,1] → 0', args: [[7,6,4,3,1]], expected: 0 },
    ],
    hint: 'Greedy: sum every upward price movement. If prices[i] > prices[i-1], add the difference to profit. Equivalently, dp: hold = max(hold, -prices[i]); cash = max(cash, hold+prices[i]).',
  },

  123: {
    id: 123,
    title: 'Best Time to Buy and Sell Stock III',
    titleZh: '买卖股票的最佳时机 III',
    difficulty: 'Hard',
    leetcodeSlug: 'best-time-to-buy-and-sell-stock-iii',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a stock on day \`i\`. You may complete **at most two transactions**. Return the **maximum profit**. You may not hold more than one share at a time.`,
    examples: [
      { input: 'prices = [3,3,5,0,0,3,1,4]', output: '6', explanation: 'Buy day4=0, sell day6=3 (+3). Buy day7=1, sell day8=4 (+3). Total 6.' },
      { input: 'prices = [1,2,3,4,5]', output: '4' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^5'],
    starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {

}

function solve(prices) { return maxProfit(prices); }`,
    starterCodePython: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass

def solve(prices): return Solution().maxProfit(prices)`,
    testCases: [
      { label: '[3,3,5,0,0,3,1,4] → 6', args: [[3,3,5,0,0,3,1,4]], expected: 6 },
      { label: '[1,2,3,4,5] → 4', args: [[1,2,3,4,5]], expected: 4 },
      { label: '[7,6,4,3,1] → 0', args: [[7,6,4,3,1]], expected: 0 },
    ],
    hint: 'Track four variables: buy1 (min price seen), profit1 (max profit after 1 sale), buy2 (min effective cost after using profit1), profit2 (max profit after 2 sales). Update all in one pass.',
  },

  174: {
    id: 174,
    title: 'Dungeon Game',
    titleZh: '地下城游戏',
    difficulty: 'Hard',
    leetcodeSlug: 'dungeon-game',
    tags: ['Array', 'Dynamic Programming', 'Matrix'],
    description: `The knight starts at the top-left cell and must reach the bottom-right cell to rescue the princess. Each cell has an integer (negative = demon drains health, positive = health orb). The knight dies if HP ever drops to 0 or below.

Return the **minimum initial health** the knight needs.`,
    examples: [
      { input: 'dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]', output: '7', explanation: 'Path right→right→down→down requires min HP=7.' },
      { input: 'dungeon = [[0]]', output: '1' },
    ],
    constraints: ['m == dungeon.length', 'n == dungeon[0].length', '1 <= m, n <= 200', '-1000 <= dungeon[i][j] <= 1000'],
    starterCode: `/**
 * @param {number[][]} dungeon
 * @return {number}
 */
function calculateMinimumHP(dungeon) {

}

function solve(dungeon) { return calculateMinimumHP(dungeon); }`,
    starterCodePython: `class Solution:
    def calculateMinimumHP(self, dungeon: list[list[int]]) -> int:
        pass

def solve(dungeon): return Solution().calculateMinimumHP(dungeon)`,
    testCases: [
      { label: '[[-2,-3,3],[-5,-10,1],[10,30,-5]] → 7', args: [[[-2,-3,3],[-5,-10,1],[10,30,-5]]], expected: 7 },
      { label: '[[0]] → 1', args: [[[0]]], expected: 1 },
    ],
    hint: 'DP from bottom-right to top-left. dp[i][j] = min HP needed when entering cell (i,j). dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]). Answer is dp[0][0].',
  },

  188: {
    id: 188,
    title: 'Best Time to Buy and Sell Stock IV',
    titleZh: '买卖股票的最佳时机 IV',
    difficulty: 'Hard',
    leetcodeSlug: 'best-time-to-buy-and-sell-stock-iv',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given an integer \`k\` and an array \`prices\` where \`prices[i]\` is the stock price on day \`i\`. Find the **maximum profit** using **at most \`k\` transactions**.`,
    examples: [
      { input: 'k = 2, prices = [2,4,1]', output: '2', explanation: 'Buy day1=2, sell day2=4.' },
      { input: 'k = 2, prices = [3,2,6,5,0,3]', output: '7', explanation: 'Buy day2=2, sell day3=6 (+4). Buy day5=0, sell day6=3 (+3).' },
    ],
    constraints: ['1 <= k <= 100', '1 <= prices.length <= 1000', '0 <= prices[i] <= 1000'],
    starterCode: `/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(k, prices) {

}

function solve(k, prices) { return maxProfit(k, prices); }`,
    starterCodePython: `class Solution:
    def maxProfit(self, k: int, prices: list[int]) -> int:
        pass

def solve(k, prices): return Solution().maxProfit(k, prices)`,
    testCases: [
      { label: 'k=2,[2,4,1] → 2', args: [2, [2,4,1]], expected: 2 },
      { label: 'k=2,[3,2,6,5,0,3] → 7', args: [2, [3,2,6,5,0,3]], expected: 7 },
    ],
    hint: 'If k >= n/2, treat as unlimited transactions (greedy). Otherwise, dp[t][d] = max profit using t transactions up to day d. Or track buy[t] and sell[t] arrays updated each day.',
  },

  213: {
    id: 213,
    title: 'House Robber II',
    titleZh: '打家劫舍 II',
    difficulty: 'Medium',
    leetcodeSlug: 'house-robber-ii',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are a professional robber planning to rob houses arranged in a **circle**. Adjacent houses have security systems connected. You cannot rob two adjacent houses. Given an integer array \`nums\` representing the amount of money in each house, return the **maximum** amount you can rob tonight.`,
    examples: [
      { input: 'nums = [2,3,2]', output: '3', explanation: 'Rob house 2 (value 3).' },
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob houses 1 and 3 (1+3=4).' },
      { input: 'nums = [1,2,3]', output: '3' },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {

}

function solve(nums) { return rob(nums); }`,
    starterCodePython: `class Solution:
    def rob(self, nums: list[int]) -> int:
        pass

def solve(nums): return Solution().rob(nums)`,
    testCases: [
      { label: '[2,3,2] → 3', args: [[2,3,2]], expected: 3 },
      { label: '[1,2,3,1] → 4', args: [[1,2,3,1]], expected: 4 },
      { label: '[1,2,3] → 3', args: [[1,2,3]], expected: 3 },
    ],
    hint: 'Since houses are circular, either we include house 0 or house n-1 (not both). Run linear house robber twice: once on nums[0..n-2] and once on nums[1..n-1]. Return the max.',
  },

  309: {
    id: 309,
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    titleZh: '买卖股票的最佳时机含冷冻期',
    difficulty: 'Medium',
    leetcodeSlug: 'best-time-to-buy-and-sell-stock-with-cooldown',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price on day \`i\`. After selling, you must wait **one cooldown day** before buying again. Find the **maximum profit** with unlimited transactions.`,
    examples: [
      { input: 'prices = [1,2,3,0,2]', output: '3', explanation: 'Buy day1, sell day2, cooldown day3, buy day4, sell day5. Profit = 1+2=3.' },
      { input: 'prices = [1]', output: '0' },
    ],
    constraints: ['1 <= prices.length <= 5000', '0 <= prices[i] <= 1000'],
    starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {

}

function solve(prices) { return maxProfit(prices); }`,
    starterCodePython: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass

def solve(prices): return Solution().maxProfit(prices)`,
    testCases: [
      { label: '[1,2,3,0,2] → 3', args: [[1,2,3,0,2]], expected: 3 },
      { label: '[1] → 0', args: [[1]], expected: 0 },
    ],
    hint: 'States: hold (holding stock), sold (just sold, in cooldown), rest (not holding, not in cooldown). Transitions: hold = max(hold, rest-price); sold = hold+price; rest = max(rest, sold). Answer = max(sold, rest).',
  },

  337: {
    id: 337,
    title: 'House Robber III',
    titleZh: '打家劫舍 III',
    difficulty: 'Medium',
    leetcodeSlug: 'house-robber-iii',
    tags: ['Dynamic Programming', 'DFS', 'Binary Tree'],
    description: `The thief has found a new place to rob: a binary tree. The only constraint is that adjacent nodes (parent-child) cannot be robbed on the same night.

Given the \`root\` of the binary tree, return the **maximum amount of money** the thief can rob without alerting the police.`,
    examples: [
      { input: 'root = [3,2,3,null,3,null,1]', output: '7', explanation: 'Rob root (3) + left-right (3) + right-right (1) = 7.' },
      { input: 'root = [3,4,5,1,3,null,1]', output: '9', explanation: 'Rob node 4 (4) + node 5 (5) = 9.' },
    ],
    constraints: ['Number of nodes: [1, 10^4]', '0 <= Node.val <= 10^4'],
    starterCode: `/**
 * @param {TreeNode|null} root
 * @return {number}
 */
function rob(root) {

}

function TreeNode(val, left, right) { this.val=val; this.left=left||null; this.right=right||null; }
function build(arr, i=0) { if(i>=arr.length||arr[i]==null) return null; let n=new TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n; }
function solve(arr) { return rob(build(arr)); }`,
    starterCodePython: `class Solution:
    def rob(self, root) -> int:
        pass

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def build(arr, i=0):
    if i >= len(arr) or arr[i] is None: return None
    n = TreeNode(arr[i]); n.left = build(arr, 2*i+1); n.right = build(arr, 2*i+2); return n

def solve(arr): return Solution().rob(build(arr))`,
    testCases: [
      { label: '[3,2,3,null,3,null,1] → 7', args: [[3,2,3,null,3,null,1]], expected: 7 },
      { label: '[3,4,5,1,3,null,1] → 9', args: [[3,4,5,1,3,null,1]], expected: 9 },
    ],
    hint: 'Post-order DFS returning [rob_this, skip_this] for each node. rob_this = node.val + skip_left + skip_right. skip_this = max(rob_left,skip_left) + max(rob_right,skip_right).',
  },

  1428: {
    id: 1428,
    title: 'Leftmost Column with at Least a One',
    titleZh: '至少有一个 1 的最左端列',
    difficulty: 'Medium',
    leetcodeSlug: 'leftmost-column-with-at-least-a-one',
    tags: ['Array', 'Binary Search', 'Interactive', 'Matrix'],
    description: `**Adapted problem:** A row-sorted binary matrix (each row sorted ascending) is given. Find the **leftmost column index** that contains at least one \`1\`, or return \`-1\` if no such column exists.`,
    examples: [
      { input: 'matrix = [[0,0],[1,1]]', output: '0' },
      { input: 'matrix = [[0,0],[0,1]]', output: '1' },
      { input: 'matrix = [[0,0],[0,0]]', output: '-1' },
      { input: 'matrix = [[0,0,0,1],[0,0,1,1],[0,1,1,1]]', output: '1' },
    ],
    constraints: ['rows == matrix.length', 'cols == matrix[i].length', '1 <= rows, cols <= 100', 'matrix[i][j] is 0 or 1.', 'matrix[i] is sorted ascending.'],
    starterCode: `/**
 * @param {number[][]} matrix
 * @return {number}
 */
function leftMostColumnWithOne(matrix) {

}

function solve(matrix) { return leftMostColumnWithOne(matrix); }`,
    starterCodePython: `class Solution:
    def leftMostColumnWithOne(self, matrix: list[list[int]]) -> int:
        pass

def solve(matrix): return Solution().leftMostColumnWithOne(matrix)`,
    testCases: [
      { label: '[[0,0],[1,1]] → 0', args: [[[0,0],[1,1]]], expected: 0 },
      { label: '[[0,0],[0,1]] → 1', args: [[[0,0],[0,1]]], expected: 1 },
      { label: '[[0,0],[0,0]] → -1', args: [[[0,0],[0,0]]], expected: -1 },
      { label: '[[0,0,0,1],[0,0,1,1],[0,1,1,1]] → 1', args: [[[0,0,0,1],[0,0,1,1],[0,1,1,1]]], expected: 1 },
    ],
    hint: 'Start at top-right corner. If cell is 1, move left (record col). If cell is 0, move down. This finds the leftmost column in O(m+n). Or binary search each row for first 1, take min column.',
  },

}

export function getPracticeProblem(id: number): PracticeProblem | undefined {
  return practiceProblems[id]
}

export const practiceProblemIds = new Set(Object.keys(practiceProblems).map(Number))
