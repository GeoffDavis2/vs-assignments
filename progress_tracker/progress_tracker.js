const fs = require('fs');
const readlineSync = require('readline-sync');

console.log('\033c');

const startDt = new Date(2021, 7, 10);
const endDt = new Date(2022, 0, 5);

console.log('\nLoad all days into progArray...');
const progArray = [];
for(let dt = startDt; dt <= endDt; dt.setDate(dt.getDate() + 1)) progArray.push({Dt:dt.toLocaleDateString(), Level:null, ProgPt:null});
console.table(progArray);

console.log('\nLoad the csv json file to csvJsonData...');
const csvJsonData = fs.readFileSync('level_1.json');
// console.log(csvJsonData);

console.log('\n Convert csvJsonData from JSON to csvArray...');
const csvArray = JSON.parse(csvJsonData);
// console.table(csvArray);

csvArray.forEach(eouter => {
    console.log(eouter);
    let i = progArray.findIndex(e => e.Dt === eouter.Date);
    progArray[i].Level = eouter.Level;
    progArray[i].ProgPt = eouter.ProgPt;
});

console.table(progArray);
// console.log(csvArray[0].Date);
// console.log(progArray.findIndex(e => e.Date = csvArray[0].Date));

// progArray[2].ProgPt = 3.7;
    // console.table(progArray);

// turnedToString = JSON.stringify(progArray);
    // console.log(turnedToString);

// readlineSync.question('\nHit Enter to write json file...');

// fs.writeFileSync('alldays.json', turnedToString);

// readlineSync.question('\nHit Enter to continue...');

