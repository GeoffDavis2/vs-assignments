const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const usersRouter = express.Router();
const User = require("../data_models/users");
const { ObjectID } = require("bson");

usersRouter.route("/id/:id")
    .get(async (req, res, next) => {
        debugSource(req);
        User.aggregate()
            .match({ _id: ObjectID(req.params.id) })
            .project({username: 1})
            .exec((err, data) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                debugReturn(data);
                return res.status(200).json(data);
            });
    })

    .delete(async (req, res, next) => {
        debugSource(req);
        User.findOneAndDelete({ _id: req.params.id, user: req.user._id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);
            return res.status(200).json(data);
        });
    });

module.exports = usersRouter;