import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protected Route Component
 * Redirects unauthenticated users to login page
 * Optionally restricts access to specific roles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component to render if authorized
 * @param {string|string[]} props.requiredRole - Optional: 'client', 'freelance', or array of roles
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  if (requiredRole) {
    const rolesArray = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    if (!rolesArray.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

