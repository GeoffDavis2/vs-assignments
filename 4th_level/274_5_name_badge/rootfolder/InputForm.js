import React from 'react';

export const InputForm = (props) => {

    const isReady = () => {
        const badge = props.newBadge;
        let ready = true;
        for (const key in badge) if (badge[key].length < 3) ready = false;
        return ready;
    }

    return (
        <form id='input-form'>
            <input className='input-field' type='text' name='firstName' value={props.newBadge.firstName} onChange={props.handleChange} placeholder='First Name' />
            <input className='input-field' type='text' name='lastName' value={props.newBadge.lastName} onChange={props.handleChange} placeholder='Last Name' />
            <input className='input-field' type='text' name='email' value={props.newBadge.email} onChange={props.handleChange} placeholder='Email' />
            <input className='input-field' type='text' name='birthPlace' value={props.newBadge.birthPlace} onChange={props.handleChange} placeholder='Birth Place' />
            <input className='input-field' type='text' name='phone' value={props.newBadge.phone} onChange={props.handleChange} placeholder='Phone' />
            <input className='input-field' type='text' name='favFood' value={props.newBadge.favFood} onChange={props.handleChange} placeholder='Favorite Food' />
            <textarea id='input-desc' type='text' name='desc' value={props.newBadge.desc} onChange={props.handleChange} placeholder='Tell us about yourself' />
            <button id='input-button' onClick={props.handleClick} style={{ visibility: isReady() ? 'Visible' : 'Hidden' }}>Submit</button>
        </form>)
}