import express from 'express';
import { createFreelanceHandler, getAllFreelancesHandler, getFreelanceByIdHandler, updateFreelanceHandler, deleteFreelanceHandler, getFreelanceStatsHandler } from '../controllers/freelanceController.js';
import { createFreelanceValidator } from '../validator/freelanceValidator.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';

const router = express.Router();

router.post('/', createFreelanceValidator, validateResMiddleware, createFreelanceHandler);
router.get('/', getAllFreelancesHandler);
router.get('/:id', getFreelanceByIdHandler);
router.put('/:id', createFreelanceValidator, validateResMiddleware, updateFreelanceHandler);
router.delete('/:id', deleteFreelanceHandler);
router.get('/:id/stats', getFreelanceStatsHandler);

export default router;
