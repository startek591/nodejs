const http = require('http');

const server = http.createServer(function (request, response) {
  response.setHeader('Content-Type', 'application/json'); // let the client know our response is JSON-formatted data
  response.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] })); //respond with a JSON file
});

server.listen(3000);