//debe tener el models y moddleware

const express = require('express');
const router = express.Router();
const usrCtrl =require('../controllers/userController');
const {createUserValidator} = require('../validator/userValidator'); // Importa validador 
const {validateResults} = require('../middlewares/userMiddleware'); // Importa middleware de validación

//get es una consulta = select from table
//post inserciones
//put / patch actualizaciones
//delete eliminaciones

//Crear usario
router.post('/', createUserValidator, validateResults, usrCtrl.createUser);

//Obtener todos los usuarios
router.get('/', usrCtrl.getAllUsers);

//Obtener usuario por ID
router.get('/:id', usrCtrl.getUserById);

//actualizar usuario
router.put('/:id', createUserValidator, validateResults, usrCtrl.updateUser);

//Eliminar usuario
router.delete('/:id', usrCtrl.deleteUser);

module.exports = router;