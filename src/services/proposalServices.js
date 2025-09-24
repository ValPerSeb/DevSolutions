import Proposal from '../models/Proposal.js';

async function createProposal(proposalData) {
    try {
        return await Proposal.create(proposalData);
    } catch (error) {
        console.error('Error creating proposal:', error);
        throw error;
    }
}

async function getAllProposals() {
    try {
        return await Proposal.findAll();
    } catch (error) {
        console.error('Error getting proposals:', error);
        throw error;
    }
}

async function getProposalById(id) {
    try {
        return await Proposal.findByPk(id);
    } catch (error) {
        console.error('Error getting proposal:', error);
        throw error;
    }
}

async function updateProposal(id, data) {
    try {
        const [updated] = await Proposal.update(data, {
            where: { proposalId: id }
        });
        return updated > 0;
    } catch (error) {
        console.error('Error updating proposal:', error);
        throw error;
    }
}

async function deleteProposal(id) {
    try {
        return await Proposal.destroy({
            where: { proposalId: id }
        });
    } catch (error) {
        console.error('Error deleting proposal:', error);
        throw error;
    }
}

export { createProposal, getAllProposals, getProposalById, updateProposal, deleteProposal };
