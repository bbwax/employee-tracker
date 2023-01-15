#Employee Management System
A command-line application to manage a company's employee database using Node.js, Inquirer, and MySQL.

##Installation
To install the application, follow these steps:

-Clone the repository to your local machine: git clone https://github.com/bbwax/employee-tracker.git
-Navigate to the root directory of the project: cd employee-tracker
-Install the required dependencies by running npm install
-Start the application by running npm start

##Usage
Whatch the demo video here:
https://drive.google.com/file/d/1o0VZrq0QVbjU-qmLt-_K4eAsgV2OynOP/view

When you start the application, you will be presented with the following options:

-view all departments

-view all roles

-view all employees

-add a department

-add a role

-add an employee

-update an employee role

-quit

-When you choose to view all departments, you will be presented with a formatted table showing department names and department ids.

-When you choose to view all roles, you will be presented with a formatted table showing the job title, role id, the department that role belongs to, and the salary for that role.

-When you choose to view all employees, you will be presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

-When you choose to add a department, you will be prompted to enter the name of the department and that department will be added to the database.

-When you choose to add a role, you will be prompted to enter the name, salary, and department for the role and that role will be added to the database.

-When you choose to add an employee, you will be prompted to enter the employee’s first name, last name, role, and manager, and that employee will be added to the database.

-When you choose to update an employee role, you will be prompted to select an employee to update and their new role and this information will be updated in the database.

##Requirements
Node.js
MySQL

##License
This project is licensed under the MIT License - see the LICENSE file for details.

##Acknowledgments
This application uses the [inquirer](https://www.npmjs