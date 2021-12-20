const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("users", UsersSchema);