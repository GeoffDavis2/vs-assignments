import React, { useContext, useReducer } from "react";
import axios from "axios";

const StateContext = React.createContext();

// Custom Hook
export const useStateContext = () => useContext(StateContext);

const ACTION = {
    LOGIN: "login",
    LOGOUT: "logout",
    ADDISSUE: "addIssue"
}
const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.LOGIN:
            const { token, user } = action.payload;
            return ({ ...state, token, user });
        case ACTION.LOGOUT: return ({ ...state, token: "", user: {} })
        case ACTION.ADDISSUE:
            let { data } = action.payload;
            // TODO can i refactor this to make it dry'er?
            if (Array.isArray(data)) return { ...state, issues: [...state.issues, ...data] };
            if (!Array.isArray(data)) return { ...state, issues: [...state.issues, data] };
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
    const signup = async (credentials) => {
        try {
            const { data: { token, user } } = await axios.post("/auth/signup", credentials);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: ACTION.LOGIN, payload: { token, user } });
        }
        catch (err) {
            console.log(err.response.data.errMsg);
            // alert(err);
        }
    }

    const login = async (credentials) => {
        try {
            const { data: { token, user } } = await axios.post("/auth/login", credentials);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: ACTION.LOGIN, payload: { token, user } });
            const { data } = await secureAxios.get(`/secure/issue`);
            dispatch({ type: ACTION.ADDISSUE, payload: { data } });
        }
        catch (err) {
            console.log(err.response.data.errMsg);
            // alert(err);
        }
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch({ type: ACTION.LOGOUT });
    }

    const addIssue = async (newIssue) => {
        try {
            const { data } = await secureAxios.post(`/secure/issue`, newIssue);
            dispatch({ type: ACTION.ADDISSUE, payload: { data } });
        }
        catch (err) {
            console.log('addIssue error \n', err);
        }
    }

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [], signup, login, logout, addIssue
    };
    const [state, dispatch] = useReducer(reducer, initState);

    return <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
};