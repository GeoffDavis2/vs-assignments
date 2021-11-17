import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { getALLDays } from "./api";

import { ProgressTable } from "./ProgressTable";
import { EditDay } from './EditDay';
import { ProgressCharts, ChartProgPt, ChartReqPerDay, ChartReqPerWDay } from './ProgressCharts';
import { Settings } from './Settings';

import '../css/style.css';

// TODO Add "loading screen using context"
// TODO add API calls to google sheets (or use the V School todo api instead...?)
// TODO add functionality to update the API when user clicks the submit button
// TODO add in rest of columns from old progress tracker
// TODO figure out way to bring in chart from google sheets or maybe some other JS Chart library?
// TODO Put total Progress Points for course at bottom
// TODO make ProgressTable page re-pull from API and re-render every time user lands on page???
//    TODO and/or should I add a Global data array variable that gets updated from API gets
//    TODO or is there a better/smarter way to do this???
// TODO Make table pretty
// TODO Pick good color combinations
// TODO add useEffect to "listen" for changes to API and...
//    TODO re-render progress table (verify only if on the Progress Table page)
//    TODO and/or update the Global data array (just the changed object???)
// TODO set EditDay component to get prop from arry to make it quicker
//    TODO Add reload from state array button
//    TODO then if record is changed by EditDay, do the following async...
//        TODO update value in alldays state array
//        TODO update value in google sheets

const App = () => {
  const [allDays, setAllDays] = useState([]);

  // eslint-disable-next-line
  useEffect(async () => setAllDays(await getALLDays()), []);

  // TODO can I pass individual object to EditDay instead of whole array? (not sure how to pass the "Day" variable to the props)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProgressTable allDays={allDays} />} />
        <Route path="/progress-table" element={<ProgressTable allDays={allDays} />} />
        <Route path="/edit-day/:Day" element={<EditDay allDays={allDays} />} />
        <Route path="/progress-charts" element={<ProgressCharts />}>
          <Route path="prog-pts" element={<ChartProgPt />} />
          <Route path="req-per-day" element={<ChartReqPerDay />} />
          <Route path="req-per-wday" element={<ChartReqPerWDay />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<ProgressTable allDays={allDays} />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root-div"));