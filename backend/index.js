require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { HoldingModel } = require('./model/HoldingModel');
const { PositionModel } = require('./model/PositionModel');
const { orderModel, OrderModel } = require("./model/OrderModel");
const { FundsModel } = require("./model/FundsModel");
const { UserModel } = require("./model/UserModel");
const { WatchlistModel } = require("./model/WatchlistModel");
const { MarketIndexModel } = require("./model/MarketIndexModel");
const { watchlist: demoWatchlist, holdings: demoHoldings, positions: demoPositions } = require("./data/demoPortfolio");

const PORT = process.env.PORT || 3802;
const URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? null : "local-development-only-change-this-secret");
const SESSION_COOKIE = "zerodha_session";
const sessionCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
};

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5175,http://127.0.0.1:5176")
    .split(",")
    .map((origin) => origin.trim());

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin is not allowed by CORS."));
    },
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

const requireAuth = (req, res, next) => {
    if (!JWT_SECRET) return res.status(500).json({ message: "JWT_SECRET is not configured." });
    const token = req.cookies[SESSION_COOKIE];

    if (!token) return res.status(401).json({ message: "Authentication required." });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { _id: payload.sub, name: payload.name, email: payload.email };
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Your session has expired. Please sign in again." });
    }
};

const createSession = (res, user) => {
    const token = jwt.sign(
        { name: user.name, email: user.email },
        JWT_SECRET,
        { subject: user._id.toString(), expiresIn: "7d" },
    );
    res.cookie(SESSION_COOKIE, token, sessionCookieOptions);
};

const seedUserPortfolio = async (userId) => {
    const ownerId = new mongoose.Types.ObjectId(userId);
    const marketIndices = [
        { _id: "NIFTY 50", value: 100.2 },
        { _id: "SENSEX", value: 100.2 },
    ];
    const seedResults = await Promise.allSettled([
        FundsModel.updateOne(
            { _id: ownerId.toString() },
            { $setOnInsert: { availableCents: 374000 } },
            { upsert: true },
        ),
        WatchlistModel.bulkWrite(demoWatchlist.map((stock, sortOrder) => ({
            updateOne: {
                filter: { userId: ownerId, name: stock.name },
                update: { $setOnInsert: { ...stock, userId: ownerId, sortOrder } },
                upsert: true,
            },
        }))),
        HoldingModel.bulkWrite(demoHoldings.map((holding) => ({
            updateOne: {
                filter: { userId: ownerId, name: holding.name },
                update: { $setOnInsert: { ...holding, userId: ownerId } },
                upsert: true,
            },
        }))),
        PositionModel.bulkWrite(demoPositions.map((position) => ({
            updateOne: {
                filter: { userId: ownerId, product: position.product, name: position.name },
                update: { $setOnInsert: { ...position, userId: ownerId } },
                upsert: true,
            },
        }))),
        OrderModel.bulkWrite(demoHoldings.map(({ name, qty, avg }) => ({
            updateOne: {
                filter: { userId: ownerId, seedKey: `demo-buy-${name}` },
                update: {
                    $setOnInsert: {
                        userId: ownerId,
                        seedKey: `demo-buy-${name}`,
                        name,
                        qty,
                        price: avg,
                        mode: "BUY",
                    },
                },
                upsert: true,
            },
        }))),
        MarketIndexModel.bulkWrite(marketIndices.map((index) => ({
            updateOne: {
                filter: { _id: index._id },
                update: { $setOnInsert: index },
                upsert: true,
            },
        }))),
    ]);
    const failedSeed = seedResults.find((result) => result.status === "rejected");
    if (failedSeed) throw failedSeed.reason;
};

app.post("/auth/register", async (req, res) => {
    if (!JWT_SECRET) return res.status(500).json({ message: "JWT_SECRET is not configured." });
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (name.length < 2 || name.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
        return res.status(400).json({ message: "Enter a name, valid email, and password between 8 characters and 72 bytes." });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await UserModel.create({ name, email, passwordHash });
        try {
            await FundsModel.create({ _id: user._id.toString(), availableCents: 374000 });
            await seedUserPortfolio(user._id);
        } catch (error) {
            await Promise.all([
                WatchlistModel.deleteMany({ userId: user._id }),
                HoldingModel.deleteMany({ userId: user._id }),
                PositionModel.deleteMany({ userId: user._id }),
                OrderModel.deleteMany({ userId: user._id }),
                FundsModel.deleteOne({ _id: user._id.toString() }),
                UserModel.deleteOne({ _id: user._id }),
            ]);
            throw error;
        }
        return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists." });
        console.error("Registration failed:", error);
        return res.status(500).json({ message: "Unable to create your account." });
    }
});

app.post("/auth/login", async (req, res) => {
    if (!JWT_SECRET) return res.status(500).json({ message: "JWT_SECRET is not configured." });
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    try {
        const user = await UserModel.findOne({ email }).select("+passwordHash");
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        await UserModel.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });
        createSession(res, user);
        return res.json({ user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login failed:", error);
        return res.status(500).json({ message: "Unable to sign in." });
    }
});

app.get("/auth/me", requireAuth, async (req, res) => {
    return res.json({ user: req.user });
});

app.post("/auth/logout", (req, res) => {
    res.clearCookie(SESSION_COOKIE, { ...sessionCookieOptions, maxAge: undefined });
    return res.status(204).end();
});

app.get("/addAllData", requireAuth, async (req, res) => {
    try {
        await seedUserPortfolio(req.user._id);
        return res.json({ message: "Missing demo account data was added.", userId: req.user._id });
    } catch (error) {
        console.error("Account data seed failed:", error);
        return res.status(500).json({ message: "Unable to add account data." });
    }
});

const getOrCreateFunds = async (userId) => {
    try {
        return await FundsModel.findOneAndUpdate(
            { _id: userId.toString() },
            { $setOnInsert: { availableCents: 404310 } },
            { new: true, upsert: true },
        );
    } catch (error) {
        if (error.code === 11000) return FundsModel.findById(userId.toString());
        throw error;
    }
};


// app.get('/addHoldings', async(req,res)=>{
//     let tempHolding = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
//     ];

//     tempHolding.forEach((item)=>{
//         let newHolding = new HoldingModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });

//         newHolding.save();
//     });
//     res.send("Done!!");
// });

//  app.get('/addPositions', async(req,res)=>{
//     let tempPosition = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//     ];
//     tempPosition.forEach((item)=>{
//         let newPosition = new PositionModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });

//         newPosition.save();
//     });
//     res.send("Done!!");
// });


app.get('/allHoldings', requireAuth, async (req, res) => {
    const allHoldings = await HoldingModel.find({ userId: req.user._id });
    return res.json(allHoldings);
});
app.get('/allPositions', requireAuth, async (req, res) => {
    const allPositions = await PositionModel.find({ userId: req.user._id });
    return res.json(allPositions);
});

app.get("/watchlist", requireAuth, async (req, res) => {
    try {
        let stocks = await WatchlistModel.find({ userId: req.user._id }).sort({ sortOrder: 1 });
        if (stocks.length === 0) {
            await WatchlistModel.insertMany(demoWatchlist.map((stock, sortOrder) => ({
                ...stock,
                userId: req.user._id,
                sortOrder,
            })));
            stocks = await WatchlistModel.find({ userId: req.user._id }).sort({ sortOrder: 1 });
        }
        return res.json(stocks);
    } catch (error) {
        console.error("Watchlist fetch failed:", error);
        return res.status(500).json({ message: "Unable to load your watchlist." });
    }
});

app.get("/market/indices", requireAuth, async (req, res) => {
    try {
        const defaults = [
            { _id: "NIFTY 50", value: 100.2 },
            { _id: "SENSEX", value: 100.2 },
        ];
        await MarketIndexModel.bulkWrite(defaults.map((index) => ({
            updateOne: {
                filter: { _id: index._id },
                update: { $setOnInsert: index },
                upsert: true,
            },
        })));
        const indices = await MarketIndexModel.find({ _id: { $in: defaults.map((index) => index._id) } });
        return res.json(indices);
    } catch (error) {
        console.error("Market indices fetch failed:", error);
        return res.status(500).json({ message: "Unable to load market indices." });
    }
});

app.get("/portfolio/summary", requireAuth, async (req, res) => {
    try {
        const [funds, holdings] = await Promise.all([
            getOrCreateFunds(req.user._id),
            HoldingModel.find({ userId: req.user._id }),
        ]);
        const investedValue = holdings.reduce((total, holding) => total + holding.avg * holding.qty, 0);
        const currentValue = holdings.reduce((total, holding) => total + holding.price * holding.qty, 0);
        const profitLoss = currentValue - investedValue;

        return res.json({
            userName: req.user.name,
            availableCash: funds.availableCents / 100,
            holdingsCount: holdings.length,
            investedValue,
            currentValue,
            profitLoss,
            profitPercent: investedValue > 0 ? (profitLoss / investedValue) * 100 : 0,
        });
    } catch (error) {
        console.error("Portfolio summary fetch failed:", error);
        return res.status(500).json({ message: "Unable to load your portfolio summary." });
    }
});

app.get("/funds", requireAuth, async (req, res) => {
    try {
        const funds = await getOrCreateFunds(req.user._id);
        return res.json({ availableCash: funds.availableCents / 100 });
    } catch (error) {
        console.error("Funds fetch failed:", error);
        return res.status(500).json({ message: "Unable to load funds." });
    }
});

app.post("/funds/add", requireAuth, async (req, res) => {
    const rawAmount = Number(req.body.amount);
    const amountCents = Math.round(rawAmount * 100);

    if (!Number.isFinite(rawAmount) || amountCents <= 0) {
        return res.status(400).json({ message: "Enter an amount greater than zero." });
    }

    try {
        await getOrCreateFunds(req.user._id);
        const funds = await FundsModel.findOneAndUpdate(
            { _id: req.user._id.toString() },
            { $inc: { availableCents: amountCents } },
            { new: true },
        );
        return res.json({ availableCash: funds.availableCents / 100 });
    } catch (error) {
        console.error("Funds add failed:", error);
        return res.status(500).json({ message: "Unable to add demo funds." });
    }
});

app.post("/funds/withdraw", requireAuth, async (req, res) => {
    const rawAmount = Number(req.body.amount);
    const amountCents = Math.round(rawAmount * 100);

    if (!Number.isFinite(rawAmount) || amountCents <= 0) {
        return res.status(400).json({ message: "Enter an amount greater than zero." });
    }

    try {
        await getOrCreateFunds(req.user._id);
        const funds = await FundsModel.findOneAndUpdate(
            { _id: req.user._id.toString(), availableCents: { $gte: amountCents } },
            { $inc: { availableCents: -amountCents } },
            { new: true },
        );

        if (!funds) {
            return res.status(400).json({ message: "Withdrawal exceeds your available demo funds." });
        }

        return res.json({ availableCash: funds.availableCents / 100 });
    } catch (error) {
        console.error("Funds withdraw failed:", error);
        return res.status(500).json({ message: "Unable to withdraw demo funds." });
    }
});

app.get('/allOrders', requireAuth, async (req, res) => {
    try {
        const allOrders = await OrderModel.find({ userId: req.user._id }).sort({ _id: -1 });
        return res.json(allOrders);
    } catch (error) {
        console.error("Orders fetch failed:", error);
        return res.status(500).json({ message: "Unable to load orders." });
    }
});

app.get("/sellEligibility/:name", requireAuth, async (req, res) => {
    const name = req.params.name.trim();

    try {
        const buyOrder = await OrderModel.exists({ userId: req.user._id, name, mode: "BUY", qty: { $gt: 0 } });

        if (!buyOrder) {
            return res.json({
                canSell: false,
                message: `You have not bought ${name}, so it cannot be sold.`,
            });
        }

        const holding = await HoldingModel.findOne({ userId: req.user._id, name, qty: { $gt: 0 } });

        if (!holding) {
            return res.json({ canSell: false, message: `You have no ${name} shares available to sell.` });
        }

        return res.json({ canSell: true, holding });
    } catch (error) {
        console.error("Sell eligibility check failed:", error);
        return res.status(500).json({ message: "Unable to verify this stock for sale." });
    }
});

app.post("/newOrder", requireAuth, async (req, res) => {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);

    if (req.body.mode !== "BUY" || !name || !Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({ message: "Enter a valid stock, quantity, and price." });
    }

    try {
        const existingHolding = await HoldingModel.findOne({ userId: req.user._id, name });
        let holding;

        if (existingHolding) {
            const nextQty = existingHolding.qty + qty;
            const nextAvg = ((existingHolding.avg * existingHolding.qty) + (price * qty)) / nextQty;
            const updateResult = await HoldingModel.updateOne(
                { _id: existingHolding._id, userId: req.user._id, qty: existingHolding.qty },
                { $set: { qty: nextQty, avg: nextAvg, price } },
            );

            if (updateResult.modifiedCount !== 1) {
                return res.status(409).json({ message: "Holding changed. Please retry the buy order." });
            }

            holding = { ...existingHolding.toObject(), qty: nextQty, avg: nextAvg, price };
        } else {
            holding = await HoldingModel.create({
                userId: req.user._id,
                name,
                qty,
                avg: price,
                price,
                net: "+0.00%",
                day: "+0.00%",
            });
        }

        try {
            const order = await OrderModel.create({ userId: req.user._id, name, qty, price, mode: "BUY" });
            return res.status(201).json({ message: "Buy order completed.", order, holding });
        } catch (error) {
            if (existingHolding) {
                await HoldingModel.updateOne(
                    { _id: existingHolding._id, userId: req.user._id, qty: existingHolding.qty + qty },
                    { $set: { qty: existingHolding.qty, avg: existingHolding.avg, price: existingHolding.price } },
                );
            } else {
                await HoldingModel.deleteOne({ _id: holding._id });
            }
            throw error;
        }
    } catch (error) {
        console.error("Buy order failed:", error);
        return res.status(500).json({ message: "Unable to complete the buy order." });
    }
});

app.post("/sellOrder", requireAuth, async (req, res) => {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);

    if (!name || !Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({ message: "Enter a valid stock, quantity, and price." });
    }

    try {
        const buyOrder = await OrderModel.exists({ userId: req.user._id, name, mode: "BUY", qty: { $gt: 0 } });

        if (!buyOrder) {
            return res.status(400).json({ message: `You have not bought ${name}, so it cannot be sold.` });
        }

        const holding = await HoldingModel.findOne({ userId: req.user._id, name, qty: { $gt: 0 } });

        if (!holding) {
            return res.status(400).json({ message: "You have not bought or do not currently hold this stock." });
        }

        if (qty > holding.qty) {
            return res.status(400).json({ message: "Sell quantity exceeds your available shares." });
        }

        const order = await OrderModel.create({ userId: req.user._id, name, qty, price, mode: "SELL" });
        try {
            if (qty === holding.qty) {
                const deleteResult = await HoldingModel.deleteOne({ _id: holding._id, userId: req.user._id, qty: holding.qty });

                if (deleteResult.deletedCount !== 1) {
                    await OrderModel.deleteOne({ _id: order._id });
                    return res.status(409).json({ message: "Holding changed. Refresh and try again." });
                }
            } else {
                const updateResult = await HoldingModel.updateOne(
                    { _id: holding._id, userId: req.user._id, qty: holding.qty },
                    { $inc: { qty: -qty } },
                );

                if (updateResult.modifiedCount !== 1) {
                    await OrderModel.deleteOne({ _id: order._id });
                    return res.status(409).json({ message: "Holding changed. Refresh and try again." });
                }
            }

            return res.status(201).json({ message: "Sell order completed.", order });
        } catch (error) {
            await OrderModel.deleteOne({ _id: order._id });
            throw error;
        }
    } catch (error) {
        console.error("Sell order failed:", error);
        return res.status(500).json({ message: "Unable to complete the sell order." });
    }
});


const startServer = async () => {
    if (!URL) {
        console.error("MONGO_URL is not configured.");
        process.exit(1);
    }

    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => console.log(`API listening on port ${PORT}.`));
    } catch (error) {
        console.error("MongoDB connection failed.");
        process.exit(1);
    }
};

startServer();



