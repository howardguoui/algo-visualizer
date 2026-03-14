# Read from the file file.txt and output all valid phone numbers to stdout.
# Problem: https://leetcode.com/problems/valid-phone-numbers
# Difficulty: Easy
# Language: Bash
# Accepted date: 2017-03-23
#
grep -e "^[0-9]\{3\}-[0-9]\{3\}-[0-9]\{4\}$" -e "^([0-9]\{3\}) [0-9]\{3\}-[0-9]\{4\}$" file.txt