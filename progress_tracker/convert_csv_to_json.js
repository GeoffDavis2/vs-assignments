const fs = require('fs');
const csv = require('csvtojson');
const readlineSync = require('readline-sync');

async function loadCSV(theFile) {
    readlineSync.question('\nHit Enter to load the CSV file data into the Array...');
    const csvArrayRet = await csv().fromFile(theFile); // Only line of code requiring await...
    console.table(csvArrayRet);
    return csvArrayRet;
};

function parseJsonArray(theArray) {
    readlineSync.question('\nHit Enter to turn the Array Level and ProgPt into Int and Float...');
    theArray.forEach((e, i, a) => {
        a[i].Level = parseInt(e.Level);
        a[i].ProgPt = parseFloat(e.ProgPt);
    });
    console.table(theArray);
    return theArray;
}

function stringTheJsonArray(theArray) {
    readlineSync.question('\nHit Enter to stringify the Array...');
    turnToString = JSON.stringify(theArray);
    console.log(turnToString);
    return turnToString;
}

function writeToJson (theFile, jsonString) {
    readlineSync.question('\nHit Enter to write the stringafied Array to a json file...');
    fs.writeFileSync(theFile, jsonString);
    console.log('\nThe stringafied Array was saved in the file.');
}

async function main() {
    console.log('\033c');
    let dataArray = await loadCSV('level_1.csv'); // Only function requiring await...
    dataArray = parseJsonArray(dataArray);
    const stringOfArray = stringTheJsonArray(dataArray);
    writeToJson('level_1.json', stringOfArray);
}

main();