const http = require("http");
const hostname = '10.1999.14.46';
const port = 8022;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World, this is from fadhlan classroom repo\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});