import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";

export const IssuesList = () => {
    const navigate = useNavigate();
    const { state: { user: { username }, issues }, logout } = useStateContext();


    const handleLogout = (e) => {
        // e.preventDefault();
        logout();
    }

    const handleViewClick = (_id) => {
        navigate(`/view-issue/${_id}`);
    }

    // TODO fix nav section, page labels, and button for all pages
    // TODO     add logic so only see login or logout button based on whether you are logged in
    // TODO     also add note to top Issues Table page to click "sign up/login to add issues, comments, and vote"
    // TODO rename issuesList.js to issuesTable.js
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
                <button onClick={handleLogout}>Logout</button>
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
                    <td>{username && <button onClick={() => handleViewClick(obj._id)}>View Issue</button>}</td>
                </tr>)}
            </tbody>
        </table>

    </>

};