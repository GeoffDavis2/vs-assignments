const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const singleIssueView = express.Router();

const { IssuesView } = require("../data_models/issuesViews");

singleIssueView.route("/id/:id")
    .get(async (req, res, next) => {
        debugSource(req);
        IssuesView.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);
            return res.status(200).json(data);
        });
    });

module.exports = singleIssueView;