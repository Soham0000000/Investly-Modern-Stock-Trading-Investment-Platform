const { model } = require("mongoose");
const { MarketIndexSchema } = require("../schemas/MarketIndexSchema");

const MarketIndexModel = model("marketIndex", MarketIndexSchema);

module.exports = { MarketIndexModel };