// TODO Later: make it all look nicer using React Bootstrap
// TODO Later: Still displays last issue while waiting to load new issue, display loading screen instead
// TODO Later: Allow changing vote and comment, but restrict to only one vote per person per issue & issueComment


import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes , BrowserRouter as Router } from "react-router-dom";
import { LoginSignup } from "./rrRoutes/loginSignup";
import { IssuesTable } from "./rrRoutes/issuesTable";
import { AddNewIssue } from "./rrRoutes/addNewIssue";
import { ViewEditIssue } from "./rrRoutes/viewEditIssue";
import { StateContextProvider } from "./contexts/StateContext";
import { RequireToken } from "./contexts/RequireToken";

const App = () => {
  return <Routes>
    <Route path="/" element={<IssuesTable />} />
    <Route path="/login-signup" element={<LoginSignup />} />
    <Route path="/issues-list" element={<IssuesTable />} />
    <Route path="/edit-view-issue" element={<RequireToken><AddNewIssue /></RequireToken>} />
    <Route path="/view-issue/:issueId" element={<RequireToken><ViewEditIssue /></RequireToken>} />
  </Routes>
}

ReactDOM.render(<Router>
  <link rel="stylesheet" href="/index.css" type="text/css" />
  <StateContextProvider>
    <App />
  </StateContextProvider>
</Router>, document.getElementById('root'));