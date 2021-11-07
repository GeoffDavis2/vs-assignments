import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import { ThingsContextProvider, ThingsContext } from './ThingsContextProvider';
import { ThingsList } from './ThingsList';

const MainComponent = () => {
  const { mode, things } = React.useContext(ThingsContext);
  return (<>
    {mode === 'Loading' ? <h1>Loading...</h1> : ''}
    {mode === 'ThingList' ? <ThingsList/> : ''}
    {mode === 'EditThing' ? <h1>Edit the thing</h1> : ''}

  </>
  );
};

ReactDOM.render(
  <ThingsContextProvider>
    <MainComponent />
  </ThingsContextProvider>, document.getElementById('root-div'));