const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const { connection } = require("mongoose");
const nodesRouter = express.Router();
const Node = require("../data_models/nodes");
const { ObjectId } = require("mongodb");

nodesRouter.route("/")
    .get(async (req, res, next) => {
        debugSource(req);
        Node.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);
            return res.status(200).json(data);
        });
    })

    .post(async (req, res, next) => {
        debugSource(req);
        // TODO Fix it so it gets user from req.user._id
        // req.body.addedBy = req.user._id;
        req.body.user = ObjectId('61e8426a4ff0123eccdea56d');
        const newNode = new Node(req.body);
        newNode.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            debugReturn(data);
            return res.status(201).json(data);
        });
    });

nodesRouter.route("/id/:id")
    .get(async (req, res, next) => {
        debugSource(req);
        Node.findOne({ _id: req.params.id }, (err, data) => {
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
        Node.findOneAndUpdate(
            // TODO Fix it so it gets user from req.user._id
            // { _id: req.params.id, user: req.user._id },
            { _id: req.params.id, user: ObjectId('61e8426a4ff0123eccdea56d') },
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
        Node.findOneAndDelete(
            // TODO Fix it so it gets user from req.user._id
            // { _id: req.params.id, user: req.user._id },
            { _id: req.params.id, user: ObjectId('61e8426a4ff0123eccdea56d') },
            (err, data) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                debugReturn(data);
                return res.status(200).json(data);
            });
    });

nodesRouter.get("/user", (req, res, next) => {
    debugSource(req);
    Node.find({ user: req.user._id }, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        debugReturn(data);
        return res.status(200).json(data);
    });
});

nodesRouter.route("/search").get(async (req, res, next) => {
    debugSource(req);
    Node.find(req.query, (err, data) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        debugReturn(data);
        return res.status(200).json(data);
    }).sort({ Volume: 1, Book: 1, Page: 1 })
});

module.exports = nodesRouter;