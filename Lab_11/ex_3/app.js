const myEmitter = require('./logger');

console.log('--- Event-Driven Programming Demo Started ---');

// 1. Emit a custom event with data (username)
console.log('Action: User is logging in...');
myEmitter.emit('userLogin', 'Alice');

// 2. Emit another event with multiple arguments
myEmitter.emit('systemAlert', 'warning', 'Disk space is running low (85%)');

// 3. Demonstrate asynchronous behavior
console.log('Action: Scheduling a background task...');
setTimeout(() => {
    myEmitter.emit('systemAlert', 'critical', 'Server rebooting in 5 seconds!');
}, 2000);

console.log('--- Immediate code execution finished (Waiting for async events) ---');