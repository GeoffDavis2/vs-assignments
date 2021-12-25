const mongoose = require("mongoose");

const IssueVotesSchema = new mongoose.Schema({
    issue: {
        type: mongoose.Schema.Types.ObjectId,      
        ref: "issues",
        required: true
    },
    value: {
        type: Number,
        validate: {
            validator: (v) => [-1,1].includes(v),
            message: `Vote must be 1 or -1.`
          },
        required: true
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

module.exports = mongoose.model("issuevotes", IssueVotesSchema);