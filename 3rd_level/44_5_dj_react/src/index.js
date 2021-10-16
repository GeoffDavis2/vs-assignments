import React from 'react';
import ReactDOM from 'react-dom';

import Square from './components/Square'
import Button from './components/Button'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class ParentComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      squareObjs: [
        { key: 1, color: 'Red' },
        { key: 2, color: 'Blue' },
        { key: 3, color: 'Green' },
        { key: 4, color: 'Yellow' }
      ]
    }
    this.smallTimeButtonHandler = this.smallTimeButtonHandler.bind(this);
    this.partyDjButtonHandler = this.partyDjButtonHandler.bind(this);
    this.leftBlueButtonHandler = this.leftBlueButtonHandler.bind(this);
    this.rightBlueButtonHandler = this.rightBlueButtonHandler.bind(this);
    this.randomColorButtonHandler = this.randomColorButtonHandler.bind(this);
    this.makeNoiseButtonHandler = this.makeNoiseButtonHandler.bind(this);
  }

  smallTimeButtonHandler() {
    const newArr = [];
    this.state.squareObjs.map(obj => newArr.push(obj));
    const newColor = newArr[0].color === 'white' ? 'black' : 'white';
    newArr.forEach(obj => obj.color = newColor);
    this.setState({ squareObjs: newArr });

  }
  partyDjButtonHandler() {
    const newArr = [];
    this.state.squareObjs.map(obj => newArr.push(obj));
    newArr[0].color = 'purple';
    newArr[1].color = 'purple';
    this.setState({ squareObjs: newArr });
  }

  leftBlueButtonHandler() {
    const newArr = [];
    this.state.squareObjs.map(obj => newArr.push(obj));
    newArr[2].color = 'blue';
    this.setState({ squareObjs: newArr });
  }

  rightBlueButtonHandler() {
    const newArr = [];
    this.state.squareObjs.map(obj => newArr.push(obj));
    newArr[3].color = 'blue';
    this.setState({ squareObjs: newArr });
  }

  randomColorButtonHandler(i) {
    const newArr = [];
    this.state.squareObjs.map(obj => newArr.push(obj));
    const colors = ['Red', 'DeepPink', 'OrangeRed', 'Yellow', 'Purple', 'Green', 'Blue', 'Cyan', 'Brown', 'White', 'Grey', 'Black']
    let colorNum = randomIntFromInterval(0, colors.length) - 1;
    newArr[i].color = colors[colorNum];
    this.setState({ squareObjs: newArr });
  }

  makeNoiseButtonHandler() {
    var audio = new Audio('Ring08.wav');
    audio.play();
  }

  render = () =>
    <>
      {this.state.squareObjs.map(obj => <Square key={obj.key} color={obj.color} />)}
      <Button label='Small Time DJ' buttonClickHandler={this.smallTimeButtonHandler} />
      <Button label='Party DJ' buttonClickHandler={this.partyDjButtonHandler} />
      <Button label='Left Blue' buttonClickHandler={this.leftBlueButtonHandler} />
      <Button label='Right Blue' buttonClickHandler={this.rightBlueButtonHandler} />
      <Button label='Top Left Random Color' buttonClickHandler={() => { this.randomColorButtonHandler(0) }} />
      <Button label='Top Right Random Color' buttonClickHandler={() => { this.randomColorButtonHandler(1) }} />
      <Button label='Bottom Left Random Color' buttonClickHandler={() => { this.randomColorButtonHandler(2) }} />
      <Button label='Bottom Right Random Color' buttonClickHandler={() => { this.randomColorButtonHandler(3) }} />
      <Button label='Make Noise' buttonClickHandler={this.makeNoiseButtonHandler} />
    </>
}

ReactDOM.render(<ParentComponent />, document.getElementById('container'));