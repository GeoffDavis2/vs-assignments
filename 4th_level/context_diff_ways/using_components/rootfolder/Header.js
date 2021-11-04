import React from "react"
import { UserNameContextConsumer } from "./UserNameContext"

function Header() {
    return (
        <header>
            <UserNameContextConsumer>
                {({ userName }) => (
                    <p>Welcome, {userName}!</p>
                )}
            </UserNameContextConsumer>
        </header>
    )
}

export default Header
