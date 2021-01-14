const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { printTable } = require("console-table-printer");


// Establishing Connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker'

});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    startApp();
});



// Initial Prompt 
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
                "Exit"

            ],
            name: 'Question',
        }

    ).then((answer) => {
        switch (answer.Question) {
            case "Add department":
                addDepartment();
                break;

            case "Add role":
                addRole();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "View department":
                viewDepartment();
                break;

            case "View role":
                viewRole();
                break;

            case "View employee":
                viewEmployee();
                break;

            case "Update employee role":
                updateEmployeeRole();
                break;

            case "Exit":
                connection.end();
                break;


        }
    });



}


// Add Department 
function addDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What department do you want to add?',
            name: 'name'
        }
    ).then(function (answer) {
        var query = 'INSERT INTO department SET ?';
        connection.query(query, { name: answer.name }, (err, res) => {
            if (err) throw err;
            console.log(answer.name + " has been added");
            startApp();


        });
    });
}

