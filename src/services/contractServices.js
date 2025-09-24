import Contract from '../models/Contract.js';

async function createContract(contractData) {
    try {
        return await Contract.create(contractData);
    } catch (error) {
        console.error('Error creating contract:', error);
        throw error;
    }
}

async function getAllContracts() {
    try {
        return await Contract.findAll();
    } catch (error) {
        console.error('Error getting contracts:', error);
        throw error;
    }
}

async function getContractById(id) {
    try {
        return await Contract.findByPk(id);
    } catch (error) {
        console.error('Error getting contract:', error);
        throw error;
    }
}

async function getTotalContractsByClient(clientId) {
    try {
        const count = await Contract.count({
            where: { clientId: clientId }
        });
        return count;
    } catch (error) {
        console.error('Error counting contracts for client:', error);
        throw error;
    }
}

async function getTotalContractsByFreelancer(freelanceId) {
    try {
        const count = await Contract.count({
            where: { freelanceId: freelanceId }
        });
        return count;
    } catch (error) {
        console.error('Error counting contracts for client:', error);
        throw error;
    }
}

async function updateContract(id, data) {
    try {
        const [updated] = await Contract.update(data, {
            where: { contractId: id }
        });
        return updated > 0;
    } catch (error) {
        console.error('Error updating contract:', error);
        throw error;
    }
}

async function deleteContract(id) {
    try {
        return await Contract.destroy({
            where: { contractId: id }
        });
    } catch (error) {
        console.error('Error deleting contract:', error);
        throw error;
    }
}

export { createContract, getAllContracts, getContractById, getTotalContractsByClient, getTotalContractsByFreelancer, updateContract, deleteContract };
