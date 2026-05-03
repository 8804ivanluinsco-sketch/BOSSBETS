const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')));

// Game Logic State
let currentCrashPoint = 0;
let history = [];

function generateNewRound() {
    // Generate a random multiplier with a house edge (1.00x crash)
    const isInstantCrash = Math.random() < 0.03; // 3% chance
    currentCrashPoint = isInstantCrash ? 1.00 : (Math.random() * 15 + 1).toFixed(2);
    
    console.log(`New Round Started: Target is ${currentCrashPoint}x`);
    
    // Broadcast to all connected players
    io.emit('roundStarted', { 
        id: Date.now(), 
        // We do NOT send the crash point here (that's cheating!)
        prediction: (currentCrashPoint * 0.8).toFixed(2) // Sending a "safe" suggestion
    });
}

io.on('connection', (socket) => {
    console.log('A player joined');
    
    // Send history to the new player
    socket.emit('historyUpdate', history);

    socket.on('requestCrashPoint', () => {
        // Only call this when the client-side plane actually crashes
        history.push(currentCrashPoint);
        if(history.length > 15) history.shift();
        
        io.emit('historyUpdate', history);
        generateNewRound();
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    generateNewRound();
});
