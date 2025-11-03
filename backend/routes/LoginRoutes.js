const express = require("express");
const router = express.Router();
const knex = require("../db/db"); // your knex instance
// Assuming session middleware is applied in main app

// ----------------------
// USER LOGIN
// ----------------------
router.put("/login", async (req, res) => {
    const { uniqueId } = req.body;
    console.log(uniqueId, "uniqueId")

    if (!uniqueId) {
        return res.status(400).json({ message: "ID is required" });
    }

    try {
        // Query the users table
        const user = await knex("users").where({ unqiue_id: uniqueId }).first();

        if (!user) {
            return res.status(401).json({ message: "Invalid ID" });
        }

        const now = new Date();

        // Create session as a single object
        req.session.user = {
            id: user.id,
            unqiue_id: user.unqiue_id,      // or 'unique_id' if DB is fixed
            name: user.name,
            role: user.role,
            last_login: now,
        };

        res.json({
            message: "Login successful",
            user: { name: user.name, type: user.role },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ----------------------
// USER CONTEXT
// ----------------------
router.get("/current-user", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: "Not logged in" });
    }
});




module.exports = router;
