console.log('\033c');

class Character {
    constructor() {
        this.name = 'Geoff';
        this.hp = 100;
    }
    adjustHp(points) {
        this.hp += points;
    }
}

class Player extends Character {
    constructor() {
        super();
        this.inventory = [];        
    }
    addToInventory(theItem) {
        this.inventory.push(theItem);
    }
}

let me = new Player();


console.log(me);
me.adjustHp(4);
console.log(me);
me.adjustHp(-14);
console.log(me);
me.addToInventory('Spear');
console.log(me);