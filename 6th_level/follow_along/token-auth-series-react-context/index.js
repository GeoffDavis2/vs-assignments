const express = require("express")
const app = express()
require('dotenv').config();
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 5000

console.log("\033c");

app.use(morgan("dev"))
app.use(express.json())

//connect to db
mongoose.connect(
    "mongodb://localhost:27017/todo-auth-example", { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)


app.use("/auth", require("./routes/authRouter"));
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}));

// QUESTION What happens to all the tokens that are generated from logins (that apparently still work)?

// TODO How can I make middleware that logs values between other middleware???
// app.use("/api", (req, res, next)=> {
//     console.log(req);
//     return next(req, res, next);
// });

app.use("/api/todo", require("./routes/todoRouter"));

app.use((err, req, res, next) => {
    console.error(err);
    if(err.name === "UnauthorizedError") res.status(err.status);
    return res.send({ errMsg: err.message })
})

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`);
})