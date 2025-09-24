import { body } from 'express-validator';

const createClientValidator = [
    body('userId')
        .isInt().withMessage('El userId debe ser un número entero')
        .notEmpty().withMessage('El userId es obligatorio'),

    body('industry')
        .isString().withMessage('La industria debe ser texto')
        .trim()
        .notEmpty().withMessage('La industria es obligatoria'),

    body('company')
        .isString().withMessage('La compañía debe ser texto')
        .trim()
        .notEmpty().withMessage('La compañía es obligatoria'),

    body('language')
        .isString().withMessage('El idioma debe ser texto')
        .trim()
        .notEmpty().withMessage('El idioma es obligatorio')
];

export { createClientValidator };