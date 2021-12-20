const mongoose = require("mongoose");

const CommentVotesSchema = new mongoose.Schema({
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "issues",
        required: true
    },
    value: {
        type: Number
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("commentvotes", CommentVotesSchema);