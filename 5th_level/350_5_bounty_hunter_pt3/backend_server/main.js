// To start / stop the mysql DB...
// sudo /etc/init.d/mysql start
// sudo /etc/init.d/mysql stop
const mariadb = require('mariadb');
const dataBase = mariadb.createPool({
  host: 'localhost',
  user: 'TempUser',
  password: 'TempPswd',
  database: 'bounty_hunter',
  connectionLimit: 5,
  multipleStatements: true
});

dataBase.getConnection((err, connection) => {
  if (err) console.log(err);
  if (connection) connection.release();
  return;
});

const express = require("express")
const app = express();

const DEBUG = true;
if (DEBUG) {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
// Clear the terminal
console.log("\033c");


app.use(express.json());

app.get("/bounties", async (_, res) => {
  if (DEBUG) console.log('\n********** app.get ********** \nCalled without params...');
  const data = await dataBase.query("SELECT * FROM bounties;");
  data.map(obj => obj.Living = obj.Living === 'true');
  if (DEBUG) {
    delete data.meta; // Remove meta to make the console.table look pretty
    console.log('Returning all rows...');
    console.table(data);
  }
  res.status(200).json(data);
});

app.get("/bounties/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (DEBUG) console.log(`\n********** app.get **********\nreq.params.id = ${id}`);
  const data = await dataBase.query(`SELECT * FROM bounties WHERE _id = ${id};`);
  data.map(obj => obj.Living = obj.Living === 'true');
  if (DEBUG) {
    console.log('Returning found row...');
    console.log(data[0]);
  }
  res.status(200).json(data[0]);
});

app.post("/bounties", async (req, res) => {
  if (DEBUG) console.log(`\n********** app.post **********\nreq.body = ${JSON.stringify(req.body)}`);
  const { insertId } = await dataBase.query(`INSERT INTO bounties value (null, \
    '${req.body.FirstName}', '${req.body.LastName}', '${req.body.Living}', ${req.body.BountyAmount}, '${req.body.Type}');`);
  const data = await dataBase.query(`SELECT * FROM bounties WHERE _id = ${insertId};`);
  if (DEBUG) {
    console.log('Returning new row...');
    console.log(data[0]);
  }
  res.status(200).json(data[0]);
})

app.put("/bounties/:id", async (req, res) => {
  if (DEBUG) {
    console.log(`\n********** app.put **********`);
    console.log(req);
  }
  const id = parseInt(req.params.id);
  // if (DEBUG) console.log(`\n********** app.put **********\nreq.params.id = ${id}\nreq.body = ${JSON.stringify(req.body)}`);

  // Create Update Query and then Add Select Query to end...
  let theQuery = "UPDATE bounties SET ";
  Object.entries(req.body).map(obj => theQuery += `${obj[0]} = '${obj[1]}', `);
  theQuery = theQuery.slice(0, -2);
  theQuery += ` WHERE _id = ${id}; SELECT * FROM bounties WHERE _id = ${id};`;
  const data = await dataBase.query(theQuery);

  // const data = await dataBase.query(`SELECT * FROM bounties WHERE _id = ${id};`);
  if (DEBUG) {
    console.log('Returning changed row...');
    console.log(data[1][0]);
  }
  res.status(200).json(data[1][0]);
})

app.delete("/bounties/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (DEBUG) console.log(`\n********** app.delete **********\nreq.params.id = ${id}`);
  const data = await dataBase.query(`DELETE FROM bounties WHERE _id = ${id}; SELECT * FROM bounties;`);
  if (DEBUG) {
    delete data[1].meta; // Remove meta to make the console.table look pretty
    console.log('Returning all rows...');
    console.log(data[1]);
  }
  res.status(200).json(data[1]);
})

app.listen(7654, () => {
  if (DEBUG) console.log("\n********** app.listen **********\nListening on port 7654");
});