import express from 'express';
import { createOfferHandler, getAllOffersHandler, getOfferByIdHandler, updateOfferHandler, deleteOfferHandler } from '../controllers/offerController.js';
import { createOfferValidator } from '../validator/offerValidator.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';

const router = express.Router();

router.post('/', createOfferValidator, validateResMiddleware, createOfferHandler);
router.get('/', getAllOffersHandler);
router.get('/:id', getOfferByIdHandler);
router.put('/:id', createOfferValidator, validateResMiddleware, updateOfferHandler);
router.delete('/:id', deleteOfferHandler);

export default router;