const EventEmitter = require('events');

// Initialize the emitter
const myEmitter = new EventEmitter();

// 1. First listener for the 'userLogin' event
myEmitter.on('userLogin', (username) => {
    console.log(`[Database]: Logging login time for user: ${username}`);
});

// 2. Second listener for the same 'userLogin' event (Multiple listeners)
myEmitter.on('userLogin', (username) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[Notification]: Sending welcome alert to ${username} at ${timestamp}`);
});

// 3. A listener for a 'systemAlert' event that takes multiple arguments
myEmitter.on('systemAlert', (level, message) => {
    console.log(`[${level.toUpperCase()} ALERT]: ${message}`);
});

module.exports = myEmitter;