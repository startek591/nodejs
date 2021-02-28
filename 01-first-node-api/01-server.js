const http = require('http'); // loads the core module and stores in the http variable
const port = process.env.PORT || 1337; // choose a port 

const server = http.createServer(function (request, response) { // create a server object and assign it to the server variable
  response.end('hi');                                           // accepts a single arugment: a request listener function.
})                                                              // every time there's an HTTP request to our server
                                                                // each time it is hit in the browser (http://localhost:1337)
                                                                // response object send back data to the browser 'hi'
server.listen(port);
console.log(`Server listening on port ${port}`);