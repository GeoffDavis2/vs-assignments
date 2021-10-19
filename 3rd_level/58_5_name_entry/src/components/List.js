import React, { Component } from 'react';

class List extends Component {

    render = () =>
        <ol>{this.props.state.theList.map((item, i) =>
            <li key={i}>{item}</li>)}
        </ol>

}

export default List;