import { body } from 'express-validator';


const createProposalValidator = [
    body('offerId')
        .notEmpty().withMessage('El ID de la oferta es obligatorio'),

    body('clientId')
        .notEmpty().withMessage('El ID del cliente es obligatorio'),

    body('freelanceId')
        .notEmpty().withMessage('El ID del freelance es obligatorio'),

    body('hourlyRate')
        .notEmpty().withMessage('La tarifa por hora es obligatoria')
        .isFloat({ gt: 0 }).withMessage('La tarifa por hora debe ser un número mayor que 0'),

    body('status')
        .optional()
        .isString().withMessage('El estado debe ser texto')
        .trim()
        .isIn(['Sent', 'Received', 'Rejected', 'Accepted']).withMessage('El estado no es válido. Valores permitidos: Sent, Received, Rejected, Accepted')
];

export { createProposalValidator };