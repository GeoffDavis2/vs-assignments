const mongoose = require("mongoose");

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
    sort: Number
});

module.exports = mongoose.model("nodes", NodeSchema);