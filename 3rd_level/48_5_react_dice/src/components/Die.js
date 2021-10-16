import React from 'react'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class Dot extends React.Component {
    render = () =>
        <>
            <div className="dot" style={{ backgroundColor: this.props.showDot ? 'black' : 'white' }}></div>
        </>

}

class Die extends React.Component {
    constructor() {
        super();
        this.state = { dots: [false, false, false, false, false, false, false, false, false] };
        this.rollDie = this.rollDie.bind(this);
    }

    rollDie() {
        const diceRolls = [
            [false, false, false, false, true, false, false, false, false],
            [true, false, false, false, false, false, false, false, true],
            [false, false, true, false, true, false, true, false, false],
            [true, false, true, false, false, false, true, false, true],
            [true, false, true, false, true, false, true, false, true],
            [true, false, true, true, false, true, true, false, true]
        ]
        // console.log(randomIntFromInterval(0, 5));
        this.setState({ dots: diceRolls[randomIntFromInterval(0, 5)] });
    }

    render = () =>
        <div className="die" onClick={this.rollDie}>
            {this.state.dots.map(dot => <Dot showDot={dot} />)}
        </div>
}

export default Die