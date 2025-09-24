import { createClient, getAllClients, getClientById, updateClient, deleteClient } from '../services/clientServices.js';

async function createClientHandler(req, res) {
    try {
        const client = await createClient(req.body);
        res.status(201).json({ success: true, data: client });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getAllClientsHandler(req, res) {
    try {
        const clients = await getAllClients();
        res.json({ success: true, data: clients });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getClientByIdHandler(req, res) {
    try {
        const client = await getClientById(req.params.id);
        if (!client) {
            return res.status(404).json({ success: false, error: 'Client not found' });
        }
        res.json({ success: true, data: client });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateClientHandler(req, res) {
    try {
        const updated = await updateClient(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Client not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function deleteClientHandler(req, res) {
    try {
        const deleted = await deleteClient(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Client not found' });
        }
        res.json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { createClientHandler, getAllClientsHandler, getClientByIdHandler, updateClientHandler, deleteClientHandler };