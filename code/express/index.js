require("babel-core/register")({
  presets: ["react"]
});
const path = require("path");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const React = require("react");
const { renderToString } = require("react-dom/server");

const apiRoute = require("./routes/api.js");
const BlogApp = require("../blog_app/BlogApp.jsx");
const app = express();
const options = {
  port: 3000
};

app.use(express.static(__dirname + path.sep + "public"));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   console.log(`${req.method} - ${req.url}`);
//   next();
// });

app.use("/api", cors(), apiRoute);
app.get("/", function(req, res) {
  const app = renderToString(React.createElement(BlogApp));
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Blog</title>
    </head>

    <body>
      <div id="app">${app}</div>
      <script src="./index.js"></script>
    </body>
    </html>
  `;

  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end(html);
});

app.get("/users/:userId/books/:bookId", function(req, res) {
  res.send(req.params);
});

app.listen(options, () => console.log(`Listening on ${options.port}`));
