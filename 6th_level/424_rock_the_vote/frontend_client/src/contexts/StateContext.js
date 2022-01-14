import React, { useContext, useReducer, useEffect } from "react";
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
    ADDERRMSG: "addErrMsg",
    CLEARMSG: "clearMsg",
}
const reducer = (state, action) => {
    // TODO desctructure all action.payload elements here???
    const { data } = action.payload || {};
    switch (action.type) {
        case ACTION.LOGIN:
            const { token, user } = action.payload;
            return { ...state, token, user };
        case ACTION.LOGOUT: return { ...state, token: "", user: {} };
        case ACTION.LOADISSUETABLE:
            // TODO can i refactor this to make it dry'er?
            // const { data } = action.payload;
            if (Array.isArray(data)) return { ...state, issues: [...data] };
            if (!Array.isArray(data)) return { ...state, issues: [data] };
            return state;
        case ACTION.ADDISSUETOTABLE:
            // TODO can i refactor this to make it dry'er?
            // const { data } = action.payload;
            if (Array.isArray(data)) return { ...state, issues: [...state.issues, ...data] };
            if (!Array.isArray(data)) return { ...state, issues: [...state.issues, data] };
            return state;
        case ACTION.LOADSINGLEISSUE:
            // TODO can i refactor this to make it dry'er?
            // const { data } = action.payload;
            if (data !== {}) return { ...state, issue: data };
            // if (!Array.isArray(data)) return { ...state, issues: [...state.issues, data] };
            return state;
        case ACTION.ADDERRMSG: return { ...state, errMsg: action.payload.errMsg };
        case ACTION.CLEARMSG: return { ...state, errMsg: "" };
        default: return state;
    }
}

// Add "token" to API Calls
export const secureAxios = axios.create();
secureAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const StateContextProvider = ({ children }) => {
    const navigate = useNavigate();

    // TODO find / fix situation that caused backend to crash, i think it was on Signup
    // ********** POST from: /auth/login **********
    // ---------------------- params
    //  {}
    // ---------------------- query
    //  {}
    // ---------------------- body
    //  { username: 'abb', password: 'abb' }
    // node:events:368
    //       throw er; // Unhandled 'error' event
    //       ^    
    // TypeError: Cannot read properties of null (reading 'checkPassword')
    //     at /home/gvd1024/development/assignments/6th_level/424_rock_the_vote/backend_server/controllers/auth.js:44:14
    //     at /home/gvd1024/development/assignments/6th_level/424_rock_the_vote/backend_server/node_modules/mongoose/lib/model.js:4942:18
    //     at processTicksAndRejections (node:internal/process/task_queues:78:11)
    // Emitted 'error' event on Function instance at:
    //     at /home/gvd1024/development/assignments/6th_level/424_rock_the_vote/backend_server/node_modules/mongoose/lib/model.js:4944:15


    // TODO combine signup and login into signlogin, add action parameter ("signup", "login")
    // TODO Add something to stop signin if already logged in
    const signup = async (credentials) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data: { token, user } } = await axios.post("/auth/signup", credentials);
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

    // TODO Add something to stop login if already logged in
    const login = async (credentials) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data: { token, user } } = await axios.post("/auth/login", credentials);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: ACTION.LOGIN, payload: { token, user } });
            navigate(`/issues-list`);
        }
        catch ({ response: { data: { errMsg } } }) {
            console.log(errMsg);
            // TODO Maybe combine error messages with good messages into an object {msgType, msgText}???
            dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } });
        }
    }

    // TODO dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } }); if login error
    const logout = () => {
        dispatch({ type: ACTION.LOGOUT });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate(`/`);
    }

    const addIssue = async (newIssue) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data } = await secureAxios.post(`/secure/issue`, newIssue);
            dispatch({ type: ACTION.ADDISSUETOTABLE, payload: { data } });
        }
        catch (err) {
            console.log('addIssue error \n', err);
        }

    }

    const addIssueComment = async (issueId, issueComment) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data } = await secureAxios.put(`/secure/issueComment/id/${issueId}`, { comment: issueComment });
            // dispatch({ type: ACTION.ADDISSUETOTABLE, payload: { data } });
        }
        catch ({ response: { data: { errMsg } } }) {
            console.log('addIssue error \n', errMsg);
            dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } });
        }
    }

    const addIssueVote = async (issueId, issueVote) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data } = await secureAxios.put(`/secure/issueVote/id/${issueId}`, { value: issueVote });
            // dispatch({ type: ACTION.ADDISSUETOTABLE, payload: { data } });
        }
        catch ({ response: { data: { errMsg } } }) {
            console.log('addIssue error \n', errMsg);
            dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } });
        }
    }

    const getUserName = async (userId) => {
        try {
            const { data } = await secureAxios.get(`/secure/user/id/${userId}`);
            return data[0].username;
        }
        catch (err) {
            console.log('getIssue error \n', err);
            return err;
        }
    }

    const getIssuesList = async () => {
        const { data } = await secureAxios.get(`/public`);
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

    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => getIssuesList(), []);

    return <StateContext.Provider value={{
        state, signup, login, logout,
        addIssue, addIssueComment, addIssueVote,
        getIssuesList, getIssue
    }}>
        {children}
    </StateContext.Provider>
};