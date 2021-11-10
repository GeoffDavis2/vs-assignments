import { useEffect, createContext, useState } from "react";
import { apiGetAll, apiPost, apiDelete, apiPut } from "./api";

export const ThingsContext = createContext();

// HOC for adding all the Context Stuff to props.children (components)
export const ThingsContextProvider = (props) => {
    const endpoint = 'https://api.vschool.io/geoffdavis/thing';
    const [mode, setMode] = useState('Loading');
    const [activeThing, setActiveThing] = useState([]);
    const [things, setThings] = useState([]);

    useEffect(() => setTimeout(() => getAllThings(), 0), []);
    const getAllThings = async () => {
        const { status, data } = await apiGetAll(endpoint);
        if (status === 200) {
            setThings(data);
            setMode('ThingList');
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
        setActiveThing({title: '', description: '', imgUrl: ''});
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
            activeThing,
            things,
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
