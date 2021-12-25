const mongoose = require("mongoose");


// TODO Add votes and comments arrays???
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
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    votes: [{
        value: {
            type: Number,
            validate: {
                validator: (v) => [-1,1].includes(v),
                message: `Vote must be 1 or -1.`
              },
            required: true
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        addedDate: {
            type: Date,
            default: Date.now
        }
    }],
    comments: [{
        comment: {
            type: String,            
            required: true
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        addedDate: {
            type: Date,
            default: Date.now
        },
        votes: [{
            value: {
                type: Number,
                validate: {
                    validator: (v) => [-1,1].includes(v),
                    message: `Vote must be 1 or -1.`
                  },
                required: true
            },
            addedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true
            },
            addedDate: {
                type: Date,
                default: Date.now
            }
        }]
    }]
});

module.exports = mongoose.model("issues", IssuesSchema);