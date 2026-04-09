// Function to handle the logic of the request and response
function handleRequest(req, res) {
    // 1. Set the response header (Content-Type)
    res.setHeader('Content-Type', 'text/html');

    // 2. Write the body content
    res.write('<h1>Hello from Node.js!</h1>');
    res.write('<p>This server is running without any external frameworks.</p>');

    // 3. End the response
    res.end();
}

module.exports = handleRequest;