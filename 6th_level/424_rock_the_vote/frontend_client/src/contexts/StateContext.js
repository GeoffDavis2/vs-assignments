import React, { useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StateContext = React.createContext();

// Custom Hook 
export const useStateContext = () => useContext(StateContext);

// Define initVote, initComment, & initState
const initVote = { _id: "", value: 0, addedBy: {}, addedDate: "" };
const initComment = { _id: "", comment: "", addedBy: {}, addedDate: "", votes: [initVote] };
const initIssue = { _id: "", title: "", desc: "", addedBy: {}, addedDate: "", votes: [initVote], comments: [initComment] };
const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [initIssue], issue: initIssue,
    errMsg: ""
};

const ACTION = {
    LOGIN: "login",
    LOGOUT: "logout",
    LOADISSUETABLE: "loadIssueTable",
    ADDISSUETOTABLE: "addissuetotable",
    LOADSINGLEISSUE: "loadSingleIssue",
    CLEARSINGLEISSUE: "clearSingleIssue",
    ADDERRMSG: "addErrMsg",
    CLEARMSG: "clearMsg",
}
const reducer = (state, action) => {
    const { data } = action.payload || {};
    const { token } = action.payload || {};
    const { user } = action.payload || {};
    switch (action.type) {
        case ACTION.LOGIN: return { ...state, token, user };
        case ACTION.LOGOUT: return { ...state, token: "", user: {} };
        case ACTION.LOADISSUETABLE:
            if (Array.isArray(data)) return { ...state, issues: [...data] };
            if (!Array.isArray(data)) return { ...state, issues: [data] };
            return state;
        case ACTION.ADDISSUETOTABLE:
            if (Array.isArray(data)) return { ...state, issues: [...state.issues, ...data] };
            if (!Array.isArray(data)) return { ...state, issues: [...state.issues, data] };
            return state;
        case ACTION.LOADSINGLEISSUE:
            if (data !== {}) return { ...state, issue: data };
            return state;
        case ACTION.CLEARSINGLEISSUE: return { ...state, issue: initIssue }
        case ACTION.ADDERRMSG: return { ...state, errMsg: action.payload.errMsg };
        case ACTION.CLEARMSG: return { ...state, errMsg: "" };
        default: return state;
    }
}

// Adds "token" to API Calls
export const secureAxios = axios.create();
secureAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const StateContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const loginSignup = async (path, credentials) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data: { token, user } } = await axios.post(path, credentials);
            console.log(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: ACTION.LOGIN, payload: { token, user } });
            navigate(`/issues-list`);
        }
        catch ({ response: { data: { errMsg } } }) {
            console.log(errMsg);
            dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } });
        }
    }

    const logout = () => {
        dispatch({ type: ACTION.LOGOUT });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        getIssuesList();
        navigate(`/`);
    }

    const getIssuesList = async (userId) => {
        let data = {};
        userId || ({ data } = await secureAxios.get(`/public`));
        userId && ({ data } = await secureAxios.get(`/public/userid/${userId}`));
        dispatch({ type: ACTION.LOADISSUETABLE, payload: { data } });
    }

    const getIssue = async (issueId) => {
        try {
            const { data } = await secureAxios.get(`/secure/singleIssueView/id/${issueId}`);
            dispatch({ type: ACTION.LOADSINGLEISSUE, payload: { data } });
        }
        catch (err) {
            console.log('getIssue error \n', err);
        }
    }

    const clearIssue = () => dispatch({ type: ACTION.CLEARSINGLEISSUE });

    const postIssue = async (newIssue) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data } = await secureAxios.post(`/secure/issue`, newIssue);
            dispatch({ type: ACTION.ADDISSUETOTABLE, payload: { data } });
        }
        catch (err) {
            console.log('postIssue error \n', err);
        }

    }

    const putToIssue = async (path, obj) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data } = await secureAxios.put(path, obj);
            dispatch({ type: ACTION.LOADSINGLEISSUE, payload: { data } });
        }
        catch ({ response: { data: { errMsg } } }) {
            console.log('putToIssue error \n', errMsg);
            dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } });
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);

    return <StateContext.Provider value={{
        state, loginSignup, logout,
        postIssue, putToIssue,
        getIssuesList, getIssue, clearIssue
    }}>
        {children}
    </StateContext.Provider>
};