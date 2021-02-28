require('http')
.createServer(function(request, response) {
return response.end('hello world!');
}).listen(8080);