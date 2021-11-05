
// This is broken, to fix...
// See https://www.freecodecamp.org/news/functional-setstate-is-the-future-of-react-374f30401b6b/
// or maybe see this  https://scrimba.com/scrim/ckP2VruP?pl=pk5dQCd

import React from "react";
const { Provider, Consumer } = React.createContext();

const UserNameContextProvider = (props) => {
    const state = { userName: "gnbd1024" }

    const handleClick = (userName) => setState({ userName })

    return (
        <Provider value={{ userName: state.userName, handleClick:handleClick }}>
            {props.children}
        </Provider>
    )
}

export { UserNameContextProvider, Consumer as UserNameContextConsumer };