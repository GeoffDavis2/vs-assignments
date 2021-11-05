import { useCallback, useContext } from 'react';
import {ThemeContext } from './ThemeContextProvider';

export const Main = () => {
    const {theme} = useContext(ThemeContext);
    return (<div className={`main main-${theme}-theme`}>Select a theme below!</div>)
}