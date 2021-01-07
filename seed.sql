----Create Database----

CREATE DATABASE employee_tracker;

USE employee_tracker;

---Create Department Table----

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
name VARCHAR(30)
);

----Create Role Table----

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
title VARCHAR(30)
salary DECIMAL
department_id INT
);

----Create Employee Table----

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
first_name VARCHAR(30)
last_name VARCHAR(30)
role_id INT
manager_id INT
);
