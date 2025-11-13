import apiClient from "./apiClient.js";

/**
 * Get all proposals
 * @returns {Promise<Array>} - Array of all proposals
 */
async function getAllProposals() {
    const response = await apiClient.get("/api/v1/proposal/");
    return response.data.data;
}

/**
 * Get proposal by ID
 * @param {number} proposalId - The proposal ID
 * @returns {Promise<Object>} - Proposal data
 */
async function getProposalById(proposalId) {
    const response = await apiClient.get(`/api/v1/proposal/${proposalId}`);
    return response.data.data;
}

/**
 * Create a new proposal
 * @param {Object} proposalData - Proposal data (offerId, freelanceId, hourlyRate, status, etc.)
 * @returns {Promise<Object>} - Created proposal data
 */
async function createProposal(proposalData) {
    const response = await apiClient.post("/api/v1/proposal/", proposalData);
    return response.data.data;
}

/**
 * Update proposal
 * @param {number} proposalId - The proposal ID
 * @param {Object} proposalData - Updated proposal data
 * @returns {Promise<Object>} - Updated proposal data
 */
async function updateProposal(proposalId, proposalData) {
    const response = await apiClient.put(`/api/v1/proposal/${proposalId}`, proposalData);
    return response.data.data;
}

export { getAllProposals, getProposalById, createProposal, updateProposal };
