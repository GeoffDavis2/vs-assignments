// Clear the terminal
console.log("\033c");
const DEBUG = true;


// To start MondoDB...
// cd into folder with DB
// sudo mongod --dbpath .
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bounty-hunter",
  () => console.log("\n********** Connected to MongoDB **********"));
const Bounty = require("./models/bounty");


const express = require("express")
const app = express();

if (DEBUG) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(express.json());

app.get("/bounties", async (_, res, next) => {
  if (DEBUG) console.log('\n********** app.get ********** \nCalled without params...');
  Bounty.find((err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (DEBUG) {
      console.log('Returning all rows...');
      console.log(data);
    }
    return res.status(200).send(data);
  })
});

// TODO Convert to MongoDB
app.get("/bounties/:id", async (req, res) => {
  if (DEBUG) {
    console.log(`\n********** app.get **********`);
    console.log(req);
  }
  const id = parseInt(req.params.id);
  const data = await dataBase.query(`SELECT * FROM bounties WHERE _id = ${id};`);
  data.map(obj => obj.Living = obj.Living === 'true');
  if (DEBUG) {
    console.log('Returning found row...');
    console.log(data[0]);
  }
  res.status(200).json(data[0]);
});

app.post("/bounties", async (req, res, next) => {
  if (DEBUG) {
    console.log(`\n********** app.post **********`);
    console.log(req);
  }
  const newBounty = new Bounty(req.body);
  newBounty.save((err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (DEBUG) {
      console.log('Returning new row...');
      console.log(data);
    }
    return res.status(201).send(data);
  })
})

app.put("/bounties/:id", async (req, res) => {
  if (DEBUG) {
    console.log(`\n********** app.put **********`);
    console.log(req);
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
      if (DEBUG) {
        console.log('Returning changed row...');
        console.log(data);
      }
      return res.status(200).json(data);
    }
  )
})

app.delete("/bounties/:id", async (req, res, next) => {
  if (DEBUG) {
    console.log(`\n********** app.delete **********`);
    console.log(req);
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
    if (DEBUG) {
      console.log('Returning all rows...');
      console.log(data);
    }
    return res.status(200).send(data);
  });
});

app.use((err, req, res, next) => {
  if (DEBUG) console.log(err);
  return res.send({ errMsg: err.message });
})

app.listen(7654, () => {
  if (DEBUG) console.log("\n********** app.listen **********\nListening on port 7654");
});