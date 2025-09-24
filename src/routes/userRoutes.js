//debe tener el models y moddleware

import express from 'express';
import { createUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';
import { createUserValidator } from '../validator/userValidator.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';

const router = express.Router();

// get es una consulta = select from table
// post inserciones
// put / patch actualizaciones
// delete eliminaciones
//Crear usario
router.post('/', createUserValidator, validateResMiddleware, createUserHandler);

//Obtener todos los usuarios
router.get('/', getAllUsersHandler);

//Obtener usuario por ID
router.get('/:id', getUserByIdHandler);

//actualizar usuario
router.put('/:id', createUserValidator, validateResMiddleware, updateUserHandler);

//Eliminar usuario
router.delete('/:id', deleteUserHandler);

export default router;