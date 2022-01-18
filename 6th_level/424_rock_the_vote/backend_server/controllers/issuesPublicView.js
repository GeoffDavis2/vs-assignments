// TODO Later: Add error checking if someone provides bad object ID number, right now it crashes hard
// TODO Later:      Seems to just happen on publicRouter.route("/userid/:id")

const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const publicRouter = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

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

publicRouter.route("/userid/:id")
    .get(async (req, res, next) => {
        console.log('asdfasdf');
        debugSource(req);
        IssuesPublicView.find({ 'addedBy._id': ObjectId(req.params.id) }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);
            return res.status(200).json(data);
        });
    })

module.exports = publicRouter;