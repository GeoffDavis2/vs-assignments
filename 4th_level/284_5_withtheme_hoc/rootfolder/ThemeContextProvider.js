import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();

export const withTheme = Component => props => {
    const { theme, changeTheme } = useContext(ThemeContext);
    return <Component theme={theme} changeTheme={changeTheme}/>
};

export const ThemeContextProvider = props => {
    const [theme, setTheme] = useState("light");

    let pageTheme = {
        light: '#e6e6e6',
        dark: '#262626',
        green: '#7FFFD4'
    };
    document.body.style.backgroundColor = pageTheme[theme];

    function changeTheme(e) {
        // I think I can put all the theme styles that change in here and remove from the style.css file
        setTheme(e.target.value)
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}