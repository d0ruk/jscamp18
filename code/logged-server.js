const http = require("http");

const finalhandler = require("finalhandler");
const morgan = require("morgan");

const logger = morgan("combined");

http.createServer(handler).listen(3000);

function handler(req, res) {
  const done = finalhandler(req, res);
  logger(req, res, function(err) {
    if (err) return done(err);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
  });
}
