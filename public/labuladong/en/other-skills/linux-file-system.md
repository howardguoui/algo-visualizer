# Introduction to Linux File System

> Source: https://labuladong.online/algo/en/other-skills/linux-file-system/
> Archived: labuladong.online

---

# Introduction to Linux File System

You are probably familiar with the Linux system. In study or work, you will definitely use Linux. But when people think about Linux, the first impression may be the dark command line, messy folders, and even not knowing how to install software.

Actually, these problems often come from being used to Windows. If you use Linux more, you will find it is quite useful, and you can also customize it a lot:

![](/images/algo/linux-fs/desktop.png)

Let's get back to the topic. This article introduces the Linux file system. I will explain what these folders are used for.

![](/images/algo/linux-fs/linux-filesystem.png)

The picture above shows the overall structure of the Linux file system. No matter which version of Linux you use, the root folder `/` basically contains these files and folders. Don't worry about so many folders. Most of them do not need your attention. Just know a little about what they do.

### ¶/bin and /sbin

`bin` stands for "Binary". This folder stores executable files or links to executable files (like shortcuts). For example:

![](/images/algo/linux-fs/bin.png)

You can see common commands like `cp`, `chmod`, and `cat` here. Don't be misled by the TXT icon. Linux does not use file extensions to decide the file type. All files in `/bin` are executable binary files, not text files.

The `/sbin` folder is similar to `/bin`. `sbin` means "System Binary". It has commands that can change system settings. Normal users might use some of these commands to view system info, but if you want to make changes, you need `sudo` or switch to the superuser.

![](/images/algo/linux-fs/sbin.png)

You can see familiar commands like `ifconfig` and `iptables`. Regular users can use `ifconfig` to check network status. But to change settings, you need extra permission.

### ¶/boot

![](/images/algo/linux-fs/boot.png)

This folder has files needed to start the system. You can see the `grub` folder here. GRUB is a boot loader program. You should not change files in this folder.

### ¶/dev

`dev` means "device". This folder stores all device files. In Linux, everything is a file, including hardware.

For example, `sda` and `sdb` are two hard drives on my computer. The numbers after them are partitions:

![](/images/algo/linux-fs/dev.png)

You can also find files for mouse, keyboard, and other devices here.

### ¶/etc

This is an important folder. It holds many program configurations, like the package manager apt:

![](/images/algo/linux-fs/etc.png)

In `/etc/apt`, you can find settings like the mirror list (I have set Aliyun mirror):

![](/images/algo/linux-fs/apt.png)

If you need to change system program settings, you often need to look in the `etc` folder.

### ¶/lib

`lib` stands for "Library", similar to the library folder for `dll` files in Windows. It holds files that programs in bin and sbin need to run.

You may see folders like `lib32` or `lib64`. They are almost the same as `lib`, just different for 32-bit or 64-bit systems.

### ¶/media

Here you will see a folder named after your username. Inside, you will see devices that are automatically mounted, like USB drives, external hard drives, or network devices.

For example, if I plug in a USB drive, the system auto-mounts it to `/media/fdl` (my username is fdl). To access the USB drive, I can find it there.

### ¶/mnt

This folder is also related to device mounting. It is usually empty. The `media` folder is where the system auto-mounts devices. The `mnt` folder is where you can manually mount devices.

For example, earlier we saw many devices in the `dev` folder. If you want to look at one of them, you can mount it to the `mnt` folder using commands.

But usually, modern systems handle mounting for you. Almost all devices will be auto-mounted to the `media` folder.

### ¶/opt

`opt` stands for Option. This folder is used for optional software. Usually, the software you download from the internet and install by yourself goes here. Package managers may also store some applications here.

![](/images/algo/linux-fs/opt.png)

For example, I store Chrome browser (google), NetEase Music (netease), CLion IDE, and other software folders in `/opt`.

### ¶/proc

`proc` means `process`. This folder keeps the status information of all running programs.

![](/images/algo/linux-fs/proc.png)

You will see many folders in `/proc` named by numbers. Each number is a Process ID (PID), and inside each folder are many files.

As mentioned before, everything in Linux is a file. Like in `/dev`, the files here are not real files. They are information for communication between programs and the kernel. For example, you can check the operating system version or the CPU status:

![](/images/algo/linux-fs/cpu.png)

If you need to debug an app, information in the `proc` directory may help.

### ¶/root

This is the home directory for the root user. Normal users need permission to access it.

### ¶/run and /sys

These folders store runtime information for some programs and some needed system info. For example, the file:
    
    
    sudo vim /sys/devices/pci0000:00/0000:00:02.0/drm/card0/card0-eDP-1/intel_backlight/brightness

This file keeps a number showing your graphics card brightness. If you change this number, you change the screen brightness.

Note that data in these two folders is in memory. When you restart your system, the info in `/run` and `/sys` will be lost. So, do not store files here.

### ¶/srv

`srv` stands for `service`. It is used to store service data.

On desktop Linux, this folder is often empty. But on Linux servers, web services or FTP file services can store resources here.

### ¶/tmp

`tmp` stands for `temporary`. It is used to store temporary files for programs.

![](/images/algo/linux-fs/tmp.png)

Temporary files can sometimes be important. For example, when someone’s Word document crashes and their work is lost, many text editors in Linux put a copy of your text in `/tmp` as a temporary file. If your editor crashes, you might find a saved temporary file in `/tmp` and get your work back.

In the picture above, `VSCode Crashes` is where VSCode stores its temporary files.

The `tmp` folder will be cleared when the system restarts. If it is not cleared, it means some files failed to delete and you may need to remove them manually.

### ¶/usr

`usr` stands for Universal System Resource. This directory stores **resources that are not necessary for the system to run** , such as user-installed applications.

![](/images/algo/linux-fs/usr.png)

`/usr` and `/usr/local` contain `bin` and `sbin` directories. These also store executable files (commands), but they are different from the `bin` and `sbin` in the root directory. Here, most tools are for users, not for the system itself.

For example, in `/usr/bin`, you can find executable files for programs like the Chrome browser or Goldendict dictionary, which I installed through a package manager:

![](/images/algo/linux-fs/usrbin.png)

One more thing: If you use Linux desktop, sometimes you cannot find an app icon on the desktop right away. In that case, you can manually set up the desktop icon file in `/usr/share/applications`:

![](/images/algo/linux-fs/application.png)

### ¶/var

`var` stands for `variable`. The name comes from history, but now this directory mainly stores log information. For example, if a program crashes or there is a system error, the log is saved here.

Here is my `/var/log` directory:

![](/images/algo/linux-fs/log.png)

Log files are not deleted automatically. As you use your system more, the `var` directory will use more disk space. You might need to clean it up sometimes.

### ¶/home

Now let's talk about the `home` directory. This is the home directory for regular users. In Linux desktop systems, a user's home directory has folders like Downloads, Videos, Music, Desktop, and so on. These are easy to understand, so let's talk about some important hidden folders (in Linux, any folder name that starts with `.` is hidden).

Here are some files in my home directory:

![](/images/algo/linux-fs/home.png)

The `.cache` folder stores cache data for applications. The `.config` folder saves some configuration files of apps. For example, my Chrome browser configuration is in there. However, some apps do not use `.config`. They create their own hidden folder to store settings, like Intellij.

Last, the `.local` folder is a bit like `/usr/local`. Inside, there is a `bin` folder for executables, too. For example, my python pip and some tools installed through pip are saved in `~/.local/bin`. **But only this user can use the files here.**

This is why, sometimes, a regular user can run a command, but sudo or root cannot find it. That's because the command is in that user's home directory, added to their `PATH`. The user can run it directly. If the superuser wants to use it, they need to write the full path.

### ¶In Summary

If you want to change system settings, go to `/etc`. If you want to change user app settings, look for hidden files in the user's home directory.

When you enter a command in the terminal, its executable file is usually in one of these places:
    
    
    /bin    
    /sbin
    /usr/bin
    /usr/sbin
    /usr/local/bin
    /usr/local/sbin
    /home/USER/.local/bin
    /home/USER/.local/sbin

If you write a script or program and want to run it anywhere, you can add it to one of the folders above.

If a program crashes, you can check `/var/log` for error messages, or look for leftover temporary files in `/tmp`.

Device files are in `/dev`, but usually the system mounts things like USB drives automatically for you. You can access these devices in the `/media` folder.

Last updated: 03/14/2026, 12:17 AM

Loading comments...
