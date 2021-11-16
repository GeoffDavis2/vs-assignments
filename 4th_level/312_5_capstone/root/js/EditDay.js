import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDay } from "./api";
import { useEffect } from "react";


export const EditDay = () => {
    const params = useParams();
    const [dayTest, setDayTest] = useState({ Day: 0, Date: "0", Level: 0, TotProgPts: 0 });

    // eslint-disable-next-line
    useEffect(async () => setDayTest(await getDay(params.Day)), [params.Day]);

    const handleChange = ({ target: { name, value } }) => setDayTest({ ...dayTest, [name]: value });

    // TODO Add logic for when user click submit
    const handleSubmitClick = () => {
        console.log('handleSubmitClick');
    }

    const handleReloadClick = async (e) => {
        e.preventDefault();
        setDayTest(await getDay(params.Day));
    }

    // TODO Add validation to make sure input values are within a range
    return (<>
        <nav>
            <Link to="/progress-table">Progress Table</Link>
            <Link to="/progress-charts">Progress charts</Link>
            <Link to="/settings">Settings</Link>
        </nav>

        <h1>Edit Progress For Day {params.Day}</h1>
        <form>
            Date: <input name='Date' value={dayTest.Date} onChange={handleChange} type='date' /><br />
            Level: <input name='Level' value={dayTest.Level} onChange={(e) => handleChange(e)} type='number' min="1" max="6" /><br />
            Date: <input name='TotProgPts' value={dayTest.TotProgPts} onChange={handleChange} type='number' /><br />
            <button onClick={handleSubmitClick}>Submit Change to API</button><br />
            <button onClick={handleReloadClick}>Reload Day</button><br />
        </form>
    </>)
}