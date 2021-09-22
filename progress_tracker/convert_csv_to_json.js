const fs = require('fs');
const csv = require('csvtojson');

console.log('\033c');

const doSyncStuff = async () => {
    const jsonArray = await csv().fromFile('progress.csv');
    for(let i = 0; i<jsonArray.length; i++) {
        jsonArray[i].Level = parseInt(jsonArray[i].Level);
        jsonArray[i].ProgPt = parseFloat(jsonArray[i].ProgPt);
    }
    turnToString = await JSON.stringify(jsonArray);
    fs.writeFileSync('level_1.json', turnToString);
};

doSyncStuff();