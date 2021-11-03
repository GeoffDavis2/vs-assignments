import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import { Person } from './Person';
import './style.css';

const axios = require("axios");


function RootComponent() {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState([]);

    useEffect(() => setTimeout(() => {
        axios
            .get('https://raw.githubusercontent.com/VSchool/vschool-api/master/static/hitlist.json')
            .then(res => res.data.forEach((obj, i) => setPersons(prev => [...prev, { ...obj, id: i, takenCareOf: false }])))
            .catch(err => alert(err));
        setIsLoading(false);
    }, 1000), []);

    const handleClick = (id) => setPersons(prev =>
        prev.map(person => ({ ...person, takenCareOf: person.id === id ? !person.takenCareOf : person.takenCareOf })))

    return (<>
        {isLoading ? <h1 id='loading'>Loading...</h1> : null}
        {persons.map((person, i) => <Person key={i} person={person} handleClick={handleClick} />)}
    </>)

}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));