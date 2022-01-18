const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const issueComment = express.Router();
const Issue = require("../data_models/issues");
const { IssuesView } = require("../data_models/issuesViews");
const ObjectId = require('mongoose').Types.ObjectId;

// NOTE: This route is expecting a comments._id, not an issue._id!!!
issueComment.route("/id/:id")
    .put((req, res, next) => {
        debugSource(req);

        // Check to see if the issue already has a comment from the user
        Issue.findOne({ comments: { $elemMatch: { _id: ObjectId(req.params.id), 'votes.addedBy': ObjectId(req.user._id) } } }, (err, commentVoteExists) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            if (commentVoteExists) {
                res.status(403);
                return next("That username has already submitted a vote for the issue comment!");
            }

            Issue.findOneAndUpdate(
                { 'comments._id': ObjectId(req.params.id) },
                { $push: { 'comments.$.votes': { ...req.body, addedBy: new ObjectId(req.user._id) } } },
                (err) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    };

                    // Return back issue from IssuesView instead of data returned from comment push/save above
                    IssuesView.findOne({'comments._id': ObjectId(req.params.id)}, (err, data) => {
                        if (err) {
                            res.status(500);
                            return next(err);
                        }
                        debugReturn(data);
                        return res.status(200).json(data);
                    });
                });

        });

    });

module.exports = issueComment;