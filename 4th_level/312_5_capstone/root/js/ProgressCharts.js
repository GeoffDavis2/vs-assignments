import React from "react";
import { Link, Outlet } from "react-router-dom";

// ToDo figure out way to bring in chart from google sheets or maybe some other JS Chart library?
//      ToDo Add in either chart from a Javascript Chart Library
//      ToDo Each Chart should have 2 lines (Baseline and Actual)

export const ChartProgPt = () => <>
    <div className='chart-container'>
        <img src="/TotProgPts.GIF" alt=""></img>
    </div>
</>

export const ChartReqPerDay = () => <>
    <div className='chart-container'>
        <img src="/ReqPtsPerDay.GIF" alt=""></img>
    </div>
</>

export const ProgressCharts = () => {

    return (<>
        <nav>
            <Link to="/progress-table">Progress Table</Link>
            <div className='active-page'>Progress charts</div>
            <Link to="/settings">Settings</Link>
        </nav>

        <nav className='sub-nav'>
            <Link to="prog-pts">Total Progress Pts</Link>
            <Link to="req-per-day">Required Per Day</Link>
        </nav>

        <Outlet />

    </>)
}