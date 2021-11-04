import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { UserNameContextProvider } from "./UserNameContext"

ReactDOM.render(
  <UserNameContextProvider>
    <App />
  </UserNameContextProvider>,
  document.getElementById("root-container")
)