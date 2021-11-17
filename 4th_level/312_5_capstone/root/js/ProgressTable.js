import { useNavigate, Link } from "react-router-dom";

import dayjs from 'dayjs';

export const ProgressTable = (props) => {
    let navigate = useNavigate();

    const handleRowClick = (day) => navigate(`/edit-day/${day}`);

    // TODO Figure out how to make a "loading screen" while data is loading
    // TODO Figure out how to make the app go back to Progress Table every time app refreshes
    // TODO Add "Re-Load" button to (re-get) all data for table
    // TODO Make table look like a real table, with columns lining up and boxes around each cell (header a different color)
    return (<>
        <nav>
            <div className='active-page'>Progress Table</div>
            <Link to="/progress-charts">Progress charts</Link>
            <Link to="/settings">Settings</Link>
        </nav>

        <table>

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