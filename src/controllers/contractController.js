import { createContract, getAllContracts, getContractById, updateContract, deleteContract } from '../services/contractServices.js';

async function createContractHandler(req, res) {
    try {
        const contract = await createContract(req.body);
        res.status(201).json({ success: true, data: contract });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getAllContractsHandler(req, res) {
    try {
        const contracts = await getAllContracts();
        res.json({ success: true, data: contracts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getContractByIdHandler(req, res) {
    try {
        const contract = await getContractById(req.params.id);
        if (!contract) {
            return res.status(404).json({ success: false, error: 'Contract not found' });
        }
        res.json({ success: true, data: contract });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateContractHandler(req, res) {
    try {
        const updated = await updateContract(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Contract not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function deleteContractHandler(req, res) {
    try {
        const deleted = await deleteContract(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Contract not found' });
        }
        res.json({ success: true, message: 'Contract deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { createContractHandler, getAllContractsHandler, getContractByIdHandler, updateContractHandler, deleteContractHandler };
