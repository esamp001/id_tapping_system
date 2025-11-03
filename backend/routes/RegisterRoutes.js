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

// ----------------------
// USER REGISTER
// ----------------------
router.put("/register/user", upload.single("avatar"), async (req, res) => {
    try {
        const { unqiue_id, full_name, email_address, academic_grade, phone_number, role } = req.body;
        const avatar = req.file ? req.file.filename : null;

        // Collect all validation errors
        const errors = {};

        if (!unqiue_id || !unqiue_id.trim()) {
            errors.unqiue_id = "Unique ID is required";
        }

        if (!full_name || !full_name.trim()) {
            errors.full_name = "Full Name is required";
        }

        if (!email_address || !email_address.trim()) {
            errors.email_address = "Email Address is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email_address)) {
                errors.email_address = "Invalid Email Address";
            }
        }

        if (!academic_grade || !academic_grade.trim()) {
            errors.academic_grade = "Academic Grade is required";
        }

        if (!phone_number || !phone_number.trim()) {
            errors.phone_number = "Phone Number is required";
        } else {
            const phoneRegex = /^\+?\d{10,15}$/;
            if (!phoneRegex.test(phone_number)) {
                errors.phone_number = "Invalid Phone Number";
            }
        }

        if (!role || !role.trim()) {
            errors.role = "Role is required";
        }

        if (!avatar) {
            errors.avatar = "Avatar is required";
        }

        // If there are validation errors, return them all
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }

        // Optional: check if unique_id already exists
        const existingUser = await knex("users").where({ unqiue_id }).first();
        if (existingUser) {
            return res.status(400).json({ message: "Unique ID already exists", errors: { unqiue_id: "This ID is already taken" } });
        }

        // Insert into database
        const [user] = await knex("users")
            .insert({
                unqiue_id,
                full_name,
                email_address,
                academic_grade,
                phone_number,
                role,
                avatar,
            })
            .returning("*"); // PostgreSQL only

        res.status(201).json({
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
});




module.exports = router;
