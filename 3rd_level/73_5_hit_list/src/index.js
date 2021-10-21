import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Person from './Person';
import './style.css';

const axios = require("axios");

class RootComponent extends Component {
    state = { persons: [] };

    componentDidMount() {
        axios
            .get('https://raw.githubusercontent.com/VSchool/vschool-api/master/static/hitlist.json')
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
            .catch(err => alert(err));
    }

    render = () =>
        <>            
            {this.state.persons.map((person, i) => <Person key={i} person={person} />)}
        </>

}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));