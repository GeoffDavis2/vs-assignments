import { useCallback, useContext } from 'react';
import {ThemeContext } from './ThemeContextProvider';

export const Footer = () => {
    const {theme} = useContext(ThemeContext);
    return (<div className={`footer footer-${theme}-theme`}>Slightly More Amazing Footer Stuff</div>)
}