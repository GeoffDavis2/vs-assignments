import { withTheme } from './ThemeContextProvider';

export const NavBarWithTheme = withTheme(({ theme }) => {
    return (<nav className={`navbar navbar-${theme}-theme`}>
        <span className={`navbar-${theme}-theme`}>Home</span>
        <span className={`navbar-${theme}-theme`}>About</span>
        <span className={`navbar-${theme}-theme`}>Contact</span>
    </nav>)
});