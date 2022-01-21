import React, { useContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import useAllKeysPress from '../components/useAllKeysPress';

const NodeContext = React.createContext();


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




// Custom Hook 
export const useNodeContext = () => useContext(NodeContext);


export const NodeContextProvider = ({ children }) => {
    const [allNodes, setAllNodes] = useState([{ title: "loading", _id: "loading" }]);

    // TODO combinee loadAllNodes and useEffect into one block
  const loadAllNodes = async () => {
    const { data } = await axios.get(`/nodes`);
    setAllNodes(data);
  }
  useEffect(() => loadAllNodes(), []);

    return <NodeContext.Provider value={{ allNodes, setAllNodes }}>
        {children}
    </NodeContext.Provider>
};