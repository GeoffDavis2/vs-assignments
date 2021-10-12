import React from 'react';
import FriendList from './FriendList';


const App = ({ friends }) =>
    <div>
        <h1>List of Friends</h1>
        <FriendList friends={friends} />
    </div>

export default App