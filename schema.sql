DROP DATABASE IF EXISTS office_db;
CREATE DATABASE office_db;

USE office_db;

CREATE TABLE employees (
id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30),
last_name VARCHAR (30),
role_id INT,
manager_id INT(10) UNSIGNED, 
	CONSTRAINT fk_emplyee
	FOREIGN KEY (manager_id)
		REFERENCES employees(id)
        ON UPDATE no action
        ON DELETE no action,
PRIMARY KEY (id)
);

CREATE TABLE departments (
id INTEGER(1) not null auto_increment,
name VARCHAR (30),
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT(1) not null auto_increment,
title VARCHAR (30),
salary INT,
department_id INT,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) 
        REFERENCES departments(id)
        ON UPDATE no action
        ON DELETE no action,
PRIMARY KEY (id)
);