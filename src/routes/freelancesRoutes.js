const express = require('express');
const router = express.Router();
const freelanceCtrl = require('../controllers/freelanceController');

//Crear freelance
router.post('/', freelanceCtrl.createFreelance);

//Obtener todos los freelancers
router.get('/', freelanceCtrl.getAllFreelancers);

//Actualizar freelancer
router.put('/:id', freelanceCtrl.updateFreelancer);

//Eliminar frlancer
router.delete('/:id', freelanceCtrl.deleteFreelancer);

module.exports = router;