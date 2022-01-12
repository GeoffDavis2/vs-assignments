// TODO make it all look nicer using React Bootstrap

// React Stuff
import React from 'react';
import ReactDOM from 'react-dom';

// React Router Stuff
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { LoginSignup } from "./rrRoutes/loginSignup";
import { IssuesList } from "./rrRoutes/issuesList";
// TODO change AddEditViewIssue or addViewEditIssues.js name so they match
import { AddEditViewIssue } from "./rrRoutes/addViewEditIssues";
import { ViewIssue } from "./rrRoutes/viewIssue";

// Contexts
import { StateContextProvider } from "./contexts/StateContext";
import { RequireToken } from "./contexts/RequireToken";

const App = () => {
  return <Routes>
    <Route path="/" element={<LoginSignup />} />
    <Route path="/issues-list" element={<RequireToken><IssuesList /></RequireToken>} />
    {/* <Route path="/search-instruments" element={<SearchInst/>} /> */}
    <Route path="/edit-view-issue" element={<RequireToken><AddEditViewIssue /></RequireToken>} />
    <Route path="/view-issue/:issueId" element={<RequireToken><ViewIssue /></RequireToken>} />
  </Routes>
}

ReactDOM.render(<Router>
  <link rel="stylesheet" href="index.css" type="text/css" />
  <StateContextProvider>
    <App />
  </StateContextProvider>
</Router>, document.getElementById('root'));