const express = require('express');
const inquirer = require('inquirer');
require("dotenv").config();
const mysql = require('mysql2');


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASS
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to the database!");
    start();
});


const start = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit"
            ]
        })
        .then(answer => {
            switch (answer.action) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Quit":
                    connection.end();
                    break;
            }
        });

};

const viewDepartments = () => {
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const viewRoles = () => {
    connection.query(
        "SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
    );
};

const viewEmployees = () => {
    connection.query(
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
    );
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: "name",
            type: "input",
            message: "What is the name of the department you would like to add?"
        })
        .then(answer => {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.name
                },
                (err) => {
                    if (err) throw err;
                    console.log("Department added successfully!");
                    start();
                }
            );
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role you would like to add?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the department id of the role you would like to add?"
            }
        ])
        .then(answer => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                (err) => {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    start();
                }
            );
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name of the employee you would like to add?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name of the employee you would like to add?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What is the role id of the employee you would like to add?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the manager id of the employee you would like to add?"
            }
        ])
        .then(answer => {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                (err) => {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    start();
                }
            );
        });
};

const updateEmployeeRole = () => {
    inquirer
      .prompt([
        {
          name: "employee_id",
          type: "input",
          message: "What is the id of the employee whose role you would like to update?"
        },
        {
          name: "role_id",
          type: "input",
          message: "What is the new role id of the employee?"
        }
      ])
      .then(answer => {
        connection.query(
          "UPDATE employees SET role_id = ? WHERE id = ?",
          [answer.role_id, answer.employee_id],
          (err) => {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            start();
          }
        );
      });
  };


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


