DROP DATABASE IF EXISTS employeeDatabase;

CREATE DATABASE employeeDatabase;

USE employeeDatabase;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR
    (30) NOT NULL
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR
        (30),
        salary DECIMAL
        (10, 2),
        departmentId INT,
        FOREIGN KEY
        (departmentId)
        REFERENCES department
        (id)
        ON
        DELETE CASCADE
        ON
        UPDATE NO ACTION
    );

        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR
                (30),
            lastName VARCHAR
                (30),

            roleId INT,
            FOREIGN KEY
                (roleId)
            REFERENCES role
                (id)
            ON
            DELETE CASCADE
            ON
            UPDATE NO ACTION,

            managerId INT,
            FOREIGN KEY
                (managerId)
            REFERENCES employee
                (id)
            ON
            DELETE CASCADE
            ON
            UPDATE NO ACTION
        );