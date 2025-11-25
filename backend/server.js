// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./db/db");

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000", // For local development
    ],
    credentials: true,
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
const registerRoutes = require("./routes/RegisterRoutes");
const loginRoutes = require("./routes/LoginRoutes");
const dashboardRoutes = require("./routes/Dashboard");

app.use("/RegisterRoutes", registerRoutes);
app.use("/LoginRoutes", loginRoutes);
app.use("/Dashboard", dashboardRoutes);
app.use("/uploads", express.static("uploads"));

// Run server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// // Remove the app.listen line and replace with:
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

module.exports = app;
