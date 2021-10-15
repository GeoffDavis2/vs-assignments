import React from 'react';
import ReactDOM from 'react-dom';

import Square from './components/Square'
import SmallTimeButton from './components/SmallTimeButton'

class ParentComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      squareObjs: [
        { key: 1, color: 'white' },
        { key: 2, color: 'blue' },
        { key: 3, color: 'green' },
        { key: 4, color: 'yellow' }
      ]
    }
    this.smallTimeButtonHandler = this.smallTimeButtonHandler.bind(this);
  }

  smallTimeButtonHandler() {
    const newArr = [];
    this.state.squareObjs.map(obj => newArr.push(obj));
    const newColor = newArr[0].color === 'white' ? 'black' : 'white';
    newArr.forEach(obj => obj.color = newColor);
    this.setState({ squareObjs: newArr });
  }

  render = () =>
    <>
      {this.state.squareObjs.map(obj => <Square key={obj.key} color={obj.color} />)}
      <SmallTimeButton buttonClickHandler={this.smallTimeButtonHandler} />
    </>
}

ReactDOM.render(<ParentComponent />, document.getElementById('container'));