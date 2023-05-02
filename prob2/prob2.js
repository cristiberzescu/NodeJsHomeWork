const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = "3005";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("./prob2.html", "UTF-8", (err, html) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    });
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
