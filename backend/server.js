// server.js
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./db/db")

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5000", // frontend URL
        credentials: true, // allow cookies to be sent
    })
);
app.use(express.json());

// Setup session store with Knex
const store = new KnexSessionStore({
    knex,
    tablename: "sessions", // name for your session table
    createtable: true, // auto create if not exists
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 60, // clear expired sessions hourly
});

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "super-secret-key", // use .env in production
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
            httpOnly: true, // can't access via JS
            secure: false, // true if using HTTPS
            maxAge: 1000 * 60 * 60 * 2, // 2 hours
        },
    })
);

// Routes
const registerRoutes = require("./routes/RegisterRoutes")
const loginRoutes = require("./routes/LoginRoutes")

app.use("/RegisterRoutes", registerRoutes);
app.use("/LoginRoutes", loginRoutes);

// Run server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
