const express = require('express');
const mongoose = require('mongoose');
const Product = require('./product.model');

const app = express();
app.use(express.json());

// 1. Database Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/myShopDB'; 
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Successfully!'))
    .catch(err => console.error('Connection Error:', err));

// 2. CREATE: Insert a new product
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. READ: Retrieve all products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// 4. UPDATE: Update a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Returns the modified document
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: 'Update failed' });
    }
});

// 5. DELETE: Remove a product by ID
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));