// server.js
require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
