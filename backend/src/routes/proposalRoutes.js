import express from 'express';
import { createProposalHandler, getAllProposalsHandler, getProposalByIdHandler, updateProposalHandler, deleteProposalHandler } from '../controllers/proposalController.js';
import { createProposalValidator } from '../validator/proposalValidator.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';

const router = express.Router();

router.post('/', createProposalValidator, validateResMiddleware, createProposalHandler);
router.get('/', getAllProposalsHandler);
router.get('/:id', getProposalByIdHandler);
router.put('/:id', createProposalValidator, validateResMiddleware, updateProposalHandler);
router.delete('/:id', deleteProposalHandler);

export default router;