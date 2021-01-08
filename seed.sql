----Create Database----
DROP DATABASE IF EXISTS employee_tracker;

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

---- Department Seeding----
INSERT INTO department (name)
VALUE ("Human Resources");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Legal");

----Employee Role Seeding----
INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources Manager", 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Senior Software Engineer", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 85000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 110000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Manager", 95000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Specialist", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Manager", 105000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Coordinator", 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 180000, 6);


----Employee Seeding----
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Victoria", "Echevarria", 3, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kat", "Nguyen", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jenny", "Bui", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Susanna","Chen", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Emily", "Castello", 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Travis", "Smith", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Paige", "Roberts", 5, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Kennedy", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Penelope", "Tsmilia", null, 6);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
