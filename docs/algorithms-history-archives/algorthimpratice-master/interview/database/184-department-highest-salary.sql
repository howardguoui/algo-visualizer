# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/department-highest-salary
# Difficulty: Medium
# Language: MySQL
# Accepted date: 2017-03-23
SELECT D.Name AS Department ,E.Name AS Employee ,E.Salary 
FROM 
	Employee E,
	Department D 
WHERE E.DepartmentId = D.id 
  AND (DepartmentId,Salary) IN 
  (SELECT DepartmentId,max(Salary) AS maxSalary FROM Employee GROUP BY DepartmentId);