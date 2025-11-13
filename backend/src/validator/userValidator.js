/*
  Tabla users
  id, username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country
*/

import { body } from 'express-validator';

const createUserValidator = [
    body('username')
        .isString().withMessage('El username debe ser texto')
        .trim()
        .notEmpty().withMessage('El username es obligatorio')
        .isLength({ min: 3, max: 50 }).withMessage('El username debe tener entre 3 y 50 caracteres'),

    body('password')
        .isString().withMessage('La contraseña debe ser texto')
        .trim()
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),

    body('firstName')
        .isString().withMessage('El nombre debe ser texto')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio'),

    body('lastName')
        .isString().withMessage('El apellido debe ser texto')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio'),

    body('email')
        .isEmail().withMessage('Debe ser un email válido')
        .notEmpty().withMessage('El email es obligatorio'),

    body('phone')
        .optional()
        .isString().withMessage('El teléfono debe ser texto'),

    body('dateOfBirth')
        .optional()
        .isDate().withMessage('Debe ser una fecha válida'),

    body('dni')
        .optional()
        .isString().withMessage('El DNI debe ser texto'),

    body('city')
        .optional()
        .isString().withMessage('La ciudad debe ser texto'),

    body('country')
        .optional()
        .isString().withMessage('El país debe ser texto')
];

// Exporta la constante en una línea separada al final
export { createUserValidator };