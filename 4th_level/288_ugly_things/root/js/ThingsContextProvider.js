import React, { useEffect } from "react";
import { apiGetAll, apiPost, apiDelete, apiPut } from "./api";

export const ThingsContext = React.createContext();

export const ThingsContextProvider = props => {
    const endpoint = 'https://api.vschool.io/geoffdavis/thing';
    const [mode, setMode] = React.useState('Loading');
    const [things, setThings] = React.useState([]);
    const [activeThing, setActiveThing] = React.useState([]);
    // const [activeThingID, setActiveThingID] = React.useState([]);

    // TODO change this to zero ms for production
    useEffect(() => setTimeout(() => getAllThings(), 10), []);
    const getAllThings = async () => {
        const { status, data } = await apiGetAll(endpoint);
        if (status === 200) {
            setThings(data);
            setMode('ThingList');
        }
    };

    const handleAddThing = async () => {
        const timestamp = new Date();  // TODO this is a temporary thing, delete when not needed for testing/dev
        const newThing = {
            "title": `Title: ${timestamp.getTime()}`,
            "description": `Description: ${timestamp}`,
            "imgUrl": "https://i.imgflip.com/1g8my4.jpg"
        }
        const { status } = await apiPost(endpoint, newThing);
        if (status === 200) {
            getAllThings();
        }
    }

    const handleDeleteThing = async thing => {
        const { status } = await apiDelete(endpoint, thing._id);
        if (status === 200) {
            getAllThings();
            setMode('ThingList');
        }
    }

    const handleEditThing = async thing => {
        setActiveThing(thing);
        setMode('EditThing');
    }

    const handleUpdateThing = async (thing) => {
        const { status } = await apiPut(endpoint, thing._id, thing);
        if (status === 200) {
            getAllThings();
            setMode('ThingList');
        }
    }

    // TODO clean up all the context params, sure I don't need them all
    return (
        <ThingsContext.Provider value={{
            mode,
            setMode,
            things,
            activeThing,
            handleAddThing,
            handleDeleteThing,
            handleEditThing,
            // activeThingID,
            handleUpdateThing
        }}>
            {props.children}
        </ThingsContext.Provider>
    );
};
