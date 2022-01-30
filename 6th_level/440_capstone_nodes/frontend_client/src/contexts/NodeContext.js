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

// Custom Hook 
export const useNodeContext = () => useContext(NodeContext);

export const NodeContextProvider = ({ children }) => {
  const [allNodes, setAllNodes] = useState([{ title: "loading", _id: "loading" }]);
  const [cursorId, setCursorId] = useState(allNodes.find(obj => typeof obj.parent === "undefined")._id);
  const [siblingSortParentId, setSiblingSortParentId] = useState('');

  // Load data from backend
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/nodes`);
      setAllNodes(data);
    })()
  }, []);

  // Set focus to Input element matching with id=cursorId
  useEffect(() => {
    const inputElement = document.querySelector(`input[id='${cursorId}']`);
    inputElement.focus();
    inputElement.select();
    inputElement.selectionStart = 0;
    inputElement.selectionEnd = 0;
  }, [cursorId]);

  // Re-Sort children of siblingSortParentId
  useEffect(() => {
    if (siblingSortParentId) {
      // console.log(allNodes.filter(obj => obj.parent === siblingSortParentId).sort(dynamicSort('sibSort')));
      console.log(siblingSortParentId);
      allNodes
        .filter(obj => obj.parent === siblingSortParentId)
        .sort(dynamicSort('sibSort'))
        .forEach((obj, i) => updateDBnState(obj._id, { sibSort: i * 10 }))
    }
    setSiblingSortParentId('');
  }, [siblingSortParentId]);


  const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0) * sortOrder;
  }

  const getNode = id => allNodes.find(obj => obj._id === id);

  const getChildren = (parent, sortField) => allNodes?.filter(obj => obj.parent === parent._id).sort(dynamicSort(sortField));

  const updateDBnState = (id, fields) => {
    console.log(id, fields);
    const ndx = allNodes.findIndex(obj => obj._id === id);
    setAllNodes(prev => {
      prev[ndx] = { ...prev[ndx], ...fields }
      return [...prev];
    })
    axios.put(`/nodes/id/${id}`, fields);
  }

  const moveCursor = (theNode, direction) => {
    const gotoNode = (direction === 1)
      ? getChildren(getNode(theNode.parent), 'sibSort').find(obj => obj.sibSort > theNode.sibSort)
      : getChildren(getNode(theNode.parent), '-sibSort').find(obj => obj.sibSort < theNode.sibSort)
    setCursorId(gotoNode._id);
  }

  const moveNode = (theNode, direction) => {
    const swapNode = (direction === 1)
      ? getChildren(getNode(theNode.parent), 'sibSort').find(obj => obj.sibSort > theNode.sibSort)
      : getChildren(getNode(theNode.parent), '-sibSort').find(obj => obj.sibSort < theNode.sibSort)
    const newSibSort = swapNode.sibSort;
    updateDBnState(swapNode._id, { sibSort: theNode.sibSort })
    updateDBnState(theNode._id, { sibSort: newSibSort })
  }

  const addNode = async theNode => {    
    const { data } = await axios.post(`/nodes`, { parent: theNode.parent, sibSort: theNode.sibSort + 1 });
    setAllNodes(prev => [...prev, data]);
    setSiblingSortParentId(theNode.parent);
    setCursorId(data._id);
  }

  const delNode = theNode => {
    const nextNode = getChildren(getNode(theNode.parent), 'sibSort').find(obj => obj.sibSort > theNode.sibSort);
    setAllNodes(prev => prev = prev.filter(obj => obj._id !== theNode._id));
    axios.delete(`/nodes/id/${theNode._id}`);
    setSiblingSortParentId(nextNode.parent);
    setCursorId(nextNode._id);
  }

  const promoteNode = theNode => {
    const parentNode = getNode(theNode.parent);

    let s = 0;
    getChildren(parentNode, 'sibSort')
      .forEach(obj => obj.sibSort > theNode.sibSort && updateDBnState(obj._id, { parent: theNode._id, sibSort: s += 10 }));

    getChildren(getNode(parentNode.parent), 'sibSort')
      .forEach(obj => obj.sibSort > parentNode.sibSort && updateDBnState(obj._id, { sibSort: obj.sibSort + 10 }));

    updateDBnState(theNode._id, {
      parent: getNode(theNode.parent).parent,
      sibSort: parentNode.sibSort + 10
    });

    setCursorId(prev => theNode._id);
  }

  const demoteNode = theNode => {
    const newParent = getChildren(getNode(theNode.parent), '-sibSort').find(obj => obj.sibSort < theNode.sibSort);
    updateDBnState(theNode._id, { parent: newParent._id, sibSort: 0 });
    setSiblingSortParentId(newParent._id);
    setSiblingSortParentId(theNode.parent);
    setCursorId(theNode._id);
  };

  return <NodeContext.Provider value={{
    allNodes, setAllNodes,
    moveCursor, moveNode, getChildren,
    addNode, delNode, promoteNode, demoteNode,
    setCursorId, updateDBnState
  }}>
    {children}
  </NodeContext.Provider>
};