const mongoose = require("mongoose");

// TODO Later: Define addedBy, votes, and comments schemas separately, then embed in issuesSchema and (embed votes again in comments)
// TODO Later:      to define votes and comments as "SubDocument Type", see https://youtu.be/NlU3PF1EN9A

// TODO Later: validator below doesn't seem to work, either fix it...
// TODO Later:      or add my own validation on update (make sure value is 1 or -1)

const NodeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nodes",
        required: false
    },   
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "nodes",
        required: false
    }],
});

module.exports = mongoose.model("nodes", NodeSchema);