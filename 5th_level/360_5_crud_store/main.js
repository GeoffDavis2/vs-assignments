// Clear the terminal and turn DEBUB on/off
console.log("\033c");
module.exports = (DEBUG = true);

// Mongo DB Setup
// To start MondoDB...
// cd into folder with DB
// sudo mongod --dbpath .
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/crud-store",
  () => { if (DEBUG) console.log("\n********** Connected to MongoDB **********") }
);

// Express Setup  
const express = require("express")
const app = express();

// Morgan
if (DEBUG) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// This is needed to get body of request
app.use(express.json());

// Route Handler(s)
app.use("/inventory", require("./routes/inventory"));

// Error Handler(s)
app.use((err, req, res, next) => {
  if (DEBUG) console.log('---------------------- Error\n', err);
  return res.send({ errMsg: err.message });
})

app.listen(7654, () => {
  if (DEBUG) console.log("\n********** app.listen **********\nListening on port 7654");
});