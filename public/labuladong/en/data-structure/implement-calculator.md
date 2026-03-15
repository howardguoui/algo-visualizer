# How to Implement a Calculator

> Source: https://labuladong.online/algo/en/data-structure/implement-calculator/
> Archived: labuladong.online

---

# How to Implement a Calculator

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[224\. Basic Calculator](https://leetcode.com/problems/basic-calculator/)|   
[227\. Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)|   
[772\. Basic Calculator III](https://leetcode.com/problems/basic-calculator-iii/)🔒|   
  
Prerequisites

Before reading this article, you need to learn:

  * [Principles of Queue/Stack](/en/algo/data-structure-basic/queue-stack-basic/)


The calculator we want to build will have these features:

  1. You input a string. It can have `+ - * /`, numbers, parentheses, and spaces. Your algorithm returns the result.

  2. The calculation follows the normal math rules. Parentheses have the highest priority. Multiply and divide come before add and subtract.

  3. Division is integer division. No matter positive or negative, round toward zero (5/2=2, -5/2=-2).

  4. You can assume the input is always valid. There will not be integer overflow, and no division by zero.


For example, if you input this string, the algorithm will return 9:
    
    
      3 * (2 - 6 / (3 - 7))
    = 3 * (2 - 6 / (-4))
    = 3 * (2 - (-1))
    = 9

As you can see, this is already very close to a real calculator. Although we all have used calculators before, if you think about how to implement its algorithm, it is not that easy:

  1. To handle parentheses, you must calculate the innermost ones first, then simplify step by step. Even when doing it by hand, it's easy to make mistakes. Writing it as an algorithm is even harder.

  2. You must handle multiplication and division before addition and subtraction. This is not so hard for kids to learn, but it is tricky for computers.

  3. You need to deal with spaces. For better readability, we often put spaces between numbers and operators. But during calculation, these spaces should be ignored.


I remember many data structure textbooks use calculators as an example when explaining stacks. But honestly, the explanation is not good. Many future computer scientists may have been discouraged by such a simple data structure.

So in this article, let's talk about how to build a fully functional calculator. **The key is to break down the problem step by step, solve each part one by one.** With a few simple algorithm rules, you can handle very complex calculations. I believe this way of thinking can help you solve many hard problems.

Let's start by breaking down the problem, beginning with the simplest one.

## ¶1\. String to Integer

Yes, this is a simple problem. First, tell me how to convert a string that represents a **positive integer** into an int type?

CC++GoJavaJavaScriptPython
    
    
    String s = "458";
    
    int n = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        n = 10 * n + (c - '0');
    }
    // n is now equal to 458

This is very simple and a common routine. But even for such a simple problem, there is a pitfall: **You cannot remove the parentheses in`(c - '0')`, or it may cause integer overflow**.

Because the variable `c` is an ASCII code. Without parentheses, addition may happen before subtraction. If `s` is close to INT_MAX, this can cause overflow. So, use parentheses to make sure subtraction happens first.

## ¶2\. Handling Addition and Subtraction

Now, let's move on. **If the input formula only contains addition and subtraction, and there are no spaces** , how can you calculate the result? Let's use the string `1-12+3` as an example:

  1. Add a default `+` sign before the first number, so it becomes `+1-12+3`.

  2. Combine each operator and number into a pair. For example: `+1`, `-12`, `+3`. Convert them to numbers, then put them into a stack.

  3. Add up all the numbers in the stack. The sum is the result of the formula.


Let's look at the code and a picture to make it clear:

CC++GoJavaJavaScriptPython
    
    
    int calculate(String s) {
        Stack<Integer> stk = new Stack<>();
        // record the numbers in the expression
        int num = 0;
        // record the sign before num, initialize as +
        char sign = '+';
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            // if it's a digit, continuously read it into num
            if (Character.isDigit(c)) {
                num = 10 * num + (c - '0');
            }
            // if it's not a digit, it means we encountered the
            // next sign or the end of the expression
            // then the previous number and sign should be pushed into the stack
            if (c == '+' || c == '-' || i == s.length() - 1) {
                switch (sign) {
                    case '+':
                        stk.push(num); break;
                    case '-':
                        stk.push(-num); break;
                }
                // update the sign to the current one, reset num to zero
                sign = c;
                num = 0;
            }
        }
        // sum up all the results in the stack to get the answer
        int res = 0;
        while (!stk.isEmpty()) {
            res += stk.pop();
        }
        return res;
    }

Maybe the part with the `switch` statement is a bit hard to understand. `i` scans from left to right, and `sign` and `num` follow it. When `s[i]` meets an operator, here's what happens:

![](/images/algo/calculator/1.jpg)

Now, use `sign` to decide if the number is positive or negative, put it into the stack, then update `sign` and reset `num` to get ready for the next pair.

Also, not only when you meet a new operator should you push to the stack. When `i` reaches the end of the string (`i == s.size() - 1`), you should also put the last number into the stack for the final calculation.

![](/images/algo/calculator/2.jpg)

That's it. This is the algorithm for compact addition and subtraction strings. Make sure you understand this part. The next steps just change this base framework a bit.

## ¶3\. Handling Multiplication and Division

The idea is almost the same as just handling addition and subtraction. Let's use the string `2-3*4+5` as an example. The core idea is still to break the string into pairs of symbols and numbers.

For example, this can be split into `+2`, `-3`, `*4`, `+5`. Before, we didn't handle multiplication and division. That's easy. **Everything else stays the same**. Just add the cases for multiplication and division in the `switch` part:

CC++GoJavaJavaScriptPython
    
    
    int calculate(String s) {
        Stack<Integer> stk = new Stack<>();
        // record the numbers in the formula
        int num = 0;
        // record the sign before num, initialized as +
        char sign = '+';
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                num = 10 * num + (c - '0');
            }
    
            if (c == '+' || c == '-' || c == '/' || c == '*' || i == s.length() - 1) {
                int pre;
                switch (sign) {
                    case '+':
                        stk.push(num); break;
                    case '-':
                        stk.push(-num); break;
                    // just take out the previous number and perform corresponding operation
                    case '*':
                        pre = stk.pop();
                        stk.push(pre * num);
                        break;
                    case '/':
                        pre = stk.pop();
                        stk.push(pre / num);
                        break;
                }
                // update the sign to the current sign, reset the number to zero
                sign = c;
                num = 0;
            }
        }
        // sum up all the results in the stack to get the answer
        int res = 0;
        while (!stk.isEmpty()) {
            res += stk.pop();
        }
        return res;
    }

![](/images/algo/calculator/3.jpg)

**Multiplication and division have higher priority than addition and subtraction. This means you combine them with the top number in the stack, while addition and subtraction just push their number into the stack.**

Now let's think about spaces in the string. In our code, there is no need to handle spaces specially. Look at the `if` conditions: if the character `c` is a space, we just skip it.

Now, our algorithm can calculate addition, subtraction, multiplication, and division correctly, and automatically ignores spaces. The last step is to make the algorithm handle parentheses correctly.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
