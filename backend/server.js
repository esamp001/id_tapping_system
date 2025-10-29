// server.js
require('dotenv').config();
const express = require('express');
const db = require('./db/db'); // import your knex instance

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Run server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
