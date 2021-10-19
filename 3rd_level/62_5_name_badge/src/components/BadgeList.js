import React, { Component } from 'react';

class BadgeList extends Component {

    render = () => <ul>        
        {this.props.state.badgeList.map((badge, i) =>
            <li key={i}>
                {badge.firstName}<br/>
                {badge.lastName}<br/>
                {badge.email}<br/>
                {badge.birthPlace}<br/>
                {badge.phone}<br/>
                {badge.favFood}
            </li>
        )}
    </ul>
}

export default BadgeList;