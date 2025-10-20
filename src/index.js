import http from "http";
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`HTTP Request: ${req.method} ${req.url}`);

  if (req.method === "GET" && req.url === "/kukkuu") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end('{"message": "no kukkuu!"}');
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found :(");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
