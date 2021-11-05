import ReactDOM from 'react-dom';
import React from 'react';
import './style.css'
import { ThemeContextProvider } from './ThemeContextProvider'
import { NavBarWithTheme } from './Navbar';
import { MainWithTheme } from './Main';
import { RadioGroupWithTheme } from './RadioGroup';
import { FooterWithTheme } from './Footer';

const RootComponent = () => <>
  <NavBarWithTheme />
  <MainWithTheme />
  <RadioGroupWithTheme />
  <FooterWithTheme />
</>

ReactDOM.render(
  <ThemeContextProvider>
    <RootComponent />
  </ThemeContextProvider>
  , document.getElementById('root-container'));