console.log('\33c');

var peopleArray = [
    {
        firstName: "Sarah",
        lastName: "Palin",
        age: 47
    },
    {
        firstName: "Frank",
        lastName: "Zappa",
        age: 12
    },
    {
        firstName: "Rick",
        lastName: "Sanchez",
        age: 78
    },
    {
        firstName: "Morty",
        lastName: "Smith",
        age: 29
    },
    {
        firstName: "Kyle",
        lastName: "Mooney",
        age: 27
    },
    {
        firstName: "Pasha",
        lastName: "Datsyuk",
        age: 13
    },
    {
        firstName: "Lev",
        lastName: "Tolstoy",
        age: 82
    }
]

function sortedOfAge(arr) {
    return arr.filter(person => person.age > 18)
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
        .map(person => "<li>"+person.firstName+" "+person.lastName+" is "+person.age+"</li>");
}
console.log(sortedOfAge(peopleArray));


// Extra Credit
console.log('\nThis is extra credit stuff...');
var davisFamily = [
{
    firstName: "Geoff",
    lastName: "Davis",
    age: 55
},
{
    firstName: "Benita",
    lastName: "Davis",
    age: 54
},
{
    firstName: "Geoffrey",
    lastName: "Davis",
    age: 24
},
{
    firstName: "Bryce",
    lastName: "Davis",
    age: 21
},
{
    firstName: "Pierce",
    lastName: "Davis",
    age: 19
}
];

console.log('\nAdd Davis Family to peopleArray.');
peopleArray.push(...davisFamily);
console.table(peopleArray);
function noYorAatEnd (arr) {
    return arr.filter(person => {
        const lastChar = person.lastName[person.lastName.length - 1]
        return ['y','a'].includes(lastChar);
    });
}
const peopleWithnoYorAatEnd = noYorAatEnd(peopleArray);
console.table(peopleWithnoYorAatEnd);

console.log('\nRemove 2nd element of the array.');
peopleWithnoYorAatEnd.splice(1,1);
console.table(peopleWithnoYorAatEnd);

console.log('\nReverse the array.');
peopleWithnoYorAatEnd.reverse();
console.table(peopleWithnoYorAatEnd);