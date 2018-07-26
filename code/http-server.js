const http = require("http");

const options = {
  port: 3000
};

const server = http.createServer(function(req, res) {
  console.log("onConnection");
  debugger;
  res.statusCode = 200;
  // response.writeHead(200, { "Content-Type": "text/plain" });
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(options, () => {
  console.log(`Listening on port ${options.port}`);
});

// setTimeout(() => { server.close() }, 5000);
