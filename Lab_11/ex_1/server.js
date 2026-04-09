const http = require('http');
const handleRequest = require('./requestHandler');

// Define the port number
const PORT = 3000;

// Create the server using the built-in http module
const server = http.createServer((req, res) => {
    // Log the request to the console
    console.log(`Received ${req.method} request for ${req.url}`);
    
    // Pass the request and response to our handler
    handleRequest(req, res);
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
    console.log(`Server is successfully running at http://localhost:${PORT}`);
});