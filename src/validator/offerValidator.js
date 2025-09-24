import { body } from 'express-validator';

const createOfferValidator = [
    body('title')
        .isString().withMessage('El título debe ser texto')
        .trim()
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ max: 100 }).withMessage('El título debe tener máximo 100 caracteres'),

    body('description')
        .isString().withMessage('La descripción debe ser texto')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ max: 2000 }).withMessage('La descripción debe tener máximo 2000 caracteres'),

    body('location')
        .optional()
        .isString().withMessage('La ubicación debe ser texto')
        .trim()
        .isLength({ max: 150 }).withMessage('La ubicación debe tener máximo 150 caracteres'),

    body('skills')
        .isString().withMessage('Las habilidades deben ser texto'),


    body('projectType')
        .isString().withMessage('El tipo de proyecto debe ser texto')
        .trim()
        .notEmpty().withMessage('El tipo de proyecto es obligatorio')
        .isIn(['Fixed-Price', 'Hourly', 'Long-Term']).withMessage('Tipo de proyecto no válido'),

    body('duration')
        .optional()
        .isString().withMessage('La duración debe ser texto')
        .trim()
        .isLength({ max: 50 }).withMessage('La duración debe tener máximo 50 caracteres'),

    body('level')
        .isString().withMessage('El nivel debe ser texto')
        .trim()
        .notEmpty().withMessage('El nivel es obligatorio')
        .isIn(['Beginner', 'Intermediate', 'Expert']).withMessage('Nivel no válido'),

    body('hoursPerWeek')
        .notEmpty().withMessage('Las horas por semana son obligatorias')
        .isNumeric().withMessage('Las horas por semana deben ser un número'),

    body('hourlyRate')
        .notEmpty().withMessage('La tarifa por hora es obligatoria')
        .isFloat({ gt: 0 }).withMessage('La tarifa por hora debe ser un número mayor que 0'),

    body('vacancies')
        .notEmpty().withMessage('El número de vacantes es obligatorio')
        .isInt({ gt: 0 }).withMessage('El número de vacantes debe ser un entero mayor que 0'),

    body('ownerType')
        .isString().withMessage('El tipo de propietario debe ser texto')
        .trim()
        .notEmpty().withMessage('El tipo de propietario es obligatorio')
        .isIn(['freelance', 'client']).withMessage('El tipo de propietario no es válido'),

    body('ownerId')
        .isString().withMessage('El ID del propietario debe ser un string') 
        .trim()
        .notEmpty().withMessage('El ID del propietario es obligatorio'),

    body('status')
        .optional()
        .isString().withMessage('El estado debe ser texto')
        .isIn(['active', 'inactive']).withMessage('El estado no es válido')
];

export { createOfferValidator };