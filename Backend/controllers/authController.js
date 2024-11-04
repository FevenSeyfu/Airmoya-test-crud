import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCollection, saveCollection } from '../storage/localStorage.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const users = getCollection('users');
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), username, email, password: hashedPassword };
    users.push(newUser);
    saveCollection('users', users);

    res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const users = getCollection('users');
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
};