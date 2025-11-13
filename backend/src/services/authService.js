import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { Op } from 'sequelize';
import { createClient } from './clientServices.js';
import { createFreelance } from './freelanceServices.js';
import { createUser as createUserService } from './userServices.js';
import Freelance from '../models/Freelance.js';
import Client from '../models/Client.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function loginUser(credential, password) {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: credential }, { email: credential }]
            }
        });
        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        let profileData;
        if(user.role === 'client') {
            profileData = await Client.findOne({ where: { userId: user.userId } });
        } else if(user.role === 'freelance') {
            profileData = await Freelance.findOne({ where: { userId: user.userId } });
        }          

        const token = jwt.sign({ userId: user.userId, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        return { token, user: user.userId, role: user.role, profile: profileData.freelanceId ?? profileData.clientId };
    } catch (error) {
        console.error('AuthService.loginUser error:', error);
        throw error;
    }
}

async function registerUser(userData, profileData) {
    try {
        const user = await createUserService(userData);

        if (userData.role === 'client') {
            await createClient({ userId: user.userId, ...profileData });
        } else if (userData.role === 'freelance') {
            await createFreelance({ userId: user.userId, ...profileData });
        }

        return { user };
    } catch (error) {
        console.error('AuthService.registerUser error:', error);
        throw error;
    }
}

export { loginUser, registerUser };
