import { useCallback, useContext } from 'react';
import {ThemeContext } from './ThemeContextProvider';

export const Navbar = () => {
    const {theme} = useContext(ThemeContext);
    return (<nav className={`navbar navbar-${theme}-theme`}>
        <span className={`navbar-${theme}-theme`}>Home</span>
        <span className={`navbar-${theme}-theme`}>About</span>
        <span className={`navbar-${theme}-theme`}>Contact</span>
    </nav>)
}