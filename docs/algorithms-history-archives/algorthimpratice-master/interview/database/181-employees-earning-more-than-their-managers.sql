# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/employees-earning-more-than-their-managers
# Difficulty: Easy
# Language: MySQL
# Accepted date: 2017-03-24
SELECT A.Name AS Employee
    FROM Employee AS A LEFT JOIN Employee AS B on (A.ManagerId = B.Id)
        WHERE A.Salary > B.Salary;