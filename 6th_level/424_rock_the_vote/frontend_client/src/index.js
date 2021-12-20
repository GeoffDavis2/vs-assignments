import React from 'react';
import ReactDOM from 'react-dom';

// React Router Stuff
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { LoginSignup } from "./rrRoutes/loginSignup";
import { IssuesList } from "./rrRoutes/issuesList";
import { AddEditViewIssue } from "./rrRoutes/addViewEditIssues";

// Context HOC (wrapper)
import { StateContextProvider } from "./StateContext";

import './index.css';

const App = () => {  
  return <Router>
    <StateContextProvider>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/issues-list" element={<IssuesList />} />
        {/* <Route path="/search-instruments" element={<SearchInst/>} /> */}
        {/* <Route path="/edit-view-issue/:issueId" element={<AddEditViewIssue/>} /> */}
        <Route path="/edit-view-issue" element={<AddEditViewIssue />} />
      </Routes>
    </StateContextProvider>
  </Router>}

ReactDOM.render(<App />, document.getElementById('root'));