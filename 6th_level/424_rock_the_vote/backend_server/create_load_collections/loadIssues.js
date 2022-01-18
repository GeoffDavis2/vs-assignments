console.log("\033c");

module.exports = (mongoose = require("mongoose"));
mongoose.connect(
    "mongodb://localhost:27017/rock-the-vote",
    // "mongodb://172.18.0.1:27017/rock-the-vote",    
    // "mongodb+srv://trend_geoff_lev5_capstone:7654@cluster0.7hfsb.mongodb.net/county-clerk",
    () => {
        (mongoose.connection.readyState === 0) && console.log("\n********** Disonnected from MongoDB **********\n");
        (mongoose.connection.readyState === 1) && console.log("\n********** Connected to MongoDB **********\n");
        (mongoose.connection.readyState === 2) && console.log("\n********** Connecting to MongoDB **********\n");
        (mongoose.connection.readyState === 3) && console.log("\n********** Disonnecting from MongoDB **********\n");
    }
);


// Setup & get Users
const User = require("../data_models/users");
const getUsers = async () => {
    console.log('\nGet Users\n');
    return await User.find();
};


// Setup & get Issues
const Issue = require("../data_models/issues");
const getIssues = async () => {
    console.log('\nGet Issues\n');
    return await Issue.find();
};

// Setup & get IssuesView
const { IssuesView } = require("../data_models/issuesViews");
const ObjectId = require('mongoose').Types.ObjectId;
const getIssuesViewFromCommentId = async (commentId) => await IssuesView.findOne({ "comments._id": ObjectId(commentId) });


// Issue.findOneAndUpdate(
//     { title: "Test Issue #1" },
//     { desc: "new description 3" },
//     { new: true },
//     (err, data) => {
//         if (err) console.log('\nError on Issue.findOneAndUpdate\n', err, '\n');
//         console.log('\nIssue after update');
//         console.log(data);
//     }
// );

const randomVote = () => {
    const seed = Math.random() - .5;
    return seed < 0 ? Math.floor(seed) : Math.ceil(seed);
};


const addIssue = async (Issue) => {
    Issue.save((err, data) => {
        if (err) console.log('\nError on Issue.save\n', err, '\n');
        console.log('\nIssue that was just added...');
        console.log(data);
    });
};
const loadIssues = async (users) => {
    console.log('\nLoading Issues\n');
    users.map(async (obj, i) => {
        const newIssue = new Issue({
            title: `Title ${i}`,
            desc: `Description for Title ${i}`,
            addedBy: obj._id
        });
        addIssue(newIssue);
    });
};


const addIssueVote = async (issueId, Vote) => {
    Issue.findByIdAndUpdate(
        issueId,
        { $push: { votes: Vote } },
        { new: true },
        (err, data) => {
            if (err) console.log('\nError on Issue.findOneAndUpdate add vote\n', err, '\n');
            console.log('\nIssue after adding vote');
            console.log(data);
        }
    );
};
const loadIssueVotes = async (userList, issueList) => {
    console.log('\nLoading Issue Votes\n');
    issueList.map(async iObj => {
        userList.map(async uObj => {
            const newVote = {
                value: randomVote(),
                addedBy: uObj._id
            };
            // console.log(iObj._id, newVote);
            addIssueVote(iObj._id, newVote);
        })
    })

};


const addIssueComment = async (issueId, Comment) => {
    Issue.findByIdAndUpdate(
        issueId,
        { $push: { comments: Comment } },
        { new: true },
        (err, data) => {
            if (err) console.log('\nError on Issue.findOneAndUpdate add comment\n', err, '\n');
            console.log('\nIssue after adding comment');
            console.log(data);
        }
    );
};
const loadComments = async (userList, issueList) => {
    console.log('\nLoading Issue Comments\n');
    issueList.map(async iObj => {
        userList.map(async uObj => {
            const newComment = {
                comment: `${uObj.username} thinks ${iObj.title} is important.`,
                addedBy: uObj._id
            };
            // console.log(iObj._id, newComment);
            addIssueComment(iObj._id, newComment);
        })
    })

};


const addIssueCommentVote = async (issueId, commentId, Vote) => {
    Issue.findOneAndUpdate(
        {
            _id: issueId,
            comments: { $elemMatch: { _id: commentId } }
        },
        { $push: { 'comments.$.votes': Vote } },
        { new: true },
        (err, data) => {
            if (err) console.log('\nError on Issue.findOneAndUpdate add vote\n', err, '\n');
            console.log('\nIssue after adding vote');
            console.log(data);
        }
    );
};
const loadCommentVotes = async (userList, issueList) => {
    console.log('\nLoading Issue Comment Votes\n');
    issueList.map(async iObj => {
        iObj.comments.map(async cObj => {
            userList.map(async uObj => {
                const newCommentVote = {
                    value: randomVote(),
                    addedBy: uObj._id
                };
                // console.log(iObj._id, cObj._id, newCommentVote);
                addIssueCommentVote(iObj._id, cObj._id, newCommentVote);
            })
        })
    })

};


async function main() {
    const userList = await getUsers();
    const issueList = await getIssues();

    // Issue.collection.drop();
    // await loadIssues(userList);
    // await loadIssueVotes(userList, issueList);
    // await loadComments(userList, issueList);
    // await loadCommentVotes(userList, issueList);
    // console.log(await getIssuesViewFromCommentId('61e4abbee281af7e78fd69b3'));

};
main();