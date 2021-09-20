// #1
function capilizeAndLowercase(theString) {
    return theString.toUpperCase() + theString.toLowerCase();
};
console.log(capilizeAndLowercase('Hello'));

// #2
function findMiddleIndex(theString) {
    return Math.floor(theString.length/2);
}
console.log(findMiddleIndex('Hello World'));

// #3
function returnFirstHalf(theString) {
    return theString.slice(0,Math.floor(theString.length/2));
}
console.log(returnFirstHalf('Hello World'));

// #4
function capilizeAndLowercase2(theString) {
    return theString.slice(0,Math.floor(theString.length/2)).toUpperCase() + 
    theString.slice(Math.floor(theString.length/2)).toLowerCase();
};
console.log(capilizeAndLowercase2('Hello World'));

// console.clear();
// Optional
function capitalize(theString) {
    let theSentance = '';
    theString.split(' ').map((v, i, arr) => {
        theSentance += v.slice(0,1).toUpperCase() + v.slice(1);
        if(i < arr.length-1) theSentance += ' ';
    })
    return theSentance;
}
console.log(capitalize("hey friends! practice practice practice!") + "|");

