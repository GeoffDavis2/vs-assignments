import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { getALLDays } from "./api";

import { addColumnsToAllDays } from './addColumnsToAllDays';
import { ProgressTable } from "./ProgressTable";
import { EditDay } from './EditDay';
import { ProgressCharts, ChartProgPt, ChartReqPerDay } from './ProgressCharts';
import { Settings } from './Settings';

import '../css/style.css';


// TODO Figure out how to make a "loading screen" route page data is loading
//    TODO Or add "loading" screen using context?
// TODO Figure out how to make the app go back to Progress Table (or loading page) every time app refreshes
// TODO Clean up: remove remove fix warnings

const App = () => {
  const [allDays, setAllDays] = useState([]);

  // eslint-disable-next-line
  useEffect(async () => setAllDays(addColumnsToAllDays(await getALLDays())), []);

  const handleUpdateDayState = (day) => {
    setAllDays((prev) => {
      prev[day.Day]=day;
      return addColumnsToAllDays(prev);
    })
  }

  // TODO can I pass individual object to EditDay instead of whole array? (not sure how to pass the "Day" variable to the props)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProgressTable allDays={allDays} />} />
        <Route path="/progress-table" element={<ProgressTable allDays={allDays} />} />
        <Route path="/edit-day/:Day" element={<EditDay allDays={allDays} handleUpdateDayState={handleUpdateDayState}/>} />
        <Route path="/progress-charts" element={<ProgressCharts />}>
          <Route path="prog-pts" element={<ChartProgPt />} />
          <Route path="req-per-day" element={<ChartReqPerDay />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<ProgressTable allDays={allDays} />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root-div"));