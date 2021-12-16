const express = require("express");
const issuesRouter = express.Router();

const Issue = require("../data_models/issues");
const DEBUG = require('../main');

issuesRouter.route("/")
    .get(async (_, res, next) => {
        DEBUG && console.log('\n********** get to /secure/issue ********** \nCalled without params...');
        Issue.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err.message);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        }).sort({ Votes: -1 });
    })

    .post(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** post **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        req.body.user = req.user._id;
        const newIssue = new Issue(req.body);
        newIssue.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err.message);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(201).json(data);
        });
    });

issuesRouter.route("/id/:id")
    .get(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** get (with id params) **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        Issue.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err.message);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        });
    })

    .put(async (req, res) => {
        if (DEBUG) {
            console.log(`\n********** app.put2 **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        };
        Issue.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    res.status(500);
                    return next(err.message);
                };
                if (DEBUG) console.log('---------------------- Returning data\n', data);
                return res.status(200).json(data);
            }
        );
    })

    .delete(async (req, res, next) => {
        // TODO take this debug stuff from all CRUD call and put in its own fuction... keep it DRY!!!
        if (DEBUG) {
            console.log(`\n********** app.delete **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        };
        Issue.findOneAndDelete({ _id: req.params.id, user: req.user._id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err.message);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        });
    });

issuesRouter.get("/user", (req, res, next) => {
    if (DEBUG) {
        console.log(`\n********** app.delete **********`);
        for (const prop in req) if (["params", "query", "body"].includes(prop))
            console.log(`---------------------- ${prop}\n`, req[prop]);
    };
    Issue.find({ user: req.user._id }, (err, data) => {
        if (err) {
            res.status(500);
            return next(err.message);
        }
        return res.status(200).json(data);
    });
});

// TODO Test this 
// TODO     rearrange to issuesRouter.get("/search", ...
// TODO     Test again to make sure it still works
issuesRouter.route("/search").get(async (req, res, next) => {
    if (DEBUG) {
        console.log(`\n********** app.get (with search query) **********`);
        for (const prop in req) if (["params", "query", "body"].includes(prop))
            console.log(`---------------------- ${prop}\n`, req[prop]);
    };
    Issue.find(req.query, (err, data) => {
        if (err) {
            res.status(500);
            return next(err.message);
        };
        if (DEBUG) console.log('---------------------- Returning data\n', data);
        return res.status(200).json(data);
    }).sort({ Volume: 1, Book: 1, Page: 1 })
});

module.exports = issuesRouter;