import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { putDay } from "./api";


export const EditDay = (props) => {
    const params = useParams();

    // This is just for convenience while styling the EditDay component
    // const [day, setDay] = useState({Day: 100, Date: '2021-11-18', Level: '', TotProgPts: ''});

    const [day, setDay] = useState(props.allDays[params.Day]);

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

    // ToDo Add validation to make sure input values are within a range
    return (<>
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