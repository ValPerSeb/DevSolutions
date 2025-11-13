import Freelance from '../models/Freelance.js';

async function createFreelance(freelanceData) {
    try {
        return await Freelance.create(freelanceData);
    } catch (error) {
        console.error('Error creating freelance:', error);
        throw error;
    }
}

async function getAllFreelances() {
    try {
        return await Freelance.findAll();
    } catch (error) {
        console.error('Error getting freelances:', error);
        throw error;
    }
}

async function getFreelanceById(id) {
    try {
        return await Freelance.findByPk(id);
    } catch (error) {
        console.error('Error getting freelance:', error);
        throw error;
    }
}

async function updateFreelance(id, data) {
    try {
        const [updated] = await Freelance.update(data, {
            where: { freelanceId: id }
        });
        return updated > 0;
    } catch (error) {
        console.error('Error updating freelance:', error);
        throw error;
    }
}

async function deleteFreelance(id) {
    try {
        return await Freelance.destroy({
            where: { freelanceId: id }
        });
    } catch (error) {
        console.error('Error deleting freelance:', error);
        throw error;
    }
}

export { createFreelance, getAllFreelances, getFreelanceById, updateFreelance, deleteFreelance };
