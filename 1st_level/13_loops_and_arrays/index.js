// #1
var officeItems = ["stapler", "monitor", "computer", "desk", "lamp", "computer", "lamp", "stapler", "computer",  "computer"];
var computerCount = 0;

for(i=0; i<=officeItems.length; i++) if(officeItems[i]==='computer') computerCount++;
console.log(computerCount);

// #1 using array methods
console.log(officeItems.filter(n => n === 'computer').length);

// #2
var peopleWhoWantToSeeMadMaxFuryRoad = [
    {
      name: "Mike",
      age: 12,
      gender: "male"
    },{
      name: "Madeline",
      age: 80,
      gender: "female"
    },{
      name: "Cheryl",
      age: 22,
      gender: "female"
    },{
      name: "Sam",
      age: 30,
      gender: "male"
    },{
      name: "Suzy",
      age: 4,
      gender: "female"
    }
  ];

for(i=0; i<peopleWhoWantToSeeMadMaxFuryRoad.length; i++) {
    if(peopleWhoWantToSeeMadMaxFuryRoad[i].age >= 18) console.log(peopleWhoWantToSeeMadMaxFuryRoad[i].name + ' is old enough')
    else console.log(peopleWhoWantToSeeMadMaxFuryRoad[i].name + ' not old enough');
};

// #2 using array methods
peopleWhoWantToSeeMadMaxFuryRoad.map(x => {
if(x.age >= 18) console.log(x.name + ' is old enough')
else console.log(x.name + ' not old enough');
});

// Bonus Challenge
const theArray = [2, 3, 2];
let totToggles = 0;

theArray.map(v => totToggles+=v);
if(totToggles % 2) console.log('The light is on.')
else console.log('The light is off.');
