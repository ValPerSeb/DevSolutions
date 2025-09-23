const clientService = require('../services/clientService');

async function createClient(req, res) {
    try {
        const id = await clientService.createClient(req.body);
        res.status(201).json({ ok: true, clientId: id });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

async function getAllClients(req, res) {
    try {
        const clients = await clientService.getAllClients();
        res.json({ ok: true, clients });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

async function updateClient(req, res) {
    try {
        const updated = await clientService.updateClient(req.params.id, req.body);
        res.json({ ok: updated });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

async function deleteClient(req, res) {
    try {
        const deleted = await clientService.deleteClient(req.params.id);
        res.json({ ok: deleted });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

module.exports = {createClient,getAllClients,updateClient,deleteClient};