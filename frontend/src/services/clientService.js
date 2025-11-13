import apiClient from "./apiClient.js";

/**
 * Get client profile by ID
 * @param {number} clientId - The client ID
 * @returns {Promise<Object>} - Response with client profile data
 */
async function getClientProfile(clientId) {
    const response = await apiClient.get(`/api/v1/clients/${clientId}`);
    return response.data.data;
}

/**
 * Update client profile
 * @param {number} clientId - The client ID
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} - Response with updated client profile
 */
async function updateClientProfile(clientId, profileData) {
    const response = await apiClient.put(`/api/v1/clients/${clientId}`, profileData);
    return response.data.data;
}

export { getClientProfile, updateClientProfile };
