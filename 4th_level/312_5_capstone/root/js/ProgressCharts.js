import React from "react";
import { Line } from 'react-chartjs-2';
import { Link, Outlet } from "react-router-dom";

export const ChartProgPt = (props) => {
    const chartData = {
        labels: props.allDays.map(day => day.Date),
        datasets: [
            {
                label: 'Scheduled',
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 2,
                data: props.allDays.map(day => day.Scheduled),
                pointRadius: 0
            },
            {
                label: 'Actual',
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 2,
                data: props.allDays.map(day => day.TotProgPts === '' ? null : day.TotProgPts),
                pointRadius: 0
            }
        ]
    };

    return (<>
        <h1>Total Progress</h1>
        <div className='charts'><Line
            data={chartData}
            options={{
                legend: {
                    display: true,
                    position: 'right'
                }
            }}
        /></div>
    </>)
}

export const ChartReqPerDay = (props) => {
    const chartData = {
        labels: props.allDays
            .filter(day => day.ReqPtPerDay !== '')
            .map(day => day.Date),
        datasets: [
            {
                label: 'Pts Required Per Day',
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                data: props.allDays
                    .filter(day => day.ReqPtPerDay !== '')
                    .map(day => day.ReqPtPerDay),
                pointRadius: 0
            },
            {
                label: 'Pts Required Per Week Day',
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 2,
                data: props.allDays
                    .filter(day => day.ReqPtPerWkDay !== '')
                    .map(day => day.ReqPtPerWkDay),
                pointRadius: 0
            }
        ]
    };

    return (<>
        <h1>Total Progress</h1>
        <div className='charts'><Line
            data={chartData}
            options={{
                legend: {
                    display: true,
                    position: 'right'
                }
            }}
        /></div>
    </>)
}

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