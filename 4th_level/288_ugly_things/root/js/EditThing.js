import React from "react";
import { ThingsContext } from "./ThingsContextProvider";
import { BaseThing } from "./BaseThing";


// TODO add prev/next button
export const EditThing = (props) => {
    const { handlePutThing, handleDeleteThing, setMode } = React.useContext(ThingsContext);
    const { renderBaseThing, thing } = BaseThing(props.thing);

    const handleClick = () => {
        const mergedThing = {
            ...props.thing,
            title: thing.title,
            description: thing.description,
            imgUrl: thing.imgUrl
        };
        handlePutThing(mergedThing);
    }

    // TODO make this prettier
    return <div className='edit-thing'>
        {renderBaseThing}
        <div>
            <button onClick={handleClick}>Submit</button>
            <button onClick={() => handleDeleteThing(props.thing)}>Delete</button>
            <button onClick={() => setMode('ThingList')}>Cancel</button>
        </div>
    </div>
}