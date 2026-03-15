# Pitfalls of Linux Pipeline

> Source: https://labuladong.online/algo/en/other-skills/linux-pipeline/
> Archived: labuladong.online

---

# Pitfalls of Linux Pipeline

I like Linux a lot, especially some of its designs are very elegant. For example, it can break a complex problem into several small ones, then use pipes and redirection to combine simple tools. Writing shell scripts in this way is very efficient.

In this article, I will share some pitfalls I met when using redirection and pipes in practice. After you understand the low-level ideas, you can write scripts more efficiently.

### ¶Pitfalls of > and >> redirection

Look at this command first. What will happen?
    
    
    $ cat file.txt > file.txt

We read and write the same file. It feels like nothing should happen, right?

**In fact, this command will clear all content in`file.txt`.**

Note

Some Linux distributions may report an error directly. You can run `cat < file.txt > file.txt` to bypass this check.

A program itself does not need to care where its stdin/stdout point to. The shell changes stdin/stdout using pipes and redirection.

So when you run `cat file.txt > file.txt`, the shell will first open `file.txt`. Because the redirection is `>`, the file content will be cleared. Then the shell sets the stdout of `cat` to `file.txt`. Only after this, the `cat` command starts to run.

The steps are:

  1. Shell opens `file.txt` and clears its content.
  2. Shell sets the stdout of `cat` to `file.txt`.
  3. Shell runs `cat`, which reads an empty file.
  4. `cat` writes an empty string to stdout (which is `file.txt`).


So in the end, `file.txt` becomes an empty file.

We know `>` clears the target file, and `>>` appends to the end of the file. **What if we change`>` to `>>`?**
    
    
    # The file has only one line
    $ echo hello world > file.txt
    # This command will loop forever
    $ cat file.txt >> file.txt

At the start, `file.txt` has one line. After `cat file.txt >> file.txt`, we might expect two lines.

But this is not the result. The command will loop forever. It will keep writing `hello world` into `file.txt`. The file becomes huge very quickly. You can only stop it with Control+C.

Why does this happen? Think about how `cat` works.

If you just run `cat` with no arguments, it reads from the keyboard on stdin. Each time you press Enter, `cat` prints that line back. So `cat` reads line by line and outputs line by line.

Now, the steps of `cat file.txt >> file.txt` are:

  1. Open `file.txt` for appending.
  2. Set stdout of `cat` to `file.txt`.
  3. `cat` reads one line from `file.txt` and writes it to stdout (append to `file.txt`).
  4. Because a new line was just written, `cat` finds that there is still more content to read in `file.txt`, so it repeats step 3.


**This is like iterating over a list while also appending to the same list at the same time. You will never finish the iteration, so you get an infinite loop.**

### ¶> redirection with | pipe

We often have this need: keep only the first N lines of a file, and delete the rest.

In Linux, the `head` command can take the first several lines of a file:
    
    
    # file.txt has five lines
    $ cat file.txt
    1
    2
    3
    4
    5
    # head reads the first two lines
    $ head -n 2 file.txt
    1
    2
    # head can also read from stdin
    $ cat file.txt | head -n 2
    1
    2

If we want to keep the first 2 lines in the file and delete the rest, we might write:
    
    
    $ head -n 2 file.txt > file.txt

But this repeats the mistake we discussed before. `file.txt` will be cleared, and our goal will fail.

What about this command?
    
    
    $ cat file.txt | head -n 2 > file.txt

**This also does not work, because commands connected by a pipe run in parallel.**

The pipe works by connecting stdin/stdout of two commands. It lets the stdout of the first command become the stdin of the next command.

If you think this command should work, you may think that commands in a pipeline run one after another in sequence. This is a common misunderstanding.

You might think the shell will first run `cat file.txt`, which reads all content from `file.txt`, then sends that content through the pipe to `head -n 2 > file.txt`.

In this view, even though `file.txt` is cleared at some point, `head` does not read from the file but from the pipe, so it should still write two lines to `file.txt`.

But this is wrong. The shell runs the commands in the pipe at the same time. For example:
    
    
    $ sleep 5 | sleep 5

The shell starts two `sleep` processes at once. So the total time is 5 seconds, not 10.

This feels a bit strange. Look at this common command:
    
    
    $ cat filename | grep 'pattern'

Your intuition may say: first `cat` reads all of `filename`, then passes it to `grep`.

But in fact `cat` and `grep` run at the same time. We still get the right result because `grep 'pattern'` waits on stdin, while `cat` writes data to the pipe, which is connected to `grep`’s stdin.

You can feel this clearly with this command. `grep` processes what you type in real time:
    
    
    $ cat | grep 'pattern'

Back to our problem:
    
    
    $ cat file.txt | head -n 2 > file.txt

**`cat` and `head` run in parallel. Which one runs first is not fixed, so the result is not fixed.**

If `head` runs first, it will clear `file.txt`. Then `cat` cannot read any content.  
If `cat` manages to read all content before `head` clears the file, then the result is what we want.

In my tests (repeating this concurrent case 10,000 times), the error case (file cleared) happens much more often than the correct case. I am not yet sure why, but it should be related to how the Linux kernel schedules processes and pipes.

### ¶Solutions

We now know how pipes and redirection behave. How can we avoid clearing a file by mistake?

**The safest way is: do not read and write the same file at the same time. Use a temp file as a buffer.**

For example, to keep only the first 2 lines of `file.txt`, you can write:
    
    
    # Write to a temp file first, then overwrite the original file
    $ cat file.txt | head -n 2 > temp.txt && mv temp.txt file.txt

**This is the simplest, safest, and most reliable method.**

If you feel this command is too long, you can install the `moreutils` package via `apt/brew/yum`, and you will get a tool named `sponge`:
    
    
    # Send data to sponge first, then sponge writes to the original file
    $ cat file.txt | head -n 2 | sponge file.txt

`sponge` is like a “sponge”: it first “soaks up” all input, then writes it to `file.txt`. The core idea is similar to using a temp file. This “sponge” behaves like a temp file and helps you avoid reading and writing the same file at the same time.

These are some common pitfalls of redirection and pipes. I hope they are useful to you.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
