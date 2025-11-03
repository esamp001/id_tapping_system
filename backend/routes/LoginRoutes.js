const express = require("express");
const router = express.Router();
const knex = require("../db/knex"); // your knex instance
// Assuming session middleware is applied in main app

// ----------------------
// STUDENT LOGIN
// ----------------------
router.put("/students", async (req, res) => {
    const { uniqueId } = req.body;

    if (!uniqueId) {
        return res.status(400).json({ message: "Student ID is required" });
    }

    try {
        const student = await knex("users").where({ studentId: uniqueId }).first();

        if (!student) {
            return res.status(401).json({ message: "Invalid Student ID" });
        }

        // Save student info in session
        req.session.userId = student.studentId;
        req.session.userType = "student";
        req.session.name = student.name;

        res.json({ message: "Login successful", user: { name: student.name, type: "student" } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ----------------------
// ADMIN LOGIN
// ----------------------
// router.put("/admins", async (req, res) => {
//     const { uniqueId } = req.body;

//     if (!uniqueId) {
//         return res.status(400).json({ message: "Admin ID is required" });
//     }

//     try {
//         const admin = await knex("admins").where({ adminId: uniqueId }).first();

//         if (!admin) {
//             return res.status(401).json({ message: "Invalid Admin ID" });
//         }

//         // Save admin info in session
//         req.session.userId = admin.adminId;
//         req.session.userType = "admin";
//         req.session.name = admin.name;

//         res.json({ message: "Login successful", user: { name: admin.name, type: "admin" } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

module.exports = router;
