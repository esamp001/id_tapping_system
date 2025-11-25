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
      .where({ user_id: user.id })
      .first();

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
        row.time_in_morning ? "Morning IN" : "Didn't time in - Morning IN",
      ],
      1: [
        formatTimeReadable(row.time_out_lunch),
        row.log_date,
        row.time_out_lunch ? "Morning OUT" : "Didn't time in - Morning OUT",
      ],
      2: [
        formatTimeReadable(row.time_in_afternoon),
        row.log_date,
        row.time_in_afternoon
          ? "Afternoon IN"
          : "Didn't time in - Afternoon IN",
      ],
      3: [
        formatTimeReadable(row.time_out_evening),
        row.log_date,
        row.time_out_evening
          ? "Afternoon OUT"
          : "Didn't time in - Afternoon OUT",
      ],
    };

    res.json({ data: sanitizedResult });
  } catch (error) {
    console.error("Error fetching attendance logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/history", async (req, res) => {
  const { userId, date } = req.query;

  const formatTimeReadable = (time) => {
    if (!time) return "N/A";
    const [hourStr, minuteStr] = time.split(":");
    let hours = parseInt(hourStr, 10);
    const minutes = minuteStr;
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${ampm}`;
  };

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    let query = knex("attendance_logs")
      .select(
        "log_date",
        "time_in_morning",
        "time_out_lunch",
        "time_in_afternoon",
        "time_out_evening"
      )
      .where("user_id", userId)
      .orderBy("log_date", "desc");

    if (date) {
      query = query.andWhere("log_date", date);
    }

    const rows = await query;

    // Return raw DB values; frontend will handle formatting and duration
    const history = rows.map((row) => ({
      log_date: row.log_date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Convert to readable
      time_in_morning: formatTimeReadable(row.time_in_morning),
      time_out_lunch: formatTimeReadable(row.time_out_lunch),
      time_in_afternoon: formatTimeReadable(row.time_in_afternoon),
      time_out_evening: formatTimeReadable(row.time_out_evening),
    }));

    console.log(history, "history");

    res.json({ data: history });
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generate secure QR code for login
router.post("/generate-login-qr", async (req, res) => {
  try {
    const admin = req.session.admin;
    if (!admin) {
      return res.status(401).json({ message: "Admin access required" });
    }

    // Generate a secure token with timestamp and admin info
    const token = require("crypto").randomBytes(32).toString("hex");
    const timestamp = Date.now();
    const qrData = JSON.stringify({
      type: "login",
      token: token,
      adminId: admin.unique_id,
      timestamp: timestamp,
      expires: timestamp + 300000, // 5 minutes expiry
    });

    // Store in qr_codes table
    await knex("qr_codes").insert({
      qr_value: qrData,
      generated_at: new Date(),
    });

    res.json({
      qrData: qrData,
      message: "Login QR code generated successfully",
    });
  } catch (error) {
    console.error("Error generating login QR code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Validate QR code for login
router.post("/validate-qr-login", async (req, res) => {
  try {
    const { qrData } = req.body;
    if (!qrData) {
      return res.status(400).json({ message: "QR data is required" });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch (err) {
      return res.status(400).json({ message: "Invalid QR code format" });
    }

    // Check if it's a login QR code
    if (parsedData.type !== "login") {
      return res.status(400).json({ message: "Not a login QR code" });
    }

    // Check expiry
    if (Date.now() > parsedData.expires) {
      return res.status(400).json({ message: "QR code expired" });
    }

    // Verify QR code exists in database
    const qrRecord = await knex("qr_codes").where({ qr_value: qrData }).first();

    if (!qrRecord) {
      return res.status(400).json({ message: "Invalid QR code" });
    }

    res.json({
      valid: true,
      adminId: parsedData.adminId,
      message: "QR code validated successfully",
    });
  } catch (error) {
    console.error("Error validating QR code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/qr-code", async (req, res) => {
  try {
    const { qrCode } = req.body;
    if (!qrCode) {
      return res.status(400).json({ message: "QR code is required" });
    }
    // Insert to table

    const insertQrCode = await knex("qr_codes").insert({ qr_value: qrCode });

    res.json({ message: "QR code updated successfully" });
  } catch (error) {
    console.error("Error updating QR code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
