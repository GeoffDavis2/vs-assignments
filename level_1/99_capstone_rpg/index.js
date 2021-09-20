const readlineSync = require('readline-sync');

///////////////////// CLASSES ///////////////////////////////

// Base Class for every living thing in the game...
class LivingThing {
    constructor() {
        this.name = this.constructor.name;
        this.hp = 100;
        this.maxHP = 100;
        this.minAttackValue = 15;
        this.maxAttackValue = 30;
        this.thingType = ['LivingThing'];
    }
    attackDamage() { return randomIntegerBetween(this.minAttackValue, this.maxAttackValue) }
    returnHealth() { return `health is now (${this.hp} / ${this.maxHP})`; }
    showInventory() {
        console.log(`${this.name}'s current inventory...`);
        console.table(this.inventory, ['name', 'hp']);
    }
    showHealth() { console.log(`\n${this.name}'s current health is: ${this.hp}/${this.maxHP}`); }
}

// The Player Class...
class Player extends LivingThing {
    constructor(name) {
        super();
        this.name = name;
        this.inventory = [new Sword, new Armor, new CheeseBurger];
        this.thingType.push('Player');
    }
    static spawnCount = 1;
    addToInventory(theItem) { this.inventory.push(theItem); }
    removeFromInventory(theItemNdx) { this.inventory.splice(theItemNdx, 1); }
    eat() {
        this.showHealth();
        this.showInventory();
        console.log();
        let userResponse = parseInt(readlineSync.question('Enter the (index) number of item to Eat: '));
        if (isNaN(userResponse) || userResponse < 0 || userResponse > this.inventory.length - 1) {
            readlineSync.question('Invalid selection, press Enter to Continue.');
            return;
        };
        if (!this.inventory[userResponse].thingType.includes('Food')) {
            let notFoodResponse = readlineSync.question(`${this.inventory[userResponse].name} is not food, enter (Y) if you still want to Eat this: `).toUpperCase();
            if (notFoodResponse == 'Y') {
                this.hp = 0;
                this.died('You ate non-food and it killed you.');
                return;
            }
            return;
        }
        if (this.inventory[userResponse].thingType.includes('HumanLikeBeing')) {
            console.log(`${this.inventory[userResponse].name} is too much like a human, you dropped it in disgust.`);
            this.removeFromInventory(userResponse);
            return;
        }
        if (this.inventory[userResponse].hp > (this.maxHP - this.hp)) {
            let maxHealthResponse = readlineSync.question(`${this.inventory[userResponse].name} can increase health by ${this.inventory[userResponse].hp} but current ${this.returnHealth()} so some food will be wasted.\nEnter (Y) if you still want to Eat this: `).toUpperCase();
            if (maxHealthResponse != 'Y') return;
        }
        this.hp = Math.min(this.hp + this.inventory[userResponse].hp, this.maxHP);
        this.removeFromInventory(userResponse);
        this.showHealth();
        this.showInventory();
    }
    walk(playFldThings) {
        console.clear();
        console.log(`\nYou walk some.`);
        var encounteredThingNdx = randomIntegerBetween(1, playFieldList.length);
        // console.log(playFieldList[encounteredThingNdx].thingType);
        // let encounteredThingNdx = 1;

        if (playFieldList[encounteredThingNdx].thingType.includes('Enemy')) {
            this.encounterEnemy(playFieldList, encounteredThingNdx);
        }
        else if (playFieldList[encounteredThingNdx].thingType.includes('TreasureChest')) {
            console.log(`\nYou found a ${playFieldList[encounteredThingNdx].name}, its contents are added to your inventory.`);
            playFieldList[0].inventory.push(...playFieldList[encounteredThingNdx].inventory);
            playFieldList.splice(encounteredThingNdx, 1);
        } else {
            console.log(`\nYou found a ${playFieldList[encounteredThingNdx].name}, it has been added to your inventory.`);
            playFieldList[0].inventory.push(playFieldList[encounteredThingNdx]);
            playFieldList.splice(encounteredThingNdx, 1);
        }
    }
    encounterEnemy(playFieldList, enemyNdx) {
        console.log(`\nAn enemy ${playFieldList[enemyNdx].name} has appeared!!!`);
        let enemyStartingHP = playFieldList[enemyNdx].hp;
        do {
            userResponse = readlineSync.question('\nEnter "A" to Fight, "R" to Run away, "I" to Show invenotry, "H" to Show Health, or "E" to Eat: ').toUpperCase();
            switch (userResponse) {
                case 'A':
                    this.attacks(playFieldList, enemyNdx);
                    playFieldList[enemyNdx].attacks(this);
                    if (this.hp <= 0) { this.died(`You recieved serious wounds during you battle with the ${playFieldList[enemyNdx].name}.`); return;}
                    if (playFieldList[enemyNdx].hp <= 0) {
                        console.log(`\n!!! You killed the ${playFieldList[enemyNdx].name} !!!`);
                        this.inventory.push(...playFieldList[enemyNdx].inventory);
                        this.inventory.push(new DeadEnemy(playFieldList[enemyNdx].name, enemyStartingHP));
                        console.log(`\n${this.name} takes everything from the ${playFieldList[enemyNdx].name}`);
                        readlineSync.question('\nHit Enter to continue...');
                        return;
                    }
                    break;
                case 'R':
                    console.log('\nAre trying to run away.');
                    if (Math.random() < .7 - (this.inventory.length / 10)) {
                        console.log(`\nYou were able to run away.`);
                        return;
                    } else {
                        console.log('You were not able to run away.');
                        playFieldList[enemyNdx].attacks(this);
                        if (this.hp <= 0) { this.died(`You recieved serious wounds during you battle with the ${playFieldList[enemyNdx].name}.`); return;}
                        if (playFieldList[enemyNdx].hp <= 0) {
                            console.log(`\n!!! You killed the ${playFieldList[enemyNdx].name} !!!`);
                            this.inventory.push(...playFieldList[enemyNdx].inventory);
                            this.inventory.push(new DeadEnemy(playFieldList[enemyNdx].name, enemyStartingHP));
                            console.log(`\n${this.name} takes everything from the ${playFieldList[enemyNdx].name}`);
                            readlineSync.question('\nHit Enter to continue...');
                            return;
                        }                    }
                    break;
                case 'E':
                    this.eat();
                    break;
                case 'H':
                    this.showHealth();
                    playFieldList[enemyNdx].showHealth();
                    break;
                case 'I':
                    this.showInventory();
                    break;
            }
        } while (true);

    }
    attacks(playFldThings, attackedNdx) {
        console.log();
        this.showInventory();
        let userResponse = parseInt(readlineSync.question('\nEnter a valid (index) number of item to attack with, otherwise use your fists: '));
        if (isNaN(userResponse) || userResponse < 0 || userResponse > this.inventory.length - 1) {
            const damage = this.attackDamage();
            playFldThings[attackedNdx].hp -= damage;
            this.hp -= 1;
            console.log(`\n${this.name} punched the ${playFldThings[attackedNdx].name} and did ${damage} damage, but also hurt his fists and lost 1 HP.`);
            return;
        }
        if (!this.inventory[userResponse].thingType.includes('Weapon')) {
            let notFoodResponse = readlineSync.question(`\n${this.inventory[userResponse].name} is not weapon, enter (Y) if you still want to throw it: `).toUpperCase();
            if (notFoodResponse == 'Y') {
                console.log(`${this.name} threw the ${this.inventory[userResponse].name} at the ${playFldThings[attackedNdx].name} but inflicted no damage.`);
                this.removeFromInventory(userResponse);
                return;
            }
            return;
        };
        const damage = this.inventory[userResponse].attackDamage();
        playFldThings[attackedNdx].hp -= damage;
        this.inventory[userResponse].hp -= 1;
        console.log(`\n${this.name} attacked the ${playFldThings[attackedNdx].name} with a ${this.inventory[userResponse].name} and did ${damage} damage.`);
        if (this.inventory[userResponse].hp <= 0) {
            console.log(`The ${this.inventory[userResponse].name} is broken, you dropped it.`);
            this.removeFromInventory(userResponse);
        }
        return;
    }
    died(reason) {
        console.log(`\n${reason}\n!!! YOU DIED !!!`); return;
        // Do more here...
    }
}

// This Enemy base class...
class Enemy extends LivingThing {
    constructor(name) {
        super();
        this.thingType.push('Enemy');
        this.inventory = [];

        // Add some random loot...
        // To customize more, move this into extended enemy class so more powerfull enemies have better loot
        if (.2 > Math.random()) this.inventory.push(new Sword);
        if (.2 > Math.random()) this.inventory.push(new Armor);
        if (.7 > Math.random()) this.inventory.push(new Apple);
        if (.2 > Math.random()) this.inventory.push(new CheeseBurger);
        if (.1 > Math.random()) this.inventory.push(new ThanksGivingTurkey);
    }
    attacks(attackedPlayer) {
        let attackDamage = this.attackDamage()
        let attackedInventory = attackedPlayer.inventory;
        let armorNdx = attackedInventory.findIndex(e => e.thingType.includes('Armor'));

        console.log(`A ${this.name} attacked you with ${attackDamage} damage.`);
        while (armorNdx >= 0 && attackDamage > 0) {
            attackedInventory[armorNdx].hp -= attackDamage;
            console.log(`Fortunately your ${attackedInventory[armorNdx].name} protected you.`);
            attackDamage = -Math.min(attackedInventory[armorNdx].hp, 0);
            if (attackedInventory[armorNdx].hp <= 0) {
                console.log(`Your ${attackedInventory[armorNdx].name} is now useless so you dropped it.`);
                console.log(`There is still ${attackDamage} damage to absorb.`);
                attackedInventory.splice(armorNdx, 1);
                armorNdx = attackedInventory.findIndex(e => e.thingType.includes('Armor'));
            }
        }
        console.log(`The remaining ${attackDamage} damage will reduce your health.`);
        attackedPlayer.hp -= attackDamage;
        this.hp -= 1;
    }
}

class Bugbear extends Enemy {
    constructor() {
        super();
        this.maxHP = 50;
        this.hp = 50;
        this.minAttackValue = 10;
        this.maxAttackValue = 20;
        this.thingType.push('Bugbear');
    }
    static spawnCount = 7;
}

class Cyclops extends Enemy {
    constructor() {
        super();
        this.minAttackValue = 25;
        this.maxAttackValue = 50;
        this.thingType.push('Cyclops', 'HumanLikeBeing');
    }
    static spawnCount = 5;
}

class Dragon extends Enemy {
    constructor() {
        super();
        this.hp = 200;
        this.maxHP = 200;
        this.minAttackValue = 50;
        this.maxAttackValue = 75;
        this.thingType.push('Dragon');
    }
    static spawnCount = 1;
}

// Base Class for every non living thing in the game...
class NonLivingThing {
    constructor() {
        this.name = this.constructor.name;
        this.thingType = ['NonLivingThing'];
    }
}

class Sword extends NonLivingThing {
    constructor() {
        super();
        this.hp = 50;
        this.maxHP = 50;
        this.minAttackValue = 30;
        this.maxAttackValue = 45;
        this.thingType.push('Weapon', 'Sword');
    }
    attackDamage() { return randomIntegerBetween(this.minAttackValue, this.maxAttackValue) }
}

class Armor extends NonLivingThing {
    constructor() {
        super();
        this.hp = 20;
        this.thingType.push('Armor');
    }
}

class Food extends NonLivingThing {
    constructor() {
        super();
        this.thingType.push('Food');
    }
}

class Apple extends Food {
    constructor() {
        super();
        this.hp = 10;
        this.thingType.push('Apple');
    }
    static spawnCount = 20;
}

class CheeseBurger extends Food {
    constructor() {
        super();
        this.hp = 25;
        this.thingType.push('CheeseBurger');
    }
    static spawnCount = 10;
}

class ThanksGivingTurkey extends Food {
    constructor() {
        super();
        this.hp = 75;
        this.thingType.push('ThanksGivingTurkey');
    }
    static spawnCount = 4;
}

class DeadEnemy extends Food {
    constructor(name, hp) {
        super();
        this.name = 'dead' + name;
        this.hp = Math.ceil(hp * .75);
    }
}

class TreasureChest extends NonLivingThing {
    constructor() {
        super();
        this.inventory = [];
        this.thingType.push('TreasureChest');
        if (.7 > Math.random()) this.inventory.push(new Sword);
        if (.7 > Math.random()) this.inventory.push(new Armor);
        if (1 > Math.random()) this.inventory.push(new Apple);
        if (.7 > Math.random()) this.inventory.push(new CheeseBurger);
        if (.1 > Math.random()) this.inventory.push(new ThanksGivingTurkey);
    }
    showInventory() {
        console.log(`The ${this.name} contains...`);
        console.table(this.inventory, ['name']);
    }
    static spawnCount = 5;
}


//////////////////// FUNCTIONS //////////////////////////////////
function randomIntegerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getAllObjects(playFldThings, thingType) {
    return playFldThings.filter(e => e.thingType.includes(thingType));
}

function greetUser () {
    console.clear();
    console.log('Greetings!!!');
    console.log();
    console.log('This a RPG game that takes advantage of Object Oriented Programming and Inheritance.');
    console.log();
    console.log('Every Oject in this game is created from 1 of 2 base/parent classes (living and non-living).');
    console.log();
    console.log('Your goal is to survive long enough to kill all the enemies and take their loot.');
    return readlineSync.question('Enter your name: ');
    
}

// Do this dynamically?, somehow get list of all Classes that are extended by Enemy class? 
function loadPlayField() {
    const itemList = [];
    for (let i = 1; i <= Player.spawnCount; i++) itemList.push(new Player);
    for (let i = 1; i <= Bugbear.spawnCount; i++) itemList.push(new Bugbear);
    for (let i = 1; i <= Cyclops.spawnCount; i++) itemList.push(new Cyclops);
    for (let i = 1; i <= Dragon.spawnCount; i++) itemList.push(new Dragon);
    for (let i = 1; i <= Apple.spawnCount; i++) itemList.push(new Apple);
    for (let i = 1; i <= CheeseBurger.spawnCount; i++) itemList.push(new CheeseBurger);
    for (let i = 1; i <= ThanksGivingTurkey.spawnCount; i++) itemList.push(new ThanksGivingTurkey);
    for (let i = 1; i <= TreasureChest.spawnCount; i++) itemList.push(new TreasureChest);
    return itemList;
}



///////////////// NOW DO STUFF /////////////////////


console.log('\033c');
const playFieldList = loadPlayField();
playFieldList[0].name = greetUser();


let enemyList = playFieldList.filter(e => e.thingType.includes('Enemy'));
while (enemyList.length >= 0) {
    console.log('\033c');
    console.log('Remaining Enemies...');
    console.table(getAllObjects(playFieldList,'Enemy'),['name','hp']);
    console.log();

    userResponse = readlineSync.question('Enter "W" to Walk, "I" to Show invenotry, "H" to Show Health, or "E" to Eat: ').toUpperCase();
    switch (userResponse) {
        case 'E':
            playFieldList[0].eat();
            break;
        case 'H':
            playFieldList[0].showHealth();
            break;
        case 'I':
            playFieldList[0].showInventory();
            break;
        case 'W':
            playFieldList[0].walk(playFieldList);
            break;
    }
    readlineSync.question('\n\n\nHit Enter to continue...');
};




// todo
//      Take classes and put in separate file (export/import)
//      
//      add sleep as option (walk, eat, sleep)
//          increase of hp, but no chance of encountering food/loot (only enemies)
//      make function to display various stuff (player, enemy, enemies, etc)


// NEXT LEVEL STUFF!!!
//      create map of game and display on screen
//          keep showing where you have been
//          scrool up/down/left/right on map
//          food types
//      Create class opject type to help walk faster without loosing hp
//          shoes / bicycles / horse / carriage / deloreon from back to the future (takes gas and/or with fusion reactor any biological stuff)
//      add energy, endurance to player (and enemy?) class (energy is consume)
//      endurance allows you to go further when you walk, endurance goes up when you rest / goes down when you 
