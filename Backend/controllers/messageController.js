import { getCollection, saveCollection } from '../storage/localStorage.js';

export const sendMessage = (req, res) => {
    const { sender, receiver, text, file } = req.body;
    const timestamp = new Date().toISOString();
    const id = Date.now().toString();
    const room = [sender, receiver].sort().join('-');
    const newMessage = { id, sender, receiver, text, file, timestamp };

    const messages = getCollection('messages');
    const roomMessages = messages.find(msg => msg.room === room);

    if (roomMessages) {
        roomMessages.messages.push(newMessage);
    } else {
        messages.push({ room, messages: [newMessage] });
    }

    saveCollection('messages', messages);
    res.status(200).json({ chat: newMessage, message: 'Chat sent successfully' });
};

export const getMessages = (req, res) => {
    const { userId } = req.params;
    const messages = getCollection('messages').filter(msg => msg.room.includes(userId));

    if (!messages) {
        return res.status(404).json({ message: 'Messages not found' });
    }

    res.status(200).json({
        
        message: 'Messages fetched successfully',
        chats: messages,
    });
};