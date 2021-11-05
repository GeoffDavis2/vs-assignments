import React, { Component } from "react"
import ReactDOM from "react-dom"
import Header from "./Header"
import { UserNameContextConsumer } from "./UserNameContext"
import { UserNameContextProvider } from "./UserNameContext"

class App extends Component {

  state = { user_Name: "" };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {return (<>
    <Header />
    <UserNameContextConsumer>{({ userName, handleClick }) => (<>
      <main>
        <p className="main">No new notifications, {userName}! 🎉</p>
      </main>

      <input
        type="text"
        name="user_Name"
        placeholder="New username"
        value={this.state.user_Name}
        onChange={this.handleChange}
      />

      <button onClick={() => handleClick(this.state.user_Name)}>Change Username</button>
      </>)}
    </UserNameContextConsumer>
  </>)}
}

ReactDOM.render(<UserNameContextProvider><App /></UserNameContextProvider>, document.getElementById("root-container"));