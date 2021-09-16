const readlineSync = require('readline-sync');

console.log('\033c');

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Avatar {
    constructor() {
        this.hp = 100;
        this.minAttackValue = 10;
        this.maxAttackValue = 30;
    }
    adjustHp(points) {
        this.hp += points;
    }
    attacks(attacked) {
        const damage = Math.min(attacked.hp, randomInteger(this.minAttackValue, this.maxAttackValue));
        attacked.adjustHp(-damage);
        console.log(`${this.constructor.name} inflicts ${damage} damage to ${attacked.constructor.name} which now has ${attacked.hp} HP left.`);
        if (attacked.hp <= 0) console.log();
    }
}

class Player extends Avatar {
    constructor(name) {
        super();
        this.name = name;
        this.inventory = [];
        // Overwrite basic Avatar Min/Max Attack Value
        // this.minAttackValue = 50;
        // this.maxAttackValue = 70;

        // Overwrite starting HP
        // this.hp = 200;
    }
    addToInventory(theItem) {
        this.inventory.push(theItem);
    }
    takeFromInventory(theItem) {
        this.inventory.splice(this.inventory.indexOf(theItem), 1);
    }
    enemyAppears(chance, enemyList) {
        if (chance > Math.random()) return new enemyList[Math.floor(Math.random() * enemyList.length)];
        return null;
    }
}

class Dragon extends Avatar {
    constructor() {
        super();
        // Overwrite basic Avatar Min/Max Attack Value
        // this.minAttackValue = 50;
        // this.maxAttackValue = 70;

        // Overwrite starting HP
        // this.hp = 200;
    }
}

class Bugbear extends Avatar {
    constructor() {
        super();
        // Overwrite basic Avatar Min/Max Attack Value
        // this.minAttackValue = 50;
        // this.maxAttackValue = 70;

        // Overwrite starting HP
        // this.hp = 200;
    }

}

class Cyclops extends Avatar {
    constructor() {
        super();
        // Overwrite basic Avatar Min/Max Attack Value
        // this.minAttackValue = 50;
        // this.maxAttackValue = 70;

        // Overwrite starting HP
        // this.hp = 200;
    }
}

function battle(thePlayer, theEnemy) {
    console.log(`Let the BATTLE begin!!!\n`);
    do {
        thePlayer.attacks(theEnemy);
        if (theEnemy.hp <= 0) return `You killed the ${theEnemy.constructor.name}!`;
        theEnemy.attacks(thePlayer);
        if (thePlayer.hp <= 0) return `The ${theEnemy.constructor.name} killed you!`;
        console.log();
        // userResponse = readlineSync.question("Press Enter for the next round...");
    } while (true);
};

const player1 = new Player('Geoff');
const enemyList = [Dragon, Bugbear, Cyclops];

// const newEnemy = new Dragon();




do {
    userResponse = readlineSync.question('Hit "W" to Walk: ');
    if (userResponse = 'W') {
        const newEnemy = player1.enemyAppears(1 / 4, enemyList);
        if (newEnemy) {
            console.log(`A ${newEnemy.constructor.name} has appeared!!!`);
            console.log(battle(player1, newEnemy));
        }
        else console.log('Whew!!! You walked without encountering any enemies.');
    }
    console.log();
} while (true);