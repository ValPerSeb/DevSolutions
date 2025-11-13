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

        // Check if tables already exist
        const tables = await sequelize.showAllSchemas();
        const tablesExist = tables && tables.length > 0;

        await sequelize.sync({ force: true });

        /*if (!tablesExist) {
            // Only sync on first run (create tables if they don't exist)
            await sequelize.sync({ force: false });
            console.log('Tables created successfully.');
        } else {
            // Tables already exist, just authenticate
            console.log('Database tables already exist, skipping sync.');
        }*/
        
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

export default initializeDatabase;
