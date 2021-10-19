import React, { Component } from 'react';

class InputForm extends Component {

    isReady = () => {
        const badge = this.props.state.newBadge;
        let ready = true;
        for (const key in badge) if(badge[key].length < 3) ready = false;
        return ready;
    }

    render = () =>
        <form id='input-form'>
            <input className='input-field' type='text' name='firstName' value={this.props.state.newBadge.firstName} onChange={this.props.handleChange} placeholder='First Name' />
            <input className='input-field' type='text' name='lastName' value={this.props.state.newBadge.lastName} onChange={this.props.handleChange} placeholder='Last Name' />
            <input className='input-field' type='text' name='email' value={this.props.state.newBadge.email} onChange={this.props.handleChange} placeholder='Email' />
            <input className='input-field' type='text' name='birthPlace' value={this.props.state.newBadge.birthPlace} onChange={this.props.handleChange} placeholder='Birth Place' />
            <input className='input-field' type='text' name='phone' value={this.props.state.newBadge.phone} onChange={this.props.handleChange} placeholder='Phone' />
            <input className='input-field' type='text' name='favFood' value={this.props.state.newBadge.favFood} onChange={this.props.handleChange} placeholder='Favorite Food' />
            <textarea id='input-desc' type='text' name='desc' value={this.props.state.newBadge.desc} onChange={this.props.handleChange} placeholder='Tell us about yourself'/>
            <button id='input-button' onClick={this.props.handleClick} style={{visibility: this.isReady() ? 'Visible' : 'Hidden'}}>Submit</button>
        </form>
}

export default InputForm;