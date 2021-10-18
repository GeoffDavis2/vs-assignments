import React from 'react'

class Dot extends React.Component {
    render = () =>
        <>
            <div className="dot" style={{ visibility: this.props.showDot ? 'visible' : 'hidden' }}></div>
        </>
}

class Die extends React.Component {
    constructor() {
        super();
        this.diceFaces = [
            [true, true, true, true, true, true, true, true, true],
            [false, false, false, false, true, false, false, false, false],
            [true, false, false, false, false, false, false, false, true],
            [false, false, true, false, true, false, true, false, false],
            [true, false, true, false, false, false, true, false, true],
            [true, false, true, false, true, false, true, false, true],
            [true, false, true, true, false, true, true, false, true]
        ]
        this.setDots = this.setDots.bind(this);
    }

    setDots(dieNum) {
        return this.diceFaces[dieNum];
    }

    render = () =>
        <div
            className='die'
            style={{ backgroundColor: this.props.die.lock ? 'Grey' : 'White' }}
            onClick={() => this.props.clickHandler(this.props.die.id)}
        >
            {this.setDots(this.props.die.val).map((dot, i) => <Dot key={i} showDot={dot} />)}
        </div>
}

export default Die