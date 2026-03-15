# ACM Mode Code Template

> Source: https://labuladong.online/algo/en/intro/acm-mode/
> Archived: labuladong.online

---

# ACM Mode Code Template

Most tutorial articles on this site use LeetCode problems as examples. LeetCode problems use the “core code” style, but in interviews and written tests, many companies use the “ACM style”.

So this article will explain the difference between ACM style and core code style, and give a general ACM style template. It will help you turn ACM style problems into the familiar core code style.

Also, all problems in this site’s [problem set](<https://labuladong.online/zh/problemset/core/>) support both core code style and ACM style. You can practice there and understand the differences and connection between the two styles.

## ACM Style vs Core Code Style

There are three main differences between ACM style and LeetCode style: the example area at the bottom left, the custom test cases at the bottom right, and the code area at the top right.

The figure below shows LeetCode style (core code style):

![diagram](https://labuladong.online/images/algo/acm/core-light.jpg)

Note these points:

  1. The example at the bottom left directly describes the function parameters.
  2. The custom test input at the bottom right is just the parameter values, similar to the example.
  3. In the top-right code area, you only need to write the algorithm function and return the result as a return value.

The figure below shows ACM style:

![diagram](https://labuladong.online/images/algo/acm/acm-light.jpg)

Note these points:

  1. The example at the bottom left is several lines of strings. It tells you the format and structure of these strings.
  2. The custom test input at the bottom right is also multiple lines of strings, similar to the example.
  3. In the top-right code area, you must import packages yourself, read and parse the input strings, then write the algorithm to solve the problem, and finally print the result.

Next, look at ACM style code. The key point is: **you must read input until EOF before you stop, because you do not know how many test cases the input has**.

As in the figure, if you separate the data reading logic from the algorithm logic, you can completely turn it into LeetCode style. In theory, you do not have to separate them; you can read data and compute at the same time. But that will make the code messy and hard to debug and understand.

So I suggest you separate the data reading logic from the algorithm logic as in the figure. This makes it easier to debug and understand, and also makes it similar to LeetCode’s core code style.

## ACM Style Code Template

Here are ACM code templates for Java/C++/Python/JS/Go. The key is to remember how to read input until EOF.

```python
import sys

class Solution:
    def add(self, a: int, b: int) -> int:
        return a + b

# read until EOF
for line in sys.stdin:
    a, b = map(int, line.strip().split())
    result = Solution().add(a, b)
    print(result)
``` 

ACM itself is not difficult. You can learn it in half an hour. The real key is the algorithms!

So my suggestion is: in daily practice, you can use the core code mode to solve problems and learn algorithms. Before interviews and written tests, just practice the ACM mode in [the problem set of this site](<https://labuladong.online/zh/problemset/core/>).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
