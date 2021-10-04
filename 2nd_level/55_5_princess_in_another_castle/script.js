class Player {
    constructor() {
        this.name = '';
        this.totalCoins = 0;
        this.status = 'Big';
        this.hasStar = false;
        this.gameActive = true;
    }

    setName(namePicked) {
        this.name = namePicked;
    }

    gotHit() {
        switch (this.status) {
            case 'Powered Up': this.status = 'Big'; break;
            case 'Big': this.status = 'Small'; break;
            case 'Small': this.status = 'Dead'; this.gameActive=false; break;
        }
    }

    gotPowerup() {
        switch (this.status) {
            case 'Small': this.status = 'Big'; break;
            case 'Big': this.status = 'Powered Up'; break;
            case 'Powered Up': this.hasStar = true; break;
        }
    }

    addCoin() {
        this.totalCoins++;
    }

    print() {
        console.log(`Name: ${this.name}`);
        console.log(`Coins: ${this.totalCoins}`);
        console.log(`status: ${this.status}`);
        console.log(`Has Star: ${this.hasStar}\n`);
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playRound() {
    switch (getRandomInt(0, 2)) {
        case 0: console.log('Got Hit...'); me.gotHit(); break;
        case 1: console.log('Got Powerup...'); me.gotPowerup(); break;
        case 2: console.log('Got Coin...'); me.addCoin(); break;
    }
    me.print();
    if (!me.gameActive) clearInterval(id);
}

console.log('\033c');
const me = new Player();
me.setName('Mario');

me.print();
var id = setInterval(playRound, 2000);