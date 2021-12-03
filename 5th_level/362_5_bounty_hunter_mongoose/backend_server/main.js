// Clear the terminal
console.log("\033c");
const DEBUG = true;


// To start MondoDB...
// cd into folder with DB
// sudo mongod --dbpath .
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bounty-hunter",
  () => { if (DEBUG) console.log("\n********** Connected to MongoDB **********") });
const Bounty = require("./models/bounty");


const express = require("express");
const app = express();

if (DEBUG) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
};

app.use(express.json());

// TODO make sure get /bounties, get /bounties/search, and get /bounties/:id don't conflict with each other
app.get("/bounties", async (_, res, next) => {
  if (DEBUG) console.log('\n********** app.get ********** \nCalled without params...');
  Bounty.find((err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (DEBUG) console.log('---------------------- Returning data\n', data);
    return res.status(200).json(data);
  }).sort({ BountyAmount: -1 });
});

// TODO make sure get /bounties, get /bounties/search, and get /bounties/:id don't conflict with each other
app.get("/bounties/:id", async (req, res, next) => {
  if (DEBUG) {
    console.log(`\n********** app.get (with id params) **********`);
    for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
  }
  Bounty.findOne({_id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (DEBUG) console.log('---------------------- Returning data\n', data);
    return res.status(200).json(data);
  }).sort({ quantity: 1 });
});

// TODO make sure get /bounties, get /bounties/search, and get /bounties/:id don't conflict with each other
app.get("/bounties/search", async (req, res, next) => {
  if (DEBUG) {
    console.log(`\n********** app.get (with search query) **********`);
    for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
  }
  Bounty.find(req.query, (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (DEBUG) console.log('---------------------- Returning data\n', data);
    return res.status(200).json(data);
  }).sort({ BountyAmount: -1 });
});

app.post("/bounties", async (req, res, next) => {
  if (DEBUG) {
    console.log(`\n********** app.post **********`);
    for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
  }
  const newBounty = new Bounty(req.body);
  newBounty.save((err, data) => {
    if (err) {      
      res.status(500);
      return next(err);
    }
    if (DEBUG) console.log('---------------------- Returning data\n', data);
    return res.status(201).send(data);
  })
});

app.put("/bounties/:id", async (req, res) => {
  if (DEBUG) {
    console.log(`\n********** app.put **********`);
    for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
  }

  Bounty.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (DEBUG) console.log('---------------------- Returning data\n', data);
      return res.status(200).json(data);
    }
  )
});

app.delete("/bounties/:id", async (req, res, next) => {
  if (DEBUG) {
    console.log(`\n********** app.delete **********`);
    for (const prop in req) if (["params", "query", "body"].includes(prop)) console.log(`---------------------- ${prop}\n`, req[prop]);
  }

  Bounty.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500);
      return next(err);
    }
  });

  Bounty.find((err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (DEBUG) console.log('---------------------- Returning data\n', data);
    return res.status(200).json(data);
  });
});

app.use((err, req, res, next) => {
  if (DEBUG) console.log('---------------------- Error\n', err);
  return res.send({ errMsg: err.message });
});

app.listen(7654, () => {
  if (DEBUG) console.log("\n********** app.listen **********\nListening on port 7654");
});