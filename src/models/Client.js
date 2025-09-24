import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataBase/db.js';
import User from './User.js';

class Client extends Model {}

Client.init({
    clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    },
    industry: DataTypes.STRING,
    company: DataTypes.STRING,
    language: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Client',
    timestamps: true
});

Client.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Client);

export default Client;
