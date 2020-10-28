USE office_db;

INSERT INTO departments
    (name)
VALUES
    ('sales'),
    ('accounting'),
    ('customer service'),
    ('administration');

INSERT INTO roles
    (title, salary, department_id)
VALUES  
    ('salesperson', 65000, 1),
    ('senior sales representative', 70000, 1),
    ('assistant to regional manager', 65000, 1),
    ('accountant', 64000, 2),
    ('senior accountant', 65000, 2),
    ('customer service director', 60000, 3),
    ('quality control', 70000, 4),
    ('office manager', 60000, 4),
    ('regional manager', 70000, 4),
    ('temp', 50000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Halpert', 	2, null),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael','Scott', 9, null),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kelly', 'Kapoor', 6, null),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('Kevin', 'Malone', 4, null),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('Dwight', 'Schrute', 3, 1),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('Stanley', 'Hudson', 1, 1),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('Phyllis', 'Lapin-Vance', 1, 1),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('Ryan','Howard', 10, 1),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  ('Pam', 'Beesly', 8, 2),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES   ('Creed', 'Bratton', 7, 2),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES   ('Oscar','Martinez', 4, 4),
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES   ('Angela', 'Martin', 4, 4);


