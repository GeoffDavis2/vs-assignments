import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

function RootComponent() {

  return (<>
    <h1>Hello World</h1>
  </>)

}

ReactDOM.render(<RootComponent />, document.getElementById('root-container'));