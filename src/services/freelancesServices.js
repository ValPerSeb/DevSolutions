const pool = require('../dataBase/db');

// CRUD para Freelace
async function createFreelance(freelance) {
    const conn = await pool.getConnection();
    try {
        const { userId, profile, title, skills, languages, hourlyRate } = freelance;
        const [result] = await conn.query(
            'INSERT INTO freelancers (userId, profile, title, skills, languages, hourlyRate) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, profile, title, skills, languages, hourlyRate]
        );
        return result.insertId;
    } catch (e) {
        console.error(e.message);
        throw e;
    }finally {
        conn.release();
    }
}

async function getAllFreelancers() {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query('SELECT * FROM freelancers');
        return rows;
    } catch (e) {
        console.error(e.message);
        throw e;
    }finally {
        conn.release();
    }
}

async function updateFreelancer(id, data) {
    const conn = await pool.getConnection();
    try {
        const { profile, title, skills, languages, hourlyRate } = data;
        const [result] = await conn.query(
            'UPDATE freelancers SET profile=?, title=?, skills=?, languages=?, hourlyRate=? WHERE freelanceId=?',
            [profile, title, skills, languages, hourlyRate, id]
        );
        return result.affectedRows > 0;
    } catch (e) {
        console.error(e.message);
        throw e;
    }finally {
        conn.release();
    }
}

async function deleteFreelancer(id) {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('DELETE FROM freelancers WHERE freelanceId=?', [id]);
        return result.affectedRows > 0;
    } catch (e) {
        console.error(e.message);
        throw e;
    }finally {
        conn.release();
    }
}

module.exports = {createFreelance, getAllFreelancers, updateFreelancer, deleteFreelancer};