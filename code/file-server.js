const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const debug = require("debug")("file-server");
const mime = require("mime-types");

const options = {
  port: 3001
};

const server = http.createServer(function(req, res) {
  let { pathname } = url.parse(req.url);
  if (pathname === "/") pathname += "index.html";
  const filePath = `.${pathname}`;
  debug("filePath: %s", filePath);

  fs.exists(filePath, exists => {
    if (!exists) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    // gerçek hayatta, http handler (ya da herhangi bir callback) içinde sync metod kullanmayın
    if (fs.statSync(filePath).isDirectory()) {
      res.writeHead(302, { Location: `${filePath}${path.sep}index.html` });
      res.end(); // redirect
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mime.lookup(ext) || "text/plain";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        // client'a node.js hatalarını dönmeyin - yani bunu yapmayın
        res.end(`${filePath} could not be read: ${err.message}`);
      }

      res.statusCode = 200;
      res.setHeader("Content-type", contentType);
      res.end(data);
    });
  });
});

server.listen(options, () => {
  console.log(`Listening on port ${options.port}`);
});
