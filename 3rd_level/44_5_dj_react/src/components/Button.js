import React from 'react'

class Button extends React.Component {
    render = () =>
        <button onClick={this.props.buttonClickHandler} className="button">{this.props.label}</button>
}

export default Button