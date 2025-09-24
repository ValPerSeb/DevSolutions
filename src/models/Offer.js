import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataBase/db.js';

class Offer extends Model {}

Offer.init({
    offerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    skills: DataTypes.TEXT,
    projectType: DataTypes.STRING,
    duration: DataTypes.STRING,
    level: DataTypes.STRING,
    hoursPerWeek: DataTypes.INTEGER,
    hourlyRate: DataTypes.DECIMAL(10, 2),
    vacancies: DataTypes.INTEGER,
    ownerType: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['freelance', 'client']]
        }
    },
    ownerId: DataTypes.INTEGER,
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'inactive']]
        }
    }
}, {
    sequelize,
    modelName: 'Offer',
    timestamps: true
});

export default Offer;
