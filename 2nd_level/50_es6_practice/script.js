// #1 let and const
console.log('\033c#1 let and const');
const name = "John"
const age = 101
function runForLoop(pets) {
    let petObjects = [];
    for (var i = 0; i < pets.length; i++) {
        const pet = { type: pets[i] }
        let name;
        if (pets[i] === "cat") {
            name = "fluffy"
        } else {
            name = "spot"
        }
        console.log("pet name: ", name)
        pet.name = name
        petObjects.push(pet)
    }
    console.log("man name: ", name)
    return petObjects
}
runForLoop(["cat", "dog"])


// #2 ES6 Arrow Functions, Task 1: Rewrite using map
console.log('\n\nES6 Arrow Functions, Task 1: Rewrite using map');
const carrots = ["bright orange", "ripe", "rotten"]
const mapVegetables = arr => arr.map(carrot => ({ type: "carrot", name: carrot }));
console.log(mapVegetables(carrots));


// #3 ES6 Arrow Functions, Task 2: Rewrite using filter
console.log('\n\nES6 Arrow Functions, Task 1: Rewrite using filter');
const people = [
    {
        name: "Princess Peach",
        friendly: false
    },
    {
        name: "Luigi",
        friendly: true
    },
    {
        name: "Mario",
        friendly: true
    },
    {
        name: "Bowser",
        friendly: false
    }
]
const filterForFriendly = arr => arr.filter(person => person.friendly);
console.log(filterForFriendly(people));


// #4 ES6 Arrow Functions, Task 3: More rewrites to arrow functions
console.log('\n\nES6 Arrow Functions, Task 3: More rewrites to arrow functions');
const doMathSum = (a, b) => a + b;
console.log(doMathSum(2, 3));
const produceProduct = (a, b) => a * b;
console.log(produceProduct(2, 3));


// #5 ES6 Arrow Functions, Task 4: printstring function
console.log('\n\nES6 Arrow Functions, Task 4: printstring function');
const printstring = (firstName = 'Jane', lastName = 'Doe', age = 100) => `Hi ${firstName} ${lastName}, how does it feel to be ${age}?`;
console.log(printstring('Kat', 'Stark', 40));
console.log(printstring());


// #6 ES6 Arrow Functions, Task 5: shorthand
console.log('\n\nES6 Arrow Functions, Task 5: shorthand');
const animals = [
    {
        type: "dog",
        name: "theodore"
    },
    {
        type: "cat",
        name: "whiskers"
    },
    {
        type: "pig",
        name: "piglette"
    },
    {
        type: "dog",
        name: "sparky"
    }
];
const filterForDogs = arr => arr.filter(animal => animal.type === "dog");
console.log(filterForDogs(animals));


// #7 Template Literals
console.log('\n\n#7 Template Literals');
const task7 = (name, location) => `Hi ${name}!\n\nWelcome to ${location}.\n\nI hope you enjoy your stay. Please ask the president of ${location} if you need anything.`;
console.log(task7('Janice','Hawaii'));