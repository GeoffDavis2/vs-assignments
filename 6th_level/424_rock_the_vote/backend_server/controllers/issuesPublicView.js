const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const publicRouter = express.Router();

const { IssuesPublicView } = require("../data_models/issuesViews");

publicRouter.route("/")
    .get(async (req, res, next) => {
        debugSource(req);
        IssuesPublicView.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);
            return res.status(200).json(data);
        });
    });

module.exports = publicRouter;