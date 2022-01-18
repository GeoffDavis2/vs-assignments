import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../contexts/StateContext";

const initInputs = { title: "", desc: "" };

export const AddNewIssue = () => {
    const navigate = useNavigate();

    const { state: { user }, postIssue, logout } = useStateContext();
    
    const [inputs, setInputs] = useState(initInputs);
    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });
    const { title, desc } = inputs;

    const handleSubmit = () => {
        postIssue(inputs);
        setInputs(initInputs);
    }

    return <>
        <header>
            <h1>Add New Issue</h1>
        </header>

        <nav>
            <button onClick={() => navigate(`/issues-list`)}>Back To Issues List</button>
            <button onClick={() => logout()}>Logout "{user.username}"</button>
            <hr />
        </nav>

        <input name="title" value={title} onChange={handleChange} placeholder="Issue" className="input-field" />
        <input name="desc" value={desc} onChange={handleChange} placeholder="Description" className="input-field" />
        <button onClick={handleSubmit}>Submit</button>
    </>

};