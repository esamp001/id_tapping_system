// server.js
require('dotenv').config();
const express = require('express');
const db = require('./db/db'); // import your knex instance

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/test-db', async (req, res) => {
    try {
        const result = await db.raw('SELECT 1+1 AS result');
        console.log(' Database connected successfully!');
        res.json({ message: 'Database connected!', result: result.rows });
    } catch (error) {
        console.error(' Database connection failed:', error.message);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Run server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
