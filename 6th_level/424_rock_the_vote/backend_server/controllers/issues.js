// TODO Later: Fix so instead of returning null, it returns an error message
// TODO Later:     i.e. trying to add vote to issue that doesn't exist (in postman) yields null


const {debugSource, debugReturn} = require("../debug");
const express = require("express");
const { connection } = require("mongoose");
const issuesRouter = express.Router();
const Issue = require("../data_models/issues");

issuesRouter.route("/")
    .get(async (req, res, next) => {
        debugSource(req);
        Issue.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);           
            return res.status(200).json(data);
        }).sort({ Votes: -1 });
    })

    .post(async (req, res, next) => {
        debugSource(req);
        req.body.addedBy = req.user._id;
        const newIssue = new Issue(req.body);
        newIssue.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);           
            return res.status(201).json(data);
        });
    });

issuesRouter.route("/id/:id")
    .get(async (req, res, next) => {
        debugSource(req);
        Issue.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);           
            return res.status(200).json(data);
        });
    })

    .put(async (req, res) => {
        debugSource(req);
        Issue.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    res.status(500);
                    return next(err);
                };
                debugReturn(data);           
                return res.status(200).json(data);
            }
        );
    })

    .delete(async (req, res, next) => {
        debugSource(req);
        Issue.findOneAndDelete({ _id: req.params.id, user: req.user._id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);           
            return res.status(200).json(data);
        });
    });

issuesRouter.get("/user", (req, res, next) => {
    debugSource(req);
    Issue.find({ user: req.user._id }, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        debugReturn(data);           
        return res.status(200).json(data);
    });
});

issuesRouter.route("/search").get(async (req, res, next) => {
    debugSource(req);
    Issue.find(req.query, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        debugReturn(data);           
        return res.status(200).json(data);
    }).sort({ Volume: 1, Book: 1, Page: 1 })
});

module.exports = issuesRouter;