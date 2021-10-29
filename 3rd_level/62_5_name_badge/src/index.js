import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Input from './components/InputForm'
import BadgeList from './components/BadgeList'

class RootComponent extends Component {
  state = {
    newBadge: {
      firstName: '',
      lastName: '',
      email: '',
      birthPlace: '',
      phone: '',
      favFood: '',
      desc: ''
    },
    badgeList: []
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({
      newBadge: {
        ...this.state.newBadge,
        [name]: value
      }
    })

    handleChange2 = ({ target: { name, value } }) =>
    this.setState(prevState => ({ 
      newBadge: { 
        ...prevState.newBadge, 
        [name]: value
      },
      badgeList: [...prevState.badgeList]
    }))

  handleClick = e => {
    e.preventDefault();
    const tempArr = JSON.parse(JSON.stringify(this.state.badgeList));
    tempArr.push(this.state.newBadge);
    this.setState({
      newBadge: {firstName: '', lastName: '', email: '', birthPlace: '', phone: '', favFood: '', desc: ''},
      badgeList: tempArr
    });
  }

  render = () =>
    <>
      <Input state={this.state} handleChange={this.handleChange} handleClick={this.handleClick} />
      <BadgeList state={this.state} />
    </>
}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));