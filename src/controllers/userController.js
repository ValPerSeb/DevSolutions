const userService = require('../services/userService');

// POST - Crear usuario
async function createUser(req, res, next) {
  try {
    const payload = req.body;
    const newUser = await userService.createUser(payload);
    return res.status(201).json({ ok: true, data: newUser });
  } catch (err) {
    return next(err);
  }
}

// GET - lEER por id
async function getUserById(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id); // lee por unid
    if (!user) return res.status(404).json({ ok: false, message: 'not found' }); // 404
    return res.json({ ok: true, data: user });
  } catch (err) {
    return next(err);
  }
}

// GET - leer todos
async function getAllUsers(_req, res, next) {
  try {
    const users = await userService.getAllUsers();             
    return res.json({ ok: true, data: users });                
  } catch (err) {
    return next(err);
  }
}

// PUT - actualizar
async function updateUser(req, res, next) {
  try {
    const updated = await userService.updateUser(req.params.id, req.body); 
    if (!updated) return res.status(404).json({ ok: false, message: 'not found' }); 
    return res.json({ ok: true, data: updated });            
  } catch (err) {
    return next(err);
  }
}

// DELETE - Delete
async function deleteUser(req, res, next) {
  try {
    const ok = await userService.deleteUser(req.params.id);
    if (!ok) return res.status(404).json({ ok: false, message: 'not found' });
    return res.json({ ok: true, message: 'deleted' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {createUser, getUserById, getAllUsers, updateUser, deleteUser};
