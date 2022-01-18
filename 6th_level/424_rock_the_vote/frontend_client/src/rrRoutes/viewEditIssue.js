import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/StateContext";

export const ViewEditIssue = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { getIssue, clearIssue, putToIssue, state, logout } = useStateContext();
    const { issue, errMsg, user } = state;
    const { _id, title, desc, voteSum, voteCt, votes, commentCt, comments, addedBy, addedDate } = issue;
    const [comment, setComment] = useState("");
    const thumbUp = String.fromCodePoint(0x1F44D);
    const thumbDn = String.fromCodePoint(0x1F44E);

    useEffect(() => {
        clearIssue();
        if (params.issueId) getIssue(params.issueId);
        // eslint-disable-next-line
    }, []);

    const userVote = (votes) => {
        const obj = votes.find(obj => obj.addedBy._id === user._id);
        if (obj && obj.value === 1) return thumbUp;
        if (obj && obj.value === -1) return thumbDn;
        return <>
            &nbsp;<button onClick={() => putToIssue(`/secure/issueVote/id/${_id}`, { value: 1 })}>{thumbUp}</button>
            &nbsp;<button onClick={() => putToIssue(`/secure/issueVote/id/${_id}`, { value: -1 })}>{thumbDn}</button>
            &nbsp;{errMsg}
        </>
    }

    const handleCommentSubmit = () => {
        putToIssue(`/secure/issueComment/id/${_id}`, { comment });
        setComment("");
    }

    const userComment = (comments) => {
        const obj = comments.find(obj => obj.addedBy._id === user._id);
        // if (obj && obj.comment) return <>Your Comment: "{obj.comment}"</>;
        return <>
            What do you think?
            &nbsp;<input name="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter your comment here" className="input-field" />
            &nbsp;<button onClick={handleCommentSubmit}>Submit</button>
            &nbsp;{errMsg}
        </>
    }

    const userCommentVote = (comment) => {
        const obj = comment.votes.find(obj => obj.addedBy._id === user._id);
        if (obj && obj.value === 1) return thumbUp;
        if (obj && obj.value === -1) return thumbDn;
        return <>
            &nbsp;<button onClick={() => putToIssue(`/secure/issueCommentVote/id/${comment._id}`, { value: 1 })}>{thumbUp}</button>
            &nbsp;<button onClick={() => putToIssue(`/secure/issueCommentVote/id/${comment._id}`, { value: -1 })}>{thumbDn}</button>
            &nbsp;{errMsg}
        </>
    }

    return <>
        <header>
            <h1>{title}</h1>
        </header>

        <nav>
            <button onClick={() => { clearIssue(); navigate(`/issues-list`); }}>Back To Issues List</button>
            <button onClick={() => logout()}>Logout "{user.username}"</button>
            <hr />
        </nav>

        <h2>{desc}</h2>
        <p>added by: {addedBy.username} on {addedDate}</p>
        <hr />
        <h3>{voteCt} people voted on this issue. Vote Total: {voteSum}</h3>
        <h3>Your Vote: {userVote(votes)}</h3>
        {votes.sort((a, b) => (new Date(b.addedDate) - new Date(a.addedDate)))
            .map(obj => <p key={obj._id}>{obj.value > 0 ? thumbUp : thumbDn} Added By: {obj.addedBy.username} on {obj.addedDate}</p>)}
        <hr />
        <h3>{commentCt} people commented on this.</h3>
        <h3>{userComment(comments)}</h3>
        {comments.sort((a, b) => (b.voteSum - a.voteSum))
            .map(obj => <p key={obj._id}>
                {userCommentVote(obj)}&nbsp;"{obj.comment}"
                - added by: {obj.addedBy.username}
                &nbsp;on {obj.addedDate}...
                &nbsp;{obj.voteCt} votes for this comment,
                Vote Total: {obj.voteSum}
            </p>)}

    </>

};