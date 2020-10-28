var mysql = require("mysql");
const inquirer = require('inquirer');
const Connection = require("mysql/lib/Connection");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootroot",
    database: "team_db"
});
console.log('_____________________________\n');
console.log('   TEAM BUILDING EXCERSISE   \n');
console.log('_____________________________\n');
console.log('          EXCERSIZE          \n');
console.log('_____________________________\n');
console.log('             BABAY           \n');
console.log('_____________________________\n');


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainPrompts();
});

const allEmployees = function () {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        console.log("")
        console.table(results);
    })
    mainPrompts();
};
const allRoles = function () {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        console.log("");
        console.table(results);
    });
    mainPrompts();
};
const allDepartments = function () {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        console.log("");
        console.table(results);
    });
    mainPrompts();
};
const rolesByDepartment = function () {
    connection.query("select roles.title as role_name, roles.salary, departments.name as department from roles  inner join departments on departments.id=roles.department_id; ", function (err, results) {
        if (err) throw err;
        console.log("");
        console.table(results);
    });
    mainPrompts();
};
const employeesByDepartment = function () {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title, departments.name department FROM employees join roles ON employees.role_id=roles.id join departments ON roles.department_id=departments.id order by department;", function (err, results) {
        if (err) throw err;
        console.log("");
        console.table(results);
    });
    mainPrompts();
};
// ADDING AN EMPLOYEE
const addEmployee = function () {
    connection.query('SELECT * FROM roles', function (err, roles) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employees job title?',
                choices: function () {
                    var titlesArray = [];
                    for (let i = 0; i < roles.length; i++) {
                        titlesArray.push(roles[i].title);
                    }
                    return titlesArray;
                }
            }
        ]).then(function (answer) {
            let jobId;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].title === answer.role) {
                    jobId = roles[i].id;
                }
            }
            connection.query("INSERT INTO employees set ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: jobId,
                    manager_id: null
                }
            );
            console.log(`\n ${answer.first_name} ${answer.last_name} the ${answer.role} was added to the employees list. \n`)
            mainPrompts();
        });
    });
};
// ADDING A ROLE
const addRole = function () {
    connection.query('SELECT * FROM departments', function (err, department) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the job title?'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the base salary for the job?'
            },
            {
                type: "list",
                name: 'chooseDepartment',
                message: "What department is this job affiliated with?",
                choices: function () {
                    var departmentsArray = [];
                    for (let i = 0; i < department.length; i++) {
                        departmentsArray.push(department[i].name);
                    }
                    return departmentsArray;
                }
            }
        ]).then(function (answer) {
            let departmentId;
            for (let i = 0; i < department.length; i++) {
                if (department[i].name === answer.chooseDepartment) {
                    departmentId = department[i].id;
                }
            }
            connection.query("INSERT INTO roles set ?",
                {
                    title: answer.name,
                    salary: answer.salary,
                    department_id: departmentId
                }
            );
            console.log(`\n${answer.name} was added to the ${answer.chooseDepartment} department.\n`);
            mainPrompts();
        });
    })
};
// ADDING A DEPARTMENT
const addDepartment = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO departments set ?",
            {
                name: answer.name,
            }
        );
        console.log(`\n${answer.name} was added to the list of department.\n`);
        mainPrompts();
    })
};



const addFunction = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to add?',
        choices: [
            {
                name: 'employee',
                value: 'employee'
            },
            {
                name: 'role',
                value: 'role'
            },
            {
                name: 'department',
                value: 'department'
            },
            {

                name: 'return to main menu',
                value: 'return'
            }
        ]
    }]).then(({ choice }) => {
        switch (choice) {
            case "employee":
                addEmployee();
                break;
            case "role":
                addRole();
                break;
            case "department":
                addDepartment();
                break;
            case "return":
                mainPrompts();
                break;
        }
    })
};

const deleteFunction = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to remove?',
        choices: [
            {
                name: 'employee',
                value: 'employee'
            },
            {
                name: 'role',
                value: 'role'
            },
            {
                name: 'department',
                value: 'department'
            },
            {

                name: 'return to main menu',
                value: 'return'
            }
        ]
    }]).then(({ choice }) => {
        switch (choice) {
            case "employee":
                deleteEmployee();
                break;
            case "role":
                deleteRole();
                break;
            case "department":
                deleteDepartment();
                break;
            case "return":
                mainPrompts();
                break;
        }
    })
};


function mainPrompts() {

    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do? Choose from the list of options below:',
        choices: [

            {
                name: 'See a list of all employees',
                value: 'all_employees'
            },
            {
                name: 'See a list of all roles',
                value: "all_roles"
            },
            {
                name: 'See a list of all departments',
                value: "all_departments"
            },
            {
                name: 'See a list of all roles by department',
                value: 'all_roles_by_department'
            },
            {
                name: 'See a list of all emplyees by department',
                value: 'employees_by_department'
            },
            {
                name: 'Add an employee, department, or role',
                value: 'add'
            },
            {
                name: 'Remove an employee, department, or role',
                value: 'delete'
            },
            {
                name: 'Exit',
                value: 'EXIT'
            }
        ]
    }]).then(({ choice }) => {
        switch (choice) {
            case "all_employees":
                allEmployees();
                break;
            case 'all_roles':
                allRoles();
                break;
            case 'all_departments':
                allDepartments();
                break;
            case 'all_roles_by_department':
                rolesByDepartment();
                break;
            case 'employees_by_department':
                employeesByDepartment();
                break;
            case 'add':
                addFunction();
                break;
            case 'delete':
                deleteFunction();
                break;
            case 'EXIT':
                console.log('Peace out home skillet')
                connection.end;
                break;
        }
    })
};

