import React, { useEffect } from "react";
import { apiGetAll, apiPost, apiDelete, apiPut } from "./api";

export const ThingsContext = React.createContext();

// HOC for adding all the Context Stuff to props.children (components)
export const ThingsContextProvider = (props) => {
    const endpoint = 'https://api.vschool.io/geoffdavis/thing';
    const [mode, setMode] = React.useState('Loading');
    const [things, setThings] = React.useState([]);
    const [activeThing, setActiveThing] = React.useState([]);

    useEffect(() => setTimeout(() => getAllThings(), 0), []);
    const getAllThings = async () => {
        const { status, data } = await apiGetAll(endpoint);
        if (status === 200) {
            setThings(data);

            // TODO just for testing
            // setMode('ThingList');
            setMode('EditThing');
            setActiveThing(data[0]);
        }
    };

    const handlePostThing = async (thing) => {
        const { status } = await apiPost(endpoint, thing);
        if (status === 200) getAllThings();
    }

    const handlePutThing = async (thing) => {
        const { status } = await apiPut(endpoint, thing._id, thing);
        if (status === 200) getAllThings();
    }

    const handleDeleteThing = async (thing) => {
        const { status } = await apiDelete(endpoint, thing._id);
        if (status === 200) getAllThings();
    }

    const handleAddThing = async () => {
        setMode('NewThing');
    }

    const handleEditThing = async (thing) => {
        setActiveThing(thing);
        setMode('EditThing');
    }

    return (
        <ThingsContext.Provider value={{
            mode,
            setMode,
            things,
            activeThing,
            handleAddThing,
            handleDeleteThing,
            handlePostThing,
            handleEditThing,
            handlePutThing
        }}>
            {props.children}
        </ThingsContext.Provider>
    );
};
