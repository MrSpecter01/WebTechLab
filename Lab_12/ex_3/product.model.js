const mongoose = require('mongoose');

// Define the Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: 'General' }
});

// Create and export the Model
module.exports = mongoose.model('Product', productSchema);