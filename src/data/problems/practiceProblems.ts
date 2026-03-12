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
}

export function getPracticeProblem(id: number): PracticeProblem | undefined {
  return practiceProblems[id]
}

export const practiceProblemIds = new Set(Object.keys(practiceProblems).map(Number))
