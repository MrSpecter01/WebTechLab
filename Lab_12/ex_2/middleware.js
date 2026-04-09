// 1. Logger Middleware (Application-level)
exports.requestLogger = (req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${req.method} request to: ${req.url}`);
    next(); // Move to the next middleware
};

// 2. Auth Middleware (Route-level)
exports.authenticate = (req, res, next) => {
    const apiKey = req.query.api_key;
    
    if (apiKey === '12345') {
        console.log('Authentication Successful.');
        next(); // Authorization passed
    } else {
        console.log('Authentication Failed.');
        res.status(401).send('Error: Invalid API Key. Please provide ?api_key=12345 in the URL.');
    }
};