require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./model/user.js");
const apiListingsRouter = require("./routes/listings.js");
const apiReviewsRouter = require("./routes/reviews.js");
const apiAuthRouter = require("./routes/auth.js");


const PORT = 8080;
const DB_URL = "mongodb://localhost:27017/LocalHost";
// const DB_URL = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");      
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(DB_URL);
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
    cors({
        origin: FRONTEND_ORIGIN,
        credentials: true,
    })
);

const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in mongo session store", err);
});

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

app.get("/", (req, res) => {
    res.send("Hii, I am root");
});


app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use("/api/listings", apiListingsRouter);
app.use("/api/listings/:id/reviews", apiReviewsRouter);
app.use("/api/auth", apiAuthRouter);


app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

// error handling
app.use((err, req, res, next) => {
    let {statusCode, message} = err;
    console.log(err);
    if (req.originalUrl.startsWith("/api/")) {
        return res.status(statusCode || 500).json({ error: message || "Something went wrong" });
    }
    res.status(statusCode || 500).json({ error: message || "Something went wrong" });
});


app.listen(PORT, () => {
    console.log("Server is listining on port 8080"); 
});

