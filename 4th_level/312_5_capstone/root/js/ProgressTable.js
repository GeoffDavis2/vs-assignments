import React from "react";
import { useNavigate } from "react-router-dom";
import data from "./progress-data.json";

export const ProgressTable = () => {

    let navigate = useNavigate();

    const handleRowClick = (day) => navigate(`/edit-day/${day}`);

    return (<>
        <nav>Progress Table</nav>

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
                    <td>{obj.Date}</td>
                    <td>{obj.Level}</td>
                    <td>{obj.TotProgPts}</td>
                </tr>)}
            </tbody>

        </table>
    </>)
}