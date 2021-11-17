// import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { putDay, testPost } from "./api";


export const EditDay = (props) => {
    const params = useParams();
    const [dayTest, setDayTest] = useState(props.allDays[params.Day]);

    const handleChange = ({ target: { name, value } }) => setDayTest({ ...dayTest, [name]: value });

    // TODO Rename dayTest to something else
    // TODO Add logic for when user click submit
    const handleSubmitClick = (e) => {
        e.preventDefault();
        putDay(dayTest);
        // console.log('hi');
    }

    const handleReloadClick = (e) => {
        e.preventDefault();
        setDayTest(props.allDays[params.Day]);
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
            Level: <input name='Level' value={dayTest.Level} onChange={handleChange} type='number' min="1" max="6" /><br />
            Total Prog Pts: <input name='TotProgPts' value={dayTest.TotProgPts} onChange={handleChange} type='number' /><br />
            <button onClick={handleSubmitClick}>Submit Change to API</button><br />
            <button onClick={handleReloadClick}>Reload Day</button><br />
        </form>
    </>)
}