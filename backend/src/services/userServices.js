// Nos sirve para hacer las peticiones a la BD

/*
  Tabla users id, username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country
*/

import bcrypt from 'bcryptjs';
import User from '../models/User.js';

//Crear usuario (hashea la contraseña antes de guardar y devuelve el usuario sin la contraseña)
async function createUser(userData) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(userData.password, salt);
        const created = await User.create({ ...userData, password: hashed });
        const userObj = created.toJSON();
        delete userObj.password;
        return userObj;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

//Obtener todos los usurios
async function getAllUsers() {
    try {
        return await User.findAll({
            attributes: { exclude: ['password'] }
        });
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

//Obtener usuario por ID
async function getUserById(id) {
    try {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

//Actualizar usuario
async function updateUser(id, userData) {
    try {
        const [updated] = await User.update(userData, {
            where: { userId: id }
        });
        if (updated > 0) {
            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            return updatedUser;
        }
        return null;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

//Eliminar usuario
async function deleteUser(id) {
    try {
        const deleted = await User.destroy({
            where: { userId: id }
        });
        return deleted > 0;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };


