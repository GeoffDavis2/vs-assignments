import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "./progress-data.json";

const useField = (type, initVal) => {
    const [value, setValue] = useState(initVal);
    const onChange = event => setValue(event.target.value);
    return { type, value, onChange }
}

export const EditDay = () => {
    const params = useParams();
    
    const day = data.find(obj => obj.Day === parseInt(params.Day))

    const {...date} = useField('text', day.Date);
    const {...level} = useField('number', day.Level); 
    const {...totProgPts} = useField('number', day.TotProgPts);

    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log('do put on API DB');

    }

    return (<>
        <nav>
            <Link to="/">Back to Progress Table</Link>
        </nav>

        <h1>Edit Progress For Day {day.Day}</h1>
        <form>
            Date: <input {...date}/><br/>
            Level: <input {...level}/><br/>
            Total Prog Pts: <input {...totProgPts}/><br/>
            <button onClick={handleSubmitClick}>Submit Change to API</button><br/>
        </form>
    </>)
}