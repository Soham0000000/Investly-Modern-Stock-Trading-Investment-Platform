const { Schema } = require("mongoose");

const MarketIndexSchema = new Schema(
    {
        _id: { type: String, required: true },
        value: { type: Number, required: true },
        change: { type: String, default: "" },
    },
    { timestamps: true, versionKey: false },
);

module.exports = { MarketIndexSchema };