const freelanceService = require('../services/freelanceService');

async function createFreelance(req, res) {
    try {
        const id = await freelanceService.createFreelance(req.body);
        res.status(201).json({ ok: true, freelanceId: id });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

async function getAllFreelancers(req, res) {
    try {
        const freelancers = await freelanceService.getAllFreelancers();
        res.json({ ok: true, freelancers });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

async function updateFreelancer(req, res) {
    try {
        const updated = await freelanceService.updateFreelancer(req.params.id, req.body);
        res.json({ ok: updated });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

async function deleteFreelancer(req, res) {
    try {
        const deleted = await freelanceService.deleteFreelancer(req.params.id);
        res.json({ ok: deleted });
    } catch (e) {
        res.status(500).json({ ok: false, msg: e.message });
    }
}

module.exports = {createFreelance,getAllFreelancers,updateFreelancer,deleteFreelancer};