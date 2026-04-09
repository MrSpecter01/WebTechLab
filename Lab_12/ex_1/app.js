const express = require('express');
const productController = require('./productController');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/api/products', productController.getAll);
app.get('/api/products/:id', productController.getById);
app.post('/api/products', productController.create);
app.delete('/api/products/:id', productController.remove);

app.listen(PORT, () => {
    console.log(`REST API running at http://localhost:${PORT}`);
});