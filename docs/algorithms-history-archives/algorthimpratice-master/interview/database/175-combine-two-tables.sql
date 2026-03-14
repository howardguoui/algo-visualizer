# Write your MySQL query statement below
# Problem: https://leetcode.com/problems/combine-two-tables
# Difficulty: Easy
# Language: MySQL
# Accepted date: 2017-03-23
Select FirstName, LastName, City, State from Person left join Address  on Person.PersonId = Address.PersonId;