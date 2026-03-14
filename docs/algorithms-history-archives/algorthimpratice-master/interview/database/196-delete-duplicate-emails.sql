# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/delete-duplicate-emails
# Difficulty: Easy
# Language: MySQL
# Accepted date: 2017-03-24
#
# Solution 1
# DELETE p1 FROM Person p1, Person p2 WHERE p1.Email = p2.Email and p1.Id > p2.Id;
#
# Solution 2
DELETE FROM Person
WHERE Person.Id NOT IN (SELECT 
    minId FROM (SELECT 
        MIN(Id) as minId, Email
        FROM Person 
        GROUP BY Email) AS tempList);