import { withTheme } from './ThemeContextProvider';

export const FooterWithTheme = withTheme(
    ({ theme }) => <div className={`footer footer-${theme}-theme`}>Slightly More Amazing Footer Stuff</div>
);