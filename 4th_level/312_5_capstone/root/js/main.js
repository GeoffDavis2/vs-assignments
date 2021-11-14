import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';
import { Test } from './Test';
import '../css/style.css';

Test();


ReactDOM.render(
  <Router>
      <App />
  </Router>,
  document.getElementById("root-div"));