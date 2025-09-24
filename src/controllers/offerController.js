import { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer } from '../services/offerServices.js';

async function createOfferHandler(req, res) {
    try {
        const offer = await createOffer(req.body);
        res.status(201).json({ success: true, data: offer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getAllOffersHandler(req, res) {
    try {
        const offers = await getAllOffers();
        res.json({ success: true, data: offers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getOfferByIdHandler(req, res) {
    try {
        const offer = await getOfferById(req.params.id);
        if (!offer) {
            return res.status(404).json({ success: false, error: 'Offer not found' });
        }
        res.json({ success: true, data: offer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateOfferHandler(req, res) {
    try {
        const updated = await updateOffer(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Offer not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function deleteOfferHandler(req, res) {
    try {
        const deleted = await deleteOffer(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Offer not found' });
        }
        res.json({ success: true, message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { createOfferHandler, getAllOffersHandler, getOfferByIdHandler, updateOfferHandler, deleteOfferHandler };
