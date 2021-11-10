import { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import { ThingsContext, ThingsContextProvider } from './ThingsContextProvider';
import { ThingsList } from './ThingsList';
import { EditThing } from './EditThing';

const MainComponent = () => {
  const { mode } = useContext(ThingsContext);

  return (<>
    {mode === 'Loading' ? <h1>Loading...</h1> : ''}
    {mode === 'ThingList' ? <ThingsList /> : ''}
    {mode === 'EditThing' ? <EditThing /> : ''}
    {mode === 'NewThing' ? <EditThing /> : ''}
  </>
  );
};

// Wrap MainComponent (and its children) with the ThingsContextProvider HOC
ReactDOM.render(
  <ThingsContextProvider>
    <MainComponent />
  </ThingsContextProvider>, document.getElementById('root-div'));