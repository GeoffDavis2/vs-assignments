import React from "react";
import { ThingsContext } from "./ThingsContextProvider";

const SmallThing = props => {
    const { handleDeleteThing, handleEditThing } = React.useContext(ThingsContext);

    // TODO make this prettier
    return <div onClick={() => handleEditThing(props.thing)} className='small-thing-div'>
        <img src={props.thing.imgUrl} alt='' className='small-image' />
        <div>{props.thing.imgUrl}<br />
            {props.thing.title}<br />
            {props.thing.description}<br />
            <button
                onClick={() => handleDeleteThing(props.thing)}
                className='small-thing-del-btn'
            >Delete</button>
        </div>
    </div>
}

export const ThingsList = props => {
    const { things, handleAddThing } = React.useContext(ThingsContext);

    // TODO style Add New Thing Button to be absolute position so it stays in same place regarless of scroll
    return (<>
        <button onClick={handleAddThing} id='add-thing-button'>Add New Thing</button>
        <div id='spacer'>&nbsp;</div>
        {things.map((thing) => <SmallThing
            key={thing._id}
            thing={thing}
        />)}
    </>)
}