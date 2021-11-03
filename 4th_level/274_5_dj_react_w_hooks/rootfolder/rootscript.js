import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

import { Square } from './Square'
import { Button } from './Button'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function ParentComponent() {

  const [colors, setColors] = useState([
    { color: 'Red' },
    { color: 'Blue' },
    { color: 'Green' },
    { color: 'Yellow' }
  ])

  // useEffect(() => console.log(colors), [colors]);

  function smallTimeButtonHandler() {
    setColors(prev => prev.map(obj =>
      ({ color: prev[0].color === 'White' ? 'Black' : 'White' })))
  }

  function partyDjButtonHandler() {
    setColors(prev => prev.map((obj, i) =>
      ({ color: [0, 1].includes(i) ? 'Purple' : obj.color })))
  }

  function leftBlueButtonHandler() {
    // Method 1, using map...
    setColors(prev => prev.map((obj, i) =>
      ({ color: i === 2 ? 'Blue' : obj.color })))
  }

  function rightBlueButtonHandler() {
    // Method 2, a bit simpler...
    setColors(prev => [...prev.slice(0, 3), { color: 'Blue' }])
  }

  function randomColorButtonHandler(x) {
    const colors = ['Red', 'DeepPink', 'OrangeRed', 'Yellow', 'Purple', 'Green', 'Blue', 'Cyan', 'Brown', 'White', 'Grey', 'Black'];
    let randColor = colors[randomIntFromInterval(0, colors.length) - 1];
    setColors(prev => prev.map((obj, i) =>
      ({ color: i === x ? randColor : obj.color })))
  }

  function makeNoiseButtonHandler() {
    var audio = new Audio('Ring08.wav');
    audio.play();
  }

  return (<>
    {colors.map((obj, i) => <Square key={i} color={obj.color} />)}
    <Button label='Small Time DJ' buttonClickHandler={smallTimeButtonHandler} />
    <Button label='Party DJ' buttonClickHandler={partyDjButtonHandler} />
    <Button label='Left Blue' buttonClickHandler={leftBlueButtonHandler} />
    <Button label='Right Blue' buttonClickHandler={rightBlueButtonHandler} />
    <Button label='Top Left Random Color' buttonClickHandler={() => { randomColorButtonHandler(0) }} />
    <Button label='Top Right Random Color' buttonClickHandler={() => { randomColorButtonHandler(1) }} />
    <Button label='Bottom Left Random Color' buttonClickHandler={() => { randomColorButtonHandler(2) }} />
    <Button label='Bottom Right Random Color' buttonClickHandler={() => { randomColorButtonHandler(3) }} />
    <Button label='Make Noise' buttonClickHandler={makeNoiseButtonHandler} />
  </>)

}

ReactDOM.render(<ParentComponent />, document.getElementById('root-container'));