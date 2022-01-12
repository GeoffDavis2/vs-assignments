import React from "react";
import { useNavigate } from "react-router-dom";



export const IssueCard = (props) => {
    const navigate = useNavigate();
    const { title, addedBy, voteSum, voteCt, addedDate, _id} = props;

    const handleViewClick = () => {
        navigate(`/view-issue/${_id}`);
    }

    return <div>
        <h1>{title}</h1>
        <p>Vote Sum: {voteSum}, Vote Ct: {voteCt}</p>
        <p>Added by: "{addedBy.username}", on: {addedDate.substring(0, 10)}</p>
        <button onClick={handleViewClick}>View Issue</button>
        <br/><br/>
    </div>
}