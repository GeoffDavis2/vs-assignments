import React from "react";
import { useNavigate, Link } from "react-router-dom";
import data from "./progress-data.json";
import dayjs from 'dayjs';
// var dayjs = require('dayjs'); 

export const ProgressTable = () => {

    let navigate = useNavigate();

    const handleRowClick = (day) => navigate(`/edit-day/${day}`);

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
                {data.map(obj => <tr key={obj.Day} onClick={() => handleRowClick(obj.Day)}>
                    <td>{obj.Day}</td>
                    <td>{dayjs(obj.Date).format('MM/DD/YYYY')}</td>
                    <td>{obj.Level}</td>
                    <td>{obj.TotProgPts}</td>
                </tr>)}
            </tbody>

        </table>
    </>)
}