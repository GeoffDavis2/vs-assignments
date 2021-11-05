import { withTheme } from './ThemeContextProvider';

export const MainWithTheme = withTheme(
    ({ theme }) => <div className={`main main-${theme}-theme`}>Select a theme below!</div>
);