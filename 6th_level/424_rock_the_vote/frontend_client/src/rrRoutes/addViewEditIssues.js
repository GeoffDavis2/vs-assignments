import { useNavigate } from "react-router-dom";

export const AddEditViewIssue = () => {
    const navigate = useNavigate();

    return <>
        <nav>
            <h1>Add View Edit Issues</h1>
        </nav>      
        
        <button onClick={() => navigate(`/`)}>To Login UI</button>
        <button onClick={() => navigate(`/issues-list`)}>To Issues List</button>
    </>

};