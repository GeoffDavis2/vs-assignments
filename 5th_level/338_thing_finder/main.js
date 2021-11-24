const express = require("express")
const app = express();
const { v4: uuid } = require("uuid");


let { docs } = require("./documents");
docs = docs.map(doc => ({ _id: uuid(), ...doc }));

console.log("\033c");
app.use(express.json());


app.get("/", (_, res) => res.status(200).json(docs));

app.get("/:id", (req, res) => res
    .status(200)
    .json(docs.find(y => y._id === req.params.id))
);

app.get("/sea/rch", (req, res) => {
    qryObj = req.query;
    const yeild = docs.filter(doc => {
        let found = true;
        for (key in qryObj) found = found && (doc[key] == qryObj[key]);
        return found;
    })
    res.status(200).json(yeild);
});

app.listen(7654, () => {
    console.log("Server is running on port 6789");
});