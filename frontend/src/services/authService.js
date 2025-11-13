import apiClient from "./apiClient.js";

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Response with user data
 */
async function register(userData) {
    const response = await apiClient.post("/api/v1/auth/register", userData);
    return response.data.data;
}

/**
 * Login user
 * @param {string} credential - Username or email
 * @param {string} password - Password
 * @returns {Promise<Object>} - Response with token, user, role, and profile data
 */
async function login(credential, password) {
    const response = await apiClient.post("/api/v1/auth/login", {
        credential,
        password
    });
    return response.data.data;
}

export { register, login};
