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
  const [allNodes, setAllNodes] = useState([]);
  const [cursorId, setCursorId] = useState('');
  const [siblingSortParentId, setSiblingSortParentId] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [errMsg, setErrMsg] = useState("");

  const loginSignup = async (path, credentials) => {
    setErrMsg("");
    try {
      const { data: { token, user } } = await axios.post(path, credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
    }
    catch ({ response: { data: { errMsg } } }) {
      console.log(errMsg);
      setErrMsg(errMsg);
    }
  }

  const logout = () => {
    setAllNodes([]);
    setUser({});
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // Load data from the backend
  const loadData = async () => {
    try {
      let { data } = await secureAxios.get(`/secure/nodes`);
      if (data.length === 0) { [{ data }] = await secureAxios.post(`/secure/nodes`, { title: "Top Node", sort: 10 }) };
      setAllNodes(data);
    }
    catch ({ response: { data: { errMsg } } }) {
      console.log(errMsg);
      setErrMsg(errMsg);
    }
  }
  useEffect(() => {
    if (token !== "") loadData();
  }, [token]);

  // Set focus to Input element matching with id=cursorId
  useEffect(() => {
    if (cursorId) {
      const inputElement = document.querySelector(`input[id='${cursorId}']`);
      inputElement.focus();
      inputElement.select();
      inputElement.selectionStart = 0;
      inputElement.selectionEnd = 0;
      setCursorId('');
    }
  }, [cursorId]);

  // Re-Sort children of siblingSortParentId
  useEffect(() => {
    if (siblingSortParentId) {
      allNodes
        .filter(obj => obj.parent === siblingSortParentId)
        .sort(dynamicSort('sibSort'))
        .forEach((obj, i) => updateDBnState(obj._id, { sibSort: (i + 1) * 10 }))
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
    const ndx = allNodes.findIndex(obj => obj._id === id);
    setAllNodes(prev => {
      prev[ndx] = { ...prev[ndx], ...fields }
      return [...prev];
    })
    secureAxios.put(`/secure/nodes/id/${id}`, fields);
  }

  const moveCursor = (theNode, direction) => {
    const all = document.querySelectorAll("input");
    const curr = document.activeElement;
    let ndx = all.length - 1; while (all[ndx].id !== curr.id && ndx > 0) ndx -= 1;
    setCursorId(all[direction > 0 ? Math.min(ndx + 1, all.length - 1) : Math.max(ndx - 1, 0)].id);
  }

  const moveNode = (theNode, direction) => {
    const swapNode = (direction === 1)
      ? getChildren(getNode(theNode.parent), 'sibSort').find(obj => obj.sibSort > theNode.sibSort)
      : getChildren(getNode(theNode.parent), '-sibSort').find(obj => obj.sibSort < theNode.sibSort)
    const newSibSort = swapNode.sibSort;
    updateDBnState(swapNode._id, { sibSort: theNode.sibSort })
    updateDBnState(theNode._id, { sibSort: newSibSort })
  }

  const addSibNode = async theNode => {
    const { data } = await secureAxios.post(`/secure/nodes`, { parent: theNode.parent, sibSort: theNode.sibSort + 1 });
    setAllNodes(prev => [...prev, data]);
    setSiblingSortParentId(theNode.parent);
    setCursorId(data._id);
  }

  const addChildNode = async theNode => {
    const { data } = await secureAxios.post(`/secure/nodes`, { parent: theNode._id, sibSort: 0 });
    setAllNodes(prev => [...prev, data]);
    setSiblingSortParentId(theNode._id);
    setCursorId(data._id);
  }

  const delNode = theNode => {
    const nextNode = getChildren(getNode(theNode.parent), 'sibSort').find(obj => obj.sibSort > theNode.sibSort);
    // TODO Get prev nodeId to set cursor to next after delete
    setAllNodes(prev => prev = prev.filter(obj => obj._id !== theNode._id));
    secureAxios.delete(`/secure/nodes/id/${theNode._id}`);
    if (nextNode) {
      setSiblingSortParentId(nextNode.parent)
      moveCursor(theNode._id, 1);
    } else moveCursor(theNode._id, -1)
  }

  const promoteNode = theNode => {
    const currParent = getNode(theNode.parent);
    setAllNodes(prev => {
      const ndx = prev.findIndex(obj => obj._id === theNode._id);
      prev[ndx] = { ...prev[ndx], ...{ parent: currParent.parent, sibSort: (currParent.sibSort + 1) } };
      secureAxios.put(`/secure/nodes/id/${prev[ndx]._id}`, { parent: prev[ndx].parent });
      prev.filter(obj => obj.parent === currParent.parent).sort(dynamicSort('sibSort')).forEach((obj, i) => {
        obj.sibSort = (i + 1) * 10;
        secureAxios.put(`/secure/nodes/id/${obj._id}`, { sibSort: obj.sibSort });
      });
      return [...prev];
    })
    setCursorId(theNode._id);
  }

  const demoteNode = theNode => {
    const newParentId = getChildren(getNode(theNode.parent), '-sibSort').find(obj => obj.sibSort < theNode.sibSort)._id;
    setAllNodes(prev => {
      const ndx = prev.findIndex(obj => obj._id === theNode._id);
      prev[ndx] = { ...prev[ndx], ...{ parent: newParentId, sibSort: Infinity } };
      secureAxios.put(`/secure/nodes/id/${prev[ndx]._id}`, { parent: prev[ndx].parent });
      prev.filter(obj => obj.parent === prev[ndx].parent).sort(dynamicSort('sibSort')).forEach((obj, i) => {
        obj.sibSort = (i + 1) * 10;
        secureAxios.put(`/secure/nodes/id/${obj._id}`, { sibSort: obj.sibSort });
      });
      prev.filter(obj => obj.parent === theNode.parent).sort(dynamicSort('sibSort')).forEach((obj, i) => {
        obj.sibSort = (i + 1) * 10;
        secureAxios.put(`/secure/nodes/id/${obj._id}`, { sibSort: obj.sibSort });
      });
      return [...prev];
    })
    setCursorId(theNode._id);
  };

  return <NodeContext.Provider value={{
    allNodes, setAllNodes, loginSignup, logout, addChildNode,
    moveCursor, moveNode, getChildren, errMsg, user,
    addSibNode, delNode, promoteNode, demoteNode,
    setCursorId, updateDBnState, token
  }}>
    {children}
  </NodeContext.Provider>
};