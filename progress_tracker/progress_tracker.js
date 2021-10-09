const fs = require('fs');
const readlineSync = require('readline-sync');

const loadJSONfile = fileName => fs.readFileSync(fileName);
const parseJSONdata = jsonData => JSON.parse(jsonData);

function getCumulativePts(currLev, currProgPt) {
    if (currLev === null || currProgPt === null) return null;
    // use reduce instead
    let cummPts = 0;
    for (let lev = 0; lev < currLev - 1; lev++) cummPts += progPtsPerLevel[lev];
    return cummPts + currProgPt;
}

function loadCumulativeProgPts(arr) {
    const retArr = [];
    arr.forEach(day => retArr.push({ ...day }));
    let maxPt = 0;
    retArr
        .sort((a, b) => new Date(a.Date) - new Date(b.Date))
        .map(day => day.Cumulative = (maxPt = Math.max(getCumulativePts(day.Level, day.ProgPt), maxPt)));
    return retArr;
}

function calcPointsPerDay(day) {
    const cDay = new Date(day.Date).getTime();
    const lDay = new Date(lastDay).getTime();
    return (getCumulativePts(7, 0) - day.Cumulative) / (Math.round((lDay - cDay) / 86400000) + 1);
}

function calcPointsPerWkDay(day) {
    const cDay = new Date(day.Date);
    const lDay = new Date(lastDay);
    let totNumWeekDays = 0;
    for (let dt = cDay; dt <= lDay; dt.setDate(dt.getDate() + 1)) if (dt.getDay() != 0 & dt.getDay() != 6) totNumWeekDays++;
    return (getCumulativePts(7, 0) - day.Cumulative) / totNumWeekDays;
}

function loadSchedProgPts(arr) {
    let retArr = [];
    arr.forEach(day => retArr.push({ ...day }));
    const schedProgPtPerDay = calcPointsPerDay(arr[0]);
    let ptAccumulator = 0;
    retArr
        .sort((a, b) => new Date(a.Date) - new Date(b.Date))
        .map(day => day.Scheduled = Math.round((ptAccumulator += schedProgPtPerDay) * 10) / 10)
    return retArr;
}

function loadReqPtsPerDay(arr) {
    let retArr = [];
    arr.forEach(day => retArr.push({ ...day }));
    retArr.sort((a, b) => new Date(a.Date) - new Date(b.Date))
    retArr.forEach(day => day.reqPtPerDay = Math.round(calcPointsPerDay(day) * 10) / 10);
    retArr.forEach(day => day.reqPtPerWkDay = Math.round(calcPointsPerWkDay(day) * 10) / 10);
    return retArr;
}

console.log('\033c');

const progPtsPerLevel = [91.5, 78, 89, 72.5, 80.5, 72];
let theArray = parseJSONdata(loadJSONfile('data.json'));
const lastDay = theArray.reduce((maxDt, day) => new Date(Math.max(Date.parse(day.Date), Date.parse(maxDt))).toLocaleDateString(), '1/1/1')

theArray = loadCumulativeProgPts(theArray);
theArray = loadSchedProgPts(theArray);
theArray = loadReqPtsPerDay(theArray);
console.table(theArray);

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