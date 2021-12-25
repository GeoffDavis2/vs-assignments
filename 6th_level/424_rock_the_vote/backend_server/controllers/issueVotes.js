// working example of get sum from issuevotes
// IssueVote.aggregate([{ $group: { _id: "$issue", sum: { $sum: "$value" } } }], (err, data) => {
//     console.log(data.find(obj => obj._id == "61ba1bda4ac3f426022a7680").sum);
// });

// query to get just counts db.issues.aggregate([{ $lookup: { from: 'issuevotes', localField: '_id', foreignField: 'issue', as: 'votes' } }, { $addFields: { votecount: { $size: '$votes' } } }, {$project: {votecount:1}}])


const {debugSource, debugReturn} = require("../debug");
const express = require("express");
const votesRouter = express.Router();
const IssueVote = require("../data_models/issueVotes");

votesRouter.route("/")
    .get(async (req, res, next) => {
        debugSource(req);
        IssueVote.find((err, data) => {
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
        req.body.createdBy = req.user._id;

        const count = await IssueVote.count({ issue: req.body.issue, createdBy: req.user._id });
        if (count > 0) {
            res.status(403);
            return next("Only one vote per user per issue.");
        }

        const newIssueVote = new IssueVote(req.body);
        newIssueVote.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);           
            return res.status(201).json(data);
        });
    });

votesRouter.route("/id/:id")
    .get(async (req, res, next) => {
        debugSource(req);
        IssueVote.findOne({ _id: req.params.id }, (err, data) => {
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
        IssueVote.findOneAndUpdate(
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
        IssueVote.findOneAndDelete({ _id: req.params.id, user: req.user._id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);           
            return res.status(200).json(data);
        });
    });

votesRouter.get("/user", (req, res, next) => {
    debugSource(req);
    IssueVote.find({ user: req.user._id }, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        debugReturn(data);           
        return res.status(200).json(data);
    });
});

// TODO Test this 
votesRouter.route("/search").get(async (req, res, next) => {
    debugSource(req);
    IssueVote.find(req.query, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        debugReturn(data);           
        return res.status(200).json(data);
    }).sort({ Volume: 1, Book: 1, Page: 1 })
});

module.exports = votesRouter;