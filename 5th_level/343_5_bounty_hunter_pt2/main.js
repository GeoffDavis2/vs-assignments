const express = require("express")
const app = express();
const { v4: uuid } = require("uuid");

let { data } = require("./data");

console.log("\033c");
// console.table(data);

app.use(express.json());

app.get("/bounties", (_, res) => res.status(200).json(data));

app.get("/bounties/:id", (req, res) => res
    .status(200)
    .json(data.find(y => y._id === req.params.id))
);

app.post("/bounties", (req, res) => {
    data.push({ _id: uuid(), ...req.body });
    res.status(200).json(data);
})

app.put("/bounties/:id", (req, res) => {
    const ndx = data.findIndex(obj => obj._id === req.params.id);
    data[ndx] = { ...data[ndx], ...req.body };
    res.status(200).json(data[ndx]);
})

app.delete("/bounties/:id", (req, res) => {
    const ndx = data.findIndex(obj => obj._id === req.params.id);
    data.splice(ndx, 1);
    res.status(200).json(data);
})


app.listen(6789, () => {
    console.log("Server is running on port 6789");
});