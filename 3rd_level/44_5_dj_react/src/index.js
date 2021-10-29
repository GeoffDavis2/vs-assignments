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

  // smallTimeButtonHandler() {
  //   const tempArr = JSON.parse(JSON.stringify(this.state.squareObjs));
  //   const newColor = tempArr[0].color === 'white' ? 'black' : 'white';
  //   tempArr.forEach(obj => obj.color = newColor);
  //   this.setState({ squareObjs: tempArr });
  // }

  smallTimeButtonHandler() {
    this.setState(prevState => ({
      squareObjs: prevState.squareObjs.map(obj =>
        ({ ...obj, color: prevState.squareObjs[0].color === 'white' ? 'black' : 'white' }))
    }))
  }

  // partyDjButtonHandler() {
  //   const tempArr = JSON.parse(JSON.stringify(this.state.squareObjs));
  //   tempArr[0].color = 'purple';
  //   tempArr[1].color = 'purple';
  //   this.setState({ squareObjs: tempArr });
  // }

  partyDjButtonHandler() {
    this.setState(prevState => ({
      squareObjs: prevState.squareObjs.map((obj, i) =>
        ({ ...obj, color: [0, 1].includes(i) ? 'purple' : obj.color }))
    }))
  }

  // leftBlueButtonHandler() {
  //   const tempArr = JSON.parse(JSON.stringify(this.state.squareObjs));
  //   tempArr[2].color = 'blue';
  //   this.setState({ squareObjs: tempArr });
  // }

  leftBlueButtonHandler() {
    this.setState(prevState => ({
      squareObjs: prevState.squareObjs.map((obj, i) =>
        ({ ...obj, color: i === 2 ? 'blue' : obj.color }))
    }))
  }

  // rightBlueButtonHandler() {
  //   const tempArr = JSON.parse(JSON.stringify(this.state.squareObjs));
  //   tempArr[3].color = 'blue';
  //   this.setState({ squareObjs: tempArr });
  // }

  // rightBlueButtonHandler() {
  //   this.setState(prevState => ({
  //     squareObjs: prevState.squareObjs.map((obj, i) =>
  //       ({ ...obj, color: i===3 ? 'blue' : obj.color }))
  //   }))
  // }

  rightBlueButtonHandler() {
    this.setState(prevState => ({
      squareObjs: [...prevState.squareObjs.slice(0, 3), { ...prevState.squareObjs[3], color: 'blue' }]
    }))
  }


  // randomColorButtonHandler(i) {
  //   const tempArr = JSON.parse(JSON.stringify(this.state.squareObjs));
  //   const colors = ['Red', 'DeepPink', 'OrangeRed', 'Yellow', 'Purple', 'Green', 'Blue', 'Cyan', 'Brown', 'White', 'Grey', 'Black']
  //   let colorNum = randomIntFromInterval(0, colors.length) - 1;
  //   tempArr[i].color = colors[colorNum];
  //   this.setState({ squareObjs: tempArr });
  // }

  randomColorButtonHandler(x) {
    const colors = ['Red', 'DeepPink', 'OrangeRed', 'Yellow', 'Purple', 'Green', 'Blue', 'Cyan', 'Brown', 'White', 'Grey', 'Black'];
    let randColor = colors[randomIntFromInterval(0, colors.length) - 1];
    this.setState(prevState => ({
      squareObjs: prevState.squareObjs.map((obj, i) =>
        ({ ...obj, color: i === x ? randColor : obj.color }))
    }))
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