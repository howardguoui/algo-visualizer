# Bucket Sort

> Source: https://labuladong.online/algo/en/data-structure-basic/bucket-sort/
> Archived: labuladong.online

---

# Bucket Sort

Prerequisites

Before reading this article, you should first learn:

  * [Counting Sort](/en/algo/data-structure-basic/counting-sort/)


One Sentence Summary

The core idea of the bucket sort algorithm has three steps:

  1. Use a mapping function to assign each element in the array to different "buckets".
  2. Sort the elements in each bucket.
  3. Merge all the sorted buckets to get the final sorted result.


Open the visualization panel below. Click the line `buckets[index].push(num)` several times to see how elements are assigned to different buckets. Click `insertSort(curBucket)` several times to see each bucket being sorted. Click `nums[index++] = num` several times to see the process of merging the sorted buckets.

Algorithm Visualization

Bucket sort may not be a very common algorithm, but I personally think its idea is interesting. In this algorithm, you can see the shadows of both [Merge Sort](/en/algo/data-structure-basic/merge-sort/) and [Counting Sort](/en/algo/data-structure-basic/counting-sort/).

If you have learned all previous algorithms in order, you can feel how all these algorithms are connected. Many computer scientists have worked on the "sorting" problem, showing many clever solutions. As learners, why not appreciate these beautiful ideas?

Last updated: 03/14/2026, 12:17 AM

Loading comments...
