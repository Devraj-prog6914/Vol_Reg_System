require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().then(() => {
    const server = http.createServer(app);
    
    // Initialize Socket.io
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            methods: ["GET", "POST"]
        }
    });

    // Make io accessible in routes/controllers
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);
        
        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });

    server.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
