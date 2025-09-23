/* ruas para las operaciones CRUD de Client.
 */
const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/clientController');
const { createClientValidator } = require('../validator/clientValidator');
const { validateClientResults } = require('../middlewares/clientMiddleware');

//Crear cliente
router.post('/', createClientValidator, validateClientResults, clientCtrl.createClient);

//Obtener todos los clientes
router.get('/', clientCtrl.getAllClients);

//Actualizar cliente
router.put('/:id', createClientValidator, validateClientResults, clientCtrl.updateClient);

//Eliminar cliente
router.delete('/:id', clientCtrl.deleteClient);

module.exports = router;