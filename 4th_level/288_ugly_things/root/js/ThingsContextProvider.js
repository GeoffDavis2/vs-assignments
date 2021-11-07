import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAll } from "./api";

export const ThingsContext = React.createContext();

export const ThingsContextProvider = props => {
    const [mode, setMode] = React.useState('Loading');
    const [things, setThings] = React.useState([]);

    const handleDeleteThing = id => {
        // const deleteThing = async () => setThings((await client.delete()).data);
    }

    const handleAddThing = () => {
        const client = axios.create({ baseURL: "https://api.vschool.io/geoffdavis/thing" });
        const newThing = {
            "title": "Thing Four Title",
            "description": "Thing Four Description",
            "imgUrl": "Thing Four imgUrl"
        }
        const deleteThing = async () => setThings((await client.post()).data);
    }

    useEffect(() => {
        const client = axios.create({ baseURL: "https://api.vschool.io/geoffdavis/thing" });
        const getThings = async () => setThings((await client.get()).data);
        setTimeout(() => {
            getThings()
            setMode('ThingList');
        }, 10); // TODO change this to zero ms for production
    }, []);

    return (
        <ThingsContext.Provider value={{ mode, setMode, things }}>
            {props.children}
        </ThingsContext.Provider>
    );
};
