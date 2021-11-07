import React, { useState, useEffect } from "react";
import axios from "axios";

// TODO do I need this to be exported???
const ThingsContext = React.createContext();

export const ThingsContextProvider = props => {
    const [things, setThings] = useState([]);
    useEffect(() => {
        const client = axios.create({ baseURL: "https://api.vschool.io/geoffdavis/thing" });
        const getThings = async () => setThings((await client.get()).data);
        getThings();
    }, []);

    return (
        <ThingsContext.Provider value={{ things }}>
            {props.children}
        </ThingsContext.Provider>
    )
}
