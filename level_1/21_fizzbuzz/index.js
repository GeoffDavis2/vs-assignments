process.stdout.write('\033c');

function Tally() {
    this.fizzBuzz = 0;
    this.fizz = 0;
    this.buzz = 0;
}

Tally.prototype.multOfThreeAndFive = function() {
    this.fizzBuzz++;
    console.log('FizzBuzz');
}

Tally.prototype.multOfThree = function() {
    this.fizz++;
    console.log('Fizz');
}

Tally.prototype.multOfFive = function() {
    this.buzz++;
    console.log('Buzz');
}

const theTally = new Tally();

for(let i=1; i<=100; i++) {
    if(!(i%5) && !(i%3)) {theTally.multOfThreeAndFive(); continue};
    if(!(i%3)) {theTally.multOfThree(); continue};
    if(!(i%5)) {theTally.multOfFive(); continue};
    console.log(i);
}

const {fizz, buzz, fizzBuzz} = theTally;
console.log(`\nThe Tally...\nFizz = ${fizz}\nBuzz = ${buzz}\nFizzBuzz = ${fizzBuzz}`);