import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import friends from './data';

ReactDOM.render(<App friends={friends} />, document.getElementById('root'));