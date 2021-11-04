import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class UserNameContextProvider extends Component {
    state = { userName: "gnbd1024" }

    handleClick = (userName) => this.setState({ userName })

    render() {return (
        <Provider value={{ userName: this.state.userName, handleClick:this.handleClick }}>
            {this.props.children}
        </Provider>
    )}
}

export { UserNameContextProvider, Consumer as UserNameContextConsumer };