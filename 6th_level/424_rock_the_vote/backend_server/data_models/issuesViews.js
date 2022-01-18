// NOTE: This code assumes issuesView and issuesPublicView already have been created in the DB.
//      If these 2 "Views" need to be recreated...
//      See ./create_load_collections/issuesView.js 
//      And ./create_load_collections/issuesPublicView.js

const mongoose = require("mongoose");

const issuesViewSchema = mongoose.Schema({
    title: '',
    desc: '',
    addedBy: '',
    addedDate: '',
    votes: '',
    comments: '',
    voteSum: '',
    voteCt: '',
    commentCt: ''
});

const IssuesPublicViewSchema = mongoose.Schema({
    title: '',
    addedBy: '',
    addedDate: '',
    voteSum: '',
    voteCt: '',
    commentCt: ''
});

exports.IssuesView = mongoose.model("issuesView", issuesViewSchema, "issuesView");
exports.IssuesPublicView = mongoose.model("issuesPublicView", IssuesPublicViewSchema, "issuesPublicView");