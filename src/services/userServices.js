// Nos sirve para hacer las peticiones a la BD

/*
  Tabla users id, username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country
*/

const pool = require('../dataBase/db');

//Crear usuario
async function createUser(user) {
    const conn = await pool.getConnection();
    try {
        const { username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country } = user;
        const [result] = await conn.query(
            'INSERT INTO users (username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country]
        );
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

//Obtener todos los usurios
async function getAllUsers() {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

//Obtener usuario por ID
async function getUserById(id) {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

//Actualizar usuario
async function updateUser(id, user) {
    const conn = await pool.getConnection();
    try {
        const { username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country } = user;
        const [result] = await conn.query(
            'UPDATE users SET username=?, password=?, firstName=?, lastName=?, email=?, phone=?, dateOfBirth=?, dni=?, city=?, country=? WHERE id=?',
            [username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country, id]
        );
        return result.affectedRows > 0;
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

//Eliminar usuario
async function deleteUser(id) {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser};

