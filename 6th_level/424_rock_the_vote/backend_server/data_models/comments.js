const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

module.exports = mongoose.model("comments", CommentsSchema);