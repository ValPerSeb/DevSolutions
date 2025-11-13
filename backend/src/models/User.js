import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataBase/db.js';

class User extends Model {}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    dni: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    role: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['freelance', 'client']]
        }
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['username']
        },
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['dni']
        }
    ]
});

export default User;
