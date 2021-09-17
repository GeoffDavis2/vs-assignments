const readlineSync = require('readline-sync');

///////////////////// CLASSES ///////////////////////////////
// Base Class for every living thing in the game...
class LivingThing {
    constructor() {
        this.hp = 100;
        this.minAttackValue = 15;
        this.maxAttackValue = 30;
        this.thingType = ['LivingThing'];
    }
    adjustHp(points) {
        this.hp += points;
    }
    attacks(attacked) {
        const damage = Math.min(attacked.hp, randomIntegerBetween(this.minAttackValue, this.maxAttackValue));
        attacked.adjustHp(-damage);
        console.log(`${this.constructor.name} inflicts ${damage} damage to ${attacked.constructor.name} which now has ${attacked.hp} HP left.`);
        if (attacked.hp <= 0) console.log();
    }
    showKeys() {
        for (let [key, value] of Object.entries(this)) {
            console.log(key, value);
        }
    }
}

// The Player Class...
class Player extends LivingThing {
    constructor(name) {
        super();
        this.name = name;
        this.inventory = [];
        this.thingType.push('Player');
        // Overwrite starting basic LivingThing Min/Max Attack Values...
        // this.minAttackValue = 50;
        // this.maxAttackValue = 70;

        // Overwrite starting basic LivingThing HP...
        // this.hp = 200;
    }
    static spawnCount = 1;    
    addToInventory(theItem) { this.inventory.push(theItem); }
    takeFromInventory(theItem) { this.inventory.splice(this.inventory.indexOf(theItem), 1); }
    increaseMinAttack(val) { this.minAttackValue += val; }
    increaseMazAttack(val) { this.maxAttackValue += val; }
    increaseHP(val) { this.HP += val; }
    enemyAppears(chance, enemyList) {
        if (chance > Math.random()) return Math.floor(Math.random() * enemyList.length);
        return null;
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
        if(.2 > Math.random()) this.inventory.push(new Apple);
        if(.01 > Math.random()) this.inventory.push(new Sword);
    }
}

class Bugbear extends Enemy {
    constructor() {
        super();
        // Overwrite basic LivingThing Min/Max Attack Value
        this.minAttackValue = 10;
        this.maxAttackValue = 20;

        // Overwrite starting HP
        this.hp = 50;

        // Not needed now but just for consitency...
        this.thingType.push('Bugbear');
    }
    static spawnCount = 10;
}

class Cyclops extends Enemy {
    constructor() {
        super();
        // Overwrite basic LivingThing Min/Max Attack Value
        this.minAttackValue = 25;
        this.maxAttackValue = 50;

        // Overwrite starting HP
        this.hp = 100;

        // Not needed now but just for consitency...
        this.thingType.push('Cyclops');
        this.thingType.push('HumanLikeBeing');
    }
    static spawnCount = 5;
}

class Dragon extends Enemy {
    constructor() {
        super();
        // Overwrite basic LivingThing Min/Max Attack Value
        this.minAttackValue = 50;
        this.maxAttackValue = 75;

        // Overwrite starting HP
        this.hp = 200;

        // Not needed now but just for consitency...
        this.thingType.push('Dragon');
    }
    static spawnCount = 1;
}

// Base Class for every non living thing in the game...
class NonLivingThing {
    constructor() {
        this.thingType = ['NonLivingThing'];
    }
}

class Sword extends NonLivingThing {
    constructor() {
        super();
        this.hp = 50;
        this.minAttackValue = 30;
        this.maxAttackValue = 45;
        this.thingType.push('Sword');
    }
}

class Armor extends NonLivingThing {
    constructor() {
        super();
        this.hp = 50;
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
        this.hp = 2;
        this.thingType.push('Apple');
    }
    static spawnCount = 10;
}

class CheeseBurger extends Food {
    constructor() {
        super();
        this.hp = 4;
        this.thingType.push('CheeseBurger');
    }
    static spawnCount = 5;
}

class ThanksGivingTurkey extends Food {
    constructor() {
        super();
        this.hp = 10;
        this.thingType.push('ThanksGivingTurkey');
    }
    static spawnCount = 2;
}

class TreasureChest extends NonLivingThing {
    constructor() {
        super();
        this.inventory = [];
        this.thingType.push('TreasureChest');
    }
    static spawnCount = 3;
}


//////////////////// FUNCTIONS //////////////////////////////////
function randomIntegerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// All the stuff that happens when player encounters enemy
function enemyEncounter(thePlayer, enemyList, enemyIndex) {
    const startingEnemyHP = enemyList[enemyIndex].hp;
    console.log(`A ${enemyList[enemyIndex].constructor.name} has appeared!!!`);
    console.log(enemyList[enemyIndex]);
    console.log();
    console.log(thePlayer);
    console.log();
    userResponse = readlineSync.question('Hit "R" to try and Run away!: ').toUpperCase();
    if (userResponse == 'R' && true) {
        thePlayer.adjustHp(-10);
        console.log();
        return `You ran away and lost 10 HP.`
    }
    console.log(`Let the BATTLE begin!!!\n`);
    console.log();
    do {
        thePlayer.attacks(enemyList[enemyIndex]);
        if (enemyList[enemyIndex].hp <= 0) {
            enemyList.splice(enemyIndex, 1);
            thePlayer.adjustHp(startingEnemyHP);
            return `You killed the ${enemyList[enemyIndex].constructor.name}!\n` +
                `You gained all its HP and how have ${thePlayer.hp} HP.\n` +
                `${enemyList.length} enemies left.`;
        }
        enemyList[enemyIndex].attacks(thePlayer);
        if (thePlayer.hp <= 0) return `The ${enemyList[enemyIndex].constructor.name} killed you!`;
        console.log();
        // userResponse = readlineSync.question("Press Enter for the next round...");
    } while (true);
};

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

console.log('\033c');
const playFieldItems = loadPlayField();
const player0 = playFieldItems.filter(e => e.thingType.includes('Player'))[0];
player0.name = 'Geoff';

// console.log(player0);
console.table(playFieldItems.filter(e => e.thingType.includes('Enemy')));
// console.table(playFieldItems.filter(e => e.thingType.includes('Food')));
// console.table(playFieldItems.filter(e => e.thingType.includes('Player')));
// console.table(playFieldItems.filter(e => e.thingType.includes('Bugbear')));

// let userResponse = '';
// do {
//     console.log();
//     console.log('Your Stats');
//     console.log(player0);
//     console.log();
//     console.log('Enemies Left');
//     console.table(enemies);
//     console.log();
//     userResponse = readlineSync.question('Hit "W" to Walk or "E" to Eat: ').toUpperCase();
//     console.log('\033c');
//     if(userResponse == 'E') {
//         player0.adjustHp(1);
//         continue;
//     }
//     if (userResponse == 'W') {
//         const newEnemyIndex = player0.enemyAppears(1 / 3, enemies);
//         if (newEnemyIndex) console.log(enemyEncounter(player0, enemies, newEnemyIndex));
//         else {
//             player0.adjustHp(-1);
//             console.log('You walked some and did not encounter any enemies, but did lose 1 HP.');
//         }
//     }
// } while (enemies.length > 0);



// todo
//      add min required stuff from assignment
//      add sleep as option (walk, eat, sleep)
//          increase of hp, but no chance of encountering food/loot (only enemies)
//      add posiblity to encounter treasure chest or food instead
//          automatically add content of treasure chest, or food items
//      if you kill a non human like enemy add it as food to your inventory (based on hp) before removing from playfield
//      add loop during battle so each round you can decide if to attack (with fist or sword) or try to run away
//          chance to run away is higher with less inventory
//      add same chance to run away being effected by inventory when first encountering enemy
//      add Player method to eat from inventory
//          present list of food items in inventory
//          transfer hp from food item to player
//          remove item from inventory
//      add code so attacking with sword increase attack points
//          if you have a sword, automatically use it else attack with fists which reduces player hp???
//          if no sword automatically attack with fist
//          each attack reduces hp of sword, but does not reduce hp of player
//          when sword attack is at zero
//              remove that sword
//      add code for armor
//          so being attacked with armor reduces hp from armor instead of you
//          til armor hp is zero, then rest of attack goes to next armor if you have it
//          when armor hp goes to zero remove it from inventory 
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




