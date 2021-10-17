import React from 'react';

import Die from './Die';

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class DiceBox extends React.Component {
    constructor() {
        super();
        this.state = {
            rollsLeft: 3,
            fiveDice: [
                { val: 0, lock: false },
                { val: 0, lock: false },
                { val: 0, lock: false },
                { val: 0, lock: false },
                { val: 0, lock: false }
            ]
        };
        this.lockDie = this.lockDie.bind(this);
        this.rollFiveDice = this.rollFiveDice.bind(this);
        this.resetDice = this.resetDice.bind(this);
    }

    lockDie(dieNum) {
        const newArr = [];
        this.state.fiveDice.forEach(die => newArr.push(die));
        newArr[dieNum].lock = !newArr[dieNum].lock;
        this.setState({ fiveDice: newArr });
    }

    rollFiveDice() {
        if(this.state.rollsLeft <= 0) {
            alert('!!! No More Rolls Left !!!\nHit the "Reset" button.');
            return;
        };
        const newArr = [];
        this.state.fiveDice.forEach(die => newArr.push(die));
        newArr
            .filter(die => !die.lock)
            .forEach(die => die.val = randomIntFromInterval(1, 6));
        this.setState({ fiveDice: newArr });
        this.setState({ rollsLeft: this.state.rollsLeft-1 });
    }
    
    resetDice() {
        const newArr = [];
        this.state.fiveDice.forEach(die => newArr.push(die));
        newArr.forEach(die => {
            die.val = 0;
            die.lock = false;
        });
        this.setState({ fiveDice: newArr });
        this.setState({ rollsLeft: 3 });
    }

    render = () =>
        <>
            <div id='dice-box'>
                {this.state.fiveDice.map((die, i) => <h1 key={i}>{die.val}</h1>)}
                {this.state.fiveDice.map((die, i) => <h1 key={i}>{die.lock ? 'locked' : 'unlocked'}</h1>)}
                {this.state.fiveDice.map((die, i) => <Die key={i} die={die} clickHandler={() => { this.lockDie(i) }} />)}
                <button onClick={this.rollFiveDice}>Roll Dice</button>
                <h1>Roll: {this.state.rollsLeft}</h1>
                <button onClick={this.resetDice}>Reset Dice</button>
            </div>
        </>
}

export default DiceBox