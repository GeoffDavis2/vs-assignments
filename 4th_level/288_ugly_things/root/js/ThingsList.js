import React from "react";
import { ThingsContext } from "./ThingsContextProvider";

const SmallThing = props => {
    const { things, handleDeleteThing, handleEditThing } = React.useContext(ThingsContext);
    const ndx = things.findIndex(thing => thing._id === props.id);

    // TODO click on small thing to render (just one) EditThing
    // TODO make this prettier

    return <div>
        <img src={things[ndx].imgUrl} alt='' className='small-image' />
        {things[ndx].imgUrl}<br/>
        {things[ndx].title}<br/>
        {things[ndx].description}<br/>
        <button onClick={() => handleEditThing(things[ndx]._id)} >Edit</button>
        <button onClick={() => handleDeleteThing(things[ndx]._id)}>Delete</button>
        <hr />
    </div>
}

export const ThingsList = props => {
    const { things, handleAddThing } = React.useContext(ThingsContext);

    // TODO style Add New Thing to be absolute position so it stays in same place regarless of scroll
    return (<>
        <button onClick={handleAddThing}>Add New Thing</button><hr />
        {things.map((thing) => <SmallThing
            key={thing._id}
            id={thing._id}
        />)}
    </>)
}