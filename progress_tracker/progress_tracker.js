const fs = require('fs');
// const readlineSync = require('readline-sync');


console.log('\033c');


// fs.writeFileSync('test.json', turnToString);

const startDt = new Date(2021, 7, 10);
const endDt = new Date(2022, 0, 5);

const progArray = [];
for(let dt = startDt; dt <= endDt; dt.setDate(dt.getDate() + 1)) progArray.push({Dt:dt.toLocaleDateString(), Level:1, ProgPt:null});

console.table(progArray);

// var file = fs.createWriteStream('array.txt');