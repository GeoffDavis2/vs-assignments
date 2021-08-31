const readlineSync = require('readline-sync');
var alive = true;
var haveKey = false;
var escaped = false;
var num1 = 0;

console.clear();

do {

    console.log("Here are your options...");
    console.log("1. Put hand in hole");
    console.log("2. Find the key, or");
    console.log("3. Open the door");
    do opt = readlineSync.question("Enter a number for the action to perform: "); while (isNaN(opt));
    console.log("\n");

    if (opt === "1") {
        console.log("You put your hand in the hole, but feel a sting.");
        console.log("It appears you were bitten by the Wood Beast.");
        console.log("Death is certain, but only after tortured madness.");
        alive = false;
    }

    if (opt === "2") {
        if (haveKey) console.log("You already have the key.");
        else {
            haveKey = true;
            console.log("You have found the key.");
        }
    }

    if (opt === "3" && !haveKey) console.log("You cannot open the door without the key.");
    
    if (opt === "3" && haveKey) {
        console.log("You have opened the door and stepped through.");
        escaped = true;
    }

    console.log("\n");

} while (alive && !escaped);

if (!alive) console.log("You have died.");

if (escaped) console.log("You have escaped.");

