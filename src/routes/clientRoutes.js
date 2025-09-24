import express from 'express';
import { createClientHandler, getAllClientsHandler, getClientByIdHandler, updateClientHandler, deleteClientHandler } from '../controllers/clientController.js';
import { createClientValidator } from '../validator/clientValidator.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';

const router = express.Router();

// Crear cliente
router.post('/', createClientValidator, validateResMiddleware, createClientHandler);

// Obtener todos los clientes
router.get('/', getAllClientsHandler);

// Obtener cliente por ID
router.get('/:id', getClientByIdHandler);

// Actualizar cliente
router.put('/:id', createClientValidator, validateResMiddleware, updateClientHandler);

// Eliminar cliente
router.delete('/:id', deleteClientHandler);

export default router;