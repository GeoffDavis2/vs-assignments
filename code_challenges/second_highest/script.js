// Write a function that takes an array of numbers and returns the second highest number. 

function getSecondHighest(numbers) {
    if (!Array.isArray(numbers)) return 'Argument is not an Array';
    //Test to make sure all array values are number
    if (numbers.length < 1) return 'Argument is an empty Array';
    if (numbers.length === 1) return numbers[0];
    const tempArr = JSON.parse(JSON.stringify(numbers));
    tempArr.sort((a, b) => b - a)
    return tempArr[1];
}

console.log(getSecondHighest([4, 6, 2, 43, 3, 9])) // => 9
console.log(getSecondHighest([4, 100, 2, 43, 3, 9])) // => 43
console.log(getSecondHighest([1])) // => 1
console.log(getSecondHighest([])) // => Empty Array
console.log(getSecondHighest(32)) // => Not an Array
console.log(getSecondHighest()) // => Not an Array
