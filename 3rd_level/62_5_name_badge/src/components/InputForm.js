import React, { Component } from 'react';

class InputForm extends Component {

    render = () =>
        <>
            <input type='text' name='firstName' value={this.props.state.newBadge.firstName} onChange={this.props.handleChange} placeholder='First Name' />
            {this.props.state.newBadge.firstName}<br />
            <input type='text' name='lastName' value={this.props.state.newBadge.lastName} onChange={this.props.handleChange} placeholder='Last Name' />
            {this.props.state.newBadge.lastName}<br/>
            <input type='text' name='email' value={this.props.state.newBadge.email} onChange={this.props.handleChange} placeholder='Email' />
            {this.props.state.newBadge.email}<br/>
            <input type='text' name='birthPlace' value={this.props.state.newBadge.birthPlace} onChange={this.props.handleChange} placeholder='Birth Place' />
            {this.props.state.newBadge.birthPlace}<br/>
            <input type='text' name='phone' value={this.props.state.newBadge.phone} onChange={this.props.handleChange} placeholder='Phone' />
            {this.props.state.newBadge.phone}<br/>
            <input type='text' name='favFood' value={this.props.state.newBadge.favFood} onChange={this.props.handleChange} placeholder='Favorite Food' />
            {this.props.state.newBadge.favFood}<br/>
            <button onClick={this.props.handleClick}>Submit</button>
        </>
}

export default InputForm;