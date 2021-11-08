import React, { useEffect } from "react";
import { getAll, addThing, delThing } from "./api";

export const ThingsContext = React.createContext();

export const ThingsContextProvider = props => {
    const [mode, setMode] = React.useState('Loading');
    const [things, setThings] = React.useState([]);
    const [activeThingID, setActiveThingID] = React.useState([]);

    // TODO change this to zero ms for production
    useEffect(() => setTimeout(() => getAllThings(), 10), []);
    const getAllThings = async () => {
        const { status, data } = await getAll();
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
        const { status } = await addThing(newThing);
        if (status === 200) {
            getAllThings();
        }
    }

    const handleDeleteThing = async id => {
        const { status } = await delThing(id);
        if (status === 200) {
            getAllThings();
            setMode('ThingList');        }
    }

    const handleEditThing = async id => {
        setActiveThingID(id);
        setMode('EditThing');
    }

    return (
        <ThingsContext.Provider value={{
            mode,
            setMode,
            things,
            handleAddThing,
            handleDeleteThing,
            handleEditThing,
            activeThingID
        }}>
            {props.children}
        </ThingsContext.Provider>
    );
};
