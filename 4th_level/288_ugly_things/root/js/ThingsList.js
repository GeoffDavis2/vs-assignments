import React, { useContext } from "react";
import { ThingsContextProvider, ThingsContext } from "./ThingsContextProvider";

const SmallThing = props => {
    const { things, setMode } = React.useContext(ThingsContext);
    const ndx = things.findIndex(thing => thing._id === props.id);

    function test(){
        setMode('EditThing');
    }
    // const { mode, setMode, things } = React.useContext(ThingsContext);
    // delete button
    //    get api key
    //    delete call to api
    //    getThingsIntoContext
    //    go back to list
    // click on small thing to render (just one) EditThing
    //    use array index number (somehow)

    return <div>
        <img src={things[ndx].imgUrl} alt="Missing Image" className='small-image' />
        {things[ndx].imgUrl}
        {things[ndx].title}
        {things[ndx].description}
        {/* {props.thing.title} */}
        {/* {props.thing.description} */}
        <button onClick={test}>Edit</button>
    </div>
}

export const ThingsList = props => {
    const { things } = React.useContext(ThingsContext);
    // add new thing button at top
    //    post thing to api
    //    getThingsIntoContext
    //    go back to list

    // array.map through things and for each thing render SmallThing
    // click on small thing to render (just one) EditThing
    // return <h1>ThingsList: {things[0].a}</h1>

    // TODO style Add New Thing to be absolute position so it stays in same place regarless of scroll
    return (<>
        <button>Add New Thing</button><hr />
        {things.map((thing) => <SmallThing
            key={thing._id}
            id={thing._id}
        />)}
    </>)
}