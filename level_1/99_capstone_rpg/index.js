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
    adjustHp(points) {
        this.hp += points;
        this.hp = Math.min(this.hp, this.maxHP);
    }
    attackDamage(attacked) { return Math.min(attacked.hp, randomIntegerBetween(this.minAttackValue, this.maxAttackValue)) }
    returnHealth() { return `health is now (${this.hp}/${this.maxHP})`; }
    showInventory() {
        console.log(`\n${this.name}'s inventory...`);
        console.table(this.inventory, ['name', 'hp']);
    }
    showHealth() { console.log(`\n${this.name}'s current health is: ${this.hp}/${this.maxHP}`); }
    // showKeys() {
    //     for (let [key, value] of Object.entries(this)) {
    //         console.log(key, value);
    //     }
    // }
}

// The Player Class...
class Player extends LivingThing {
    constructor(name) {
        super();
        this.name = name;
        this.inventory = [];
        this.thingType.push('Player');
    }
    static spawnCount = 1;
    addToInventory(theItem) { this.inventory.push(theItem); }
    removeFromInventory(theItemIndex) { this.inventory.splice(theItemIndex, 1); }
    eat() {
        this.showHealth();
        this.showInventory();
        console.log();
        let userResponse = parseInt(readlineSync.question('Enter the (index) number of item to Eat: '));
        if (isNaN(userResponse) || userResponse < 0 || userResponse > this.inventory.length) {
            readlineSync.question('Invalid selection, press Enter to Continue.');
            return;
        };
        if (!this.inventory[userResponse].thingType.includes('Food')) {
            let notFoodResponse = readlineSync.question(`${this.inventory[userResponse].name} is not food, enter (Y) if you still want to Eat this: `).toUpperCase();
            if (notFoodResponse == 'Y') {
                this.adjustHp(-this.hp);
                this.died('You ate non-food and it killed you.');
                return;
            }
            return;
        }
        if (!this.inventory[userResponse].thingType.includes('HumanLikeBeing')) {
            console.log(`${this.inventory[userResponse].name} is too much like a human, you dropped it in disgust.`);
            this.removeFromInventory(userResponse);
            return;
        }
        if (this.inventory[userResponse].hp > (this.maxHP - this.hp)) {
            let maxHealthResponse = readlineSync.question(`${this.inventory[userResponse].name} can increase health by ${this.inventory[userResponse].hp} but current ${this.returnHealth()} so some food will be wasted.\nEnter (Y) if you still want to Eat this: `).toUpperCase();
            if (maxHealthResponse != 'Y') return;
        }
        this.adjustHp(this.inventory[userResponse].hp);
        this.removeFromInventory(userResponse);
        console.log(`\nNow current ${this.returnHealth()}\n`);
        this.showInventory();
    }
    enemyAppears(chance, enemyList) {
        if (chance > Math.random()) return Math.floor(Math.random() * enemyList.length);
        return null;
    }
    attacks(enemyList, enemyIndex) {
        const enemyStartingHP = enemyList[enemyIndex].hp;
        console.log(`Your ${this.returnHealth()}...`);
        console.log(`\nThe ${enemyList[enemyIndex].name}'s ${this.returnHealth()}`);
        const damage = this.attackDamage(enemyList[enemyIndex]);
        enemyList[enemyIndex].adjustHp(-damage);
        console.log(`\n${this.name} inflicts ${damage} damage to the ${enemyList[enemyIndex].name}.`);
        if (enemyList[enemyIndex].hp <= 1000) {
            console.log(`\n!!! You killed the ${enemyList[enemyIndex].name} !!!`);
            this.inventory.push(...enemyList[enemyIndex].inventory);
            this.inventory.push(new DeadEnemy(enemyList[enemyIndex].name, enemyStartingHP));
            this.showInventory();
        }
        this.adjustHp(-1);
        console.log(`\nDuring your attack you lost 1 HP, your ${this.returnHealth()}...`);
        if (this.hp <= 0) this.died('Your attack caused 1 HP of damange, unforunately you only had 1 HP left.');
    }
    died(reason) {
        console.log(`\n!!! YOU DIED !!!\n${reason}`); return;
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
        if (.2 > Math.random()) this.inventory.push(new Apple);
        if (.01 > Math.random()) this.inventory.push(new Sword);
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
        this.thingType.push('Cyclops', 'HumanLikeBeing');
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
        this.name = this.constructor.name;
        this.thingType = ['NonLivingThing'];
    }
}

class Sword extends NonLivingThing {
    constructor() {
        super();
        this.hp = 50;
        this.minAttackValue = 30;
        this.maxAttackValue = 45;
        this.thingType.push('Weapon', 'Sword');
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
    }
    static spawnCount = 3;
}


//////////////////// FUNCTIONS //////////////////////////////////
function randomIntegerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// The stuff that happens when player encounters enemy
function enemyEncounter(thePlayer, enemyList, enemyIndex) {
    const startingEnemyHP = enemyList[enemyIndex].hp;
    console.log(`A ${enemyList[enemyIndex].name} has appeared!!!`);
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
            return `You killed the ${enemyList[enemyIndex].name}!\n` +
                `You gained all its HP and how have ${thePlayer.hp} HP.\n` +
                `${enemyList.length} enemies left.`;
        }
        enemyList[enemyIndex].attacks(thePlayer);
        if (thePlayer.hp <= 0) return `The ${enemyList[enemyIndex].name} killed you!`;
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



///////////////// NOW DO STUFF /////////////////////


console.log('\033c');
const playFieldItems = loadPlayField();
const player0 = playFieldItems.filter(e => e.thingType.includes('Player'))[0];
player0.name = 'Geoff';
// player0.adjustHp(-player0.hp+1)

// console.table(playFieldItems);

// do {
    console.log('\033c');
    playFieldItems[12].inventory.push(new Sword);
    playFieldItems[12].inventory.push(new CheeseBurger);
    playFieldItems[12].inventory.push(new Armor);
    player0.attacks(playFieldItems, 12);
    player0.eat();
    readlineSync.question('\nPress Enter to Continue.');
    player0.showInventory();
// } while (true);


// console.log(player0);
// console.table(playFieldItems.filter(e => e.thingType.includes('Enemy')));
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




