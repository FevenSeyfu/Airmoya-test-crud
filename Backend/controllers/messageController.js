import { getCollection, saveCollection } from '../storage/localStorage.js';

export const getMessages = (req, res) => {
    const messages = getCollection('messages');
    res.status(200).json(messages);
};

export const addMessage = (req, res) => {
    const newMessage = { id: Date.now().toString(), ...req.body };
    const messages = getCollection('messages');
    messages.push(newMessage);
    saveCollection('messages', messages);
    res.status(201).json(newMessage);
};