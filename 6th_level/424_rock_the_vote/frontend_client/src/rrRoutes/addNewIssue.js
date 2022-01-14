import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/StateContext";

// TODO Do I need this?
const initInputs = { title: "", desc: "" };

export const AddEditViewIssue = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { addIssue, getIssue, issue, logout } = useStateContext();
    
    const handleLogout = (e) => {
        // e.preventDefault();
        logout();
    }
    
    const [inputs, setInputs] = useState(initInputs);
    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });
    const { title, desc } = inputs;

    const handleSubmit = () => {
        addIssue(inputs);
        setInputs(initInputs);
    }


    // TODO clear issue state when leaving edit-view-issue route (maybe when clicking button?)
    useEffect(() => { if (params.issueId) getIssue(params.issueId) }, []);
    // useEffect(() => { if (issue) console.log("issue???", issue) }, [issue]);
    // setInputs(issue) }, [issue]);

    return <>
        <header>
            <h1>Add New Issue</h1>
        </header>

        <nav>
            <button onClick={() => navigate(`/issues-list`)}>Back To Issues List</button>
            <button onClick={handleLogout}>Logout</button>
            <hr />
        </nav>

        <input name="title" value={title} onChange={handleChange} placeholder="Issue" className="input-field" />
        <input name="desc" value={desc} onChange={handleChange} placeholder="Description" className="input-field" />
        <button onClick={handleSubmit}>Submit</button>
    </>

};