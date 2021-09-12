var mysql = require("mysql");
require("dotenv").config();
const consoleTable = require('console.table');
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 1000,

    user: "root",

    password: process.env.DB_PASSWORD,
    database: "employeeDatabase"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

viewDept = (doneViewDeptCallback) => {
    console.log("Loading departments...\n");
    connection.query("SELCTION * FROM department", function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.table(res);
        }
        doneViewDeptCallback(err, res);
    });
};

viewRoles = (doneViewRolesCallback) => {
    console.log("Loading all roles...\n");
    connection.query(`SELECT * FROM role
    INNER JOIN
    department ON role.departmentId = department.id`, function (err, res) {
        if (err) {
            console.error(err)
        } else {
            console.table(res);
        }
        doneViewRolesCallback(err, res);
    }
    )
};

viewEmployees = (doneViewEmployeeCallback) => {
    console.log("Loading all employees...\n");
    connection.query(`SELECT * FROM employee
        INNER JOIN
    role ON employee.roleID = role.id
    INNER JOIN
    department ON role.departmentId = department.id
    `, function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.table(res);
        }
        doneViewEmployeeCallback(err, res);
    })
};

createDept = (doneCreateDeptCallback) => {
    console.log("Creating a new department...\n")
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the department name?"
        }
    ]).then(function (userInput) {
        connection.query("INSERT INTO department SET ?",
            {
                deptName: userInput.departmentName,
            },
            function () {
                console.log(`Department ${userInput.departmentName} was created successfully!`);

                viewDept(doneCreateDeptCallback);
            });
    })

};


createRole = (doneCreateRoleCallback) => {
    console.log("Creating a new role...")
    connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the new role's Title?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "deptId",
                type: "number",
                message: "Which department ID does this role belong to?",
            }
        ]).then(function (userInput) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: userInput.roleTitle,
                    salary: userInput.roleSalary,
                    departmentId: userInput.deptId
                },
                function () {
                    console.log(`Role ${userInput.roleTitle} was created successfully!`);

                    viewRoles(doneCreateRoleCallback);
                });
        })
    })

};


createEmployee = (doneCreateEmployeeCallback) => {
    console.log("Creating new employee data...")
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "Which role does this employee belong to?"
            },
            {
                name: "managerId",
                type: "input",
                message: "Does this employee have a manager? If so, then input manager's employee ID. If not, press enter"
            }
        ]).then(function (userInput) {
            var data = {
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                roleId: userInput.roleId
            }
            if (userInput.managerId) {
                data.managerId = userInput.managerId
            }
            connection.query("INSERT INTO employee SET ?",
                data,
                function (err, res) {
                    console.log('error:' + err);
                    console.log(`${userInput.firstName} ${userInput.lastName}'s profile was created successfully!`);

                    viewEmployees(doneCreateEmployeeCallback);
                });
        })
    })
};


function updateEmployeeRole(doneUpdateEmployeeRCallback) {

    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);

        inquirer.prompt(
            [
                { 
                    name: "employeeId",
                    type: "number",
                    message: "Please input the id of the employee you want to update.",

                },
                {
                    name: "employeeUpdateRole",
                    type: "number",
                    message: "Please update employee's role by selecting a new role ID.",
                },

            ]).then((userInput) => {
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        { roleId: userInput.employeeUpdateRole },
                        { id: userInput.employeeId }
                    ], function (err, res) {
                        console.log('error:' + err);
                        viewEmployees(doneUpdateEmployeeRCallback)
                    });
            })
    })
};


function updateEmployeeManager(doneUpdateEmployeeMCallback) {

    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);

        inquirer.prompt(
            [
                { 
                    name: "employeeList",
                    type: "number",
                    message: "Please input the id of the employee you want to update.",
                },
                {
                    name: "employeeUpdateManager",
                    type: "number",
                    message: "Please update employee's manager by entering the manager's employee ID.",
                }

            ]).then((userInput) => {
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        { managerId: userInput.employeeUpdateManager },
                        { id: userInput.employeeList }
                    ], function (err, res) {
                        console.log('error:' + err);
                        console.log(`Employee's manager was updated successfully!`);
                        viewEmployees(doneUpdateEmployeeMCallback)
                    }
                );
            })
    })
};


removeRole = (doneRemoveRoleCallback) => {

    connection.query("SELECT * FROM role", function (err, res) {
        console.table(res);
        inquirer.prompt(
            {
                name: "removeRole",
                type: "number",
                message: "To remove a role from the database, please input the role ID. \n",
            })
            .then(function (userInput) {
                var newId = Number(userInput.removeRole);
                connection.query("DELETE FROM role WHERE ?", { id: newId }, function (err, res) {
                    console.log("Role has been purged from the database.");

                    viewRoles(doneRemoveRoleCallback);
                });
            })
    })
};


removeEmployee = (doneRemoveEmployeeCallback) => {

    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        inquirer.prompt(
            {
                name: "removeEmployee",
                type: "number",
                message: "To remove an employee from the database, please input their employee ID. \n",

            })
            .then(function (userInput) {
                var newId = Number(userInput.removeEmployee);
                connection.query("DELETE FROM employee WHERE ?", { id: newId }, function (err, res) {
                    console.log("Employee has been purged from the database.");

                    viewEmployees(doneRemoveEmployeeCallback);
                });
            })
    })

};

afterConnection = (exitCallback) => {

    connection.end();
    exitCallback();
};

module.exports = {
    "viewDept": viewDept,
    "viewRoles": viewRoles,
    "viewEmployees": viewEmployees,
    "createDept": createDept,
    "createRole": createRole,
    "createEmployee": createEmployee,
    "updateEmployeeRole": updateEmployeeRole,
    "updateEmployeeManager": updateEmployeeManager,
    "removeRole": removeRole,
    "removeEmployee": removeEmployee,
    "afterConnection": afterConnection
};