import React from 'react'

class Dot extends React.Component {
    render = () =>
        <>
            <div className="dot" style={{ backgroundColor: this.props.showDot ? 'black' : 'white' }}></div>
        </>
}

class Die extends React.Component {
    render = () =>
        <div className='die'>
            {this.props.dots.map((dot,i) => <Dot key={i} showDot={dot} />)}
        </div>
}

export default Die