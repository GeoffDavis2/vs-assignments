// Methods used...
// array.unshift (adds to beginning of array)
// array.push (adds to end of array)
// array.shift (removes from beginning of array)
// array.pop (removes from end of array)
// array.findIndex (uses callback to fins index where condition you specify is met)
// array.length
// array Spread (...) i.e. var theArray = [...arrayOne, ...arrayTwo]
// array.concat
// array.splice (add or removes elements to/from an existing array)
// array.slice (returns new array with just elements between start and end index position)
// array.reverse
// array.toString

// Cheat Sheets from other people...
    // https://www.shortcutfoo.com/app/dojos/javascript-arrays/cheatsheet
    // https://dev.to/vincenius/javascript-array-functions-cheatsheet-1c15
    // https://medium.com/@timhancodes/javascript-array-methods-cheatsheet-633f761ac250

    
// use nodemon index.js -q in a separate wsl/ubuntu (or VS Code terminal) window
console.clear();

const fruit = ["banana", "apple", "orange", "watermelon"];
console.table(fruit);

const vegetables = ["carrot", "tomato", "pepper", "lettuce"];
console.table(vegetables);

// #1
vegetables.pop();
console.table(vegetables);

// #2
fruit.shift();
console.table(fruit);

// #3
console.log(fruit.findIndex(el => el === 'orange'));

// #4
fruit.push(fruit.findIndex(el => el === 'orange'));
console.table(fruit);

// #5
console.log(vegetables.length);

// #6
vegetables.push(vegetables.length);
console.table(vegetables);

// #7
    // Spread (...), this is Immutable
    var food = [...fruit, ...vegetables];
    console.table(food);

    // array.concat, this is also Immutable
    food = undefined; delete(food);
    var food = fruit.concat(vegetables);
    console.table(food);
    
    // array.push to an existing array, this is Mutable
    food = undefined; delete(food);
    food = [];
    food.push(...fruit, ...vegetables);
    console.table(food);
    
// #8
food.splice(4, 2);
console.table(food);

// #9
food.reverse();
console.table(food);

// #10
console.log(food.toString());


const test = ['a','b','c','d','e','f','g','h','i'];

console.log(test.slice(4,7));

console.table(test);