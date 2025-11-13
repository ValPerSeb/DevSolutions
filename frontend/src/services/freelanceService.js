import apiClient from "./apiClient.js";

/**
 * Get freelance profile by ID
 * @param {number} freelanceId - The freelance ID
 * @returns {Promise<Object>} - Response with freelance profile data
 */
async function getFreelanceProfile(freelanceId) {
    const response = await apiClient.get(`/api/v1/freelancers/${freelanceId}`);
    return response.data.data;
}

/**
 * Update freelance profile
 * @param {number} freelanceId - The freelance ID
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} - Response with updated freelance profile
 */
async function updateFreelanceProfile(freelanceId, profileData) {
    const response = await apiClient.put(`/api/v1/freelancers/${freelanceId}`, profileData);
    return response.data.data;
}

export { getFreelanceProfile, updateFreelanceProfile };
