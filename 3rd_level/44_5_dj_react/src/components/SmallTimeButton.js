import React from 'react'

class SmallTimeButton extends React.Component {
    render = () =>
        <button onClick={this.props.buttonClickHandler} className="button">Small Time DJ</button>
}

export default SmallTimeButton