const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const { connection } = require("mongoose");
const nodesRouter = express.Router();
const Node = require("../data_models/nodes");

nodesRouter.route("/")
    .get(async (req, res, next) => {
        debugSource(req);
        Node.aggregate([
            { $match: { parent: { $exists: false } } },
            { $lookup: { from: 'nodes', localField: 'children', foreignField: '_id', as: 'children' } }
        ], (err, data) => {
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
        req.body.addedBy = req.user._id;
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
        Node.findOneAndDelete({ _id: req.params.id, user: req.user._id }, (err, data) => {
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