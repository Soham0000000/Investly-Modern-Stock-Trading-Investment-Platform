const { Schema } = require("mongoose");


const HoldingSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
});

HoldingSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = { HoldingSchema };