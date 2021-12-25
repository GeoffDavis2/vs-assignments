import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
import { IssueCard } from "../components/issueCard";

export const IssuesList = () => {
    const navigate = useNavigate();
    const { state: {user: { username }, issues }} = useStateContext();

    return <>
        <nav>
            <h1>Welcome {username}, Issues List</h1>
        </nav>
        <button onClick={() => navigate(`/`)}>To Login UI</button>
        <button onClick={() => navigate(`/edit-view-issue`)}>Add new Issue</button>
        <hr />
        {issues.map(obj => <IssueCard {...obj} key={obj._id} />)}
    </>

};