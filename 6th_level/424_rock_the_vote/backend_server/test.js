console.log("\033c");

console.log('\nMongoose Setup\n');
module.exports = (mongoose = require("mongoose"));
mongoose.connect(
    "mongodb://localhost:27017/rock-the-vote",
    // "mongodb+srv://trend_geoff_lev5_capstone:7654@cluster0.7hfsb.mongodb.net/county-clerk",
    () => {
        (mongoose.connection.readyState === 0) && console.log("\n********** Disonnected from MongoDB **********\n");
        (mongoose.connection.readyState === 1) && console.log("\n********** Connected to MongoDB **********\n");
        (mongoose.connection.readyState === 2) && console.log("\n********** Connecting to MongoDB **********\n");
        (mongoose.connection.readyState === 3) && console.log("\n********** Disonnecting from MongoDB **********\n");
    }
);


console.log('\nGet Users and Issues Model\n');
const User = require("./data_models/users");
const Issue = require("./data_models/issues");


User.find((err, data) => {
    if (err) console.log('\nError on Find Users\n', err, '\n');
    console.log('\nList of Users');
    data.map(obj => console.log(`_id: ${obj._id}, Username: ${obj.username}`));
})


// const issueObj = {
//     "title" : "Test Issue #1",
//     "desc" : "No Votes or Comments",
//     "addedBy" : "61c28292ffeac0e5f8ca4711"
// };
// const newIssue = new Issue(issueObj);
// newIssue.save((err) => {
//     if (err) console.log('\nError on Save New Issue\n', err,'\n');
// });


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


// const newVote = {
//     value: 1,
//     addedBy: "61c0e900d2f505af75b8776e"
// };
// Issue.findOneAndUpdate(
//     { title: "Test Issue #1" },
//     { $push: {votes: newVote}},
//     { new: true },
//     (err, data) => {
//         if (err) console.log('\nError on Issue.findOneAndUpdate add vote\n', err, '\n');
//         console.log('\nIssue after adding vote');
//         console.log(data);
//     }
// );


// const newComment = {
//     comment: "I also think this is an important issue",
//     addedBy: "61c0ed4d876bada04dac8a3d"
// };
// Issue.findOneAndUpdate(
//     { title: "Test Issue #1" },
//     { $push: {comments: newComment}},
//     { new: true },
//     (err, data) => {
//         if (err) console.log('\nError on Issue.findOneAndUpdate add comment\n', err, '\n');
//         console.log('\nIssue after adding comment');
//         console.log(data);
//     }
// );


// TODO add my own validation on update (make sure value is 1 or -1)
// const newCommentVote = {
//     value: 3,
//     addedBy: "61c0e900d2f505af75b8776e"
// };
// Issue.findOneAndUpdate(
//     {
//         _id: "61c6109e195d882795b095ad",
//         comments: {$elemMatch: {_id: "61c624d4aeae9ec8283af0c8"}}
//     },
//     { $push: {'comments.$.votes': newCommentVote}},
//     { new: true },
//     (err, data) => {
//         if (err) console.log('\nError on Issue.findOneAndUpdate add vote\n', err, '\n');
//         console.log('\nIssue after adding vote');
//     }
// );


Issue.find(
    {
        _id: "61c6109e195d882795b095ad",
        comments: {$elemMatch: {_id: "61c624d4aeae9ec8283af0c8"}}
    }, (err, data) => {
        if (err) console.log('\nError on Find Issues\n', err, '\n');
        console.log('\nfindById');
        console.log(data[0].comments);
    })

