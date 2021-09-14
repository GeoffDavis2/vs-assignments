var people = ["Jon", "Jacob", "Jingle", "Heimer", "Schmidt"]
var alphabet = "abcdefghijklmnopqrstuvwxyz"

function forception(people, alphabet){
    const mergedArray = [];
    for(let i=0; i<people.length; i++) {
        mergedArray.push(people[i] + ':');
        for(let i=0; i<alphabet.length; i++) mergedArray.push(alphabet[i]);
    }
    return mergedArray;
}

console.clear();
console.table(forception(people, alphabet));