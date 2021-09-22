console.log('\33c');

// 1
console.log('#1');
const fiveAndGreaterOnly = theArray => theArray.filter(num => num >= 5);
console.log(fiveAndGreaterOnly([3, 6, 8, 2]));

//2
console.log('\n#2');
const evensOnly = theArray => theArray.filter(num => !(num%2))
console.log(evensOnly([3, 6, 8, 2]));

//3
console.log('\n#3');
const fiveCharactersOrFewerOnly = theArray => theArray.filter(word => word.length <= 5);
console.log(fiveCharactersOrFewerOnly(["dog", "wolf", "by", "family", "eaten", "camping"]));

//4
console.log('\n#4');
const ilumPeopleArg = [
    { name: "Angelina Jolie", member: true },
    { name: "Eric Jones", member: false },
    { name: "Paris Hilton", member: true },
    { name: "Kayne West", member: false },
    { name: "Bob Ziroll", member: true }
];
const peopleWhoBelongToTheIlluminati = peopleParam => peopleParam.filter(person => person.member);
console.log(peopleWhoBelongToTheIlluminati(ilumPeopleArg));

//5
console.log('\n#5');
const matrixPeopleArg = [
    { name: "Angelina Jolie", age: 80 },
    { name: "Eric Jones", age: 2 },
    { name: "Paris Hilton", age: 5 },
    { name: "Kayne West", age: 16 },
    { name: "Bob Ziroll", age: 100 }
];
const ofAge = peopleParam => peopleParam.filter(person => person.age > 18);
console.log(ofAge(matrixPeopleArg));