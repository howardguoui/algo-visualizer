# How to Determine if a Rectangle is Perfect

> Source: https://labuladong.online/algo/en/frequency-interview/perfect-rectangle/
> Archived: labuladong.online

---

# How to Determine if a Rectangle is Perfect

After reading this article, you can solve the following problems:

LeetCode| Difficulty  
---|---  
[391\. Perfect Rectangle](<https://leetcode.com/problems/perfect-rectangle/>)|   
  
Today we will look at a very interesting and challenging problem.

We know that a rectangle has four corners, but you only need the coordinates of two corners to define a rectangle (for example, the bottom-left and top-right corners).

Let's look at LeetCode problem 391: [Perfect Rectangle](<https://leetcode.com/problems/perfect-rectangle/>). The problem gives you an array `rectangles`, where each element is a tuple `(x1, y1, x2, y2)`. This tuple records the bottom-left and top-right coordinates of a small rectangle.

**391\. Perfect Rectangle** |[LeetCode](<https://leetcode.com/problems/perfect-rectangle/>)

Given an array `rectangles` where `rectangles[i] = [xi, yi, ai, bi]` represents an axis-aligned rectangle. The bottom-left point of the rectangle is `(xi, yi)` and the top-right point of it is `(ai, bi)`.

Return `true` _if all the rectangles together form an exact cover of a rectangular region_.

**Example 1:**

![diagram](https://labuladong.online/images/lc/uploads/2021/03/27/perectrec1-plane.jpg)

```
Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
Output: true
Explanation: All 5 rectangles together form an exact cover of a rectangular region.
``` 

**Example 2:**

![diagram](https://labuladong.online/images/lc/uploads/2021/03/27/perfectrec2-plane.jpg)

```
Input: rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
Output: false
Explanation: Because there is a gap between the two rectangular regions.
``` 

**Example 3:**

![diagram](https://labuladong.online/images/lc/uploads/2021/03/27/perfecrrec4-plane.jpg)

```
Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
Output: false
Explanation: Because two of the rectangles overlap with each other.
``` 

**Constraints:**

  * `1 <= rectangles.length <= 2 * 104`
  * `rectangles[i].length == 4`
  * `-105 <= xi, yi, ai, bi <= 105`

The problem is from [LeetCode 391. Perfect Rectangle](<https://leetcode.com/problems/perfect-rectangle/>).

In other words, the `rectangles` array contains many small rectangles. The problem asks us to return a boolean value to check if these small rectangles can form a "perfect rectangle." The function signature is as follows:

```python
def isRectangleCover(rectangles: List[List[int]]) -> bool
``` 

**A "perfect rectangle" means that all the small rectangles together form one big rectangle, with no overlaps and no gaps.**

This problem is rated Hard on LeetCode. If you have not seen similar problems before, it can be tricky.

The usual way is to try to represent the final shape, and then check if any two rectangles overlap or if there are gaps. This is possible, but the logic can get very complicated.

**Actually, to check if the final shape is a perfect rectangle, we need to look at two things: "area" and "corners."**

Let's talk about the "area" first.

Each element in the `rectangles` array is a tuple `(x1, y1, x2, y2)`, which gives the bottom-left and top-right coordinates of a small rectangle.

If these small rectangles form a "perfect rectangle," can you find the bottom-left corner `(X1, Y1)` and the top-right corner `(X2, Y2)` of the big rectangle?

This is simple. The bottom-left corner `(X1, Y1)` is the minimum of all small rectangles' bottom-left corners. The top-right corner `(X2, Y2)` is the maximum of all small rectangles' top-right corners.

Here, we use lowercase letters for the small rectangles' coordinates, and uppercase for the perfect rectangle's coordinates. You can write code like this:

```python
# The bottom-left vertex, initialized to positive infinity to record the minimum value
X1, Y1 = inf, inf
# The top-right vertex, initialized to negative infinity to record the maximum value
X2, Y2 = -inf, -inf

for x1, y1, x2, y2 in rectangles:
    # Take the minimum value of the bottom-left vertex of the small rectangle
    X1, Y1 = min(X1, x1), min(Y1, y1)
    # Take the maximum value of the top-right vertex of the small rectangle
    X2, Y2 = max(X2, x2), max(Y2, y2)
``` 

Now you have the bottom-left corner `(X1, Y1)` and the top-right corner `(X2, Y2)` of the perfect rectangle.

**The calculated`X1, Y1, X2, Y2` are the "theoretical coordinates" of the perfect rectangle. If the sum of the areas of all small rectangles is not equal to the area of this perfect rectangle, there must be overlaps or gaps. Then it is not a perfect rectangle.**

Here is the next step in code:

```python
def isRectangleCover(rectangles):
    X1, Y1 = float('inf'), float('inf')
    X2, Y2 = float('-inf'), float('-inf')
    # record the sum of the areas of all small rectangles
    actualArea = 0
    for rect in rectangles:
        x1, y1, x2, y2 = rect
        # calculate the theoretical coordinates of the perfect rectangle
        X1 = min(X1, x1)
        Y1 = min(Y1, y1)
        X2 = max(X2, x2)
        Y2 = max(Y2, y2)
        # accumulate the area of all small rectangles
        actualArea += (x2 - x1) * (y2 - y1)

    # calculate the theoretical area of the perfect rectangle
    expectedArea = (X2 - X1) * (Y2 - Y1)
    # the areas should be the same
    if actualArea != expectedArea:
        return False

    return True
``` 

This covers the "area" part. The idea is simple: if the sum of the small rectangles' areas is not equal to the area of the perfect rectangle, then there must be overlaps or gaps, so it is not a perfect rectangle.

But what if the two areas are equal? Can we be sure the shape is a perfect rectangle, with no gaps or overlaps?

No, we cannot. Here is a simple example: Imagine a perfect rectangle. Now, cut out a small rectangle from the middle, and move it down by one unit. The total area stays the same, but now there is a gap and an overlap. It is no longer a perfect rectangle.

**In summary, even if the areas are equal, we cannot be sure there are no gaps or overlaps. So, we also need to check the "corners".**

Do you remember a logic puzzle from elementary school? If you cut a rectangle along its diagonal, how many corners are left? The answer: if you cut along the diagonal, there are 3 corners left; if you cut horizontally or vertically, there are 4; if you cut off a small corner, there are 5 corners.

Let’s return to this problem. Our next steps will use a little bit of this kind of logical thinking.

**Clearly, a perfect rectangle must have exactly four corners.** By definition, a rectangle should have four corners. If there are missing corners or overlaps, there will be more than four corners. For example, in the two sample cases below, there are more than four corners:

![diagram](https://labuladong.online/images/algo/prefect-rect/1.png)

Note

I'm not sure if "corner" or "vertex" is the best word here, but in this article, I will use "vertex" for consistency. Please keep this in mind.

If we can find out how many vertices the final shape made from all the small rectangles in `rectangles` has, we can check if the shape is a perfect rectangle.

But how are these vertices formed? We can see them easily, but how can we make the computer, or an algorithm, know if a point is a vertex? This is the main challenge of this problem.

Look at the four cases below:

![diagram](https://labuladong.online/images/algo/prefect-rect/2.jpeg)

In the picture, when is the red dot a vertex, and when is it not? Clearly, in case one and case three, the red dot is a vertex. In case two and case four, it is not a vertex.

**In other words, if a point is a vertex of 2 or 4 small rectangles, it is not a vertex in the final shape; if a point is a vertex of 1 or 3 small rectangles, it is a vertex in the final shape.**

Notice that 2 and 4 are even numbers, while 1 and 3 are odd numbers. We want to count how many vertices appear an odd number of times in the final shape. We can write code like this:

```python
def isRectangleCover(rectangles):
    X1, Y1, X2, Y2 = float('inf'), float('inf'), float('-inf'), float('-inf')

    actualArea = 0
    # Hash set to record the vertices of the final shape
    points = set()
    for rect in rectangles:
        x1, y1, x2, y2 = rect
        X1 = min(X1, x1)
        Y1 = min(Y1, y1)
        X2 = max(X2, x2)
        Y2 = max(Y2, y2)

        actualArea += (x2 - x1) * (y2 - y1)
        # First calculate the coordinates of each point of the small
        # rectangle, represented by a string for easy storage in the hash set
        p1 = str(x1) + "," + str(y1)
        p2 = str(x1) + "," + str(y2)
        p3 = str(x2) + "," + str(y1)
        p4 = str(x2) + "," + str(y2)

        pointArr = [p1, p2, p3, p4]
        # For each point, if it exists in the set, remove it;
        for p in pointArr:
            if p in points:
                points.remove(p)
            else:
                points.add(p)
        # If it does not exist in the set, add it;
        # The remaining points in the set are those that appear an odd number of times
        
    expectedArea = (X2 - X1) * (Y2 - Y1)
    if actualArea != expectedArea:
        return False

    # Check the number of vertices
    if len(points) != 4 or \
        str(X1) + "," + str(Y1) not in points or \
        str(X1) + "," + str(Y2) not in points or \
        str(X2) + "," + str(Y1) not in points or \
        str(X2) + "," + str(Y2) not in points:
        return False

    return True
``` 

In this code, we use a `points` set to record the coordinates of all the vertices of the final shape made by the small rectangles in `rectangles`. The key logic is how we add coordinates to the `points` set:

**If a vertex`p` is already in the `points` set, remove it; if it is not in the set, add it.**

This simple logic makes sure that, at the end, only vertices that appear 1 or 3 times remain in the `points` set. Vertices that appear 2 or 4 times are removed.

So, we might think, in the end, the `points` set should have exactly 4 vertices. If `len(points) != 4`, the final shape is definitely not a perfect rectangle.

But is it enough to say that if `len(points) == 4`, the shape is a perfect rectangle? Not really, because the problem does not say the small rectangles in `rectangles` cannot overlap. Look at this case:

![diagram](https://labuladong.online/images/algo/prefect-rect/3.jpeg)

Here, two rectangles overlap. According to our logic, their vertices are removed, and only four vertices are left. If you check the area, the calculated area and the theoretical area (based on the red points) are the same. But clearly, this is not what the problem wants as a perfect rectangle.

So, not only do we need to check `len(points) == 4`, but we also need to make sure that the coordinates of the remaining points in `points` match the four theoretical vertices of a perfect rectangle. Here is the code:

```python
class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        X1, Y1 = float('inf'), float('inf')
        X2, Y2 = float('-inf'), float('-inf')
        
        points = set()
        actualArea = 0
        for rect in rectangles:
            x1, y1, x2, y2 = rect
            # calculate the theoretical vertex coordinates of the perfect rectangle
            X1 = min(X1, x1)
            Y1 = min(Y1, y1)
            X2 = max(X2, x2)
            Y2 = max(Y2, y2)
            # accumulate the area of the small rectangle
            actualArea += (x2 - x1) * (y2 - y1)
            # the final vertices of the formed shape
            p1 = f"{x1},{y1}"
            p2 = f"{x1},{y2}"
            p3 = f"{x2},{y1}"
            p4 = f"{x2},{y2}"
            for p in [p1, p2, p3, p4]:
                if p in points:
                    points.remove(p)
                else:
                    points.add(p)
        # check if the area is the same
        expectedArea = (X2 - X1) * (Y2 - Y1)
        if actualArea != expectedArea:
            return False
        # check if the number of vertices is 4
        if len(points) != 4:
            return False
        # check if the 4 vertices left belong to the perfect rectangle
        if not (f"{X1},{Y1}" in points and f"{X1},{Y2}" in points and f"{X2},{Y1}" in points and f"{X2},{Y2}" in points):
            return False
        # if the area and vertices match, the rectangle meets the requirements
        return True
``` 

Algorithm Visualization

This is the final solution. It checks two things:

  1. Area: Use the theoretical coordinates of the perfect rectangle to calculate its theoretical area, then compare it with the total area of all small rectangles in `rectangles`.

  2. Vertices: The `points` set should have only 4 points left, and these points must be exactly the four theoretical corners of the perfect rectangle.

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
