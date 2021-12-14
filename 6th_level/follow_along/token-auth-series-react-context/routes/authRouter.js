const express = require("express")
require('dotenv').config();
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

authRouter.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, userExists) => {
        if (err) {
            res.status(500);
            return next(err);
        }

        if (userExists) {
            res.status(403);
            return next(new Error("That username is already taken!"));
        }

        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            var token = jwt.sign(savedUser.toObject(), process.env.SECRET);
            return res.status(201).json({ success: true, token, user: savedUser });
        });
    });
});

authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            return next(err);
        };
        
        if (!user || user.password !== req.body.password) {
            res.status(403);
            return next(new Error("Username or Password are incorrect"));
        }
        
        const token = jwt.sign(user.toObject(), process.env.SECRET);
        return res.status(201).json({ success: true, token, user: user.toObject() })
    });
});

module.exports = authRouter;