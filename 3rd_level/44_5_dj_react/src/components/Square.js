import React from 'react'

class Square extends React.Component {
    render = () => 
        <div className="square" style={{backgroundColor: this.props.color}}>{this.props.color}</div>
}

export default Square