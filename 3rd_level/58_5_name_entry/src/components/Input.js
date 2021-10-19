import React, { Component } from 'react';

class Input extends Component {

    render = () => <input
        type='text'
        name='theInput'
        value={this.props.state.theInput}
        onChange={this.props.handleChange}
        placeholder='Enter Item Here'
    />

}

export default Input;