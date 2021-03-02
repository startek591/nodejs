const fs = require('fs');
const querystring = require('querystring');
const express = require('express');
const port = process.env.PORT || 1337;


const app = express();

function respondText (request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.end('hi');
}

function respondJson (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }))
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


app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)

app.listen(port, function(){
  console.log(`Server listening on port ${port}`);
})