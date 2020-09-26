require("dotenv").config();
const http = require("http");

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
});

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
