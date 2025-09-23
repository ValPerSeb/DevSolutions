/*
  Tbla users
  id, username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/db');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: 
    { 
        isEmail: true 
    }
  },
  phone: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  dni: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
});

module.exports = User;