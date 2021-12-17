require('dotenv').config();
const {debugSource, debugReturn} = require("../debug");
const express = require("express");
const authRouter = express.Router();
const User = require("../data_models/users");
const jwt = require('jsonwebtoken');

authRouter.post("/signup", (req, res, next) => {
    debugSource(req);
    User.findOne({ username: req.body.username.toLowerCase() }, (err, userExists) => {
        if (err) {
            res.status(500);
            return next(err);
        }

        if (userExists) {
            res.status(403);
            return next({ "message": "That username is already taken!" });
        }

        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET, { expiresIn: '86400s' });
            const data = { success: true, token, user: savedUser.toObject() };
            debugReturn(data);           
            return res.status(201).json(data);
        });
    });
});

authRouter.get("/login", (req, res, next) => {
    debugSource(req);
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            return next(err);
        };

        if (!user || user.password !== req.body.password) {
            res.status(403);
            return next({ "message": "Username or Password are incorrect!" });
        }

        const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: '86400s' });
        const data = { success: true, token, user: user.toObject() };
        debugReturn(data);           
        return res.status(201).json(data);
    });
});

module.exports = authRouter;