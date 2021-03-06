const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require("console-table-printer");
const figlet = require('figlet');


figlet('Employee Tracker', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

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

// Add Role
function addRole() {
    connection.query("SELECT * FROM department", (err, departmentDB) => {
        let departments = departmentDB.map(department => department.name);


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

            },
            {
                type: 'list',
                message: 'Choose the following department',
                choices: departments,
                name: 'department'
            }
        ]).then(function (answer) {
            const departmentObject = departmentDB.find(department => department.name === answer.department);

            const query = 'INSERT INTO role SET ?';
            connection.query(query,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: departmentObject.id

                },

                (err, res) => {
                    if (err) throw err;
                    console.log(answer.title + " has been added");
                    startApp();
                }

            );

        });
    })

}

// Add Employee
function addEmployee() {
    connection.query(`SELECT employee.id employeeID, role.id roleID, employee.first_name, employee.last_name, role.title, 
    concat(manager.first_name, " ", manager.last_name) manager FROM employee 
    LEFT JOIN role on role.id = employee.role_id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    `,
        (err, employeeDB) => {
            let newEmployee = employeeDB.map(role => role.title);
            let employeeManager = employeeDB.map(employee => employee.first_name + " " + employee.last_name);
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
                    choices: newEmployee,
                    name: 'role'

                },
                {
                    type: 'list',
                    message: "What is their manager's name?",
                    choices: employeeManager,
                    name: 'manager'
                }
            ]).then(function (answer) {
                const employeeObject = employeeDB.find(role => role.title === answer.role);
                const employeeManagerObj = employeeDB.find(employee => employee.first_name + " " + employee.last_name === answer.manager);
                const query = 'INSERT INTO employee SET ?';

                connection.query(query,
                    {
                        first_name: answer.first,
                        last_name: answer.last,
                        role_id: employeeObject.roleID,
                        manager_id: employeeManagerObj.employeeID
                    },

                    (err, res) => {
                        if (err) throw err;
                        console.log(answer.first + " " + answer.last + " has been added");
                        startApp();

                    }
                )
            });
        });
}

// View Department 
function viewDepartment() {
    const query = `SELECT role.id, role.title, role.salary, department.name
    FROM role LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;

        printTable(res);
        startApp();
    });

}

// View Role
function viewRole() {
    const query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;

        printTable(res);
        startApp();
    });
}

// View Employee
function viewEmployee() {
    const query = `SELECT  employee.id,  employee.first_name, employee.last_name, role.title, role.salary, 
    department.name, concat(manager.first_name, " ", manager.last_name) manager
    FROM employee LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    connection.query(query, (err, res) => {
        if (err) throw err;

        printTable(res);
        startApp();
    });
}



function updateEmployeeRole() {
    connection.query(`SELECT employee.id employeeID, role.id roleID, 
    employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN role on role.id = employee.role_id`,
        (err, employeeDB) => {
            let updateEmployee = employeeDB.map(employee => employee.first_name + " " + employee.last_name);
            let updateEmployeeRole = employeeDB.map(role => role.title);


            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select an employee to update their role',
                    choices: updateEmployee,
                    name: 'employee'
                },
                {
                    type: 'list',
                    message: 'Choose new role',
                    choices: updateEmployeeRole,
                    name: 'role'
                }

            ]).then(function (answer) {
                const employeeObj = employeeDB.find(employee => employee.first_name + " " + employee.last_name === answer.employee);
                const employeeRoleObject = employeeDB.find(role => role.title === answer.role);
                
                const query = 'UPDATE employee SET ? WHERE ?';

                connection.query(query,
                    [{

                        role_id: employeeRoleObject.roleID

                    },
                    {
                        id: employeeObj.employeeID
                    }],

                    (err, res) => {
                        if (err) throw err;
                    });

                console.log(answer.employee + "'s role has been updated.");
                startApp();


            })



        })
}