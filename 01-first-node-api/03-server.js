const http = require('http');

function respondText (request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.end('hi');
}

function respondJson (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }))
}

function respondNotFound (request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain' }) // set both a response status code and header
  response.end('Not Found');
}

const server = http.createServer(function (request, response) {
  if (request.url === '/') return respondText (request, response);
  if (request.url === '/json') return respondJson (request, response);
  respondNotFound (request, response);
});

server.listen(3000);