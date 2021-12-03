const express = require("express");
const bountyRouter = express.Router();
const Bounty = require("../models/bounty");
const DEBUG = require('../main');

bountyRouter.route("/")
    .get(async (_, res, next) => {
        if (DEBUG) console.log('\n********** get ********** \nCalled without params...');
        Bounty.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        }).sort({ BountyAmount: -1 });
    })

    .post(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** post **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        const newBounty = new Bounty(req.body);
        newBounty.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(201).send(data);
        });
    });

bountyRouter.route("/id/:id")
    .get(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** get (with id params) **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        Bounty.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        });
    })

    .put(async (req, res) => {
        if (DEBUG) {
            console.log(`\n********** app.put **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        };
        Bounty.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    res.status(500);
                    return next(err);
                };
                if (DEBUG) console.log('---------------------- Returning data\n', data);
                return res.status(200).json(data);
            }
        );
    })

    .delete(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** app.delete **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        };
        Bounty.findOneAndDelete({ _id: req.params.id }, (err) => {
            if (err) {
                res.status(500);
                return next(err);
            };
        });
        Bounty.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            };
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        }).sort({ BountyAmount: -1 });
    });

bountyRouter.route("/search").get(async (req, res, next) => {
    if (DEBUG) {
        console.log(`\n********** app.get (with search query) **********`);
        for (const prop in req) if (["params", "query", "body"].includes(prop))
            console.log(`---------------------- ${prop}\n`, req[prop]);
    };
    Bounty.find(req.query, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        if (DEBUG) console.log('---------------------- Returning data\n', data);
        return res.status(200).json(data);
    }).sort({ BountyAmount: -1 });
});







module.exports = bountyRouter;