console.log('\33c');

// #1
console.log('#1');
const leastToGreatest = (theArray => theArray.sort((a, b) => a - b));
console.log(leastToGreatest([1, 3, 5, 2, 90, 20]));

// #2
console.log('\n#2');
const greatestToLeast = (theArray => theArray.sort((a, b) => b - a));
console.log(greatestToLeast([1, 3, 5, 2, 90, 20]));

// #3
console.log('\n#3');
const lengthSort = (theArray => theArray.sort((a, b) => a.length - b.length));
console.log(lengthSort(["dog", "wolf", "by", "family", "eaten"]));

// #4
console.log('\n#4');
const alphabetical = (theArray => theArray.sort());
console.log(alphabetical(["dog", "wolf", "by", "family", "eaten"]));

// #5
console.log('\n#5');
const byAge = (theArray => theArray.sort((a, b) => a.age - b.age));
console.log(byAge([
    { name: "Quiet Samurai", age: 22 },
    { name: "Arrogant Ambassador", age: 100 },
    { name: "Misunderstood Observer", age: 2 },
    { name: "Unlucky Swami", age: 77 }
]));