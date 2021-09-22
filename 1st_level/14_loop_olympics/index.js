console.clear();


// Prelims
console.log('Prelim #1');
for(let i=0; i<=9; i++) console.log(i);

console.log('\nPrelim #2');
for(let i=9; i>=0; i--) console.log(i);

console.log('\nPrelim #3');
var fruit = ["banana", "orange", "apple", "kiwi"];
for(let i=0; i<fruit.length; i++) console.log(fruit[i]);


// Bronze
console.log('\nBronze #1');
theArray = [];
for(let i=0; i<=9; i++) theArray.push(i);
console.table(theArray);

console.log('\nBronze #2');
for (i=0; i<=100; i++) if(!(i%2)) console.log(i);

console.log('\nBronze #3');
var fruit = ["banana", "orange", "apple", "kiwi", "pear", "peach"];
for(let i=0; i<fruit.length; i++) if (i%2) console.log(fruit[i]);


// Silver
const peopleArray = [
  {
    name: "Harrison Ford",
    occupation: "Actor"
  },
  {
    name: "Justin Bieber",
    occupation: "Singer"
  },
  {
    name: "Vladimir Putin",
    occupation: "Politician"
  },
  {
    name: "Oprah",
    occupation: "Entertainer"
  }
];

console.log('\nSilver #1');
for(let i=0; i<peopleArray.length; i++) console.log(peopleArray[i].name);

console.log('\nSilver #2');
var names = [], occupations = [];
for(let i=0; i<peopleArray.length; i++) {
  names.push(peopleArray[i].name);
  occupations.push(peopleArray[i].occupation);
}
console.table(names);
console.table(occupations);


console.log('\nSilver #3');
var names = [], occupations = [];
for(let i=0; i<peopleArray.length; i++) {
  if (!(i%2)) names.push(peopleArray[i].name);
  if (i%2) occupations.push(peopleArray[i].occupation);
}
console.table(names);
console.table(occupations);


// Gold
console.log('\nGold #1');
var grid = [];
for(let i=0; i<=2; i++) {
  var innerArray = [];
  for(let j=0; j<=2; j++) innerArray.push(0);
  grid.push(innerArray);
}
console.table(grid);

console.log('\nGold #2');
var grid = [];
for(let i=0; i<=2; i++) {
  var innerArray = [];
  for(let j=0; j<=2; j++) innerArray.push(i);
  grid.push(innerArray);
}
console.table(grid);

console.log('\nGold #3');
var grid = [];
for(let i=0; i<=2; i++) {
  var innerArray = [];
  for(let j=0; j<=2; j++) innerArray.push(j);
  grid.push(innerArray);
}
console.table(grid);

console.clear();
console.log('\nGold #4');
for(let i=0; i<=2; i++) 
  for(let j=0; j<=2; j++)
    grid[i][j] = 'x';
console.table(grid);
