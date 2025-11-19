const express = require("express");
const router = express.Router();
const knex = require("../db/db"); // your knex instance

// ----------------------
// USER DASHBOARD
// ----------------------
router.get("/dashboard", async (req, res) => {
  try {
    const user = req.session.user;
    console.log(user, "user");

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
      .where({ user_id: user.id })
      .first();

    console.log(attendance, "attendance");
    let remarks = [];

    if (attendance) {
      if (attendance.time_in_morning) remarks.push("Time in for morning");

      if (attendance.time_out_lunch) remarks.push("Time out for morning");

      if (attendance.time_in_afternoon) remarks.push("Time in for afternoon");

      if (attendance.time_out_evening) remarks.push("Time out for afternoon");
    }

    // Only get the latest push
    remarks = remarks.slice(-1);

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
      avatar: userInfo.avatar
        ? `${req.protocol}://${req.get("host")}/uploads/${userInfo.avatar}`
        : null, // fallback if no avatar
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

router.get("/activity", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const activityResult = await knex("attendance_logs")
      .select(
        "log_date",
        "time_in_morning",
        "time_out_lunch",
        "time_in_afternoon",
        "time_out_evening"
      )
      .where("user_id", userId)
      .orderBy("log_date", "desc");

    const row = activityResult[0];

    const formatTimeReadable = (time) => {
      if (!time) return "N/A";
      const [hourStr, minuteStr] = time.split(":");
      let hours = parseInt(hourStr, 10);
      const minutes = minuteStr;
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes}${ampm}`;
    };

    const sanitizedResult = {
      0: [
        formatTimeReadable(row.time_in_morning),
        row.log_date,
        row.time_in_morning ? "IN" : "Didn't time in - Morning IN",
      ],
      1: [
        formatTimeReadable(row.time_out_lunch),
        row.log_date,
        row.time_out_lunch ? "OUT" : "Didn't time in - Morning OUT",
      ],
      2: [
        formatTimeReadable(row.time_in_afternoon),
        row.log_date,
        row.time_in_afternoon ? "IN" : "Didn't time in - Afternoon IN",
      ],
      3: [
        formatTimeReadable(row.time_out_evening),
        row.log_date,
        row.time_out_evening ? "OUT" : "Didn't time in - Afternoon OUT",
      ],
    };

    res.json({ data: sanitizedResult });
  } catch (error) {
    console.error("Error fetching attendance logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
