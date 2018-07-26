const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const options = {
  port: 3000
};

app.use(morgan("combined"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   console.log(`${req.method} - ${req.url}`);
//   next();
// });

app.get("/", function(req, res) {
  res.send("Hello World\n");
});

app.post(
  "/api",
  // function(req, res, next) {
  //   console.log(`${req.method} - ${req.url}`);
  //   next();
  // },
  function(req, res) {
    // curl -X POST -H "Content-Type: application/json" -d '{"val": 2}' localhost:3000/api
    const { val } = req.body;

    res.json({ val: Number(val) * 2 });
  }
);

app.listen(options, () => console.log(`Listening on ${options.port}`));
