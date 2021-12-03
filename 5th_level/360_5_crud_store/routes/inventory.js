const express = require("express");
const inventoryRouter = express.Router();
const Inventory = require("../models/inventory");
const DEBUG = require('../main');

inventoryRouter.route("/")
    .get(async (_, res, next) => {
        if (DEBUG) console.log('\n********** app.get ********** \nCalled without params...');
        Inventory.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        }).sort({ quantity: 1 });
    })

    .post(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** app.post **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        const newInventory = new Inventory(req.body);
        newInventory.save((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(201).send(data);
        })
    });

inventoryRouter.route("/:id")
    .get(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** app.get (with id params) **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
        }
        Inventory.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        }).sort({ quantity: 1 });
    })

    .put(async (req, res) => {
        if (DEBUG) {
            console.log(`\n********** app.put **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
        }

        Inventory.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
            (err, data) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                if (DEBUG) console.log('---------------------- Returning data\n', data);
                return res.status(200).json(data);
            }
        )
    })

    .delete(async (req, res, next) => {
        if (DEBUG) {
            console.log(`\n********** app.delete **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
        }

        Inventory.findOneAndDelete({ _id: req.params.id }, (err) => {
            if (err) {
                res.status(500);
                return next(err);
            }
        });

        Inventory.find((err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (DEBUG) console.log('---------------------- Returning data\n', data);
            return res.status(200).json(data);
        });
    });

module.exports = inventoryRouter;