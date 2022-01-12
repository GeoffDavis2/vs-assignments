import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext, secureAxios } from "../contexts/StateContext";

export const ViewIssue = () => {
    const params = useParams();
    const { getIssue, state } = useStateContext();

    // TODO clear issue state when leaving edit-view-issue route (maybe when clicking button?)
    useEffect(() => { if (params.issueId) getIssue(params.issueId) }, []);
    const { _id, title, desc, voteSum, voteCt, votes, commentCt, comments, addedBy, addedDate } = state.issue;

    return <>
        <nav>
            <h1>Add View Edit Issues</h1>
        </nav>

        <h1>{title}</h1>
        <h3>{desc}</h3>
        <p>Vote Sum: {voteSum}, Vote Ct: {voteCt}</p>
        {votes.map(obj => <p key={obj._id}>{obj.value}, Vote added By: {obj.addedBy.username} on {obj.addedDate}</p>)}
        <p>Comment Ct: {commentCt}</p>
        {comments.map(obj => <p key={obj._id}>{obj.comment}, Comment added By: {obj.addedBy.username} on {obj.addedDate}, Vote Sum: {obj.voteSum}, Vote Ct: {obj.voteCt}</p>)}
        <p>Issue added by: {addedBy.username} on {addedDate}</p>
    </>

};