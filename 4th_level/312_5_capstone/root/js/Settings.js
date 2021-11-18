import React from "react";
import { Link } from "react-router-dom";

export const Settings = () => {

    return (<>
        <nav>
            <Link to="/progress-table">Progress Table</Link>
            <Link to="/progress-charts">Progress charts</Link>
            <div className='active-page'>Settings</div>
        </nav>

        <form className='settings'>
            <h3>Edit Settings</h3>
            Total Progress Points for Course: <input type='number' /><br />
            Start Date: <input type='date' /><br />
            End Date: <input type='date' /><br />
            Total Number of Days<br />
            Progress Points Required per Day<br />
            Total Number of Week Days<br />
            Progress Points Required per Week Day<br />
            Color Theme: <select name="theme" id="theme">
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
            </select><br />
            <button >Submit Changes</button>
        </form>

    </>)
}