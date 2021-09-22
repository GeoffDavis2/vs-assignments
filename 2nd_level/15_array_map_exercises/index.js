console.log('\033c');

// 1
console.log('#1');
const doubleNumbers = theArray => theArray.map(num => num * 2);
console.log(doubleNumbers([2, 5, 100]));

// 2
console.log('\n#2');
const stringItUp = theArray => theArray.map(num => num.toString());
console.log(stringItUp([2, 5, 100]));

// 3
console.log('\n#3');
const capitalizeNames = theArray => theArray.map(str => str[0].toUpperCase() + str.slice(1).toLowerCase());
console.log(capitalizeNames(["john", "JACOB", "jinGleHeimer", "schmidt"]));

// For 4, 5, & 6...
const arrayArg = [
    { name: "Angelina Jolie", age: 80 },
    { name: "Eric Jones", age: 2 },
    { name: "Paris Hilton", age: 5 },
    { name: "Kayne West", age: 16 },
    { name: "Bob Ziroll", age: 100 }
];

// 4
console.log('\n#4');
const namesOnly = theArray => theArray.map(obj => obj.name);
console.log(namesOnly(arrayArg));

// 5
console.log('\n#5');
const makeStrings = theArray => theArray.map(obj => {
    if (obj.age >= 17) return `${obj.name} can go to The Matrix`
    return `${obj.name} is under age!!`
});
console.log(makeStrings(arrayArg));

// 6
console.log('\n#6');
const readyToPutInTheDOM = theArray => theArray.map(obj => `<h1>${obj.name}:</h1><h2> ${obj.age}</h2>`);
console.log(readyToPutInTheDOM(arrayArg));