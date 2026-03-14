# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/second-highest-salary
# Difficulty: Easy
# Language: MySQL
# Accepted date: 2017-03-23
#
# Solution 2
# SELECT MAX( Salary) AS SecondHighestSalary
# FROM Employee
# WHERE Salary < ( SELECT MAX( Salary) FROM Employee );
#
# Solution 1
#
SELECT distinct(Salary)  AS SecondHighestSalary FROM Employee
Union select null 
ORDER BY SecondHighestSalary DESC LIMIT 1 OFFSET 1;