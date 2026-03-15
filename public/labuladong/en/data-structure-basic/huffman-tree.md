# Data Compression and Huffman Tree

> Source: https://labuladong.online/algo/en/data-structure-basic/huffman-tree/
> Archived: labuladong.online

---

# Data Compression and Huffman Tree

Prerequisite

Before reading this article, you should first learn:

  * [Basics of Binary Trees and Common Types](/en/algo/data-structure-basic/binary-tree-basic/)


In One Sentence

The Huffman tree is a classic application of binary trees. It is an optimal prefix coding tree, often used in data compression.

This article will introduce the idea behind Huffman coding, and compare it with several common data compression methods.

The actual code will be shown in the data structure design chapter, where you will build a compression program based on Huffman coding.

## ¶A Brief Look at Data Compression

We can divide data compression algorithms into two big categories: **lossless compression** and **lossy compression**.

**Lossless compression** means the data can be fully restored after decompression, with no information lost.

For example, when we pack several files into a zip archive, the zip file takes less disk space, and after unpacking we get back the original files exactly. This is lossless compression.

**Lossy compression** means some information is lost after compression, but the compression ratio is higher (the compressed data takes less space).

For example, we often need to compress images. Some image tools can greatly reduce file size without visibly hurting image quality. This is lossy compression.

Now think about a few questions:

  1. How can lossy compression drop information but still keep the image quality acceptable?

  2. For lossy compression, it is clear that we trade some information for less space. But how does lossless compression reduce size without losing any information?


First, lossy compression does reduce quality. It is just that the loss is still within the range that humans can accept.

Take image compression as an example. The human eye is more sensitive to “brightness” than to “color”. So we can use lower-precision data types to store “color”. Even if we lose some color information, the difference is almost invisible.

But lossless compression cannot do this, because it must be able to fully restore the original data. So **the essence of lossless compression is encoding and decoding**.

For example, consider the string `hahahahahahaha`. We can encode it as `ha*7`. To decode, we simply repeat `ha` 7 times to get back the original string.

**The effect of lossless compression depends on how well the algorithm can find redundant information in the original data.**

The more general a compression algorithm is, the less redundancy it can find, so the compression ratio is lower. The more specialized an algorithm is, the more redundancy it can find, so the compression ratio is higher.

For example, an audio file contains waveform information. A professional audio compression algorithm can find redundancy in the waveform and compress it well. But a general zip algorithm only sees the audio file as a stream of bytes, and cannot make use of the waveform structure, so the result is worse.

So there is no “perfect” compression algorithm. We must balance generality, compression ratio, and performance.

The Huffman coding explained in this article is a general lossless compression algorithm. When we give the original data to the Huffman algorithm, we get compressed data plus a code table. During decoding, we use the code table to restore the original data.

## ¶Fixed-Length Encoding vs Variable-Length Encoding

Since we are talking about encoding and decoding, we must talk about fixed-length encoding and variable-length encoding.

ASCII is a fixed-length encoding. It encodes each character into an 8-bit binary number, that is, 1 byte.

UTF-8 is a variable-length encoding. It encodes each character into 1 to 4 bytes.

**The biggest advantage of fixed-length encoding is that it supports random access.** Because each character has the same length, we can easily compute the position of a character by index.

**The advantage of variable-length encoding is higher storage efficiency.** For example, UTF-8 is variable-length: it uses 1 byte for English characters, and 3 bytes for Chinese characters. It is more general and more space-efficient than ASCII. But because the length of each character is not fixed, we cannot do random access by index directly.

Now think about this: modern editors mostly use UTF-8, and random access on strings is a basic feature of editors. If every access required a linear scan, performance would be terrible. How do editors solve this?

Back to compression. Suppose we have the string `aaabacc` with 7 lowercase letters. Using ASCII needs 7x8 = 56 bits. How can we compress it further?

Here we only have three characters: `a, b, c`. So we do not need 8 bits for each character. 2 bits are enough.

For example:

  * `a` → `00`
  * `b` → `01`
  * `c` → `10`


Then `aaabacc` is encoded as `00000001001010`, with length 14 bits.

This is called **fixed-length encoding** , because each character uses 2 bits.

The benefit of fixed-length encoding is simplicity: as long as we know all possible characters, we can assign codes. But the compression effect is not very good, because it does not use the frequency of characters.

Again, take `aaabacc`. Since `a` appears more often than `b` and `c`, can we use a shorter code for `a` and longer codes for `b` and `c`?

Yes, this is **variable-length encoding**. For example:

  * `a` → `0`
  * `b` → `10`
  * `c` → `11`


Then `aaabacc` is encoded as `0001001111`, length 10 bits, which is better than the fixed-length encoding.

## ¶The Difficulties of Variable-Length Encoding

Two Main Difficulties

  1. How to design the encoding so that decoding is always unique?

  2. How to keep the compression rate high (make the encoded data as short as possible)?

  3. How to make decoding efficient?


Let's look closely at the example `aaabacc` above.

This encoding scheme has no ambiguity:

  * `a` is encoded as `0`
  * `b` is encoded as `10`
  * `c` is encoded as `11`


But if you encode `a` as `1`, then there is ambiguity between the codes for `a` and `c`:

  * `a` is encoded as `1`
  * `b` is encoded as `10`
  * `c` is encoded as `11`


The string `aaabacc` would be encoded as binary `11111011111`, but now the codes for `a` and `c` are confusing. `11` could be decoded as `c` or as `aa`. So you cannot decode the original data correctly.

By comparing these two examples, you can see a rule: **No code should be a prefix of another code**.

For example, in the second case, `a` is `1`, but both `b` and `c` start with `1`, so the code has ambiguity.

Some readers might say, what about this encoding scheme:

  * `a` is encoded as `1`
  * `b` is encoded as `10`
  * `c` is encoded as `100`


Although the codes have the same prefix, you could add extra logic when decoding:

When you read a `1`, you look ahead two more bits to see if you can match `10` or `100`. Then you decide how to decode.

This can make decoding unique, **but the compression rate is low, and decoding is slow**. The look-ahead logic acts like a nested for loop:
    
    
    for (int i = 0; i < N; i++) {
        for (int j = 1; j <= K; j++) {
            ...
        }
    }

Suppose the longest code length is KKK, and the total encoded data length is NNN, then the decoding time complexity is O(NK)O(NK)O(NK).

If you make sure that no code is a prefix of another, you don't need to look ahead. Then, decoding time drops to O(N)O(N)O(N).

In real encoding and decoding, NNN is usually large. Even if KKK is small, decoding several times slower is still a big problem. So we want our algorithm's time complexity to be O(N)O(N)O(N), and the compression rate to be as high as possible.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
