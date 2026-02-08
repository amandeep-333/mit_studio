import Dashboard from "@/components/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/features/auth/components/Login";
import MainFile from "../features/design-customizer/MainFile.jsx";
import Signup from "@/features/auth/components/Signup";
import VerifyOTP from "@/features/auth/components/VerifyOTP";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainFile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
