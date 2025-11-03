const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const knex = require("../db/db") // adjust path to your knex config

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // make sure this folder exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

// PUT endpoint to register user
router.put("/register/user", upload.single("avatar"), async (req, res) => {
    try {
        const { full_name, email_address, academic_grade, phone_number, role } = req.body;
        const avatar = req.file ? req.file.filename : null;

        // Insert into database
        const [user] = await knex("users").insert({
            full_name,
            email_address,
            academic_grade,
            phone_number,
            role,
            avatar
        }).returning("*"); // .returning("*")

        res.status(201).json({
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
});

module.exports = router;
