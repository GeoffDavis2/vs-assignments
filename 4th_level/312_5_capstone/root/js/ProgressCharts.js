import React from "react";
import { Link, Outlet } from "react-router-dom";

export const ChartProgPt = () => <>
        <img src="/TotProgPts.GIF" alt=""></img>
</>

export const ChartReqPerDay = () => <>
        <img src="/ReqPtsPerDay.GIF" alt=""></img>
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