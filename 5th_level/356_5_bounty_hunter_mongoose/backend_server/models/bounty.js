const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Bounty Blueprint
const bountySchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: String,
    Living: Boolean,
    BountyAmount: Number,
    Affiliation: String
});

module.exports = mongoose.model("Bounty", bountySchema);