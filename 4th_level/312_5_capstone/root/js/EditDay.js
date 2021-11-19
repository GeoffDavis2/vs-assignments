import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { putDay } from "./api";


export const EditDay = (props) => {
    const params = useParams();

    const [day, setDay] = useState(props.allDays[params.Day]);

    useEffect(() => setDay(props.allDays[params.Day]), [props.allDays, params.Day]);

    const handleChange = ({ target: { name, value } }) => setDay({ ...day, [name]: value });

    const handleSubmitClick = (e) => {
        e.preventDefault();
        props.handleUpdateDayState(day);
        putDay(day);
    }

    const handleReloadClick = (e) => {
        e.preventDefault();
        setDay(props.allDays[params.Day]);
    }

    return (!day ? <h1>Loading...</h1> : <>
        <nav>
            <Link to="/progress-table">Progress Table</Link>
            <Link to="/progress-charts">Progress charts</Link>
            <Link to="/settings">Settings</Link>
        </nav>

        <form className='edit-day'>
            <h3>Edit Progress For Day {params.Day}</h3>
            Date: <input name='Date' value={day.Date} onChange={handleChange} type='date' /><br />
            Level: <input name='Level' value={day.Level} onChange={handleChange} type='number' min="1" max="6" /><br />
            Total Prog Pts: <input name='TotProgPts' value={day.TotProgPts} onChange={handleChange} type='number' /><br />
            <button onClick={handleSubmitClick}>Submit</button>
            <button onClick={handleReloadClick}>Reload Day</button>
        </form>
    </>)
}