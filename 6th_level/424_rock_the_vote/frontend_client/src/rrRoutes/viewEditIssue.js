import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/StateContext";

export const ViewIssue = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { getIssue, addIssueComment, state, logout } = useStateContext();
    const [comment, setComment] = useState("");

    const thumbUp = String.fromCodePoint(0x1F44D);
    const thumbDn = String.fromCodePoint(0x1F44E);

    const handleCommentSubmit = () => {
        addIssueComment(comment);
    }

    const handleLogout = (e) => {
        logout();
    }

    // TODO clear issue state when leaving edit-view-issue route (maybe when clicking button?)
    useEffect(() => { if (params.issueId) getIssue(params.issueId) }, []);
    const { _id, title, desc, voteSum, voteCt, votes, commentCt, comments, addedBy, addedDate } = state.issue;

    // TODO Allow changing vote and comment, but restrict to only one vote/comment per person per issue & issueComment
    return <>
        <header>
            <h1>{title}</h1>
        </header>

        <nav>
            <button onClick={() => navigate(`/issues-list`)}>Back To Issues List</button>
            <button onClick={handleLogout}>Logout</button>
            <hr />
        </nav>

        <h2>{desc}</h2>
        <p>added by: {addedBy.username} on {addedDate}</p>
        <h3>Add your vote:&nbsp;<button>{thumbUp}</button>&nbsp;<button>{thumbDn}</button></h3>
        <h3>{voteCt} people voted on this issue. Vote Total: {voteSum}</h3>
        {votes.map(obj => <p key={obj._id}>{obj.value > 0 ? thumbUp : thumbDn} Added By: {obj.addedBy.username} on {obj.addedDate}</p>)}
        <hr />
        <h3>{commentCt} people commented on this.</h3>
        <h3>
            What do you think?
            &nbsp;<input name="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter comment here" className="input-field" />
            &nbsp;<button onClick={handleCommentSubmit}>Submit</button>
        </h3>
        {comments.sort((a, b) => (b.voteSum - a.voteSum))
            .map(obj => <p key={obj._id}>
                "{obj.comment}"
                - added by: {obj.addedBy.username}
                &nbsp;on {obj.addedDate}...
                &nbsp;{obj.voteCt} votes for this comment,
                Vote Total: {obj.voteSum},
                Add your vote:&nbsp;<button>{thumbUp}</button>&nbsp;<button>{thumbDn}</button>
            </p>)}

    </>

};