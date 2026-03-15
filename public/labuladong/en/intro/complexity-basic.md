# Basic Time Complexity

> Source: https://labuladong.online/algo/en/intro/complexity-basic/
> Archived: labuladong.online

---

# Basic Time Complexity

Since this is the first chapter, I will not cover every detail of time and space complexity. A more thorough [Practical Guide to Algorithm Time and Space Complexity Analysis](/en/algo/essential-technique/complexity-analysis/) is arranged for after you have learned the core framework of several common algorithms. By then, you will have enough knowledge to easily understand various scenarios of complexity analysis.

Because later in this chapter you will implement common sorting algorithms and data structures, I will analyze their time complexity. So, I want to introduce the concepts of time/space complexity, as well as some **simplified methods** for analyzing them, to avoid confusion for beginners.

For beginners, you only need to keep the following points in mind:

  1. Time and space complexity are represented by Big O notation (such as O(1),O(n2),O(logn)O(1), O(n^2), O(logn)O(1),O(n2),O(logn), etc). **These are estimates, not exact calculations. You can ignore constants and lower-order terms, and only keep the highest-order term**.


For example, O(2n2+3n+1)O(2n^2 + 3n + 1)O(2n2+3n+1) is the same as O(n2)O(n^2)O(n2), and O(1000n+1000)O(1000n + 1000)O(1000n+1000) is the same as O(n)O(n)O(n).

  2. When analyzing algorithm complexity, we look at the worst-case scenario. This will be demonstrated in the examples below.

  3. Time complexity measures the execution efficiency of an algorithm, and space complexity measures its memory usage. The smaller, the better for both.


For example, an algorithm with time complexity O(n)O(n)O(n) is faster than one with O(n2)O(n^2)O(n2), and an algorithm with space complexity O(1)O(1)O(1) uses less memory than one with O(n)O(n)O(n).

Of course, we usually specify what nnn stands for, such as the length of the input array.

  4. How to estimate? **For now, you can simply understand: in most cases, time complexity depends on the highest number of nested for loops; space complexity depends on how much extra space the algorithm uses to store data**.


Note

Some details in the above analysis methods are not rigorous:

  1. Estimating time complexity by counting the number of nested for loops is a simplified method and not completely accurate.

  2. Most of the time we analyze the worst-case complexity, but when measuring the complexity of data structure APIs, we analyze the average complexity.


A more complete analysis method will be introduced in detail in [Practical Guide to Algorithm Time and Space Complexity Analysis](/en/algo/essential-technique/complexity-analysis/). The estimation methods above are sufficient for learning the content of this chapter.

Let’s look at a few examples for a more intuitive understanding.

## ¶Time and Space Complexity Example Analysis

**Example 1: Time Complexity O(n)O(n)O(n), Space Complexity O(1)O(1)O(1)**

CC++GoJavaJavaScriptPython
    
    
    // input an integer array, return the sum of all elements
    int getSum(int[] nums) {
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
        }
        return sum;
    }

The algorithm uses a for loop to go through the `nums` array, so the time complexity is O(n)O(n)O(n), where `n` is the length of `nums`.

We only use a variable `sum`. The `nums` array is given as input by the problem, so it does not count towards the space complexity of our algorithm. So the space complexity is O(1)O(1)O(1).

**Example 2: Time Complexity O(n)O(n)O(n), Space Complexity O(1)O(1)O(1)**

CC++GoJavaJavaScriptPython
    
    
    // Calculate the sum when n is a multiple of 10, otherwise return -1
    int sum(int n) {
        if (n % 10 != 0) {
            return -1;
        }
        int sum = 0;
        for (int i = 0; i <= n; i++) {
            sum += i;
        }
        return sum;
    }

Actually, the for loop only runs if `n` is a multiple of 10, so the time complexity is O(n)O(n)O(n). In other cases, the algorithm returns directly, so the time complexity is O(1)O(1)O(1).

But when we analyze algorithm complexity, we only care about the worst case. So the time complexity is O(n)O(n)O(n), and the space complexity is O(1)O(1)O(1).

**Example 3: Time Complexity O(n2)O(n^2)O(n2), Space Complexity O(1)O(1)O(1)**

CC++GoJavaJavaScriptPython
    
    
    // Does the array contain two numbers whose sum is target?
    boolean hasTargetSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return true;
                }
            }
        }
        return false;
    }

The algorithm has two nested for loops, so the time complexity is O(n2)O(n^2)O(n2), where nnn is the length of `nums`.

We only use two variables `i` and `j`. This is a constant amount of extra space, so the space complexity is O(1)O(1)O(1).

You might ask: The inner for loop does not always go through the whole array, and it might return early, so isn't the actual time less than n2n^2n2? Is the time complexity really O(n2)O(n^2)O(n2)?

Yes, it is still O(n2)O(n^2)O(n2). In different cases, the actual number of operations might be less than n2n^2n2, but we only need to estimate the worst case time complexity.

Each for loop has O(n)O(n)O(n) time complexity in the worst case, so putting them together gives total time complexity of O(n2)O(n^2)O(n2).

**Example 4: Time Complexity O(n)O(n)O(n), Space Complexity O(n)O(n)O(n)**

CC++GoJavaJavaScriptPython
    
    
    void exampleFn(int n) {
        int[] nums = new int[n];
    }

This function creates an array of size `n`, so the space complexity is O(n)O(n)O(n).

The code allocates space for an array and sets nnn elements to 0. Memory allocation itself can be considered O(1)O(1)O(1), but setting each element to 0 is like a hidden for loop (done automatically by the language), so the time complexity is O(n)O(n)O(n). The total time complexity is O(n)O(n)O(n).

Time complexity is not only about visible for loops. Every line of code could have hidden time costs. So, it is important to understand how common data structures in your programming language work. This helps you analyze time complexity accurately.

**Example 5: Time Complexity O(n)O(n)O(n), Space Complexity O(n)O(n)O(n)**

CC++GoJavaJavaScriptPython
    
    
    // input an integer array, return a new array where each element is
    // the square of the corresponding element in the original array
    int[] squareArray(int[] nums) {
        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            res[i] = nums[i] * nums[i];
        }
        return res;
    }

Setting up the array `res` takes O(n)O(n)O(n) time, and there is a for loop with time complexity O(n)O(n)O(n). So the total time complexity is O(n)O(n)O(n), where `n` is the length of `nums`.

We create a new array `res`, which has the same length as `nums`, so the space complexity is O(n)O(n)O(n).

If you understand the basic complexity analysis above, that is good enough for now. Let's keep learning.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
