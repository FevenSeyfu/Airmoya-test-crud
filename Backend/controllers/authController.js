import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email); // Make sure to await the function if it returns a promise.

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), username, email, password: hashedPassword };
    createUser(newUser); // You might want to also return the created user data.

    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
        message: 'User registered successfully.',
        user: { id: newUser.id, username: newUser.username, email: newUser.email }, // Return user info
        token
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email); // Make sure to await the function if it returns a promise.

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({
        message: 'Login successful.',
        user: { id: user.id, username: user.username, email: user.email }, // Return user info
        token
    });
};
