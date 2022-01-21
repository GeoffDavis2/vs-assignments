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

const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0) * sortOrder;
}

const App = () => {
  
  // TODO set phony object as first in array and load all top level parents in it as children
  const [allNodes, setAllNodes] = useState([{title: "loading", _id: "loading"}]);
  const [childNodes, setChildNodes] = useState([]);
  // TODO rename this to childNdx
  const [selected, setSelected] = useState(0);

  // TODO combinee loadAllNodes and useEffect into one block
  const loadAllNodes = async () => {
    const { data } = await axios.get(`/nodes`);
    setAllNodes(data);
  }
  useEffect(() => loadAllNodes(), []);

  const parent = allNodes.find(obj => typeof obj.parent === "undefined");
  // TODO do i really need all these "useEffects"???
  useEffect(() => setChildNodes(allNodes.filter(obj => obj.parent  === parent._id)), [allNodes, parent]);

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
