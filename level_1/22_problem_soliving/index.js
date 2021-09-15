console.log('\033c');

// #1 - largest
console.log('#1 - largest');
function largest(theArray) {
    let theMaxx = theArray[0];
    theArray.forEach(e => {if(e > theMaxx) theMaxx = e});
    return theMaxx;
};
console.log(largest([3, 5, 2, 8, 1]));


// #2 - lettersWithStrings
console.log('\n#2 - lettersWithStrings');
function lettersWithStrings(theArray, theChar) {
    return theArray.filter(e => e.includes(theChar));
}
console.log(lettersWithStrings(["#3", "$$$", "C%4!", "Hey!"], "!"));


// #3 - isDivisible
console.log('\n#3 - isDivisible');
function isDivisible(dividend, divisor) {
    return !(dividend%divisor);
}
console.log(isDivisible(4,2));
console.log(isDivisible(9,3));
console.log(isDivisible(15,4));


// #4 - reverseStr
console.log('\n#4 - reverseStr');
let reverseStr = theString => theString.split('').reverse().join('');
console.log(reverseStr('Hello World'));


// #5 - isNum
console.log('\n#5 - isNum');
let isNum = theString => !isNaN(theString);
console.log(isNum('3'));
console.log(isNum('three'));


// #6 - isEven
console.log('\n#6 - isEven');
let isEven = theNum => !(theNum%2);
console.log(isEven(4));
console.log(isEven(3));


// #7 - averageArray
console.log('\n#7 - averageArray');
let averageArray = theArray => theArray.reduce((prev, curr) => prev + curr) / theArray.length;
console.log(averageArray([1, 2, 3]));
console.log(averageArray([5, -10, 10, 20]));