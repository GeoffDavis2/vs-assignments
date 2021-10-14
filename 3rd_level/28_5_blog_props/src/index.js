import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Navbar';
import BlogPost from './BlogPost';

import blogs from './blogs';

const navBarArray = [
    {text: 'Start Bootstrap', style: 'navbar1'},
    {text: 'Home', style: 'navbar2'},
    {text: 'About', style: 'navbar2'},
    {text: 'Sample Post', style: 'navbar2'},
    {text: 'Contact', style: 'navbar2'}
];

ReactDOM.render(<Navbar menuItems = {navBarArray}/>, document.getElementById('nav-bar'));

ReactDOM.render(
    <React.Fragment>
        {blogs.map(blog => <BlogPost key={blog.title} blog={blog}/>)}
    </React.Fragment>
    , document.getElementById('container'));