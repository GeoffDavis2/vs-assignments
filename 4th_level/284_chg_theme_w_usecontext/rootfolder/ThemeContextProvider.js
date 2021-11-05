import React, { useState } from "react";

export const ThemeContext = React.createContext();

export const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState("light");

    let pageTheme = {
        light: '#e6e6e6',
        dark: '#262626',
        green: '#7FFFD4'
    };
    document.body.style.backgroundColor = pageTheme[theme];

    function changeTheme(e) {
        setTheme(e.target.value)
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}