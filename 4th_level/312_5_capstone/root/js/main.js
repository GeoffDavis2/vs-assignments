import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { ProgressTable } from "./ProgressTable";
import { EditDay } from './EditDay';

import '../css/style.css';

// TODO add API calls to google sheets (or use the V School todo api instead...?)
// TODO add functionality to update the API when user clicks the submit button
// TODO add in rest of columns from old progress tracker
// TODO figure out way to bring in charg from google sheets or maybe some other JS Chart library?
// TODO Put total Progress Points for course at bottom
// TODO make ProgressTable page re-pull from API and re-render every time user lands on page???
//    TODO or is there a better/smarter way to do this???
// TODO Make table pretty
// TODO add useEffect to "listen" for changes to API and...
//    TODO re-render progress table (verify only if on the Progress Table page)

// import { Test } from './Test';
// Test();

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="//*" element={<ProgressTable />} />
      <Route path="/edit-day/:Day" element={<EditDay />} />
    </Routes>
  </Router>
  , document.getElementById("root-div"));