const inquirer = require("inquirer");
const manageDB = require("./manageDB");

function EmployeeTracker() {

    inquirer
        .prompt([
            {
                type: "list",
                message: "Welcome to the Employee Database.",
                name: "mainMenu",
                choices: [
                    "View department list",
                    "View employee list",
                    "View roles",
                    "Add a department",
                    "Add an employee",
                    "Add a role",
                    "Update employee role",
                    "Update employee's manager",
                    "Remove a role from database",
                    "Remove employee from database",
                    "Exit"]
            },
        ])
        .then(function (response) {
            switch (response.mainMenu) {
                default:
                    text = "Error: You have been compromised.";
                    break;

                case "View department list":
                    manageDB.viewDept(function () {
                        EmployeeTracker();
                    });
                    break;
                case "View employee list":
                    manageDB.viewEmployees(function () {
                        EmployeeTracker();
                    });
                case "View roles":
                    manageDB.viewRoles(function () {
                        EmployeeTracker();
                    });
                case "Add a department":
                    manageDB.createRole(function () {
                        EmployeeTracker();
                    });
                case "Add an employee":
                    manageDB.createEmployee(function () {
                        EmployeeTracker();
                    });
                case "Add a role":
                    manageDB.createRole(function () {
                        EmployeeTracker();
                    });
                case "Update employee role":
                    manageDB.updateEmployeeRole(function () {
                        EmployeeTracker();
                    });
                case "Update employee's manager":
                    manageDB.updateEmployeeManager(function () {
                        EmployeeTracker();
                    });
                case "Remove a role from database":
                    manageDB.removeRole(function () {
                        EmployeeTracker();
                    });
                case "Remove employee from database":
                    manageDB.removeEmployee(function () {
                        EmployeeTracker();
                    });
                case "Exit":
                    console.log("Exiting employee database.");
                    manageDB.afterConnection(function () {
                        process.exit();
                    });
                    break;
            }
        });
};

EmployeeTracker();