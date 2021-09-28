const fs = require('fs');
const readlineSync = require('readline-sync');

console.log('\033c');

// console.log('\nLoad the json file to jsonData...');
const jsonData = fs.readFileSync('progress.json');
// console.log(jsonData);

// console.log('\n Convert jsonData to csvArray...');
const theArray = JSON.parse(jsonData);
// console.table(theArray);

const firstDay = new Date(theArray[0].Date);
const lastDay = new Date(theArray[theArray.length - 1].Date);

console.log(firstDay);
console.log(lastDay);
const totNumDays = Math.round((lastDay - firstDay) / 86400000);
const progPtPerLevel = [91.5, 78, 89, 72.5, 80.5, 72];
const totProgPts = progPtPerLevel.reduce


let x = 0;
theArray.forEach(day => {
    console.log(x++);
    // day.
});

// const diffInDays = Math.round(diffInTime / oneDay);


// turnedToString = JSON.stringify(progArray);
    // console.log(turnedToString);

// readlineSync.question('\nHit Enter to write json file...');

// fs.writeFileSync('alldays.json', turnedToString);

// readlineSync.question('\nHit Enter to continue...');

