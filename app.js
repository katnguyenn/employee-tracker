const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { connect } = require("http2");
const { removeAllListeners } = require("process");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

// Establishing Connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker'

});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    startApp();
});



// Initial Prompt 
function startApp() {
    inquirer.prompt([

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
        }

    ]).then(function (answer) {
        switch (answer.choices) {
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

        }
    })



}

// User able to access role list for new employees
const newRole = [];
function roleList() {
    connection.query("SELECT * FROM role", function(err, res) {
        if(err) throw err;

        for (let i = 0; i < res.length; i++) {
            newRole.push(res[i].title);
        }

    })
    return newRole;
}

// User able to identify new employee's manager
const managerInfo = [];
function managerList() {
    connection.query("SELECT first_name, last_name AS manager_name FROM employee WHERE manager_id IS NOT NULL", function(err, res) {
        if(err) throw err;

        for (let i = 0; i < res.length; i++) {
            managerInfo.push(res[i].manager_name);
        }

    })
    return managerInfo;
}


// Add Department 
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department do you want to add?',
            name: 'name'
        }
    ]).then(function (res) {
        connection.query('INSERT INTO department',
            {
                name: res.name
            },

            function (err) {
                if (err) throw err;
                console.table(res);
                startApp();
            }
        )


    })

}

// Add Role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What role do you want to add?',
            name: 'title'
        },
        {
            type: 'input',
            message: "What is this role's salary?",
            name: 'salary'

        }
    ]).then(function (res) {
        connection.query('INSERT INTO role',
            {
                title: res.title,
                salary: res.salary
            },

            function (err) {
                if (err) throw err;
                console.table(res);
                startApp();

            }
        )
    })
}

// Add Employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'first'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'last'

        },
        {
            type: 'list',
            message: "What is the employee's role?",
            choice: roleList(),
            name: 'role'

        },
        {
            type: 'list',
            message: "what is their manager's name?",
            choice: managerList(),
            name: 'manager'
        }
    ]).then(function (res) {
        connection.query('INSERT INTO employee',
            {
                first: res.first,
                last: res.last,
                role: res.role,
                manager: res.manager
            },

            function (err) {
                if (err) throw err;
                console.table(res);
                startApp();

            }
        )
    })
}

// View Department 
function viewDepartment() {
    connection.query("SELECT * FROM department INNER JOIN role ON department.id = role.id", function(err, res) {
        if (err) throw err;

        console.table(res);
        startApp();
    })
}


