const IssueVote = require("../data_models/issueVotes");
const CommentVote = require("../data_models/commentVotes");
const Comment = require("../data_models/comments");

// working example of add vote...
// const newIssueVote = new IssueVote({
//     issue: "61ba23a2d67ceba46a0f790d",
//     value: -1,
//     createdBy: "61ba13660808873a6e3914ae"
// });
// newIssueVote.save((err, data) => {
//    ???
// });


// working example of get sum from issuevotes
// IssueVote.aggregate([{ $group: { _id: "$issue", sum: { $sum: "$value" } } }], (err, data) => {
//     console.log(data.find(obj => obj._id == "61ba1bda4ac3f426022a7680").sum);
// });
