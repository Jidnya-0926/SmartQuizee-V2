import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Components */
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

/* User pages */
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Dashboard from "./pages/user/Dashboard";
import QuizPage from "./pages/user/QuizPage";
import Result from "./pages/user/Result";
import Profile from "./pages/user/Profile";
import ReviewAnswers from "./pages/user/ReviewAnswers";
import Leaderboard from "./pages/user/Leaderboard";

/* Admin pages */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageQuizzes from "./pages/admin/ManageQuizzes";
import ManageQuestions from "./pages/admin/ManageQuestions";
import ManageCategories from "./pages/admin/ManageCategories";
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import UserAnalysis from "./pages/admin/UserAnalysis";
import Settings from "./pages/admin/Settings";
import AdminLayout from "./pages/admin/AdminLayout"; // <-- Added

/* Helpers */
import { getStoredTheme } from "./utils/helpers";
import { ensureSeedData } from "./utils/data";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [theme, setTheme] = useState(getStoredTheme() || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    ensureSeedData();
  }, [theme]);

  const handleLogin = (userObj, roleVal = "user") => {
    setUser(userObj);
    setRole(roleVal);
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("role", roleVal);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <BrowserRouter>
      <Navbar user={user} role={role} onLogout={handleLogout} theme={theme} setTheme={setTheme} />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* User protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role={role} allowedRole="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute role={role} allowedRole="user">
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result/:attemptId"
            element={
              <ProtectedRoute role={role} allowedRole="user">
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role={role} allowedRole="user">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review/:attemptId"
            element={
              <ProtectedRoute role={role} allowedRole="user">
                <ReviewAnswers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute role={role} allowedRole="user">
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          {/* Admin login (no layout) */}
          <Route path="/admin/login" element={<AdminLogin onAdminLogin={(a) => handleLogin(a, "admin")} />} />

          {/* Admin routes with AdminLayout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role={role} allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-quizzes" element={<ManageQuizzes />} />
            <Route path="manage-questions" element={<ManageQuestions />} />
            <Route path="manage-categories" element={<ManageCategories />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="user-analysis" element={<UserAnalysis />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: 50 }}>
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
