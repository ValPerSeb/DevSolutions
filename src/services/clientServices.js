/*Servicio para operaciones CRUD de Client en la base de datos.
 */

import Client from '../models/Client.js';

//Crear cliente
async function createClient(client) {
    try {
        return await Client.create(client);
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

//Obtener todos los clientes
async function getAllClients() {
    try {
        return await Client.findAll();
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
}

//Obtener cliente por ID
async function getClientById(id) {
    try {
        return await Client.findByPk(id);
    } catch (error) {
        console.error('Error getting client:', error);
        throw error;
    }
}

//Actualizar cliente
async function updateClient(id, data) {
    try {
        const [updated] = await Client.update(data, {
            where: { clientId: id }
        });
        return updated > 0;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
}

//Eliminar cliente
async function deleteClient(id) {
    try {
        return await Client.destroy({
            where: { clientId: id }
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
}

export { createClient, getAllClients, getClientById, updateClient, deleteClient };