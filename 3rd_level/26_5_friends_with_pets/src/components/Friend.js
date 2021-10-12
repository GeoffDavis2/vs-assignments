import React from 'react';
import Pet from './Pet';

const Friend = ({ friend: { name, age, pets } }) =>
    <div className='friend-card'>
        <h2 className='friend-name'>{name}</h2>
        <div className='friend-age'><strong>Age:&nbsp;</strong>{age}</div>
        <div className='friend-pets'>
            <strong>Pets</strong>
            <table className='pets-table'>
                <thead><tr><th>Name</th><th>Breed</th></tr></thead>
                <tbody>
                    {pets.map(pet => <Pet key={pet.name + pet.breed} pet={pet} />)}
                </tbody>
            </table>
        </div>
    </div>

export default Friend