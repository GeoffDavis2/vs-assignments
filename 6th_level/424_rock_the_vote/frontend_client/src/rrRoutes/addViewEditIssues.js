import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/StateContext";

const initInputs = { title: "", desc: "" };

export const AddEditViewIssue = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { addIssue, getIssue, issue } = useStateContext();

    const [inputs, setInputs] = useState(initInputs);
    const { title, desc } = inputs;

    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    const handleSubmit = () => {
        addIssue(inputs);
        setInputs(initInputs);
    }


    // TODO clear issue state when leaving edit-view-issue route (maybe when clicking button?)
    useEffect(() => { if (params.issueId) getIssue(params.issueId) }, []);
    // useEffect(() => { if (issue) console.log("issue???", issue) }, [issue]);
    // setInputs(issue) }, [issue]);

    return <>
        <nav>
            <h1>Add View Edit Issues</h1>
        </nav>

        <button onClick={() => navigate(`/`)}>To Login UIs</button>
        <button onClick={() => navigate(`/issues-list`)}>To Issues List</button>
        <input name="title" value={title} onChange={handleChange} placeholder="Issue" className="input-field" />
        <input name="desc" value={desc} onChange={handleChange} placeholder="Description" className="input-field" />
        <button onClick={handleSubmit}>Submit</button>
    </>

};