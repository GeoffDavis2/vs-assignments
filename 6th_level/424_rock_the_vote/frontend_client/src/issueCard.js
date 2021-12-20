import React from "react";

export const IssueCard = (props) => {
    const {title, desc, dateAdded, createdBy} = props;

    return <div>
        <h1>{title}</h1>
        <h3>{title}</h3>
        <p>{dateAdded.substring(0, 10)}</p>
        <p>{createdBy}</p>
    </div>
}