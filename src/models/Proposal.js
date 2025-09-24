import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataBase/db.js';
import Offer from './Offer.js';
import Client from './Client.js';
import Freelance from './Freelance.js';

class Proposal extends Model {}

Proposal.init({
    proposalId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    offerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Offer,
            key: 'offerId'
        }
    },
    clientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'clientId'
        }
    },
    freelanceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Freelance,
            key: 'freelanceId'
        }
    },
    hourlyRate: DataTypes.DECIMAL(10, 2),
    status: {
        type: DataTypes.ENUM('Sent', 'Received', 'Rejected', 'Accepted'),
        defaultValue: 'Sent'
    }
}, {
    sequelize,
    modelName: 'Proposal',
    timestamps: true
});

Proposal.belongsTo(Offer, { foreignKey: 'offerId' });
Proposal.belongsTo(Client, { foreignKey: 'clientId' });
Proposal.belongsTo(Freelance, { foreignKey: 'freelanceId' });

export default Proposal;
