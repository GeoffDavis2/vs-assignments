import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
const axios = require("axios");

class RootComponent extends Component {
    state = {
        isLoading: true,
        circles: []
    };

    async componentDidMount() {
        const resp = await this.getRandomColor();
        await this.setState({ circles: [{ size: 50, color: `#${resp.data.new_color}` }] });
        setTimeout(() => {
            this.setState({ isLoading: false })
            this.handleIntervals();
        }, 1000);
    }

    async handleIntervals() {
        this.int = setInterval(() => {
            let tempArr = JSON.parse(JSON.stringify(this.state.circles));

            tempArr.forEach(circle => circle.size += 10);

            // Using async / await, not sure it's any cleaner or easier to understand...?
            if (tempArr[tempArr.length - 1].size >= 200)
                (async () => {
                    let resp = await this.getRandomColor();
                    await tempArr.push({ size: 50, color: `#${resp.data.new_color}` });
                })()

            // or Using Promise / then
            // Is this better than async/awiat, not sure...?
            // if (tempArr[tempArr.length - 1].size >= 200)
            //     this.getRandomColor()
            //         .then(resp => tempArr
            //             .push({ size: 50, color: `#${resp.data.new_color}` }))

            if (tempArr[0].size >= 3000) tempArr.shift()

            this.setState({ circles: tempArr })
        }, 75)
    }

    getRandomColor = () => axios.get(`https://www.colr.org/json/color/random?timestamp=${new Date().getTime()}`);

    render = () =>
        <>{this.state.isLoading
            ? <h1 id='loading'>Loading...</h1>
            : this.state.circles.map((circle, i) => <div
                key={i}
                className='circle-css'
                style={{
                    width: `${circle.size}px`,
                    backgroundColor: `${circle.color}`
                }}
            ></div>)
        }</>
}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));