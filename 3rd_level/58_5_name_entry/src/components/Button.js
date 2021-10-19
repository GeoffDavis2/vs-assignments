import React, { Component } from 'react';

class Button extends Component {

    render = () => <button onClick={this.props.handleClick}>Add Item to List</button>

}

export default Button;