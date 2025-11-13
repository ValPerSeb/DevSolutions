import apiClient from "./apiClient.js";

/**
 * Get all offers
 * @returns {Promise<Array>} - Array of all offers
 */
async function getAllOffers() {
    const response = await apiClient.get("/api/v1/offer/");
    return response.data.data;
}

/**
 * Get offer by ID
 * @param {number} offerId - The offer ID
 * @returns {Promise<Object>} - Offer data
 */
async function getOfferById(offerId) {
    const response = await apiClient.get(`/api/v1/offer/${offerId}`);
    return response.data.data;
}

/**
 * Create a new offer
 * @param {Object} offerData - Offer data (title, description, skills, duration, hourlyRate, vacancies, ownerType, ownerId, status)
 * @returns {Promise<Object>} - Created offer data
 */
async function createOffer(offerData) {
    const response = await apiClient.post("/api/v1/offer/", offerData);
    return response.data.data;
}

export { getAllOffers, getOfferById, createOffer };

