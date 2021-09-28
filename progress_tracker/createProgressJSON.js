console.log('\033c');

// Requires...
const fs = require('fs');
const csv = require('csvtojson');
const readlineSync = require('readline-sync');

// Constants...
const theCSVfile = 'level_1.csv';
const theJSONfile = 'progress.json'
const startDt = new Date('8/10/2021');
const endDt = new Date('1/5/2022');

async function loadCSVintoArray(filename) {
    readlineSync.question('\nHit Enter to load the CSV file data into the Array...');
    const arr = await csv().fromFile(filename); // Only line of code requiring await...
    console.table(arr);
    return arr;
};

function createArray4AllDays(start, end, addCSVArr) {
    readlineSync.question('\nHit Enter to Load all days into arr, and add addCSVArr values......');
    const todayDt = new Date();
    let arr = [];
    let currDateObj = { Date: null, Level: 1, ProgPt: 0 };
    for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        let matchingNdx = addCSVArr.findIndex(e => e.Date === dt.toLocaleDateString());
        currDateObj.Date = dt.toLocaleDateString();
        if (dt > todayDt) {
            currDateObj.Level = null;
            currDateObj.ProgPt = null;
        } else if (matchingNdx >= 0) {
            currDateObj.Level = parseFloat(addCSVArr[matchingNdx].Level);
            currDateObj.ProgPt = parseFloat(addCSVArr[matchingNdx].ProgPt);
        }
        arr.push({ ...currDateObj });
    }
    console.table(arr);
    return arr;
}

function stringTheJsonArray(theArray) {
    readlineSync.question('\nHit Enter to stringify the Array...');
    turnToString = JSON.stringify(theArray);
    console.log(turnToString);
    return turnToString;
}

function writeToJson(theFile, jsonString) {
    readlineSync.question('\nHit Enter to write the stringafied Array to a json file...');
    fs.writeFileSync(theFile, jsonString);
    console.log('\nThe stringafied Array was saved in the file.');
}

async function main() {
    console.log('\033c');
    const csvArray = await loadCSVintoArray(theCSVfile); // Only function requiring await...
    const allDaysArray = createArray4AllDays(startDt, endDt, csvArray);
    const stringOfAllDaysArray = stringTheJsonArray(allDaysArray);
    writeToJson(theJSONfile, stringOfAllDaysArray);
}

main();