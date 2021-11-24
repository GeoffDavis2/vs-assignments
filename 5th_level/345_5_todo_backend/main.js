const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");

// npm install morgan
const morgan = require("morgan");

let { data } = require("./data");

console.log("\033c");
// console.table(data);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.status(200).json(data));

app.get("/:id", (req, res) => res
    .status(200)
    .json(data.find(y => y._id === req.params.id))
);

app.post("/", (req, res) => {
    data.push({ _id: uuid(), ...req.body });
    res.status(200).json(data);
})

app.put("/:id", (req, res) => {
    const ndx = data.findIndex(obj => obj._id === req.params.id);
    data[ndx] = { ...data[ndx], ...req.body };
    res.status(200).json(data[ndx]);
})

app.delete("/:id", (req, res) => {
    const ndx = data.findIndex(obj => obj._id === req.params.id);
    data.splice(ndx, 1);
    res.status(200).json(data);
})


app.listen(7654, () => {
    console.log("Server is running on port 7654");
});