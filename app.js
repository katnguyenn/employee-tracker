const inquirer = require("inquirer");
const mysql = require("MySQL");
const consoleTable = require("console.table");
const { connect } = require("http2");

// Establishing Connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker'

});

connect.connect(function(err) {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    startApp();
});



// Initial Prompt 
function startApp() {
    inquirer.prompt({


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