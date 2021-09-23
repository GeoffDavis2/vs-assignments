console.log('\33c');

// #1
console.log('#1');
const total = theArray => (theArray.reduce((f, num) => f += num));
console.log(total([1, 2, 3]));

// #2
console.log('\n#2');
const stringConcat = theArray => (theArray.reduce((f, num) => f += num, ''));
console.log(stringConcat([1, 2, 3]));

// #3
console.log('\n#3');
var voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];
const totalVotes = theArray => theArray.reduce((f, voter) => f += voter.voted, 0);
console.log(totalVotes(voters));

// #4
console.log('\n#4');
var wishlist = [
    { title: "Tesla Model S", price: 90000 },
    { title: "4 carat diamond ring", price: 45000 },
    { title: "Fancy hacky Sack", price: 5 },
    { title: "Gold fidgit spinner", price: 2000 },
    { title: "A second Tesla Model S", price: 90000 }
];
const shoppingSpree = theArray => (theArray.reduce((f, item) => f += item.price, 0))
console.log(shoppingSpree(wishlist));

// #5
console.log('\n#5');
var arrays = [
    ["1", "2", "3"],
    [true],
    [4, 5, 6]
];
const flatten = theArray => (theArray.reduce((f, subArray) => {
    subArray.forEach(array => f.push(array));
    return f;
}, []));
console.log(flatten(arrays));
console.log('But even simpler is arrays.flat(99)... ' + arrays.flat());

// #6
console.log('\n#6');
var voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];

function voterResults (arr) {
    const midMinAge = 26;
    const midMaxAge = 35;
    return arr.reduce((f, voter) => {
        f.numYoungVotes += (voter.age < midMinAge && voter.voted)
        f.numYoungPeople += voter.age < midMinAge;
        f.numMidVotesPeople += (voter.age >= midMinAge && voter.age <= midMaxAge && voter.voted)
        f.numMidsPeople += voter.age < midMinAge;
        f.numOldVotesPeople += (voter.age > midMaxAge && voter.voted)
        f.numOldsPeople += voter.age > midMaxAge;
        return f;
    }, {numYoungVotes: 0, numYoungPeople: 0, numMidVotesPeople: 0, numMidsPeople: 0, numOldVotesPeople: 0, numOldsPeople: 0})};
console.log(voterResults(voters));