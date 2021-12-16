// TODO Add my DEBUG stuff to the newly added authentication (auth route, auth stuff in other routes)
// TODO Document Authentication stuff in Notion Backend Checklist

// Clear the terminal and turn DEBUG on/off
console.log("\033c");
module.exports = (DEBUG = true);


// To start MondoDB...
// cd into folder with DB
// sudo mongod --dbpath .
module.exports = (mongoose = require("mongoose"));
mongoose.connect(
    "mongodb://localhost:27017/rock-the-vote",
    // "mongodb+srv://trend_geoff_lev5_capstone:7654@cluster0.7hfsb.mongodb.net/county-clerk",
    () => {
        DEBUG && (mongoose.connection.readyState === 0) && console.log("\n********** Disonnected from MongoDB **********");
        DEBUG && (mongoose.connection.readyState === 1) && console.log("\n********** Connected to MongoDB **********");
        DEBUG && (mongoose.connection.readyState === 2) && console.log("\n********** Connecting to MongoDB **********");
        DEBUG && (mongoose.connection.readyState === 3) && console.log("\n********** Disonnecting from MongoDB **********");
    }
);


// Express Setup  
const express = require("express"); 

const app = express();

// Morgan
if (DEBUG) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
};

// Needed for Authentication
require('dotenv').config();
const expressJwt = require('express-jwt');

// "Body Parser" now built into Express
app.use(express.json());

// Custom Middleware to check for DB Connection before bothering with any routes
app.use("/", (_, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        DEBUG && console.log('\n---------------------- Error The Server Is Not Connected to the DB\n');
        res.status(500);
        return next("The Server Is Not Connected to the DB!!!");
    }
    next();
});

// Custom Middleware to check for Username and Password before proceeding with /auth route
app.use("/auth",  (req, res, next) => {
    if (!req.body.username) {
        DEBUG && console.log('\n---------------------- Error You did not provide a username\n');
        res.status(500);
        return next("You did not provide a username!!!");
    }
    if (!req.body.password) {
        DEBUG && console.log('\n---------------------- Error You did not provide a password\n');
        res.status(500);
        return next("You did not provide a password!!!");
    }
    next();
});

// Middleware: check for good security token before proceeding with any /secure routes
app.use("/secure", expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}));

// Route Handler(s)
app.use("/auth", require("./express_routes/auth"));
app.use("/secure/issue", require("./express_routes/issues"));

// Error Handler(s)
app.use((err, req, res, next) => {
    DEBUG && console.log('\n********** Error Handler **********\n', err);
    (err.name === "UnauthorizedError") && res.status(err.status);
    return res.json({ errMsg: err });
});

app.listen(7654, () => {
    DEBUG && console.log("\n********** app.listen **********\nListening on port 7654");
});