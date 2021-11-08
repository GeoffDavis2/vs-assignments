import React, { useState } from "react";
import { ThingsContext } from "./ThingsContextProvider";

export const BaseThing = props => {
    const { things, activeThingID, handleDeleteThing, handleUpdateThing } = React.useContext(ThingsContext);
    const ndx = things.findIndex(thing => thing._id === activeThingID);
    const [activeThing, setActiveThing] = useState(JSON.parse(JSON.stringify(things[ndx])));

    const handleChange = ({ target: { name, value } }) => setActiveThing(prev => ({...prev, [name]:value}));

    // TODO create easy way for user to pick an image
    // TODO make this  pretty
    // TODO Create EditThing and AddThing component, then Wrap this around them
    return <div>
        <img src={things[ndx].imgUrl} alt='' className='large-image' /><br/>
        <input
            type="text"
            name="imgUrl"
            placeholder="Image URL..."
            value={activeThing.imgUrl}
            onChange={e => handleChange(e)}
        /><br/>
        <input
            type="text"
            name="title"
            placeholder="Title..."
            value={activeThing.title}
            onChange={e => handleChange(e)}
        /><br/>
        <input
            type="text"
            name="description"
            placeholder="description..."
            value={activeThing.description}
            onChange={e => handleChange(e)}
        /><br/>
        <button onClick={() => handleUpdateThing(activeThing)}>Submit</button>
        <button onClick={() => handleDeleteThing(activeThing._id)}>Delete</button>
    </div>
}