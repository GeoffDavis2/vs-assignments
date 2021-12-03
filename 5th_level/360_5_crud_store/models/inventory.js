const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { collection: 'inventory' });

module.exports = mongoose.model("", InventorySchema);