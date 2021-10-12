import React from 'react';
import Friend from './Friend';

const FriendList = ({ friends }) =>
    <div>
        {friends.map(friend => <Friend key={friend.name+friend.age} friend={friend} />)}
    </div>

export default FriendList