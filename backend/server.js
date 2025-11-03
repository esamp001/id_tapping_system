// server.js
require('dotenv').config();
const express = require('express');
const cors = require("cors");
console.log(cors, "cors")
// const db = require('./db/db'); // import your knex instance

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

// Routes
const registerRoutes = require("./routes/RegisterRoutes")

app.use("/RegisterRoutes", registerRoutes);

// Run server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
