# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/duplicate-emails
# Difficulty: Easy
# Language: MySQL
# Accepted date: 2017-03-23
SELECT Email FROM Person GROUP BY Email HAVING COUNT(Email) > 1;