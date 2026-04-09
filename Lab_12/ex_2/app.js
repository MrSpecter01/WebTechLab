const express = require('express');
const { requestLogger, authenticate } = require('./middleware');

const app = express();
const PORT = 3000;

// Apply Logger Globally (Application-level middleware)
app.use(requestLogger);

// Public Route (No authentication needed)
app.get('/', (req, res) => {
    res.send('Welcome to the Public Home Page!');
});

// Private Route (Middleware chaining: Logger -> Authenticate -> Final Handler)
app.get('/dashboard', authenticate, (req, res) => {
    res.send('Welcome to your Private Dashboard!');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});