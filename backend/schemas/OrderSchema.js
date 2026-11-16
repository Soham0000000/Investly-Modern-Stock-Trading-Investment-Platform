const { Schema } = require("mongoose");


const OrderSchema = new Schema ({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    seedKey: { type: String, default: undefined },
});

OrderSchema.index(
    { userId: 1, seedKey: 1 },
    { unique: true, partialFilterExpression: { seedKey: { $type: "string" } } },
);

module.exports = { OrderSchema };