import sequelize from './db.js';
import User from '../models/User.js';
import Freelance from '../models/Freelance.js';
import Client from '../models/Client.js';
import Offer from '../models/Offer.js';
import Proposal from '../models/Proposal.js';
import Contract from '../models/Contract.js';

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // During development, you might want to force sync
        await sequelize.sync({ force: true }); // This will drop and recreate tables
        // For production, use this instead:
        // await sequelize.sync({ alter: true });
        
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

export default initializeDatabase;
