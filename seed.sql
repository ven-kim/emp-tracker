USE employeeDatabase;

INSERT INTO department
    (id, deptName)
VALUES
    (1, "Biology");

INSERT INTO department
    (id, deptName)
VALUES
    (2, "Chemistry");
INSERT INTO department
    (id, deptName)
VALUES
    (3, "Technology");

-- Adding role information. Last value relates to department table. --
INSERT INTO role
    (title, salary, departmentId)
VALUES("Biologist", 84359.32, 1);

INSERT INTO role
    (title, salary, departmentId)
VALUES("Chemist", 92846.87, 2);

INSERT INTO role
    (title, salary, departmentId)
VALUES("Technician", 78364.68, 3);


-- Adding employee info. Last 2 values relate to role table. All managers have to go first or else the lesser employees don't have a manager.--
INSERT INTO employee
    (firstName, lastName, roleId)
VALUES("Bob", "Ross", 1);

INSERT INTO employee
    (firstName, lastName, roleId)
VALUES("Fred", "Rogers", 2);

INSERT INTO employee
    (firstName, lastName, roleId)
VALUES("Obama", "Barrack", 3);

/*================================================================*/

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES("Venjamin", "Kim", 1, 1);

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES("Joe", "Biden", 2, 2);

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES("Ron", "Howard", 3, 3);

/*================================================================*/

SELECT *
FROM department;
SELECT *
FROM role;
SELECT *
FROM employee;