////////////////////////////////////////////////////////////
// Data Types - Create variable for each data type below //

//String - denoted/represented by " " ' ' - they are great for words,language
console.log("Strings");
let fName = 'Geoff';
let lName = "Davis";
console.log("My name is", fName, lName);
console.log(".");
console.log(".");

//Number - anything of numerical value - just a number
console.log("Numbers");
const currYear = 2021;
let minAge = 21;
let maxAge = 60;
console.log("I am older than", minAge, "and younger than", maxAge);
console.log(".");
console.log(".");

//Boolean - true or false
console.log("Booleans");
let isWalrus = false;
let isHuman = true;
console.log("I am a Walrus:", isWalrus);
console.log("I am a Human:", isHuman);
console.log(".");
console.log(".");

//Array - use bracket notation [] here with the array you created use 
console.log("Arrays");
let favoriteHobbies = ["Sailing", "Flying", "Coding", "Playing Drums", "Playing Computer Games"]
let i = Math.floor(Math.random() * favoriteHobbies.length);
console.log("I like", favoriteHobbies[i]);
console.log(".");
console.log(".");


///////////////////////////////////////////////////////////////////
//Object -  use dot notation . here with the object you created. //
//Create an object - use each datatype as a property
//Use dot and bracket notation to display your knowledge
console.log("Objects");
let me = {
    goal: "Backend Developer",
    firstName: fName,
    middleName: "Vautier",
    lastName: lName,
    birthYear: 1966
}

me.age = currYear - me.birthYear;

let randomBooleanPropertyName = "amIHuman";
me[randomBooleanPropertyName] = isHuman;   // this is a good reason to use Bracket Notation

me.hobbies = favoriteHobbies;

console.log("I am", me.firstName, me.lastName);
console.log("I am", me.age);

i = Math.floor(Math.random() * favoriteHobbies.length);
console.log("I also like", me.hobbies[i]);

me.favoriteColor = "Blue";
console.log(".");
console.log(".");


/////////////////////////////////////////
//       Condtional Statement          //
//if (this is true){ execute this code }
//  else if (this is true) {do this code instead!}
//  else {for anything else do this here!}
console.log("Conditionals");
var color = "Red";
if(me.favoriteColor === color) {
    console.log(color, "is my favorite color")
} else if (color === "Red") {
    console.log("The variable was \"Red\" but", me.favoriteColor, "is my vavorite color")
} else {
    console.log ("Keep trying different colors, one of them will be my favorite")
}
console.log(".");
console.log(".");


//////////////////////////////////////////////////////////
//                        For Loops                     //
console.log("For Loops");
console.log("These are my favorite hobbies...")
for(let i = 0; i < me.hobbies.length; i++) {
    console.log(me.hobbies[i]);
}
console.log(".");
console.log(".");





/////////////////////////////////////////////////////////
//level 0 curriculm last 7 videos cover this material "DOM"
console.log("Interacting with the DOM");

//1. Create button with an ID on it in HTML
    // See capstone.html file...

//2. Call Button into JS using document and getting element by its ID
    // I'm not sure what you mean by "Call Button into JS"???
    
//3. Set that button equal to a variable
let theButton = document.getElementById("daButton");

//4. with that variable use dot notation to access the addeventlistener method
theButton.addEventListener("click", handleButtonClick);

function handleButtonClick() {
    console.log("You clicked me!!!");
    return;
}
