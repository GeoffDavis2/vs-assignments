import React, { useState } from "react";
import { ThingsContext } from "./ThingsContextProvider";

// Custom Hook
export const useField = (type, initVal) => {
    const [value, setValue] = useState(initVal);
    const onChange = event => setValue(event.target.value);

    return { type, value, onChange }
}

// I don't even know what you would call this??? But it works!!!
export const TestBaseThing = props => {
    const { ...imgUrl } = useField('text', props.imgUrl);
    const { ...title } = useField('text', props.title);
    const { ...description } = useField('text', props.description);

    return {
        render: (<div>
            <img src={props.imgUrl} alt='' className='small-image' /><br />
            <p>API _id: {props._id}</p>
            <input {...imgUrl} type='text' /><br />
            <input {...title} type='text' /><br />
            <input {...description} type='text' /><br />
        </div>),
        thing: { imgUrl, title, description }
    }
}

export const EditThing = (props) => {
    const { handleUpdateThing, handleDeleteThing } = React.useContext(ThingsContext);
    const { render, thing } = TestBaseThing(props.thing);

    const handleClick = () => {
        const mergedThing = {
            ...props.thing, 
            title:thing.title.value,
            description:thing.description.value,
            imgUrl:thing.imgUrl.value
        };
        handleUpdateThing(mergedThing)
    }

    return <div>
        {render}
        <button onClick={handleClick}>Submit</button>
        <button onClick={() => handleDeleteThing(props.thing)}>Delete</button>
    </div>
}