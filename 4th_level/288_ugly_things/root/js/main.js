// TODO remove stuff not used below...
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

const ThingsContext = React.createContext();

/* contexts...?
  Things Array
  Theme?
  User?
  BaseApiUrl?
*/

const GetThingsIntoContext = () => {
  const axios = require("axios"); // TODO is this line needed?
  const [_, setThings] = useState([]);

  // const getThings = async () => {
  //   const res = await axios('https://api.vschool.io/geoffdavis/thing');
  //   setThings(res.data);
  //   console.log(res.data);
  // };

  useEffect(() => async () => {
      const res = await axios('https://api.vschool.io/geoffdavis/thing');
      setThings(res.data);
      console.log(res.data);
    }, []
  )
}



const ThingList = () => {
  
  // const things = useContext(ThingsContext);
  // GetThingsIntoContext();
  // const things = useContext(ThingsContext);
  // SmallThing();
  // add new thing button at top
  //    post thing to api
  //    getThingsIntoContext
  //    go back to list

  // array.map through things and for each thing render SmallThing
  // click on small thing to render (just one) EditThing
  // return <h1>ThingList: {things[0].a}</h1>
  
  return (<h1>ThingList:</h1>)
}


/*
const HomeProvider = () => {
  const [things, setThings] = useState([]);

  const getThings = async() => {
    const res = await axios('https://api.vschool.io/geoffdavis/thing');
    setThings(res.data);
    console.log(res.data);
  };

  useEffect(() => getThings(), []);

  return (
    <ThingsContext.Provider value={things}>
      <h1>HomeProvider</h1>
    </ThingsContext.Provider>
  )
}
*/

const TempComp = () => {
  const axios = require("axios"); // TODO is this line needed?
  const [things, setThings] = useState([]);

  const getThingsFromApi = async() => setThings((await axios('https://api.vschool.io/geoffdavis/thing')).data);
  useEffect(() => getThingsFromApi(), []);


  // TODO see if I can rename value (below) to things???
  return <ThingsContext.Provider value={things}>
    <ThingList />
  </ThingsContext.Provider>
};

ReactDOM.render(
  <TempComp />,
  document.getElementById('root-div')
);