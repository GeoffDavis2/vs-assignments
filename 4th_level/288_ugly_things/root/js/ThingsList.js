import { useContext } from "react";
import { ThingsContext } from "./ThingsContextProvider";

const SmallThing = props => {
    const { handleEditThing, handleDeleteThing } = useContext(ThingsContext);

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

export const ThingsList = () => {
    const { things, handleAddThing } = useContext(ThingsContext);

    return <>
        <button onClick={handleAddThing} id='add-thing-button'>Add New Thing</button>
        <div id='spacer'>&nbsp;</div>
        {things.map((thing) => <SmallThing
            key={thing._id}
            thing={thing}
        />)}
    </>
}