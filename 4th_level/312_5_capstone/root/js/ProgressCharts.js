import React from "react";
import { Link, Outlet } from "react-router-dom";

// TODO Add in either chart from a Javascript Chart Library
//      TODO Each Chart should have 2 lines (Baseline and Actual)

export const ChartProgPt = () => <>
    <br /><br /><br /><br /><br />
    <h1>This is a stub for the Progress Pts Chart</h1>
</>

export const ChartReqPerDay = () => <>
    <br /><br /><br /><br /><br />
    <h1>This is a stub for the Required Progress Per Day Chart</h1>
</>

export const ChartReqPerWDay = () => <>
    <br /><br /><br /><br /><br />
    <h1>This is a stub for the Required Progress Per Week Day Chart</h1>
</>

export const ProgressCharts = () => {

    return (<>
        <nav>
            <Link to="/progress-table">Progress Table</Link>
            <div className='active-page'>Progress charts</div>
            <Link to="/settings">Settings</Link>
        </nav>

        <nav className='sub-nav'>
            <Link to="prog-pts">Progress Pts</Link>
            <Link to="req-per-day">Req'd per Day</Link>
            <Link to="req-per-wday">Req'd per Week Day</Link>
        </nav>

        <Outlet />

    </>)
}