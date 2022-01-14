const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const issueComment = express.Router();
const Issue = require("../data_models/issues");
const ObjectId = require('mongoose').Types.ObjectId;

// const { IssuesView } = require("../data_models/issuesViews");

issueComment.route("/id/:id")
    .put(async (req, res, next) => {
        debugSource(req);

        // Check to see if the issue already has a comment from the user
        Issue.findOne({ $and: [{ _id: new ObjectId(req.params.id) }, { 'comments.addedBy': new ObjectId(req.user._id) }] }, (err, commentExists) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (commentExists) {
                res.status(403);
                return next("That username has already submitted a comment on this issue!");
            }
        });

        console.log('why am i here???');
        // Issue.findOne({ _id: new ObjectId(req.params.id) }, (err, data) => {
        //     if (err) {
        //         res.status(500);
        //         return next(err);
        //     }
        //     data.comments.push({...req.body, addedBy: new ObjectId(req.user._id)});
        //     data.save((err, data) => {
        //         if (err) {
        //             res.status(500);
        //             return next(err);
        //         }
        //     });
        //     debugReturn(data);
        //     return res.status(200).json(data);
        // });

    });

module.exports = issueComment;