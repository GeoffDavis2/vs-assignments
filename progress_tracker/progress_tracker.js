const fs = require('fs');
const readlineSync = require('readline-sync');


function loadJSONfile(fileName) {
    // console.log('\nLoad the json file to jsonData...');
    // readlineSync.question('\nHit Enter to load the json file to jsonData...');
    const jsonData = fs.readFileSync(fileName);
    // console.log(jsonData);
    return jsonData;
}

function parseJSONdata(jsonData) {
    // console.log('\n Convert jsonData to csvArray...');
    // readlineSync.question('\nHit Enter to convert jsonData to csvArray...');
    const theArray = JSON.parse(jsonData);
    // console.table(theArray);
    return theArray;
}

function getCumulativePt(currLev, currProgPt) {
    if (currLev === null || currProgPt === null) return null;
    const progPtPerLevel = [91.5, 78, 89, 72.5, 80.5, 72];
    let cummPts = 0;
    for (let l = 0; l < currLev - 1; l++) cummPts += progPtPerLevel[l];
    return cummPts + currProgPt;
}

function loadCumulativeProgPts(arr) {
    let retArr = [];
    arr.forEach(day => retArr.push({ ...day, Cumulative: getCumulativePt(day.Level, day.ProgPt) }));
    return retArr;
}

function loadSchedProgPts(arr) {
    const totalProgPts = getCumulativePt(7, 0);
    const totNumDays = arr.length;
    const schedProgPtPerDay = totalProgPts / totNumDays;
    let retArr = [];
    let rawSched = 0;
    arr.forEach(day => {
        rawSched += schedProgPtPerDay;
        retArr.push({ ...day, Scheduled: Math.round(rawSched * 10) / 10 })
    });
    return retArr;
}

function loadReqPtsPerDay(arr) {
    const totalProgPts = getCumulativePt(7, 0);
    let totNumDays = 0;
    let totNumWeekDays = 0;
    let retArr = [];
    arr.reverse().forEach(day => {
        totNumDays++;
        let dow = new Date(day.Date).getDay();
        if (dow != 0 & dow != 6) totNumWeekDays++
        ppd = Math.round((totalProgPts - day.Cumulative) / totNumDays * 10) / 10;
        ppwd = Math.round((totalProgPts - day.Cumulative) / totNumWeekDays * 10) / 10;
        retArr.unshift({...day, PtPerDay:ppd, PtPerWkDay:ppwd});
    })
    return retArr;
}

function main() {
    console.log('\033c');
    let theArray = parseJSONdata(loadJSONfile('progress.json'));
    theArray = loadCumulativeProgPts(theArray);
    theArray = loadSchedProgPts(theArray);
    theArray = loadReqPtsPerDay(theArray);
    console.table(theArray);
}

main();

// readlineSync.question('\nHit Enter to convert jsonData to csvArray...');
// console.table(theArray);


// const diffInDays = Math.round(diffInTime / oneDay);


// turnedToString = JSON.stringify(progArray);
    // console.log(turnedToString);

// readlineSync.question('\nHit Enter to write json file...');

// fs.writeFileSync('alldays.json', turnedToString);

// readlineSync.question('\nHit Enter to continue...');



// console.table(theArray);
// let ndx = readlineSync.question('\nEnter the index number: ');
// let dt = readlineSync.question('\nEnter the date string: ');
// let lev = readlineSync.question('\nEnter the level: ');
// let progPt = readlineSync.question('\nEnter the progress point: ');

// theArray[ndx].Date = dt;
// theArray[ndx].Level = parseFloat(lev);
// theArray[ndx].ProgPt = parseFloat(progPt);
// console.table(theArray);