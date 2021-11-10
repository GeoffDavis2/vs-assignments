import { useState, useContext } from "react";
import { ThingsContext } from "./ThingsContextProvider";

// Custom Hook... For this situation, probably better to just directly use setActiveThing
// But I want to keep it here (as a working example) so I can come back to it later
export const useField = (type, initVal) => {
    const [value, setValue] = useState(initVal);
    const onChange = event => setValue(event.target.value);
    return { type, value, onChange }
}

// TODO set up load random image button
// TODO fix it so app can handle multiple descriptions


export const EditThing = () => {
    const { mode, setMode, activeThing, handlePutThing, handleDeleteThing, handlePostThing } = useContext(ThingsContext);
    const { ...title } = useField('text', activeThing.title);
    const { ...description } = useField('text', activeThing.description);
    const { ...imgUrl } = useField('text', activeThing.imgUrl);

    const mergedThing = () => ({
        ...activeThing,
        title: title.value,
        description: description.value,
        imgUrl: imgUrl.value
    })

    const handleUpdateThingClick = () => handlePutThing(mergedThing());

    const handleNewThingClick = () => handlePostThing(mergedThing());

    return <div className='edit-thing'>
        <img
            src={imgUrl.value}
            alt=''
            className='edit-image'
        />
        <div className='edit-form'>
            <div>Image URL<br /><input {...imgUrl} type='text' /></div>
            <div>Title: <br /><input {...title} type='text' /></div>
            <div>Desc: <br /><input {...description} type='text' /></div>
            {mode === 'EditThing' ? <>
                <button onClick={handleUpdateThingClick}>Submit</button>
                <button onClick={() => handleDeleteThing(activeThing)}>Delete</button>
                <button >Prev</button>
                <button>Next</button>
            </> : ''}
            {mode === 'NewThing' ? <>
                <button onClick={handleNewThingClick}>Submit</button>
            </> : ''}
            <button onClick={() => setMode('ThingList')}>Cancel</button>
        </div>
    </div>
}