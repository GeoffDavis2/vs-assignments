import { useNavigate, Link } from "react-router-dom";

import dayjs from 'dayjs';

export const ProgressTable = (props) => {
    let navigate = useNavigate();

    const handleRowClick = (day) => navigate(`/edit-day/${day}`);

    // ToDo Display Start Date, Number of Days, and End Date above chart
    // ToDo Add "Re-Load" button to (re-get) all data for table
    // ToDo Put total Progress Points for course at bottom
    // ToDo Pick better color combinations
    // TODO add in rest of columns from old progress tracker
    return (<>
        <nav>
            <div className='active-page'>Progress Table</div>
            <Link to="/progress-charts">Progress charts</Link>
            <Link to="/settings">Settings</Link>
        </nav>

        <table className='table'>

            <thead>
                <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Level</th>
                    <th>Tot Prog Points</th>
                </tr>
            </thead>

            <tbody>
                {props.allDays.map(obj => <tr key={obj.Day} onClick={() => handleRowClick(obj.Day)}>
                    <td>{obj.Day}</td>
                    <td>{dayjs(obj.Date).format('MM/DD/YYYY')}</td>
                    <td>{obj.Level}</td>
                    <td>{obj.TotProgPts}</td>
                </tr>)}
            </tbody>

        </table>
    </>)
}