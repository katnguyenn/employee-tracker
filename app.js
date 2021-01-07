const inquirer = require("inquirer");
const mysql = require("MySQL");
const consoleTable = require("console.table");


function startApp() {
    inquirer.prompt(

        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View department",
                "View role",
                "View employee",
                "Update employee role",
                "Update employee manager",
                "View employees by manager",
                "Delete department",
                "Delete role",
                "Delete employee",
                "View total budget of department"

            ],
            name: 'Question',
        }).then(function (answer) {

        })



}