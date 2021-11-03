import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import { InputForm } from './InputForm';
import { BadgeList } from './BadgeList';


function RootComponent() {

  const [newBadge, setNewBadge] = useState({
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    birthPlace: 'birthPlace',
    phone: 'phone',
    favFood: 'favFood',
    desc: 'desc'
  });

  const [badgeList, setBadgeList] = useState([]);

  const handleChange = ({ target: { name, value } }) =>
    setNewBadge(prev => ({ ...prev, [name]: value }))

  const handleClick = e => {
    e.preventDefault();
    setBadgeList(prev => [...prev, newBadge])
  }

  return (<>
    hello
    <InputForm newBadge={newBadge} handleChange={handleChange} handleClick={handleClick} />
    <BadgeList badgeList={badgeList} />
  </>)
}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));