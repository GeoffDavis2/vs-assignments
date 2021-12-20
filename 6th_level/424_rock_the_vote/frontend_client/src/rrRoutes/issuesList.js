import React from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext, reducer } from "../StateContext";

export const IssuesList = () => {
    const navigate = useNavigate();

    // TODO If state isn't needed by itsself, combine the 2 lines below by desctructuring
    const state = useStateContext();
    const {issues, user:{username}, token} = state;
    // console.log(username);

    // token === "" && navigate(`/`);

    return <>
        <nav>
            <h1>Welcome {username}, Issues List</h1>
        </nav>
        <button onClick={() => navigate(`/`)}>To Login UI</button>
        <button onClick={() => navigate(`/edit-view-issue`)}>Add new Issue</button>
        <hr />
        {issues.map(obj => <div key={obj._id} >
            {obj.title}
            {obj.dateAdded.substring(0, 10)}
            {obj.createdBy}
        </div>)}
    </>

};