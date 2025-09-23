/*
  Validador para los datos de Client.
   Verifica que los campos requeridos estén presentes y cumplan con el formato.
 */
const { body } = require('express-validator');

const createClientValidator = [
    body('userId')
        .isInt().withMessage('El userId debe ser un número entero')
        .notEmpty().withMessage('El userId es obligatorio'),

    body('industry')
        .isString().withMessage('La industria debe ser texto')
        .trim()
        .notEmpty().withMessage('La industria es obligatoria')
        .isLength({ max: 100 }).withMessage('La industria debe tener máximo 100 caracteres'),

    body('company')
        .isString().withMessage('La compañía debe ser texto')
        .trim()
        .notEmpty().withMessage('La compañía es obligatoria')
        .isLength({ max: 100 }).withMessage('La compañía debe tener máximo 100 caracteres'),

    body('language')
        .isString().withMessage('El idioma debe ser texto')
        .trim()
        .notEmpty().withMessage('El idioma es obligatorio')
        .isLength({ max: 50 }).withMessage('El idioma debe tener máximo 50 caracteres')
];

module.exports = { createClientValidator };