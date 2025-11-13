import apiClient from "./apiClient.js";

/**
 * Get all contracts
 * @returns {Promise<Array>} - Array of all contracts
 */
async function getAllContracts() {
    const response = await apiClient.get("/api/v1/contract/");
    return response.data.data;
}

/**
 * Get contract by ID
 * @param {number} contractId - The contract ID
 * @returns {Promise<Object>} - Contract data
 */
async function getContractById(contractId) {
    const response = await apiClient.get(`/api/v1/contract/${contractId}`);
    return response.data.data;
}

/**
 * Create a new contract
 * @param {Object} contractData - Contract data
 * @returns {Promise<Object>} - Created contract data
 */
async function createContract(contractData) {
    const response = await apiClient.post("/api/v1/contract/", contractData);
    return response.data.data;
}

/**
 * Update contract
 * @param {number} contractId - The contract ID
 * @param {Object} contractData - Updated contract data
 * @returns {Promise<Object>} - Updated contract data
 */
async function updateContract(contractId, contractData) {
    const response = await apiClient.put(`/api/v1/contract/${contractId}`, contractData);
    return response.data.data;
}

export { getAllContracts, getContractById, createContract, updateContract };
