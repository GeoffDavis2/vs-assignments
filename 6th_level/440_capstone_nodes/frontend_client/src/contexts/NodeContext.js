import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const NodeContext = React.createContext();


// Adds "token" to API Calls
export const secureAxios = axios.create();
secureAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// TODO Move any functions that I can to above NodeContextProvider (should still be able to include in useNodeContext) 

// Custom Hook 
export const useNodeContext = () => useContext(NodeContext);


export const NodeContextProvider = ({ children }) => {
  const [allNodes, setAllNodes] = useState([{ title: "loading", _id: "loading" }]);
  const [selected, setSelected] = useState({ pId: '', cNdx: 0 });
  const [newSelection, setNewSelection] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/nodes`);
      setAllNodes(data);
    })()
  }, []);

  const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0) * sortOrder;
  }

  // TODO Remove if not used
  const getNode = id => allNodes.find(obj => obj._id === id);


  // TODO Remove "children" array from all code and backend node Schema
  const getChildren = (parent, sort) => allNodes
    .filter(obj => obj.parent === parent._id)
    .sort(dynamicSort(sort));

  // TODO Remove if not used
  const getNdx = (arr, id) => arr.findIndex(obj => obj._id === id);

  const updateDBnState = (id, fields) => {
    const ndx = allNodes.findIndex(obj => obj._id === id);
    setAllNodes(prev => {
      prev[ndx] = { ...prev[ndx], ...fields }
      return [...prev];
    })
    // TODO add alert if error on DB save
    axios.put(`/nodes/id/${id}`, fields);
  }

  // TODO switch everything using saveToDB to use updateDBnState instead
  const saveToDB = (nodeId, field) => axios.put(`/nodes/id/${nodeId}`, field);

  // TODO add logic to handle if first/last node in array
  const moveCursor = (theNode, direction) => {
    const gotoNode = (direction === 1)
      ? getChildren(getNode(theNode.parent), 'sort').find(obj => obj.sort > theNode.sort)
      : getChildren(getNode(theNode.parent), '-sort').find(obj => obj.sort < theNode.sort)
    const inputElement = document.querySelector(`input[id='${gotoNode._id}']`);
    inputElement.focus();
    setNewSelection(true);
  }

  // TODO add logic to handle if first/last node in array
  const moveNode = (theNode, direction) => {
    const siblings = getChildren(getNode(theNode.parent), 'sort');
    const siblingsNdx = getNdx(siblings, theNode._id);
    setAllNodes(prev => {
      const ndx1 = getNdx(prev, theNode._id);
      const ndx2 = getNdx(prev, siblings[siblingsNdx + direction]._id);
      prev[ndx1].sort = siblingsNdx + direction;
      prev[ndx2].sort = siblingsNdx;
      saveToDB(prev[ndx1]._id, { sort: prev[ndx1].sort });
      saveToDB(prev[ndx2]._id, { sort: prev[ndx2].sort });
      return [...prev];
    })
  }

  const addNode = async theNode => {
    getChildren(getNode(theNode.parent), 'sort')
      .forEach(obj => obj.sort >= theNode.sort && updateDBnState(obj._id, { sort: obj.sort + 1 }));
    const { data } = await axios.post(`/nodes`, { parent: theNode.parent, sort: theNode.sort });
    setAllNodes(prev => [...prev, data]);
    const inputElement = document.querySelector(`input[id='${data._id}']`);
    inputElement.focus();
    setNewSelection(true);
  }

  return <NodeContext.Provider value={{
    allNodes, setAllNodes, newSelection, setNewSelection,
    moveCursor, saveToDB, moveNode, getChildren, addNode
  }}>
    {children}
  </NodeContext.Provider>
};