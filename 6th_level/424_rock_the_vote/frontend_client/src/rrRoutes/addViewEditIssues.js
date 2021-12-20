import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../StateContext";

const initInputs = { title: "", desc: "" };

export const AddEditViewIssue = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState(initInputs);
    const { title, desc } = inputs;

    // TODO If statue isn't needed by itself, combine the 2 lines below by desctructuring
    const state = useStateContext();
    const { addIssue } = state;

    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    const handleSubmit = () => {
        addIssue(inputs);
        setInputs(initInputs);
    }

    return <>
        <nav>
            <h1>Add View Edit Issues</h1>
        </nav>

        <button onClick={() => navigate(`/`)}>To Login UI</button>
        <button onClick={() => navigate(`/issues-list`)}>To Issues List</button>
        <input name="title" value={title} onChange={handleChange} placeholder="Issue" className="input-field" />
        <input name="desc" value={desc} onChange={handleChange} placeholder="Description" className="input-field" />
        <button onClick={handleSubmit}>Submit</button>
    </>

};