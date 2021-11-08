import React, { useState } from "react";
import { ThingsContext } from "./ThingsContextProvider";

export const BaseThing = props => {
    const { things, activeThingID, handleDeleteThing } = React.useContext(ThingsContext);
    const ndx = things.findIndex(thing => thing._id === activeThingID);
    const [activeThing, setActiveThing] = useState(JSON.parse(JSON.stringify(things[ndx])));

    const handleChange = ({ target: { name, value } }) => {
        console.log(name );
        console.log(value );
        // setActiveThing(prev => {

        //     return {...prev, name.value}
        // });
    };

    // TODO Create EditThing and AddThing component, then Wrap this around them
    return <div>
        <input
            type="text"
            name="activeThing.title"
            placeholder="Title..."
            value={activeThing.title}
            onChange={e => handleChange(e)}
        />
        <button onClick={() => handleDeleteThing(activeThing._id)}>Delete</button>
    </div>
}