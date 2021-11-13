import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { About } from './About';
import { Services } from './Services';
import { HomeNested1 } from './HomeNested1';
import { HomeNested2 } from './HomeNested2';
import '../css/style.css';

function MainComponent() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
      </nav>

      <main>
        <Routes>
          <Route path="//*" element={<Home />} />
          <Route path="/HomeNested1" element={<HomeNested1 />} />
          <Route path="/HomeNested2" element={<HomeNested2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/*" element={<Services />} />
        </Routes>
      </main>

      <footer className='footer'>
        <div>Footer 1</div>
        <div>Footer 2</div>
        <div>Footer 3</div>
      </footer>
    </BrowserRouter>
  );
}

ReactDOM.render(<MainComponent />, document.getElementById('root-div'));