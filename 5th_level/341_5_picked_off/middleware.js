const express = require("express");
const app = express();

module.exports = (req, res, next) => {
    req.body.test = "It hit my middleware"
    console.log('Inside middleware...');
    next();
};