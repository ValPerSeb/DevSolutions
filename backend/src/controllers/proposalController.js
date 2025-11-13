import { createProposal, getAllProposals, getProposalById, updateProposal, deleteProposal } from '../services/proposalServices.js';

async function createProposalHandler(req, res) {
    try {
        const proposal = await createProposal(req.body);
        res.status(201).json({ success: true, data: proposal });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getAllProposalsHandler(req, res) {
    try {
        const proposals = await getAllProposals();
        res.json({ success: true, data: proposals });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getProposalByIdHandler(req, res) {
    try {
        const proposal = await getProposalById(req.params.id);
        if (!proposal) {
            return res.status(404).json({ success: false, error: 'Proposal not found' });
        }
        res.json({ success: true, data: proposal });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateProposalHandler(req, res) {
    try {
        const updated = await updateProposal(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Proposal not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function deleteProposalHandler(req, res) {
    try {
        const deleted = await deleteProposal(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Proposal not found' });
        }
        res.json({ success: true, message: 'Proposal deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { createProposalHandler, getAllProposalsHandler, getProposalByIdHandler, updateProposalHandler, deleteProposalHandler };
