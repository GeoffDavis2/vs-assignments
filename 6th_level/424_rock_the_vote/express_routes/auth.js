const express = require("express");
const User = require("../data_models/users");
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

authRouter.post("/signup", (req, res, next) => {
    console.log('here1', req.body.username)
    User.findOne({ username: req.body.username.toLowerCase() }, (err, userExists) => {
        if (err) {
            console.log('here2');
            res.status(500);
            return next(err.message);
        }

        if (userExists) {
            console.log('here3');
            res.status(403);
            return next("That username is already taken!");
        }

        console.log('here4');
        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) {
                console.log('here');
                res.status(500);
                return next(err.message);
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET, { expiresIn: '1800s' });
            return res.status(201).json({ success: true, token, user: savedUser });
        });
    });
    console.log('here5');
});

authRouter.get("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            return next(err.message);
        };
        
        if (!user || user.password !== req.body.password) {
            res.status(403);
            return next("Username or Password are incorrect");
        }
        
        const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: '1800s' });
        return res.status(201).json({ success: true, token, user: user.toObject() })
    });
});

module.exports = authRouter;