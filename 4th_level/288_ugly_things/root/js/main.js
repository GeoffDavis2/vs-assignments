// TODO remove stuff not used below...
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import { ThingsContextProvider } from './ThingsContextProvider';


/* contexts...?
  Things Array
  Mode
  Theme?
  User?
  BaseApiUrl?
*/



const ThingsList = () => {

  // SmallThing();
  // add new thing button at top
  //    post thing to api
  //    getThingsIntoContext
  //    go back to list

  // array.map through things and for each thing render SmallThing
  // click on small thing to render (just one) EditThing
  // return <h1>ThingsList: {things[0].a}</h1>

  return (<h1>ThingsList:</h1>)
}

ReactDOM.render(
  <ThingsContextProvider>
    <ThingsList />
  </ThingsContextProvider>,
  document.getElementById('root-div')
);