const { validationResult } = require("express-validator");

function validateClientResults(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            errors: errors.array().map(e => ({ field: e.param, msg: e.msg })) //Si hay errores, responde con un status 422 y los detalles.
        });
    }
    next();
}

module.exports = { validateClientResults };