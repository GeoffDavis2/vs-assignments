import React, { Component } from "react"
import { UserNameContextConsumer } from "./UserNameContext"

class Header extends Component {
    render() {return (
        <header>
            <UserNameContextConsumer>
                {({ userName }) => (
                    <p>Welcome, {userName}!</p>
                )}
            </UserNameContextConsumer>
        </header>
    )}}

export default Header
