import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataBase/db.js';
import Client from './Client.js';
import Freelance from './Freelance.js';
import Proposal from './Proposal.js';

class Contract extends Model {}

Contract.init({
    contractId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    proposalId: {
        type: DataTypes.INTEGER,
        references: {
            model: Proposal,
            key: 'proposalId'
        }
    },
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    signDate: DataTypes.DATE,
    hourlyRate: DataTypes.DECIMAL(10, 2),
    totalHours: DataTypes.INTEGER,
    contractFile: DataTypes.STRING,
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'paid', 'rejected']]
        }
    },
    totalAmount: DataTypes.DECIMAL(10, 2),
}, {
    sequelize,
    modelName: 'Contract',
    timestamps: true
});

Contract.belongsTo(Client, { foreignKey: 'clientId' });
Contract.belongsTo(Freelance, { foreignKey: 'freelanceId' });
Contract.belongsTo(Proposal, { foreignKey: 'proposalId' });

export default Contract;
