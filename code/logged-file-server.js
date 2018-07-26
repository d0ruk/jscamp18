const http = require("http");

const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");
const morgan = require("morgan");

const logger = morgan("combined");
const serve = serveStatic("folder");

http.createServer(function(req, res) {
  const done = finalhandler(req, res);
  logger(req, res, function(err) {
    if (err) return done(err);

    serve(req, res, done);
  });
}).listen(3000);
