import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../services/userServices.js';

async function createUserHandler(req, res) {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getAllUsersHandler(req, res) {
    try {
        const users = await getAllUsers();
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function getUserByIdHandler(req, res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function updateUserHandler(req, res) {
    try {
        const updated = await updateUser(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function deleteUserHandler(req, res) {
    try {
        const deleted = await deleteUser(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { createUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler };
