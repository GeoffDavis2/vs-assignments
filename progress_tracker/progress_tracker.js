const fs = require('fs');

const theArray = JSON.parse(fs.readFileSync('data.json'));
const totPts = 472;

const schedPtsPerDay =
    totPts / ((
        (new Date(theArray[theArray.length - 1].Date).getTime()) -
        (new Date(theArray[0].Date).getTime())
    ) / 86400000 + 1);

function calcPointsPerDay(day) {
    if (day.Level === null || day.TotProgPts === null) return null;
    return Math.round((totPts - day.TotProgPts) / ((
        (new Date(theArray[theArray.length - 1].Date).getTime()) -
        (new Date(day.Date).getTime())
    ) / 86400000 + 1) * 10) / 10;
}

function calcPointsPerWkDay(day) {
    if (day.Level === null || day.ProgPt === null) return null;
    let totNumWeekDays = 0;
    for (
        let dt = (new Date(day.Date));
        dt <= (new Date(theArray[theArray.length - 1].Date));
        dt.setDate(dt.getDate() + 1)
    )
        if (dt.getDay() != 0 & dt.getDay() != 6) totNumWeekDays++;
    return Math.round((totPts - day.TotProgPts) / totNumWeekDays * 10) / 10;
}

let scheduled = 0;
theArray.forEach(day => {
    scheduled += schedPtsPerDay;
    day.Scheduled = Math.round(scheduled);
    day.ReqPtPerDay = calcPointsPerDay(day);
    day.ReqPtPerWkDay = calcPointsPerWkDay(day);
})

console.log('\033c');
console.table(theArray);
// fs.writeFileSync('data.json', JSON.stringify(theArray));
