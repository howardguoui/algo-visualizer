# Essential Math Techniques

> Source: https://labuladong.online/algo/en/essential-technique/math-techniques-summary/
> Archived: labuladong.online

---

# Essential Math Techniques

## ¶Modulo Operation Tricks

You must know how to use modulo operations. The important rules are:

  * Addition: `(a + b) % k = (a % k + b % k) % k`
  * Multiplication: `(a * b) % k = (a % k) * (b % k) % k`
  * Subtraction: `(a - b) % k = (a % k - b % k + k) % k`


In the subtraction formula, the `+ k` part is to avoid negative results. For example, `(1 - 3) % 5` might be `-2` in some programming languages, but mathematically it should be positive: `(-2 + 5) % 5 = 3`.

The multiplication rule might not be so obvious, so let's prove it simply. Suppose:
    
    
    a = Ak + B; b = Ck + D

where `A, B, C, D` are any numbers. Then:
    
    
    ab = ACk^2 + ADk + BCk + BD
    ab % k = BD % k

Also,
    
    
    a % k = B; b % k = D

So,
    
    
    (a % k)(b % k) % k = BD % k = ab % k

This means our formula for modulo simplification is correct.

**In other words, taking modulo after multiplying is the same as taking modulo for each number first, then multiplying, and taking modulo again.**

The multiplication rule is very useful. When `a` and `b` are large, you can avoid overflow by using this rule. The fast exponentiation algorithm below also uses this property.

## ¶Fast Exponentiation

How to calculate ab(modk)a^b \pmod kab(modk)? If you simply multiply `a` by itself `b` times, the time complexity is O(b)O(b)O(b). When `b` is big (like 10910^9109), this is too slow.

The fast exponentiation algorithm uses the properties of powers, and does recursion based on whether the exponent is even or odd:

ab={(ab/2)2,if b is evena⋅ab−1,if b is odda^b = \begin{cases} (a^{b/2})^2, & \text{if b is even} \\\ a \cdot a^{b-1}, & \text{if b is odd} \end{cases}ab={(ab/2)2,a⋅ab−1,​if b is evenif b is odd​

Each time the size halves, so the time complexity is O(log⁡b)O(\log b)O(logb).

Example code:
    
    
    // Calculate (a ^ b) % k
    long quickPow(long a, long b, long k) {
        long res = 1;
        // Prevent a from being greater than k
        a %= k;
        while (b > 0) {
            // Check for odd number, same as b % 2 == 1
            if ((b & 1) == 1) {
                res = (res * a) % k;
            }
            a = (a * a) % k;
            // Shift right, same as divide by 2
            b >>= 1;
        }
        return res;
    }

Some programming languages (like Python's `pow` function) have fast exponentiation built-in. You can use them directly.

## ¶Greatest Common Divisor

Finding the greatest common divisor (GCD) of two numbers is a very common math problem.

The greatest common divisor is the largest positive integer that can divide both numbers. In other words, if `gcd(a, b) = d`, then:

  * `a % d == 0` and `b % d == 0` (d divides both a and b)
  * There is no number larger than `d` that fits the above


**Examples:**

  * `gcd(12, 18) = 6`

    * Divisors of 12: 1, 2, 3, 4, 6, 12
    * Divisors of 18: 1, 2, 3, 6, 9, 18
    * Common divisors: 1, 2, 3, 6, largest is 6
  * `gcd(17, 19) = 1`

    * 17 and 19 are prime, only common divisor is 1
  * `gcd(24, 36) = 12`

    * Divisors of 24: 1, 2, 3, 4, 6, 8, 12, 24
    * Divisors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36
    * Common divisors: 1, 2, 3, 4, 6, 12, largest is 12


**Euclidean Algorithm**

The most popular method is the Euclidean algorithm. The key idea:

`gcd(a, b) = gcd(b, a % b)`, repeat until `b == 0`. Then `a` is the GCD.

This works because of a math theorem: **the common divisors of`a` and `b` are the same as the common divisors of `b` and `a % b`**.

Example, find `gcd(48, 18)`:
    
    
    gcd(48, 18)
    = gcd(18, 48 % 18)
    = gcd(18, 12)
    = gcd(12, 18 % 12)
    = gcd(12, 6)
    = gcd(6, 12 % 6)
    = gcd(6, 0)
    = 6

## ¶Least Common Multiple

Find the least common multiple (LCM) of two numbers.

The least common multiple is the smallest positive integer that is a multiple of both numbers. In other words, if `lcm(a, b) = m`, then:

  * `m % a == 0` and `m % b == 0` (m is divisible by both a and b)
  * No number smaller than `m` fits the above


**Examples:**

  * `lcm(4, 6) = 12`

    * Multiples of 4: 4, 8, 12, 16, 20, 24...
    * Multiples of 6: 6, 12, 18, 24, 30...
    * Common multiples: 12, 24, 36..., smallest is 12
  * `lcm(3, 5) = 15`

    * Multiples of 3: 3, 6, 9, 12, 15, 18...
    * Multiples of 5: 5, 10, 15, 20, 25...
    * Common multiples: 15, 30, 45..., smallest is 15
  * `lcm(7, 7) = 7`

    * For two equal numbers, the LCM is the number itself


You can get the LCM from the GCD, which is very important:

lcm(a,b)=∣a⋅b∣gcd(a,b)\text{lcm}(a, b) = \frac{|a \cdot b|}{\text{gcd}(a, b)}lcm(a,b)=gcd(a,b)∣a⋅b∣​

The math behind this: **the product of two numbers equals their GCD times their LCM** , that is, `a * b = gcd(a, b) * lcm(a, b)`.

Examples:
    
    
    lcm(4, 6) = (4 * 6) / gcd(4, 6) = 24 / 2 = 12
    lcm(12, 18) = (12 * 18) / gcd(12, 18) = 216 / 6 = 36

To avoid overflow from `a * b`, usually it is written as:

lcm(a,b)=(a/gcd(a,b))∗b\text{lcm}(a, b) = (a / \text{gcd}(a, b)) * blcm(a,b)=(a/gcd(a,b))∗b

Example code:
    
    
    int lcm(int a, int b) {
        // Divide first, then multiply, to avoid overflow
        return (a / gcd(a, b)) * b;
    }

Last updated: 03/14/2026, 12:17 AM

Loading comments...
