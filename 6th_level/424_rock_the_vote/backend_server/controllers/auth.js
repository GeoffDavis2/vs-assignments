require('dotenv').config();
const { debugSource, debugReturn } = require("../debug");
const express = require("express");
const authRouter = express.Router();
const User = require("../data_models/users");
const jwt = require('jsonwebtoken');

authRouter.post("/signup", (req, res, next) => {
    debugSource(req);
    User.findOne({ username: req.body.username.toLowerCase() }, (err, userExists) => {
        if (err || userExists) {
            res.status(403);
            return next("That username is already taken!");
        }

        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET, { expiresIn: '86400s' });
            const data = { success: true, token, user: savedUser.withoutPassword() };
            debugReturn(data);
            return res.status(201).json(data);
        });
    });
});

authRouter.post("/login", (req, res, next) => {
    debugSource(req);
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err || !user) {
            res.status(401);
            return next("Username or Password are incorrect!");
        };

        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err || !isMatch) {
                res.status(401);
                return next("Username or Password are incorrect!");
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET, { expiresIn: '86400s' });
            const data = { success: true, token, user: user.withoutPassword() };
            debugReturn(data);
            return res.status(201).json(data);
        })
    });
});

module.exports = authRouter;