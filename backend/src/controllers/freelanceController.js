import { getTotalContractsByFreelancer } from '../services/contractServices.js';
import { createFreelance, getAllFreelances, getFreelanceById, updateFreelance, deleteFreelance } from '../services/freelanceServices.js';
import { getTotalOffersByFreelancer } from '../services/offerServices.js';

async function createFreelanceHandler(req, res) {
    try {
        const freelance = await createFreelance(req.body);
        res.status(201).json({ success: true, data: freelance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getAllFreelancesHandler(req, res) {
    try {
        const freelances = await getAllFreelances();
        res.json({ success: true, data: freelances });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getFreelanceByIdHandler(req, res) {
    try {
        const freelance = await getFreelanceById(req.params.id);
        if (!freelance) {
            return res.status(404).json({ success: false, error: 'Freelance not found' });
        }
        res.json({ success: true, data: freelance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateFreelanceHandler(req, res) {
    try {
        const updated = await updateFreelance(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Freelance not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function deleteFreelanceHandler(req, res) {
    try {
        const deleted = await deleteFreelance(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Freelance not found' });
        }
        res.json({ success: true, message: 'Freelance deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getFreelanceStatsHandler(req, res) {
    try {
        const freelanceId = req.params.id;
        const totalOffers = await getTotalOffersByFreelancer(freelanceId);
        const totalContracts = await getTotalContractsByFreelancer(freelanceId);
        const hiringPercentage = totalOffers > 0 ? (totalContracts / totalOffers) * 100 : 0;

        const stats = {totalOffers, totalContracts, hiringPercentage: hiringPercentage.toFixed(2)};
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { createFreelanceHandler, getAllFreelancesHandler, getFreelanceByIdHandler, updateFreelanceHandler, deleteFreelanceHandler, getFreelanceStatsHandler };
