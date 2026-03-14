# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/customers-who-never-order
# Difficulty: Easy
# Language: MySQL
# Accepted date: 2017-03-23
SELECT Name AS Customers
    FROM Customers LEFT JOIN Orders ON Customers.Id = Orders.CustomerId
        WHERE CustomerId IS null;