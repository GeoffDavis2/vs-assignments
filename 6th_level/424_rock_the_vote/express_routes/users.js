const express = require("express");
const usersRouter = express.Router();

const User = require("../data_models/users");
const DEBUG = require('../main');

usersRouter.route("/")
    .get(async (_, res, next) => {
        DEBUG && console.log('\n********** get ********** \nCalled without params...');
        User.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
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
        const newUser = new User(req.body);
        newUser.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(201).json(data);
        });
    });

usersRouter.route("/id/:id")
    .get(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** get (with id params) **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        User.findOne({ _id: req.params.id }, (err, data) => {
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
        User.findOneAndUpdate(
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
        // TODO take this debug stuff from all CRUD call and put in its own fuction... keep it DRY!!!
        if (DEBUG) {
            console.log(`\n********** app.delete **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        };
        User.findOneAndDelete({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        })
    });

// TODO Test this
usersRouter.route("/search").get(async (req, res, next) => {
    if (DEBUG) {
        console.log(`\n********** app.get (with search query) **********`);
        for (const prop in req) if (["params", "query", "body"].includes(prop))
            console.log(`---------------------- ${prop}\n`, req[prop]);
    };
    User.find(req.query, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        if (DEBUG) console.log('---------------------- Returning data\n', data);
        return res.status(200).json(data);
    }).sort({ Volume: 1, Book: 1, Page: 1 })
});

module.exports = usersRouter;