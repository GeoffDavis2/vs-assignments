const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Pre-save hook to encrypt user password (using bcrypt) before loading to DB
UsersSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    })
})

// Method to check encrypted password on login
UsersSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err);
        return callback(null, isMatch);
    })
}

// Method to remove user's password before sending response
UsersSchema.methods.withoutPassword = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

module.exports = mongoose.model("users", UsersSchema);