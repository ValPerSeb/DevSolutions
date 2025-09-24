import express from 'express';
import { createContractHandler, getAllContractsHandler, getContractByIdHandler, updateContractHandler, deleteContractHandler } from '../controllers/contractController.js';
import { createContractValidator } from '../validator/contractValidator.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';

const router = express.Router();

router.post('/', createContractValidator, validateResMiddleware, createContractHandler);
router.get('/', getAllContractsHandler);
router.get('/:id', getContractByIdHandler);
router.put('/:id', createContractValidator, validateResMiddleware, updateContractHandler);
router.delete('/:id', deleteContractHandler);

export default router;