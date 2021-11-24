const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");

const midware = require("./middleware");
let { docs } = require("./documents");
docs = docs.map(doc => ({ _id: uuid(), ...doc }));

console.log("\033c");
app.use(express.json());

app.use(midware);

app.get("/", (req, res) => {
    if (req.body.test === "It hit my middleware") {
        console.log(`In root get, ${req.body.test}.`);
        res.status(200).json(docs);
    }
    else res.status(500).send(`In root get, didn't get expected add-on from middleware. Got "${req.body.test}" instead.`);
});

app.get("/:id", (req, res) => {
    console.log(`In params get, ${req.body.test}.`);
    if (req.body.test === "It hit my middleware") res
        .status(200)
        .json(docs.find(y => y._id === req.params.id))
    else res.status(500).send(`In params get, didn't get expected add-on from middleware. Got "${req.body.test}" instead.`);
});

app.get("/sea/rch", (req, res) => {
    console.log(`In query get, ${req.body.test}.`);
    if (req.body.test === "It hit my middleware") {
        qryObj = req.query;
        const yeild = docs.filter(doc => {
            let found = true;
            for (key in qryObj) found = found && (doc[key] == qryObj[key]);
            return found;
        })
        res.status(200).json(yeild);
    }
    else res.status(500).send(`In query get, didn't get expected add-on from middleware. Got "${req.body.test}" instead.`);
});

app.listen(7654, () => {
    console.log("Server is running on port 6789");
});