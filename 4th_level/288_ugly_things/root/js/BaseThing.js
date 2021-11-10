import React, { useState } from "react";

// Custom Hook
export const useField = (type, initVal) => {
    const [value, setValue] = useState(initVal);
    const onChange = event => setValue(event.target.value);

    return { type, value, onChange }
}

// I don't even know what you would call this??? But it works!!!
export const BaseThing = (props) => {
    const { ...title } = useField('text', props.title);
    const { ...description } = useField('text', props.description);
    const { ...imgUrl } = useField('text', props.imgUrl);

    // TODO make this prettier
    return {
        renderBaseThing: (<>
            <img
                src={props.imgUrl}
                alt=''
                className='base-image'
            />
            <form>
                Image URL: <input {...imgUrl} type='text'/><br />
                Title: <input {...title} type='text' /><br />
                Desc: <input {...description} type='text' />
            </form>
        </>),
        thing: {
            title: title.value,
            description: description.value,
            imgUrl: imgUrl.value
        }
    }
}