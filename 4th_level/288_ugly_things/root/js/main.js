import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import { ThingsContextProvider, ThingsContext } from './ThingsContextProvider';
import { ThingsList } from './ThingsList';
import { TestBaseThing, EditThing } from './TestBaseThing';


const MainComponent = () => {
  const { things, activeThing, mode } = React.useContext(ThingsContext);
  // const ndx = things.findIndex(thing => thing._id === activeThingID);
  // const [activeThing, setActiveThing] = useState(JSON.parse(JSON.stringify(things[ndx])));

  return (<>
    {mode === 'Loading' ? <h1>Loading...</h1> : ''}
    {mode === 'ThingList' ? <ThingsList /> : ''}
    {/* {mode === 'EditThing' ? <TestBaseThing thing={activeThing} /> : ''} */}
    {mode === 'EditThing' ? <EditThing thing={activeThing} /> : ''}
  </>
  );
};

// TODO fix it so app can handle multiple descriptions
// TODO delete random console logs, or setup console logs everywhere for debugging...

ReactDOM.render(
  <ThingsContextProvider>
    <MainComponent />
  </ThingsContextProvider>, document.getElementById('root-div'));