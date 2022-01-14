require('dotenv').config();
const { debugSource, debugReturn } = require("../debug");
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
            return next("That username is already taken!");
        }

        console.log('am i here?');
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
        if (err) {
            return next(err);
        };

        // TODO combine this into one if statement instead of 2
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403);
                return next("Username or Password are incorrect!");
            }
            if (!isMatch) {
                res.status(403);
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