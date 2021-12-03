const mongoose = require("mongoose");

const BountySchema = new mongoose.Schema({
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
        enum: ['Jedi', 'Sith', 'Neutral'],
        required: true
    }
});

module.exports = mongoose.model("Bounty", BountySchema);