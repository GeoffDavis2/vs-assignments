import React from "react";
import { ThingsContext } from "./ThingsContextProvider";

const SmallThing = props => {
    const { handleDeleteThing, handleEditThing } = React.useContext(ThingsContext);

    // TODO make this prettier
    return <div onClick={() => handleEditThing(props.thing)} >
        <img src={props.thing.imgUrl} alt='' className='small-image' />
        {props.thing.imgUrl}<br />
        {props.thing.title}<br />
        {props.thing.description}<br />
        <button onClick={() => handleDeleteThing(props.thing)}>Delete</button>
        <hr />
    </div>
}

export const ThingsList = props => {
    const { things, handleAddThing } = React.useContext(ThingsContext);

    // TODO style Add New Thing Button to be absolute position so it stays in same place regarless of scroll
    return (<>
        <button onClick={handleAddThing}>Add New Thing</button><hr />
        {things.map((thing) => <SmallThing 
            key={thing._id}
            thing={thing}
        />)}
    </>)
}