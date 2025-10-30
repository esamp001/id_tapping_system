// server.js
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const db = require('./db/db'); // import your knex instance

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", // frontend URL
        credentials: true, // allow cookies to be sent
    })
);
app.use(express.json());


const PORT = process.env.PORT || 5000;

app.use(express.json());

// Run server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
