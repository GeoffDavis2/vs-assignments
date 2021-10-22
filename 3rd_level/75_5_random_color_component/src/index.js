import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
const axios = require("axios");



class RootComponent extends Component {
    constructor() {
        super();

        this.state = {
            circles: [
                { size: 100, color: 'blue' }
            ]
        };

        this.handleIntervals();

    }

    handleIntervals() {
        this.int = setInterval(() => {
            let tempArr = JSON.parse(JSON.stringify(this.state.circles));
            
            tempArr.forEach(circle => {
                circle.size += 10;
            })

            if (tempArr[tempArr.length - 1].size >= 100)
                this.getRandomColor()
                    .then(resp => tempArr
                        .push({ size: 50, color: '#' + resp.data.new_color }))

            if (tempArr[0].size >= 3000) tempArr.shift()

            this.setState({ circles: tempArr })
        }, 75)
    }

    getRandomColor = () => axios.get('https://www.colr.org/json/color/random?timestamp=' + new Date().getTime());

    render = () =>
        <>
            {this.state.circles.map((circle, i) => <div
                key={i}
                className='circle-css'
                style={
                    {
                        width: `${circle.size}px`,
                        backgroundColor: `${circle.color}`
                    }
                }
            ></div>)}
        </>
}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));
