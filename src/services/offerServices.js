import Offer from '../models/Offer.js';

async function createOffer(offerData) {
    try {
        return await Offer.create(offerData);
    } catch (error) {
        console.error('Error creating offer:', error);
        throw error;
    }
}

async function getAllOffers() {
    try {
        return await Offer.findAll();
    } catch (error) {
        console.error('Error getting offers:', error);
        throw error;
    }
}

async function getOfferById(id) {
    try {
        return await Offer.findByPk(id);
    } catch (error) {
        console.error('Error getting offer:', error);
        throw error;
    }
}

async function getTotalOffersByClient(clientId) {
    try {
        const count = await Offer.count({
            where: { ownerId: clientId, ownerType: 'client' }
        });
        return count;
    } catch (error) {
        console.error('Error counting offers for client:', error);
        throw error;
    } 
}

async function getTotalOffersByFreelancer(freelanceId) {
    try {
        const count = await Offer.count({
            where: { ownerId: freelanceId, ownerType: 'freelance' }
        });
        return count;
    } catch (error) {
        console.error('Error counting offers for client:', error);
        throw error;
    } 
}

async function updateOffer(id, data) {
    try {
        const [updated] = await Offer.update(data, {
            where: { offerId: id }
        });
        return updated > 0;
    } catch (error) {
        console.error('Error updating offer:', error);
        throw error;
    }
}

async function deleteOffer(id) {
    try {
        return await Offer.destroy({
            where: { offerId: id }
        });
    } catch (error) {
        console.error('Error deleting offer:', error);
        throw error;
    }
}

export { createOffer, getAllOffers, getOfferById, getTotalOffersByClient, getTotalOffersByFreelancer, updateOffer, deleteOffer };
