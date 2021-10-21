import React, { Component } from 'react';

class Person extends Component {

    render = () => <div className='person'>
        <img src={this.props.person.image} alt='' className='person-image'/>
        <h3 className='name'>{this.props.person.name}</h3>
    </div>

}

export default Person;