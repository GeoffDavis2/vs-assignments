import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import { ThingsContextProvider, ThingsContext } from './ThingsContextProvider';
import { ThingsList } from './ThingsList';
import { BaseThing } from './BaseThing';

const MainComponent = () => {
  const { mode } = React.useContext(ThingsContext);
  return (<>
    {mode === 'Loading' ? <h1>Loading...</h1> : ''}
    {mode === 'ThingList' ? <ThingsList/> : ''}
    {mode === 'EditThing' ? <BaseThing/> : ''}
  </>
  );
};

// TODO fix it so app can handle multiple descriptions
// TODO delete random console logs, or setup console logs everywhere for debugging...

ReactDOM.render(
  <ThingsContextProvider>
    <MainComponent />
  </ThingsContextProvider>, document.getElementById('root-div'));