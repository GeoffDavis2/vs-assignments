// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

// TODO Create issuesPublicView and issuesView (as data_model?) instead of trusting that it already exists, https://github.com/Automattic/mongoose/issues/7855

// const IssuesTableViewSchema = new mongoose.Schema();
    // {
    // _id: ObjectId,
    // title: String,
    // voteSum: Number,
    // voteCt: Number,
    // commentCt: Number,
    // addedByx: {},
    // addedDate: Date
// });

exports.IssuesPublicView = mongoose.model("issuesPublicView", new mongoose.Schema(), "issuesPublicView");
exports.IssuesView = mongoose.model("issuesView", new mongoose.Schema(), "issuesView");