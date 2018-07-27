const http = require("http");

const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");

const PUBLIC_FOLDER = "folder";
const serve = serveStatic(PUBLIC_FOLDER);

// http://localhost:3000/
// http://localhost:3000/subfolder/
http
  .createServer(function(req, res) {
    const done = finalhandler(req, res);
    serve(req, res, done);
  })
  .listen(3000);
