import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import AttendanceHistory from "./pages/AttendanceHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendance/history" element={<AttendanceHistory />} />
    </Routes>
  );
}

export default App;
