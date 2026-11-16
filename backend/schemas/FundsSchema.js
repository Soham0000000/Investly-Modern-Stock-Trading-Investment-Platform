const { Schema } = require("mongoose");

const FundsSchema = new Schema(
    {
        _id: { type: String, required: true },
        availableCents: { type: Number, required: true, min: 0 },
    },
    { versionKey: false },
);

module.exports = { FundsSchema };