import React from "react";
import { ThingsContext } from "./ThingsContextProvider";
import { BaseThing } from "./BaseThing";

export const NewThing = () => {
    const { handlePostThing, setMode } = React.useContext(ThingsContext);
    const emptyThing = { title: '', description: '', imgUrl: '' }
    const { renderBaseThing, thing } = BaseThing(emptyThing);

    // TODO make this prettier
    return <div>
        {renderBaseThing}
        <button onClick={() => handlePostThing(thing)}>Submit</button>
        <button onClick={() => setMode('ThingList')}>Cancel</button>
    </div >
}