const path = require("path");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoute = require("./routes/api.js");
// const ssr = require("./ssr-middleware.js");

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

// app.use("^/$", ssr);
app.use("/api", cors(), apiRoute);

// app.get("/users/:userId/books/:bookId", function(req, res) {
//   res.send(req.params);
// });

app.listen(options, () => console.log(`Listening on ${options.port}`));
