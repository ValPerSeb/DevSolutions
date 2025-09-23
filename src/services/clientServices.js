/*Servicio para operaciones CRUD de Client en la base de datos.
 */
const pool = require('../dataBase/db');

//Crear cliente
async function createClient(client) {
    const conn = await pool.getConnection();
    try {
        const { userId, industry, company, language } = client;
        const [result] = await conn.query(
            'INSERT INTO clients (userId, industry, company, language) VALUES (?, ?, ?, ?)',
            [userId, industry, company, language]
        );
        return result.insertId;
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        conn.release();
    }
}

//Obtener todos los clientes
async function getAllClients() {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM clients');
        return rows;
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        conn.release();
    }
}

//Actualizar cliente
async function updateClient(id, data) {
    const conn = await pool.getConnection();
    try {
        const { industry, company, language } = data;
        const [result] = await conn.query(
            'UPDATE clients SET industry=?, company=?, language=? WHERE clientId=?',
            [industry, company, language, id]
        );
        return result.affectedRows > 0;
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        conn.release();
    }
}

//Eliminar cliente
async function deleteClient(id) {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('DELETE FROM clients WHERE clientId=?', [id]);
        return result.affectedRows > 0;
    } catch (e) {
        console.error(e.message);
        throw e;
    } finally {
        conn.release();
    }
}

module.exports = {createClient, getAllClients, updateClient, deleteClient};