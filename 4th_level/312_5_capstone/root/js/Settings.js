import React from "react";
import { Link } from "react-router-dom";

export const Settings = () => {

    // TODO Add in non-functional form with inputs for the following...
    //      TODO Start Date
    //      TODO End Date
    // TODO Add the following Buttons
    //      TODO Regenerate Planned Points
    //      TODO Color Theme

    return (<>
        <nav>
            <Link to="/progress-table">Progress Table</Link>
            <Link to="/progress-charts">Progress charts</Link>
            <div className='active-page'>Settings</div>
        </nav>

        <br /><br /><br /><br /><br />

        <h1>This is a stub for the Settings Page</h1>

    </>)
}