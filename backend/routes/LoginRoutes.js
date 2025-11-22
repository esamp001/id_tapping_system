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
    const user = await knex("users").where({ unqiue_id: uniqueId }).first();
    if (!user) return res.status(401).json({ message: "Invalid ID" });

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];
    const hour = now.getHours();

    req.session.user = {
      id: user.id,
      unique_id: user.unqiue_id,
      full_name: user.full_name,
      role: user.role,
      last_login: now,
    };

    let log = await knex("attendance_logs")
      .where({ user_id: user.id, log_date: today })
      .first();

    // Create new record if none exists
    if (!log) {
      const insertData = { user_id: user.id, log_date: today };

      if (hour < 11) insertData.time_in_morning = currentTime;
      else if (hour < 13) insertData.time_out_lunch = currentTime;
      else if (hour < 15) insertData.time_in_afternoon = currentTime;
      else insertData.time_out_evening = currentTime;

      await knex("attendance_logs").insert(insertData);
    } else {
      // Time-based strict update — NO sequential fallback
      if (hour < 11 && !log.time_in_morning) {
        await knex("attendance_logs").where({ id: log.id }).update({
          time_in_morning: currentTime,
        });
      } else if (hour < 13 && !log.time_out_lunch) {
        await knex("attendance_logs").where({ id: log.id }).update({
          time_out_lunch: currentTime,
        });
      } else if (hour < 15 && !log.time_in_afternoon) {
        await knex("attendance_logs").where({ id: log.id }).update({
          time_in_afternoon: currentTime,
        });
      } else if (hour >= 15 && !log.time_out_evening) {
        await knex("attendance_logs").where({ id: log.id }).update({
          time_out_evening: currentTime,
        });
      } else {
        console.log("This time slot is already filled — do nothing.");
      }
    }

    res.json({
      message: "Login successful",
      user: { full_name: user.full_name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// ADMIN LOGIN
// ----------------------
router.put("/adminLogin", async (req, res) => {
  const { adminId } = req.body;

  if (!adminId) {
    return res.status(400).json({ message: "Admin ID is required" });
  }

  try {
    const admin = await knex("users")
      .where({ unqiue_id: adminId, role: "admin" })
      .first();
    if (!admin) return res.status(401).json({ message: "Invalid Admin ID" });

    req.session.admin = {
      id: admin.id,
      unique_id: admin.unqiue_id,
      full_name: admin.full_name,
      role: admin.role,
      last_login: new Date(),
    };

    res.json({
      message: "Admin login successful",
      admin: { full_name: admin.full_name, role: admin.role },
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
