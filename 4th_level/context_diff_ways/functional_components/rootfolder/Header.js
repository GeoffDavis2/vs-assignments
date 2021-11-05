import React from "react"
import { UserNameContextConsumer } from "./UserNameContext"

const Header = () => <header>
    <UserNameContextConsumer>
        {({ userName }) => (
            <p>Welcome, {userName}!</p>
        )}
    </UserNameContextConsumer>
</header>

export default Header
