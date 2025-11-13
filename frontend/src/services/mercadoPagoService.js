import apiClient from "./apiClient.js";

/**
 * Create mercado pago preference
 * @param {Object} preferenceData - Preference data
 * @returns {Promise<Object>} - Created preference data
 */
async function createPreference(preferenceData) {
    const response = await apiClient.post("/create-preference", preferenceData);
    return response.data;
}


export { createPreference };