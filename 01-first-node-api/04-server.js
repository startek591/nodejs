const http = require('http');
const querystring = require('querystring');

function respondText (request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.end('hi');
}

function respondJson (request, response) {
  response.setHeader('Content-Type', 'applicaton/json');
  response.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }))
}

function respondNotFound (request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain' });
  response.end('Not Found');
}

function respondEcho (request, response) {
  const { input = '' } = querystring.parse(
    request.url
      .split('?')
      .slice(1)
      .join('')
  )
  response.setHeader('Content-Type', 'application/json');
  response.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      characterCount: input.length,
      backwards: input
        .split('')
        .reverse()
        .join('')
    })
  )
}
 
const server = http.createServer(function (request, response) {
  if (request.url === '/') return respondText (request, response);
  if (request.url === '/json') return respondJson (request, response);
  if (request.url.match(/^\/echo/)) return respondEcho (request, response);
  respondNotFound (request, response);
});

server.listen(3000);