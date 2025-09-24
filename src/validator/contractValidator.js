import { body } from 'express-validator';

const createContractValidator = [
    body('clientId')
        .isString().withMessage('El ID del cliente debe ser un string')
        .trim()
        .notEmpty().withMessage('El ID del cliente es obligatorio'),

    body('freelanceId')
        .isString().withMessage('El ID del freelance debe ser un string')
        .trim()
        .notEmpty().withMessage('El ID del freelance es obligatorio'),

    body('proposalId')
        .isString().withMessage('El ID de la propuesta debe ser un string')
        .trim()
        .notEmpty().withMessage('El ID de la propuesta es obligatorio'),

    body('description')
        .isString().withMessage('La descripción debe ser texto')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ max: 5000 }).withMessage('La descripción debe tener máximo 5000 caracteres'),

    body('startDate')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isISO8601().withMessage('La fecha de inicio debe tener un formato válido (YYYY-MM-DD)')
        .toDate(),

    body('endDate')
        .optional()
        .isISO8601().withMessage('La fecha de fin debe tener un formato válido (YYYY-MM-DD)')
        .toDate()
        .custom((endDate, { req }) => {
            if (endDate <= req.body.startDate) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        }),

    body('signDate')
        .optional()
        .isISO8601().withMessage('La fecha de firma debe tener un formato válido (YYYY-MM-DD)')
        .toDate(),

    body('hourlyRate')
        .notEmpty().withMessage('La tarifa por hora es obligatoria')
        .isFloat({ gt: 0 }).withMessage('La tarifa por hora debe ser un número mayor que 0'),

    body('hoursPerWeek')
        .notEmpty().withMessage('Las horas por semana son obligatorias')
        .isInt({ min: 1, max: 100 }).withMessage('Las horas por semana deben ser un número entre 1 y 100'),

    body('contractFile')
        .optional()
        .isURL().withMessage('El archivo del contrato debe ser una URL válida')
];

export { createContractValidator };