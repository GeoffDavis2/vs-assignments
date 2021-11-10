import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import { ThingsContextProvider, ThingsContext } from './ThingsContextProvider';
import { ThingsList } from './ThingsList';
import { NewThing } from './NewThing';
import { EditThing } from './EditThing';

const MainComponent = () => {
  const { activeThing, mode } = React.useContext(ThingsContext);

  return (<>
    {mode === 'Loading' ? <h1>Loading...</h1> : ''}
    {mode === 'ThingList' ? <ThingsList /> : ''}
    {mode === 'EditThing' ? <EditThing thing={activeThing} /> : ''}
    {mode === 'NewThing' ? <NewThing /> : ''}
  </>
  );
};

// TODO fix it so app can handle multiple descriptions

// Wrap MainComponent (and its children) with the ThingsContextProvider HOC
ReactDOM.render(
  <ThingsContextProvider>
    <MainComponent />
  </ThingsContextProvider>, document.getElementById('root-div'));