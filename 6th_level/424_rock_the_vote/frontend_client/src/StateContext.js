import React, { useContext, useReducer } from "react";
import axios from "axios";

const StateContext = React.createContext();

// Custom Hook
export const useStateContext = () => useContext(StateContext);

const ACTION = {
    LOGIN: "login",
    LOGOUT: "logout"
}
const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.LOGIN:
            const { token, user } = action.payload;
            return ({ ...state, token, user });
        case ACTION.LOGOUT: return ({ ...state, token: "", user: {} })
    }
}

const secureAxios = axios.create();
secureAxios.interceptors.request.use(config => {
    const {token} = localStorage.getItem("token");
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config; 
});

export const StateContextProvider = ({ children }) => {

    const issues = [
        {
            _id: "61ba1bda4ac3f426022a7680",
            title: 'Geoff Issue 1',
            dateAdded: "2021-12-15",
            createdBy: "61ba13660808873a6e3914ae"
        },
        {
            _id: "61ba1c724ac3f426022a7682",
            title: 'Geoff Issue 2',
            dateAdded: "2021-12-15",
            createdBy: "61ba13660808873a6e3914ae"
        },
        {
            _id: "61ba23a2d67ceba46a0f790d",
            title: 'Benita Issue 1',
            dateAdded: "2021-12-15",
            createdBy: "61b98b450b9253d9da02ac44"
        },
        {
            _id: "61ba23a7d67ceba46a0f790f",
            title: 'Benita Issue 2',
            dateAdded: "2021-12-15",
            createdBy: "61b98b450b9253d9da02ac44"
        },
        {
            _id: "61ba23abd67ceba46a0f7911",
            title: 'Benita Issue 3',
            dateAdded: "2021-12-15",
            createdBy: "61b98b450b9253d9da02ac44"
        }
    ];

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
            // const headers = {Authorization: ...}
            // const { data } = await axios.post(`/secure/issue`, newIssue, headers);
            const { data } = await secureAxios.post(`/secure/issue`, newIssue);
            // setBounties(prev => [...prev, data]);
        }
        catch (err) {
            console.log(err.response.data.errMsg);
            // alert(err);
        }
    }

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues, signup, login, logout, addIssue
    };
    const [state, dispatch] = useReducer(reducer, initState);

    return <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
};