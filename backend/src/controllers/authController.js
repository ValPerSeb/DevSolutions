import { loginUser, registerUser } from '../services/authService.js';

async function loginHandler(req, res) {
    try {
        const { credential, password } = req.body; // credential can be username or email
        if (!credential || !password) return res.status(400).json({ success: false, message: 'Missing credentials' });

        const result = await loginUser(credential, password);
        if (!result) return res.status(400).json({ success: false, message: 'Invalid username/email or password' });

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('loginHandler error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

async function registerHandler(req, res) {
    try {
        const { profile, ...userFields } = req.body;
        // role expected: 'client' | 'freelance' or undefined
        const profileData = profile || {};

        const result = await registerUser(userFields, profileData);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error('registerHandler error:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, message: 'User with provided credentials already exists', details: error.errors });
        }
        res.status(500).json({ success: false, message: error.message });
    }
}

export { loginHandler, registerHandler };
