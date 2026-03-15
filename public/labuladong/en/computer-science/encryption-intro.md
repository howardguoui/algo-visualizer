# Introduction to Modern Encryption

> Source: https://labuladong.online/algo/en/computer-science/encryption-intro/
> Archived: labuladong.online

---

# Introduction to Modern Encryption

Modern encryption technology is the foundation of information security. There are three main technologies: **hash functions** , **symmetric encryption** , and **asymmetric encryption**.

This article uses the `openssl` command to show how these three technologies work and where to use them. You will get a full picture of modern encryption.

## ¶Symmetric Encryption

Symmetric encryption is easy to understand. **The same key is used to encrypt and decrypt data.**

The oldest symmetric encryption algorithm is the Caesar Cipher:

We use English letters, but move each letter three positions forward. This way, the message becomes hidden.

For example, encrypting `hello` with this method gives `khoor`. Here, `hello` is the plain text, `khoor` is the encrypted text, and the key is `3`.

The Caesar cipher is easy to break. Today, there are much safer symmetric algorithms like AES and DES. They are more complex, but still require both sides to share the same key.

We can quickly try AES encryption with `openssl`:
    
    
    # Create a test file
    echo "This is a secret message" > secret.txt
    
    # Encrypt with AES-256-CBC, password is mypassword
    openssl enc -aes-256-cbc -salt -in secret.txt -out secret.enc -k mypassword
    
    # Decrypt the file
    openssl enc -aes-256-cbc -d -in secret.enc -out decrypted.txt -k mypassword
    
    # View the decrypted content
    cat decrypted.txt

  * `enc -aes-256-cbc`: Use AES-256-CBC encryption.
  * `-salt`: Add random salt for better security.
  * `-k mypassword`: The password used for encryption is `mypassword`.
  * `-d`: This option triggers decryption.


What is a Salt?

A **salt** is a random string mixed with the password before encryption.

Why do we need a salt? If you encrypt the same file `secret.txt` with the same password `mypassword` twice, without a salt, the result will be the same both times. Hackers can use this to launch **rainbow table attacks** (pre-compute many encrypted passwords and compare).

With a salt, even if the password and plain text are the same, the encrypted result is different every time. This makes attacks much harder.

`openssl` stores the salt at the start of the encrypted file (usually the first 8 bytes). When decrypting, `openssl` reads the salt automatically, so the user does not need to save it separately.

You can try to remove the `-salt` option and encrypt the same file several times. The encrypted files will be the same. Add `-salt`, and they will be different every time.

The same password `mypassword` is used to encrypt and decrypt. This is the core of symmetric encryption.

Advantages of symmetric encryption:

  * **Fast** : Symmetric encryption is very quick, good for encrypting a lot of data.
  * **Simple** : It is easier to implement than other methods.


Examples where symmetric encryption is used: local disk encryption, file encryption, etc.

Disadvantages of symmetric encryption:

  * **Key distribution problem** : This is the biggest problem. Both sides must share the same key, but if the channel is not safe, you cannot send the key securely. If an attacker gets both the key and the message, the encryption becomes useless.
  * **Key management is hard** : If NNN people all want to talk privately, you need to manage N×(N−1)/2N \times (N-1)/2N×(N−1)/2 different keys. This is a big management problem.


The key distribution problem led to asymmetric encryption. But before introducing that, let's first look at another important tool: the hash function.

## ¶Hash and Data Fingerprints

Hash functions are not encryption algorithms, but they are important tools in cryptography, especially in digital signatures.

A **hash function** can turn any length of data into a fixed-length string. This string is the data’s **fingerprint** (also called a hash value).

Hash functions have several important features:

  1. **One-way** : You can easily calculate the hash value from the data, but you cannot get the original data from the hash value.
  2. **Fixed length** : No matter how big the original data is, the hash value is always the same length. For example, the SHA256 algorithm gives a hash value that is always 256 bits (64 hexadecimal characters).
  3. **Avalanche effect** : If you even change just one byte of the original data, the hash value will be totally different.
  4. **Uniqueness** : Different data almost never produces the same hash value (there is a very small chance of a [hash collision](/en/algo/data-structure-basic/hashmap-basic/), but it’s very rare).


We can use `openssl` to calculate the SHA256 hash value of a file:
    
    
    # Create a test file
    echo 'Hello World' > test.txt
    
    # Calculate SHA256 hash value
    openssl dgst -sha256 test.txt

The output is:
    
    
    SHA256(test.txt)= d2a84f4b8b650937ec8f73cd8be2c74add5a911ba64df27458ed8229da804a26

This 64-character hexadecimal string is the SHA256 fingerprint of `test.txt`. If you change the file, even just one letter:
    
    
    echo 'Hello World!' > test.txt
    openssl dgst -sha256 test.txt

You will see the hash value is totally different:
    
    
    SHA256(test.txt)= 03ba204e50d126e4674c005e04d82e84c21366780af1f43bd54a37816b6ab340

Hash functions are used in many ways in cryptography and software engineering:

  * **Data integrity check** : When you download software, the website shows the SHA256 hash value. After downloading, you can compare the hash value to make sure the file was not changed.
  * **Digital signatures** : When signing a large file, usually you first calculate the hash value and sign the hash value. This is much faster (we will explain more later).
  * **Password storage** : Back-end databases usually do not store passwords directly. They store the hash values of passwords. This way, you can compare the hash values to check if a password is correct. If the database is leaked, attackers cannot get the original passwords easily.
  * **Version control** : Git uses the SHA-1 hash value as the commit ID. This ensures the integrity of the code history.
  * **Data deduplication** : By comparing hash values, you can quickly check if files are the same.


Note: **Hash functions can only be used for fingerprints. They cannot encrypt data and cannot stop data tampering.**

For example, if you send someone a file and its hash value, an attacker can change both the file and the hash value, and the receiver will not notice.

To solve this, you need to use digital signatures with public-key cryptography.

## ¶Asymmetric Encryption

**Asymmetric encryption means that the keys for encryption and decryption are different.**

Let's use a real-life example:

Symmetric encryption is like a safe with a combination lock. The lock and the combination are tied together. If the sender sends a locked safe, they also need to send the combination. If the channel is not secure, the safe is not safe at all.

Asymmetric encryption uses a lock and a key instead. The lock (for encryption) and the key (for decryption) are separate. The receiver first makes a lock and its matching key. The receiver sends the lock to the sender. The sender locks the safe with it and sends the safe back.

Because the key always stays with the receiver, nobody else can open the safe and steal the information.

An asymmetric algorithm creates a key pair: a **public key** and a **private key**.

You can share the public key anywhere, but you must keep the private key safe. Anyone can use the public key to encrypt data, but only someone with the private key can decrypt it.

**Besides encryption, asymmetric keys have another important use: digital signatures.** The private key can make a signature for data, and the public key can verify the signature.

For example, if someone wants to publish a statement, they can use their private key to sign the statement. They then publish both the statement and the signature. Others use the public key to check the signature to make sure it really came from them.

If this still sounds a bit abstract, let's try it out.

### ¶Generating Key Pair with `openssl`

We will use the `openssl` command to create the key pair. Most modern operating systems have this tool installed.

First, generate a unique private key. The public key is then extracted from the private key.
    
    
    # Generate the private key
    openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

  * `genpkey`: Command to generate key.
  * `-algorithm RSA`: Use the RSA algorithm, the most classic asymmetric algorithm.
  * `-out private_key.pem`: Save the private key to the file `private_key.pem`.
  * `-pkeyopt rsa_keygen_bits:2048`: Set key length to 2048 bits, which is currently recommended.


After running the command, you will see a new file `private_key.pem` in the current folder. This is your **private key**. Keep it secret!

Next, create the public key from the private key:
    
    
    # Generate the public key
    openssl rsa -pubout -in private_key.pem -out public_key.pem

  * `rsa`: Command for processing RSA keys.
  * `-pubout`: Output the public key.
  * `-in private_key.pem`: The input private key file.
  * `-out public_key.pem`: Save the public key to the file `public_key.pem`.


Now you have a `public_key.pem` file. This is your **public key**. You can give this to anyone.

Note

You may wonder: Why do we create the private key first and then get the public key from it? Shouldn't both be made at the same time?

Actually, asymmetric encryption algorithms use big numbers. For example, with RSA, the private key has two large prime numbers and a private exponent.

The public key is made by taking some numbers from the private key, doing some math, and making a few new numbers. These public numbers can't be used to figure out the private key.

So the public key is calculated from the private key.

### ¶Scenario 1: Encryption and Decryption

Suppose someone wants to send you a secret message:
    
    
    echo "My name is Bob." > message.txt

They can use your public key to encrypt the message:
    
    
    # Encrypt with public key
    openssl pkeyutl -encrypt -pubin -inkey public_key.pem -in message.txt -out encrypted_message.bin

  * `-encrypt`: Perform encryption.
  * `-pubin -inkey public_key.pem`: Use the public key (`public_key.pem`) for encryption.
  * `-in message.txt`: Encrypt the file `message.txt`.
  * `-out encrypted_message.bin`: Save the encrypted result to `encrypted_message.bin`.


Now there is a new file called `encrypted_message.bin` in the folder. Its content is unreadable, which means the message is now encrypted.

You can use your private key to decrypt the message:
    
    
    # Decrypt with private key
    openssl pkeyutl -decrypt -inkey private_key.pem -in encrypted_message.bin -out decrypted_message.txt

  * `-decrypt`: Perform decryption.
  * `-inkey private_key.pem`: Use your private key (`private_key.pem`) for decryption.
  * `-in encrypted_message.bin`: The file to decrypt.
  * `-out decrypted_message.txt`: Save the decrypted text to `decrypted_message.txt`.


Check the decrypted content:
    
    
    cat decrypted_message.txt

You will see that the original message `My name is Bob.` has been perfectly restored!

### ¶Scenario 2: Signing and Verifying

Suppose you want to publish a public statement, like a contract:
    
    
    echo "I agree." > contract.txt

To prove that the contract is really from you, you can use your private key to sign it.
    
    
    # Sign with private key
    openssl dgst -sha256 -sign private_key.pem -out signature.bin contract.txt

  * `dgst -sha256`: First calculate a fingerprint (hash) of the file with SHA256, then sign the fingerprint.
  * `-sign private_key.pem`: Use your private key (`private_key.pem`) for signing.
  * `-out signature.bin`: Save the signature into `signature.bin`.
  * `contract.txt`: The file to sign.


Note

In real practice, we usually do not sign the original data directly. Instead, we first use SHA256 to get a hash, then sign the hash. This is faster (the hash has a fixed size, so signing is quick), and it also makes sure the data has not been changed (the hash value represents the original data).

Next, you can publish both `contract.txt` (the document) and `signature.bin` (the signature) together. Anyone with your public key (`public_key.pem`) can check if the statement is real:
    
    
    # Verify signature with public key
    openssl dgst -sha256 -verify public_key.pem -signature signature.bin contract.txt

  * `-verify public_key.pem`: Use your public key (`public_key.pem`) for verification.
  * `-signature signature.bin`: The signature file to verify.
  * `contract.txt`: The file to check.


If the check succeeds, the terminal will show:
    
    
    Verified OK

Verification success means:

  * **Authenticity** : The signature was created by the private key matching the public key.
  * **Integrity** : The file `contract.txt` is exactly the same as when it was signed. Nothing has changed.


If you try to change `contract.txt` or use a different private key to create `signature.bin`, and run the verify command again, you will see a failure message:
    
    
    Verification Failure

## ¶Summary

Now we know three main cryptography techniques. Here is a simple comparison:

Technique| Key Features| Main Usage| Speed| Common Algorithms  
---|---|---|---|---  
**Symmetric Encryption**|  Same key for encryption and decryption| Encrypting large amounts of data| Fast| AES, DES  
**Hash Functions**|  No key, one-way calculation| Data integrity check, password storage| Very Fast| SHA256, MD5  
**Asymmetric Encryption**|  Public key for encryption, private key for decryption; Private key for signing, public key for verifying| Key exchange, digital signature| Slow| RSA, ECC  
  
Next, we will look at some common authentication methods based on these cryptography algorithms.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
