const express = require("express");
const router = express.Router();
const knex = require("../db/db"); // your knex instance
// Assuming session middleware is applied in main app

// ----------------------
// USER LOGIN
// ----------------------
router.put("/login", async (req, res) => {
    const { uniqueId } = req.body;

    if (!uniqueId) {
        return res.status(400).json({ message: "ID is required" });
    }

    try {
        // Query the users table
        const user = await knex("users").where({ unique_id: uniqueId }).first();

        if (!user) {
            return res.status(401).json({ message: "Invalid ID" });
        }

        // Save session
        req.session.userId = user.unique_id;
        req.session.userType = user.role; // role column: 'student' | 'admin' etc.
        req.session.name = user.name;

        res.json({
            message: "Login successful",
            user: { name: user.name, type: user.role },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
