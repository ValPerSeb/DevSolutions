import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataBase/db.js';
import User from './User.js';

class Freelance extends Model {}

Freelance.init({
    freelanceId: {
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
    profile: DataTypes.TEXT,
    title: DataTypes.STRING,
    skills: DataTypes.TEXT,
    languages: DataTypes.TEXT,
    hourlyRate: DataTypes.DECIMAL(10, 2)
}, {
    sequelize,
    modelName: 'Freelance',
    timestamps: true
});

Freelance.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Freelance);

export default Freelance;