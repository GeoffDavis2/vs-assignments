import { withTheme } from './ThemeContextProvider';

export const RadioGroupWithTheme = withTheme(({ theme, changeTheme }) => 
    <form onChange={(e) => changeTheme(e)} className={`radio radio-${theme}-theme`}>
        <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            className='radio-button'
        /> Light<br />
        <input
            type="radio"
            name="theme"
            value="dark"
            className='radio-button'
            checked={theme === "dark"}
        /> Dark<br />
        <input
            type="radio"
            name="theme"
            value="green"
            className='radio-button'
            checked={theme === "green"}
        /> Green
    </form>
);