import React, { Component } from 'react';

class Person extends Component {

    render = () => <div
        className={this.props.person.takenCareOf ? 'person case-closed' : 'person'}
        onClick={() => this.props.handleClick(this.props.person.id)}
    >
        <img src={this.props.person.image} alt='' className='person-image' />
        <h3 className='name'>{this.props.person.name}</h3>
    </div>

}

export default Person;