import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import './style.css'
import { ThemeContextProvider } from './ThemeContextProvider'
import { Navbar } from './Navbar';
import { Main } from './Main';
import { ThemeRadioGroup } from './ThemeRadioGroup';
import { Footer } from './Footer';

const RootComponent = () => {
  return (<>
    <Navbar />
    <Main/>
    <ThemeRadioGroup />
    <Footer />
  </>)
}

ReactDOM.render(
  <ThemeContextProvider>
    <RootComponent />
  </ThemeContextProvider>
  , document.getElementById('root-container'));