const mongoose = require("mongoose");

const IssuesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Issues", IssuesSchema);