import React, { useContext, useReducer } from "react";
import axios from "axios";

const StateContext = React.createContext();

// Custom Hook
export const useStateContext = () => useContext(StateContext);

const ACTION = {
    LOGIN: "login",
    LOGOUT: "logout",
    ADDISSUES: "addIssues",
    ADDERRMSG: "addErrMsg",
    CLEARMSG: "clearMsg",
}
const reducer = (state, action) => {
    console.log('reducer', action);
    switch (action.type) {
        case ACTION.LOGIN:
            const { token, user } = action.payload;
            console.log("ACTION.LOGIN", token, user);
            return { ...state, token, user };
        case ACTION.LOGOUT: return { ...state, user: {}, token: "", issues: [] };
        case ACTION.ADDISSUES:
            // TODO can i refactor this to make it dry'er?
            const { data } = action.payload;
            if (Array.isArray(data)) return { ...state, issues: [...state.issues, ...data] };
            if (!Array.isArray(data)) return { ...state, issues: [...state.issues, data] };
            return state;
        case ACTION.ADDERRMSG: return { ...state, errMsg: action.payload.errMsg };
        case ACTION.CLEARMSG: return { ...state, errMsg: "" };
        default: return state;
    }
}

const secureAxios = axios.create();
secureAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const StateContextProvider = ({ children }) => {

    // TODO combine signup and login into signlogin, add action parameter ("signup", "login")
    // TODO Add something to stop signin if already logged in
    const signup = async (credentials) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data: { token, user } } = await axios.post("/auth/signup", credentials);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: ACTION.LOGIN, payload: { token, user } });
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
            console.log("login", token, user);
            dispatch({ type: ACTION.LOGIN, payload: { token, user } });
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            const { data } = await secureAxios.get(`/secure/issue`);
            dispatch({ type: ACTION.ADDISSUES, payload: { data } });
        }
        catch ({ response: { data: { errMsg } } }) {
            console.log(errMsg);
            // TODO Maybe combine error messages with good messages into an object {msgType, msgText}???
            dispatch({ type: ACTION.ADDERRMSG, payload: { errMsg } });
        }
    }

    const logout = () => {
        console.log('logout');
        dispatch({ type: ACTION.CLEARMSG });
        dispatch({ type: ACTION.LOGOUT });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const addIssue = async (newIssue) => {
        dispatch({ type: ACTION.CLEARMSG });
        try {
            const { data } = await secureAxios.post(`/secure/issue`, newIssue);
            dispatch({ type: ACTION.ADDISSUES, payload: { data } });
        }
        catch (err) {
            console.log('addIssue error \n', err);
        }
    }

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [], errMsg: ""        
    };
    const [state, dispatch] = useReducer(reducer, initState);

    return <StateContext.Provider value={{state, signup, login, logout, addIssue}} >
        {children}
    </StateContext.Provider>
};