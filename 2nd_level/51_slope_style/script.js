// Green Circle, #1
console.log('\033cGreen Circle, #1');
const collectAnimals = (...animals) => [...animals];
console.log(collectAnimals("dog", "cat", "mouse", "jackolope", "platypus"));


// Green Circle, #2
console.log('\n\nGreen Circle, #2');
const combineFruit = (fruit, sweets, vegetables) => ({ fruit, sweets, vegetables });
console.log(combineFruit(
    ["apple", "pear"],
    ["cake", "pie"],
    ["carrot"]
));


// Green Circle, #3
console.log('\n\nGreen Circle, #3');
const parseSentence = ({ location, duration }) => `We're going to have a good time in ${location} for ${duration}`;

console.log(parseSentence({
    location: "Burly Idaho",
    duration: "2 weeks"
}));


// Green Circle, #4
console.log('\n\nGreen Circle, #4');
const returnFirst = ([firstItem, ...rest]) => firstItem;
console.log(returnFirst([1, 2, 3, 4, 5, 6]));


// Green Circle, #5
console.log('\n\nGreen Circle, #5');
const favoriteActivities = ["magnets", "snowboarding", "philanthropy", "janitor work", "eating"];
const returnFavorites = ([a, b, c, ...rest]) => `My top three favorite activities are ${a}, ${b}, and ${c}`;
console.log(returnFavorites(favoriteActivities));


// Blue Square
console.log('\n\nBlue Square');
const combineAnimals1 = (...arrs) => [].concat(...arrs);
const combineAnimals2 = (...arrs) => [...arrs].flat();
const realAnimals = ["dog", "cat", "mouse"];
const magicalAnimals = ["jackolope"];
const mysteriousAnimals = ["platypus"];
const moreRandomStuff = ["car", "plane", "boat", "ball", "goat", "juice"];
console.log(combineAnimals1(realAnimals, magicalAnimals, mysteriousAnimals, moreRandomStuff));
console.log(combineAnimals2(realAnimals, magicalAnimals, mysteriousAnimals, moreRandomStuff));


// Black Diamond, #1
console.log('\n\nBlack Diamond, #1');
const product = (...nums) => nums.reduce((acc, number) => (acc * number), 1);
console.log(product(1, 2, 3, 4, 5, 10));


// Black Diamond, #2
console.log('\n\nBlack Diamond, #2');
const unshift = (array, ...rest) => [...rest, ...array];
console.log(unshift([1, 2, 3], 10, 20, 30));


// Black Diamond, #3
console.log('\n\nBlack Diamond, #3');
const populatePeople = (names) => names.map(
    name => (
        fullName => (
            ([firstName, lastName]) => (
                { firstName, lastName }
            )
        )(fullName.split(' '))
    )(name)
)
console.log(populatePeople(["Frank Peterson", "Suzy Degual", "Liza Jones", "Geoff Davis"]));