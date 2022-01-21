import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import useAllKeysPress from './useAllKeysPress';

// Adds "token" to API Calls
export const secureAxios = axios.create();
secureAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// const nodeList = require('./nodes.json');

const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0) * sortOrder;
}

const App = async () => {
  const { nodeList } = await secureAxios.get(`/nodes`);
  console.log(nodeList);
  const [allNodes, setAllNodes] = useState(nodeList);
  const [childNodes, setChildNodes] = useState([]);
  const [selected, setSelected] = useState(0);

  const parent = allNodes[3];
  const pid = parent._id.$oid;
  useEffect(() => setChildNodes(allNodes.filter(obj => obj.parent && obj.parent.$oid === pid)), [allNodes, pid]);

  const DnArrow = useAllKeysPress({ userKeys: 'ArrowDown' });
  const UpArrow = useAllKeysPress({ userKeys: 'ArrowUp' });
  const ShiftAlt = useAllKeysPress({ userKeys: ['Shift', 'Alt'] });
  useEffect(() => {
    if (DnArrow && !ShiftAlt) moveSelectionDn();
    if (UpArrow && !ShiftAlt) moveSelectionUp();
    if (DnArrow && ShiftAlt) moveSelectedDn();
    if (UpArrow && ShiftAlt) moveSelectedUp();
    // eslint-disable-next-line
  }, [DnArrow, UpArrow, ShiftAlt])


  const moveSelectedUp = () => {
    if (selected <= 0) return;
    const arr = [...childNodes];
    arr.sort(dynamicSort('sort')).forEach((obj, i) => obj.sort = i);
    arr[selected].sort--;
    arr[selected - 1].sort++;
    moveSelectionUp();
    setChildNodes(arr);
  }

  const moveSelectedDn = () => {
    console.log(selected, childNodes.length);
    if (selected + 1 >= childNodes.length) return;
    const arr = [...childNodes];
    arr.sort(dynamicSort('sort')).forEach((obj, i) => obj.sort = i);
    arr[selected].sort++;
    arr[selected + 1].sort--;
    moveSelectionDn();
    setChildNodes(arr);
  }

  const moveSelectionUp = () => setSelected(prev => Math.max(prev - 1, 0));
  const moveSelectionDn = () => setSelected(prev => Math.min(prev + 1, childNodes.length - 1));

  const loadGrandParent = () => {
    // Need to figure out ObjectIds (how they will look when loading from DB for real)
  }


  return <div>
    <h1>{parent.title}</h1>
    <button>Up 1 Level</button><button>Top Level</button>
    {childNodes.sort(dynamicSort('sort')).map((obj, i) => <div className={i === selected ? 'parent selected' : 'parent'} key={i} onClick={() => setSelected(i)}>
      {obj.title}
      {obj.children.map(obj => <div className='child' key={obj._id}>{obj.title}</div>)}
      <hr />
    </div>)}
  </div>
}

ReactDOM.render(<>
  <link rel="stylesheet" href="/index.css" type="text/css" />
  <App />
</>, document.getElementById('root')
);
