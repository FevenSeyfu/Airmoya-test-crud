import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Socket.IO setup for real-time messaging
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.use('/auth', authRoutes);
app.use('/images', imageRoutes);
app.use('/messages', messageRoutes);
app.use('/services', serviceRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});