const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const port = process.env.PORT || 1337;

function respondText (request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.end('hi');
};

function respondJson (request, response) {
  response.setHeader('Content-Type', 'application/json');
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

function respondStatic (request, response) {
  const filename = `${__dirname}/public${request.url.split('/static')[1]}`
  fs.createReadStream(filename)
    .on('error', () => respondNotFound(request, response))
    .pipe(response)


}

const server = http.createServer(function (request, response) {
  if (request.url === '/') return respondText (request, response);
  if (request.url === '/json') return respondJson (request, response);
  if (request.url.match(/^\/echo/)) return respondEcho (request, response);
  if (request.url.match(/^\/static/)) return respondStatic (request, response);

  respondNotFound (request, response);
});

server.listen(port);