import { body } from 'express-validator';

const createContractValidator = [
    body('clientId')
        .notEmpty().withMessage('El ID del cliente es obligatorio'),

    body('freelanceId')
        .notEmpty().withMessage('El ID del freelance es obligatorio'),

    body('proposalId')
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

    body('totalHours')
        .notEmpty().withMessage('Total de horas es obligatorio')
        .isInt({ min: 5 }).withMessage('Total de horas debe ser mayor que 5')
];

export { createContractValidator };