import React from 'react';

const Pet = ({ pet: { name, breed } }) =>
    <tr>
        <td>{name}</td>
        <td>{breed}</td>
    </tr>

export default Pet