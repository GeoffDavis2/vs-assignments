console.log('\033c');

// Requires...
const fs = require('fs');
const csv = require('csvtojson');
const readlineSync = require('readline-sync');

// Constants...
const theCSVfile = 'level_1.csv';
const startDt = new Date(2021, 7, 10);
const endDt = new Date(2022, 0, 5);

async function loadCSVintoArray(filename) {
    // readlineSync.question('\nHit Enter to load the CSV file data into the Array...');
    const arr = await csv().fromFile(filename); // Only line of code requiring await...
    // console.table(arr);
    return arr;
};

function createArray4AllDays (start, end) {
    // console.log('\nLoad all days into arr...');
    const arr = [];
    for(let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) arr.push({Date:dt.toLocaleDateString(), Level:null, ProgPt:null});
    // console.table(arr);
    return arr;
}

function loadCSVarrayToAllDays(csvArr, allDaysArr) {
    // Add something to sort csvArr on Date property first
    const maxDate = csvArr[csvArr.length-1].Date
    allDaysArr.forEach(allDtsElement => {
        // Change this to a regular for loop so I can go from allDaysArr[0] date to maxDate
        console.log(allDtsElement);
        if(Date.parse(allDtsElement.Date) > Date.parse(maxDate)) break doneForEach;
        // let i = allDaysArr.findIndex(e => e.Date === csvElmt.Date);
        // allDaysArr[i].Level = csvElmt.Level;
        // allDaysArr[i].ProgPt = csvElmt.ProgPt;
    });
    doneForEach:
}

async function main() {
    console.log('\033c');
    const csvArray = await loadCSVintoArray(theCSVfile); // Only function requiring await...
    const allDaysArray = createArray4AllDays(startDt, endDt);
    loadCSVarrayToAllDays(csvArray, allDaysArray);
    // console.table(allDaysArray);
    //fill in data for missing days
    // stringify
    // write to file


    // dataArray = parseJsonArray(dataArray);
    // const stringOfArray = stringTheJsonArray(dataArray);
    // writeToJson('level_1.json', stringOfArray);
}

main();