import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Input from './components/Input'
import Button from './components/Button'
import InputDisplay from './components/InputDisplay'
import List from './components/List'

class RootComponent extends Component {
  state = {
    theInput: '',
    theList: []
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const tempArr = JSON.parse(JSON.stringify(this.state.theList));
    tempArr.push(this.state.theInput)
    this.setState({
      theInput: '',
      theList: tempArr
    });
  }

  render = () =>
    <>
      <Input state={this.state} handleChange={this.handleChange} />
      <Button state={this.state} handleClick={this.handleClick} />
      <InputDisplay state={this.state} />
      Items:<List state={this.state} />
    </>
}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));