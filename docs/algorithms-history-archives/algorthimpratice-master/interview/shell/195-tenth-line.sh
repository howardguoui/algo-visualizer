# Read from the file file.txt and output the tenth line to stdout.
# Problem: https://leetcode.com/problems/tenth-line
# Difficulty: Easy
# Language: Bash
# Accepted date: 2017-03-23
#
filename="file.txt"
count=0
while read line;
do
    ((count=count+1))
    if [ $count -eq 10 ]; then
        echo $line
        exit 0
    fi
done < "$filename"