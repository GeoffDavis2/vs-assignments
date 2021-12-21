import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useStateContext } from "../StateContext";
import { IssueCard } from "../issueCard";

export const IssuesList = () => {
    const navigate = useNavigate();
    const { state: {user: { username }, issues, token }} = useStateContext();

    return (token === "") ? <Navigate to = "/" /> : <>
        <nav>
            <h1>Welcome {username}, Issues List</h1>
        </nav>
        <button onClick={() => navigate(`/`)}>To Login UI</button>
        <button onClick={() => navigate(`/edit-view-issue`)}>Add new Issue</button>
        <hr />
        {issues.map(obj => <IssueCard {...obj} key={obj._id} />)}
    </>

};