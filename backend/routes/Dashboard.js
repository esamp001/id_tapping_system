const express = require("express");
const router = express.Router();
const knex = require("../db/db"); // your knex instance

// ----------------------
// USER DASHBOARD
// ----------------------
router.get("/dashboard", async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const today = new Date().toISOString().split("T")[0];

    // Fetch user info
    const userInfo = await knex("users")
      .select("id", "full_name", "avatar", "role")
      .where({ id: user.id })
      .first();

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch today's attendance logs
    const attendance = await knex("attendance_logs")
      .where({ user_id: user.id, log_date: today })
      .first();

    let remarks = [];

    if (attendance) {
      if (attendance.time_in_morning) remarks.push("Time in for morning");

      if (attendance.time_out_lunch) remarks.push("Time out for morning");

      if (attendance.time_in_afternoon) remarks.push("Time in for afternoon");

      if (attendance.time_out_evening) remarks.push("Time out for afternoon");
    }

    const sanitizedUserInfo = {
      id: userInfo.id,
      full_name: userInfo.full_name,
      current_date: new Date().toLocaleDateString("en-US", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "long",
        year: "numeric",
      }), //Readable - 10:30 AM, Tuesday, 12/12/2025
      avatar: userInfo.avatar,
      role: userInfo.role,
      remarks: remarks.length ? remarks : ["No logs yet"],
    };

    res.json({
      message: "Dashboard loaded",
      user: sanitizedUserInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
