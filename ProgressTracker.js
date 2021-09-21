// https://sebhastian.com/javascript-csv-to-array/

const readlineSync = require('readline-sync');
const fs = require('fs');
console.log('\033c');

const startDt = new Date(2021, 7, 10);
const endDt = new Date(2022, 0, 5);

const progArray = [];
for(let dt = startDt; dt <= endDt; dt.setDate(dt.getDate() + 1)) progArray.push({progDt:dt, progPt:null});

const x = {
    dt: 'asdf',
    prog: 3.22
}

console.table(progArray);



// console.table(progArray);

// var file = fs.createWriteStream('array.txt');
// arr.forEach(function(v) { file.write(v.join(', ') + '\n'); });
// file.end();