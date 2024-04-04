const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mergeFn = require("lodash").defaultsDeep;
var _ = require("lodash");
const axios = require("axios");
const path = require("path");
var cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const requestBase = {};
requestBase.key = "super-secret-api-key";
const jwtSecret = "supersecretkey";

function authenticateToken(req, res, next) {
  const token = req.cookies["token"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/login", function (req, res) {
  const body = req.body;

  const tokenValues = {
    username: body.username,
  };

  const token = jwt.sign(tokenValues, jwtSecret);

  res.cookie("token", token, { httpOnly: true });

  res.redirect("/app");
});

app.get("/app", authenticateToken, function (req, res) {
  res.render("app", { username: req.user.username, isAdmin: req.user.isAdmin });
});

app.get("/current-user", authenticateToken, function (req, res) {
  res.json(req.user);
});

app.post("/send-request", async function (req, res) {
  // Prepare request
  const request = mergeFn({}, requestBase, req.body);

  res.redirect("/app");
});

app.post("/send-request-formatted", authenticateToken, async function (req, res) {
  console.log('user', req.user)

  if (!req.user.isAdmin) {
    res.status(403).send("Not authorized");
    return;
  }

  const app = req.body.app; 

  console.log(app)

  _.template('Placeholder for fantastic report: <%= result =>', { variable: app })()
});

exports.vulnApi = app;

// testing
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
