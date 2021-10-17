import React from 'react'

import Die from './Die'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class DiceBox extends React.Component {
    constructor() {
        super();
        this.diceFaces = [
            [false, false, false, false, true, false, false, false, false],
            [true, false, false, false, false, false, false, false, true],
            [false, false, true, false, true, false, true, false, false],
            [true, false, true, false, false, false, true, false, true],
            [true, false, true, false, true, false, true, false, true],
            [true, false, true, true, false, true, true, false, true]
        ]
        this.state = {
            fiveDice: [
                { val: 1, dots: this.diceFaces[0] },
                { val: 2, dots: this.diceFaces[1] },
                { val: 3, dots: this.diceFaces[2] },
                { val: 4, dots: this.diceFaces[3] },
                { val: 5, dots: this.diceFaces[4] }
            ]
        };
        this.rollFiveDice = this.rollFiveDice.bind(this);
    }

    rollFiveDice() {
        const newArr = [];
        for (let i = 1; i < 6; i++) {
            let randomVal = randomIntFromInterval(1, 6);
            newArr.push({
                val: randomVal,
                dots: this.diceFaces[randomVal-1]
            });
        }
        this.setState({ fiveDice: newArr });
    }

    render = () =>
        <>
            <div id='dice-box'>
                {this.state.fiveDice.map((die,i) => <Die key={i} dots={die.dots} />)}
            </div>
            <button onClick={this.rollFiveDice}>Roll All 5 Dice</button>
            {this.state.fiveDice.map((die,i) => <p key={i}>{i} = {die.val}</p>)}
        </>
}

export default DiceBox