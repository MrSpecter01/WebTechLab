// Mock database
let products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 499 }
];

// Logic for GET all products
exports.getAll = (req, res) => {
    res.json(products);
};

// Logic for GET single product by ID
exports.getById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
};

// Logic for POST (Create) a product
exports.create = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

// Logic for DELETE a product
exports.remove = (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
};