import { useNavigate, Link } from "react-router-dom";

import dayjs from 'dayjs';

export const ProgressTable = (props) => {
        
    let navigate = useNavigate();

    const handleRowClick = (day) => navigate(`/edit-day/${day}`);

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
                    <th>Act Prog Pts</th>
                    <th>Baseline</th>
                    <th>Req Per Day</th>
                    <th>Req Per WkDay</th>
                </tr>
            </thead>

            <tbody>
                {props.allDays.map(obj => <tr key={obj.Day} onClick={() => handleRowClick(obj.Day)}>
                    <td>{obj.Day}</td>
                    <td>{dayjs(obj.Date).format('MM/DD/YYYY')}</td>
                    <td>{obj.Level}</td>
                    <td>{obj.TotProgPts}</td>
                    <td>{obj.Scheduled}</td>
                    <td>{obj.ReqPtPerDay}</td>
                    <td>{obj.ReqPtPerWkDay}</td>
                </tr>)}
            </tbody>

        </table>
    </>)
}