# TLS Key Exchange

> Source: https://labuladong.online/algo/en/computer-science/tls-key-exchange/
> Archived: labuladong.online

---

# TLS Key Exchange

Prerequisite

Before reading this article, you need to read:

  * [Deep Dive into Digital Certificates and CAs](</en/algo/computer-science/certificate-and-ca/>)

In the article [Deep Dive into Digital Certificates and CAs](</en/algo/computer-science/certificate-and-ca/>), we learned how HTTPS uses digital certificates to verify the identity of the server and prevent man-in-the-middle attacks.

The article said that after the browser verifies the server using the certificate chain, it can start encrypted communication. But how does the encryption work?

You might think: Since you already have the server's public key, why not use it to encrypt the data directly?

Actually, using asymmetric encryption to encrypt and decrypt large amounts of data is quite slow. So, the early versions of TLS (TLS 1.0/1.1/1.2) use a simple key exchange method: **RSA key exchange**.

The process is simple. Use asymmetric keys to encrypt a symmetric session key, then use this session key for communication:

  1. After the browser verifies the server’s certificate, it gets the server’s RSA public key from the certificate.
  2. The browser generates a random key called the "pre-master secret".
  3. The browser encrypts this pre-master secret with the server’s public key.
  4. It sends it to the server. Only the server can decrypt it with its private key. Both sides handle this pre-master secret to work out a shared session key.
  5. All later communication uses this session key to encrypt data (symmetric encryption, which is fast).

This method is simple and direct. The public key in the certificate is used both to verify identity and to encrypt the pre-master secret. But the RSA key exchange has a big security problem: **No Forward Secrecy**.

Imagine this:

**Year 2024** : A hacker records your encrypted traffic with a bank server, including:

  * the pre-master secret sent by your browser
  * all encrypted communication data

**Year 2026** : The bank’s private key is leaked. The hacker can then:

  * Use the leaked key to decrypt the pre-master secret from 2024
  * Derive the session key from back then
  * Decrypt all the old encrypted traffic

**If the server’s private key is leaked, all past communication using RSA key exchange can be cracked.** This is a serious security risk for things that need to stay secret for a long time (like medical records or financial transactions).

So, modern TLS no longer uses RSA key exchange, and uses **Diffie-Hellman key exchange** instead.

## Diffie-Hellman Key Exchange Algorithm

**Diffie-Hellman (DH) key exchange** is a clever algorithm that lets two sides create a shared secret over an unsafe network. Even if a hacker listens to the whole process, they still can’t figure out the secret.

It’s like you and I are sharing some numbers in front of everyone, and in the end, only the two of us know the secret, but nobody else can know it.

It sounds magical, but the idea is actually not hard to understand.

### Real-life Analogy

Before talking about the math, let’s use a simple story to understand the main idea of the DH algorithm.

Suppose Alice and Bob want to agree on a secret color in public, but a hacker (Eve) is listening.

```
Initial state:
├─ Yellow is the public base color. Eve knows it.
├─ Alice has a secret color: red. Eve does not know it.
└─ Bob has a secret color: blue. Eve does not know it.

Step 1: Alice mixes colors
├─ Alice mixes yellow + red → gets orange
└─ Alice sends orange to Bob in public (Eve can see orange)

Step 2: Bob mixes colors
├─ Bob mixes yellow + blue → gets green
└─ Bob sends green to Alice in public (Eve can see green)

Step 3: Second mixing
├─ Alice receives green, adds her own red 
|     green + red = yellow + blue + red = brown
└─ Bob receives orange, adds his own blue
      orange + blue = yellow + red + blue = brown

Result:
├─ Alice and Bob both get brown (the shared secret)
└─ Eve sees: yellow, orange, green, but cannot get brown
    └─ Because Eve does not know Alice’s red or Bob’s blue
``` 

The key idea here is: **Color mixing cannot be reversed**. Eve sees orange but cannot figure out which color was mixed with yellow.

This is the core idea of the DH algorithm: use a “one-way function” in math, so eavesdroppers cannot figure out the secret.

### The Math Behind DH Algorithm

In real DH algorithm, we don’t mix colors. Instead, we use **modular exponentiation**.

This has a feature: computing is easy, but going backward (discrete logarithm) is very hard:

  * Given ggg, xxx, ppp, finding y=gx mod py = g^x \bmod py=gxmodp is easy.
  * Given ggg, ppp, and yyy, finding xxx is nearly impossible when ppp is large.

This hard problem is called the **discrete logarithm problem**. It is very important in modern cryptography.

### The Full DH Process

Let’s look at the full DH process with a flowchart and a small example.

#### Step 1: Agree on Public Numbers

Both parties agree on two public numbers (Eve can see them):

  * p=23p = 23p=23 (a prime number, used as modulus)
  * g=5g = 5g=5 (used as a generator)

In real use, ppp is a very large prime (over 2048 bits). Here we use small numbers for the example.

#### Step 2: Generate Private Keys

Alice’s private key: a=6a = 6a=6 (randomly chosen, kept secret)

Bob’s private key: b=15b = 15b=15 (randomly chosen, kept secret)

Private keys are kept locally and never sent.

Note

The “private key” in this article is not the "RSA private key" in [asymmetric encryption](</en/algo/computer-science/encryption-intro/>), but just a random secret number picked by each side.

#### Step 3: Compute and Exchange Public Keys

Alice computes her public key:

A=ga mod p=56 mod 23=15625 mod 23=8A = g^a \bmod p = 5^6 \bmod 23 = 15625 \bmod 23 = 8A=gamodp=56mod23=15625mod23=8

Bob computes his public key:

B=gb mod p=515 mod 23=30517578125 mod 23=19B = g^b \bmod p = 5^{15} \bmod 23 = 30517578125 \bmod 23 = 19B=gbmodp=515mod23=30517578125mod23=19

Then:

  * Alice sends A=8A=8A=8 to Bob (Eve can see it)
  * Bob sends B=19B=19B=19 to Alice (Eve can see it)

#### Step 4: Compute the Shared Secret

Alice gets Bob’s public key B=19B=19B=19, then computes:

s=Ba mod p=196 mod 23=47045881 mod 23=2s = B^a \bmod p = 19^6 \bmod 23 = 47045881 \bmod 23 = 2s=Bamodp=196mod23=47045881mod23=2

Bob gets Alice’s public key A=8A=8A=8, then computes:

s=Ab mod p=815 mod 23=35184372088832 mod 23=2s = A^b \bmod p = 8^{15} \bmod 23 = 35184372088832 \bmod 23 = 2s=Abmodp=815mod23=35184372088832mod23=2

Magically, **both Alice and Bob get the same secret s=2s=2s=2**!

#### Why Are the Results the Same?

Math can prove:

Alice’s calculation:

Ba mod p=(gb)a mod p=g(b⋅a) mod pB^a \bmod p = (g^b)^a \bmod p = g^{(b \cdot a)} \bmod pBamodp=(gb)amodp=g(b⋅a)modp

Bob’s calculation:

Ab mod p=(ga)b mod p=g(a⋅b) mod pA^b \bmod p = (g^a)^b \bmod p = g^{(a \cdot b)} \bmod pAbmodp=(ga)bmodp=g(a⋅b)modp

Because a⋅b=b⋅aa \cdot b = b \cdot aa⋅b=b⋅a, the results are the same.

This is the “math magic” of the DH algorithm.

**Public parameters** : p=23p=23p=23, g=5g=5g=5 (known by Eve)

BobEve (listening)AliceBobEve (listening)AliceGenerate private key a=6Generate private key b=15Calculate public keyA = 5^6 mod 23 = 8Calculate public keyB = 5^15 mod 23 = 19Listens to A=8Listens to B=19Calculate shared keys = 19^6 mod 23 = 2Calculate shared keys = 8^15 mod 23 = 2Cannot calculate s!Shared key s=2Shared key s=2Send A=8Send B=19

#### Eve's Problem

What Eve can see:

  * p=23p = 23p=23
  * g=5g = 5g=5
  * A=8A = 8A=8
  * B=19B = 19B=19

Eve wants to compute the shared key sss, but needs to know aaa or bbb.

To find aaa from A=8A=8A=8, she needs to solve: 5a mod 23=85^a \bmod 23 = 85amod23=8, find aaa.

This is the discrete logarithm problem. When ppp is very large (in real life, ppp is 2048 bits or longer), the computation is almost impossible. Even a supercomputer would need millions of years.

## Why Hackers Cannot Break DH Algorithm

### Discrete Logarithm Problem

Earlier we said, it is extremely hard to find xxx from the result of gx mod pg^x \bmod pgxmodp.

So far, no efficient algorithm is known to solve the discrete logarithm problem of large numbers in a reasonable time using classical computers.

This math problem has been tested by decades of cryptography research. For a 2048-bit ppp, even with a supercomputer, it would take millions of years to crack.

### Temporary Keys

More importantly: each TLS connection uses new temporary private keys. This ensures forward secrecy.

Imagine you visit a bank website in 2024:

**Connection in 2024** :

  * Browser temporary private key a1a_1a1​ (deleted from memory after connection)
  * Server temporary private key b1b_1b1​ (deleted from memory after connection)
  * Shared key s1s_1s1​ (used for encrypted communication, deleted after connection)

Now, imagine a hacker records the entire communication, and in 2026, the server’s certificate private key is leaked:

**What the hacker has** :

  * Server certificate private key (leaked in 2026)
  * Public parameters from 2024 (ppp, ggg)
  * Public keys from 2024 (A1A_1A1​, B1B_1B1​)
  * Encrypted communication data from 2024

**What the hacker cannot get** :

  * Temporary private key a1a_1a1​ (already deleted, can't recover)
  * Temporary private key b1b_1b1​ (already deleted, can't recover)
  * Shared key s1s_1s1​ (cannot compute without a1a_1a1​ or b1b_1b1​)

Here, **the server's private key is only used to verify the certificate, not for encryption** , so even if the certificate is leaked, past communications cannot be decrypted.

## ECDHE Key Exchange Algorithm

In practice, TLS does not use traditional DH directly. It uses its elliptic curve version: **ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)**.

The traditional DH algorithm is based on modular exponentiation gx mod pg^x \bmod pgxmodp, where xxx is the temporary private key.

The elliptic curve version is based on elliptic curve point multiplication x⋅Gx \cdot Gx⋅G, where xxx is the private key and GGG is a known point on the elliptic curve (public parameter).

The key idea is the same: easy to compute forward, very hard to reverse. Elliptic curves provide shorter keys (256-bit curve ≈ 3072-bit RSA**) and faster calculations, which is good for mobile devices.

## Summary

  * **RSA key exchange** : Uses the certificate’s public key to encrypt the pre-master key. Simple, but lacks forward secrecy. Deprecated in TLS 1.3.
  * **Diffie-Hellman algorithm** : Uses the discrete logarithm problem. Both sides agree on a shared key in an unsafe channel. Eavesdroppers cannot break it.
  * **ECDHE** : Elliptic curve version of DH. Uses temporary key pairs for each connection and destroys them after use, so forward secrecy is achieved.
  * **Role of certificates** : In ECDHE, certificates are only for signing and verifying identity. They are not used in key exchange. So, if a certificate is leaked, past communications remain safe.

The complete modern HTTPS process: Verify server certificate (to prevent man-in-the-middle attacks) → Use ECDHE to agree on a temporary session key (forward secrecy) → Use session key for encrypted communication (good security and performance).

Last updated: 03/13/2026, 12:17 PM

## Comments

Please login to view/post comments
