const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const mime = require("mime-types");

const options = {
  port: 3001
};

const server = http.createServer(function(req, res) {
  // debugger;
  const parsedUrl = url.parse(req.url);
  const filePath = `.${parsedUrl.pathname}`;
  const ext = path.extname(filePath);
  const contentType = mime.lookup(ext);

  fs.exists(filePath, exists => {
    if (!exists) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    let PATH = filePath;
    // if (fs.statSync(filePath).isDirectory()) {
      // PATH += `${path.sep}index${ext || ".html"}`;
    // }

    fs.readFile(PATH, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`${filePath} could not be read: ${err.message}`);
      } else {
        res.setHeader("Content-type", contentType);
        res.end(data);
      }
    });
  });
});

server.listen(options, () => {
  console.log(`Listening on port ${options.port}`);
});
