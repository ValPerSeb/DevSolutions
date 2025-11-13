import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null, // 'client' or 'freelance'
    profile: null, // clientId or freelanceId
    token: null,
    loading: true,
  });

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("user");
      const role = localStorage.getItem("role");
      const profile = localStorage.getItem("profile");

      if (token && user) {
        setAuthState({
          isAuthenticated: true,
          user: JSON.parse(user),
          role: role ? JSON.parse(role) : null,
          profile: profile ? JSON.parse(profile) : null,
          token,
          loading: false,
        });
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  /**
   * Register user
   */
  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  /**
   * Login user
   */
  const login = async (credential, password) => {
    try {
      const result = await authService.login(credential, password);
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("role", JSON.stringify(result.role));
        localStorage.setItem("profile", JSON.stringify(result.profile));

        setAuthState({
            isAuthenticated: true,
            user: result.user,
            role: result.role,
            profile: result.profile,
            token: result.token,
            loading: false,
        });
      }
      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("profile");
    setAuthState({
        isAuthenticated: false,
        user: null,
        role: null,
        profile: null,
        token: null,
        loading: false,
    });
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (requiredRole) => {
    if (!authState.isAuthenticated) return false;
    return authState.role === requiredRole;
  };

  /**
   * Get auth methods and state
   */
  const value = {
    // State
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    role: authState.role,
    profile: authState.profile,
    token: authState.token,
    loading: authState.loading,

    // Methods
    register,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use AuthContext
 * @returns {Object} - Auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
