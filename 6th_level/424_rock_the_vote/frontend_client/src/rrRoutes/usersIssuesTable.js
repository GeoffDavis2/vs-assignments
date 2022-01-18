import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";

export const UsersIssuesTable = () => {
    const navigate = useNavigate();
    const { state: { user: { username }, issues }, logout, getIssuesList } = useStateContext();
    const [filter, setFilter] = useState("all");

    useEffect(() => getIssuesList(), []);

    return <>
        <header>
            <h1>Welcome{username ? ` ${username}` : ""}, consider our List of Issues below</h1>
            {username ? <h3>Add issues, comments, and vote!</h3> : <h3>
                Sign Up or Log In to add issues, comments, and vote!&nbsp;&nbsp;&nbsp;
                <button onClick={() => navigate(`/login-signup`)}>Sign Up / Login</button>
            </h3>}
        </header>

        <nav>
            {username && <>
                <button onClick={() => navigate(`/edit-view-issue`)}>Add new Issue</button>
                <button onClick={() => logout()}>Logout "{username}"</button>
            </>}
            <hr />
        </nav>

        <table>
            <thead>
                <tr>
                    <th><h1>Issue</h1></th>
                    <th>Vote Sum</th>
                    <th>Vote Ct</th>
                    <th>Added by</th>
                    <th>Added on</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {issues.map(obj => <tr key={obj._id}>
                    <td><h1>{obj.title}</h1></td>
                    <td><h3>{obj.voteSum}</h3></td>
                    <td><h3>{obj.voteCt}</h3></td>
                    <td><h3>{obj.addedBy.username}</h3></td>
                    <td><h3>{obj.addedDate.substring(0, 10)}</h3></td>
                    <td>{username && <button onClick={() => navigate(`/view-issue/${obj._id}`)}>View Issue</button>}</td>
                </tr>)}
            </tbody>
        </table>

    </>

};