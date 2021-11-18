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

const App = () => {
  const [allDays, setAllDays] = useState([]);

  // eslint-disable-next-line
  useEffect(async () => setAllDays(addColumnsToAllDays(await getALLDays())), []);

  const handleUpdateDayState = (day) => {
    setAllDays((prev) => {
      prev[day.Day] = day;
      return addColumnsToAllDays(prev);
    })
  }

  // TODO can I pass individual object to EditDay instead of whole array? (not sure how to pass the "Day" variable to the props)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProgressTable allDays={allDays} />} />
        <Route path="/progress-table" element={<ProgressTable allDays={allDays} />} />
        <Route path="/edit-day/:Day" element={<EditDay allDays={allDays} handleUpdateDayState={handleUpdateDayState} />} />
        <Route path="/progress-charts" element={<ProgressCharts />}>
          <Route index element={<ChartProgPt allDays={allDays}/>} />
          <Route path="prog-pts" element={<ChartProgPt allDays={allDays}/>} />
          <Route path="req-per-day" element={<ChartReqPerDay allDays={allDays}/>} />
          {/* <Route path="test-chart" element={<TestChart allDays={allDays}/>} /> */}
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<ProgressTable allDays={allDays} />} />
      </Routes>
    </Router>);
}

ReactDOM.render(<App />, document.getElementById("root-div"));