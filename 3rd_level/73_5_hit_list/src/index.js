import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Person from './Person';
import './style.css';

const axios = require("axios");

class RootComponent extends Component {
    state = {
        isLoading: true,
        persons: []
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
            axios
                .get('https://raw.githubusercontent.com/VSchool/vschool-api/master/static/hitlist.json')
                .then(res => {
                    const persons = res.data;
                    persons.forEach((person, i) => {
                        person.id = i;
                        person.takenCareOf = false;
                    });
                    this.setState({ persons });
                })
                .catch(err => alert(err))
        }, 1000);
    }

    handleClick = (id) => {
        const tempArr = JSON.parse(JSON.stringify(this.state.persons));
        tempArr[id].takenCareOf = !tempArr[id].takenCareOf;
        this.setState({ persons: tempArr });
    }

    render = () =>
        <>
            {this.state.isLoading ? <h1 id='loading'>Loading...</h1> : null}
            {this.state.persons.map((person, i) => <Person key={i} person={person} handleClick={this.handleClick} />)}
        </>

}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));