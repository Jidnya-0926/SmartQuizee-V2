import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, allowedRole, children }) {
  if (!role) return <Navigate to="/login" replace />;
  if (role !== allowedRole) {
    // if admin tries to access user page or vice versa, redirect to appropriate home
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }
  return children;
}
