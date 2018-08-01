const path = require("path");

const express = require("express");
const level = require("level");
const uuid = require("uuid");
const debug = require("debug")("app:route:api");

const router = express.Router();
const options = { valueEncoding: "json" };
const DB_PATH = path.resolve(__dirname, "..", "mydb");
const db = level(DB_PATH, options);

db.on("put", (key, value) => {
  debug("db.put | key: %s | value: %j", key, value);
});
// router.all("/", function(req, res, next) {
//   console.log("/api endpoint'ine yapılan her METHOD'da bu middleware çalıştırılır");
//   next();
// });

// router.use(function(req, res, next) {
//   console.log(`${req.method} - ${req.url}`);
//   next();
// });

router.post(
  "/",
  // function(req, res, next) {
  //   console.log(`${req.method} - ${req.url}`);
  //   next();
  // },
  function(req, res) {
    const { title, body } = req.body;
    const id = uuid.v1();
    const created = Date.now();

    db.put(id, { id, body, title, created })
      .then(() => db.get(id))
      .then(post => {
        res.json({ post });
      })
      .catch(err => {
        res.statusCode = 500;
        res.json({ error: err.message });
      });
  }
);

router.get("/", function(req, res) {
  const stream = db.createValueStream();
  const posts = [];

  stream.on("data", data => {
    posts.push(data);
  });

  stream.on("end", () => {
    res.json({ posts });
  });
});

router.get("/:id", function(req, res) {
  const { id } = req.params;

  db.get(id)
    .then(post => {
      res.json({ post });
    })
    .catch(err => {
      res.statusCode = 500;
      res.json({ error: err.message });
    });
});

router.delete("/:id", function(req, res) {
  const { id } = req.params;

  db.del(id)
    .then(() => {
      res.json({ id });
    })
    .catch(err => {
      res.statusCode = 500;
      res.json({ error: err.message });
    });
});

module.exports = router;
