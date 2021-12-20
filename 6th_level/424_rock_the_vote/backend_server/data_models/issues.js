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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("issues", IssuesSchema);