process.stdout.write('\033c');

const employees = [];

function Employee(name, jobTitle, salary) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.status = 'Part Time';
};

Employee.prototype.printEmployeeForm = function () {console.log(
    'Name: '        + this.name +
    ', Job Title: ' + this.jobTitle +
    ', Salary: '    + this.salary +
    ', Status'      + this.status
)};

const me = new Employee('Geoff Davis', 'Coder', '$100,000');
const you = new Employee('John Doe', 'V-School Instructor', '$150,000');
const someoneElse = new Employee('Susan Smith', 'Student', '$25,000');

me.status = 'Contract';
you.status = 'Full Time';

employees.push(me, you, someoneElse);

console.table(employees);