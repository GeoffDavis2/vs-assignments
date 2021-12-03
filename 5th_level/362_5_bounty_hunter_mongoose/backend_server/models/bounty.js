const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Bounty Blueprint
const bountySchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: String,
    Living: {
        type: Boolean,
        required: true
    },
    BountyAmount: Number,
    Affiliation: {
        type: String,
        enum: ['Jedi', 'Sith', 'Neutral']
    }
});

module.exports = mongoose.model("Bounty", bountySchema);