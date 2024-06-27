
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const WebSocket = require('ws');
// const jwt = require('jsonwebtoken');

// dotenv.config();

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, './public')));

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// const authRoutes = require('./Routes/routes');
// app.use('/api/auth', authRoutes);

// const PORT = 3000;
// const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // WebSocket setup
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws, req) => {
//     const token = req.url.split('token=')[1];
//     if (!token) {
//         ws.close();
//         return;
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         ws.userId = decoded.user.id;
//     } catch (err) {
//         ws.close();
//         return;
//     }

//     ws.on('message', (message) => {
//         const data = JSON.parse(message);
//         if (data.type === 'message') {
//             wss.clients.forEach(client => {
//                 if (client.readyState === WebSocket.OPEN) {
//                     client.send(JSON.stringify({
//                         userId: ws.userId,
//                         text: data.text,
//                         timestamp: new Date()
//                     }));
//                 }
//             });
//         }
//     });

//     ws.on('close', () => {
//         console.log(`WebSocket closed for user ${ws.userId}`);
//     });

//     ws.on('error', (error) => {
//         console.error(`WebSocket error for user ${ws.userId}:`, error);
//     });
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, './public')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const authRoutes = require('./routes/routes');
app.use('/api/auth', authRoutes);

const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const token = req.url.split('token=')[1];
    if (!token) {
        ws.close();
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ws.userId = decoded.userId;
    } catch (err) {
        ws.close();
        return;
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'message') {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        userId: ws.userId,
                        text: data.text,
                        timestamp: new Date()
                    }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log(`WebSocket closed for user ${ws.userId}`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error for user ${ws.userId}:`, error);
    });
});


