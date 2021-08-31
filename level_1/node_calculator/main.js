const readlineSync = require('readline-sync');

const listOfOper = "+-*/";
var num1, num2, ans = 0;
var oper = "";

function add(n1, n2) {return n1 + n2;}
function sub(n1, n2) {return n1 - n2;}
function mul(n1, n2) {return n1 * n2;}
function div(n1, n2) {return n1 / n2;}

console.clear();

do {
    
    console.log("Hit Enter, without any value to exit the loop.");
    
    do num1 = readlineSync.question("Please enter your first number: "); while (isNaN(num1));
    if (num1 ==="") return;
    
    do num2 = readlineSync.question("Please enter your second number: "); while (isNaN(num2));
    if (num2 ==="") return;

    do oper = readlineSync.question("Please enter the operation to perform (+, -, *, or /): "); while (!listOfOper.includes(oper));
    if (oper ==="") return;

    switch (oper) {
        case "+": ans = add(parseFloat(num1), parseFloat(num2)); break;
        case "-": ans = sub(parseFloat(num1), parseFloat(num2)); break;
        case "*": ans = mul(parseFloat(num1), parseFloat(num2)); break;
        case "/": ans = div(parseFloat(num1), parseFloat(num2)); break;
        default: ans = "Invalid Operator";
    }

    console.log("The answer is: ", ans);
    console.log("\n");
    
} while (true);