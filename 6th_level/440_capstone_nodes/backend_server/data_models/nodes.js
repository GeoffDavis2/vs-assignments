const mongoose = require("mongoose");

const NodeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        // trim: true,
        required: false,
        default: ''
    },
    type: {
        type: String,
        trim: true,
        required: false,
        default: 'plain'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nodes",
        required: false
    },   
    sibSort: Number
});

module.exports = mongoose.model("nodes", NodeSchema);