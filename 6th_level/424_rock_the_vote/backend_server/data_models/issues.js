const mongoose = require("mongoose");


// TODO Create issuesTableView (as data_model?) instead of trusting that it already exists

// TODO Define addedBy, votes, and comments schemas separately, then embed in issuesSchema and (embed votes again in comments)
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
        ref: "users",
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    // define votes and comments as "SubDocument Type", see https://youtu.be/NlU3PF1EN9A
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