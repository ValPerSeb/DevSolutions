import { body } from 'express-validator';

const createFreelanceValidator = [
    body('userId')
        .isInt().withMessage('El userId debe ser un número entero')
        .notEmpty().withMessage('El userId es obligatorio'),

    body('profile')
        .isString().withMessage('El perfil debe ser texto')
        .trim()
        .notEmpty().withMessage('El perfil es obligatorio')
        .isLength({ max: 200 }).withMessage('El perfil debe tener máximo 200 caracteres'),

    body('title')
        .isString().withMessage('El título debe ser texto')
        .trim()
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ max: 100 }).withMessage('El título debe tener máximo 100 caracteres'),

    body('skills')
        .isString().withMessage('Las habilidades deben ser texto')
        .trim()
        .notEmpty().withMessage('Las habilidades son obligatorias')
        .isLength({ max: 200 }).withMessage('Las habilidades deben tener máximo 200 caracteres'),

    body('languages')
        .isString().withMessage('Los idiomas deben ser texto')
        .trim()
        .notEmpty().withMessage('Los idiomas son obligatorios')
        .isLength({ max: 100 }).withMessage('Los idiomas deben tener máximo 100 caracteres'),

    body('hourlyRate')
        .notEmpty().withMessage('La tarifa por hora es obligatoria')
        .isNumeric().withMessage('La tarifa por hora debe ser numérica')
];

export { createFreelanceValidator };