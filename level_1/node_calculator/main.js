var readlineSync = require('readline-sync');

console.log("Hello world");

var theName = readlineSync.question("what is your name? ");

console.log(theName);