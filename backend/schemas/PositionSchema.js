const { Schema } = require("mongoose");

const PositionSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
});

PositionSchema.index({ userId: 1, product: 1, name: 1 }, { unique: true });

module.exports = { PositionSchema };