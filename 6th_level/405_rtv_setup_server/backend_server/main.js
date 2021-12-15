// TODO Do thorough testing of authenticated API calls
// TODO Add my DEBUG stuff to the newly added authentication (auth route, auth stuff in other routes)
// TODO Document Authentication stuff in Notion Backend Checklist

// Clear the terminal and turn DEBUB on/off
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

// QUESTION Can I have this custom middleware redirect to the "common" error handler just before Listen instead of returning from here???
// Custom Middleware to check for DB Connection before bothering with any routes
app.use((_, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        DEBUG && console.log('\n---------------------- Error The Server Is Not Connected to the DB\n');
        res.status(500).json({errMsg: "The Server Is Not Connected to the DB!!!"});
    }
    next();
});

// Route Handler(s)
app.use("/auth", require("./express_routes/auth"));
app.use("/secure", expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}));
app.use("/secure/issue", require("./express_routes/issues"));

// TODO Should disable this route
app.use("/secure/user", require("./express_routes/users"));

// Error Handler(s)
app.use((err, req, res, next) => {
    DEBUG && console.log('\n********** Error Handler **********\n', err);
    (err.name === "UnauthorizedError") && res.status(err.status);
    return res.json({ errMsg: err });
});

app.listen(7654, () => {
    DEBUG && console.log("\n********** app.listen **********\nListening on port 7654");
});