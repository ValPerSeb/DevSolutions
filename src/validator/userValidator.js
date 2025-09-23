/*
  Tabla users
  id, username, password, firstName, lastName, email, phone, dateOfBirth, dni, city, country
*/

const { body } = require('express-validator');
const userServices = require('../services/userServices');

const createUserValidator = [
    body('username')
        .isString().withMessage('El nombre de usuario debe ser texto')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ max: 30 }).withMessage('El nombre de usuario debe tener máximo 30 caracteres')
        .custom(async (username) => {
            const existingUser = await userServices.getUserByUsername?.(username);
            if (existingUser) {
                throw new Error('El nombre de usuario ya existe');
            }
            return true;
        }),

    body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ max: 100 }).withMessage('La contraseña debe tener máximo 100 caracteres'),

    body('firstName')
        .isString().withMessage('El nombre debe ser texto')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 40 }).withMessage('El nombre debe tener máximo 40 caracteres'),

    body('lastName')
        .isString().withMessage('El apellido debe ser texto')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ max: 40 }).withMessage('El apellido debe tener máximo 40 caracteres'),

    body('email')
        .isEmail().withMessage('El email debe tener formato de correo')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isLength({ max: 100 }).withMessage('El email debe tener máximo 100 caracteres')
        .custom(async (email) => {
            const existingEmail = await userServices.getUserByEmail?.(email);
            if (existingEmail) {
                throw new Error('El email ya existe');
            }
            return true;
        }),

    body('phone')
        .optional()
        .trim()
        .isLength({ max: 30 }).withMessage('El teléfono debe tener máximo 30 caracteres'),

    body('dateOfBirth')
        .optional()
        .trim()
        .isLength({ max: 20 }).withMessage('La fecha de nacimiento debe tener máximo 20 caracteres'),

    body('dni')
        .trim()
        .notEmpty().withMessage('El dni es obligatorio')
        .isLength({ max: 30 }).withMessage('El dni debe tener máximo 30 caracteres')
        .custom(async (dni) => {
            const existingDni = await userServices.getUserByDni?.(dni);
            if (existingDni) {
                throw new Error('El dni ya existe');
            }
            return true;
        }),

    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('La ciudad debe tener máximo 100 caracteres'),

    body('country')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('El país debe tener máximo 100 caracteres'),
];

module.exports = { createUserValidator };