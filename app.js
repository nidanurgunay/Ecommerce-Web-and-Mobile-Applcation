var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./helper/db")();
var app = express();

const crypto = require("crypto"); //to generate file name
app.use(bodyParser.json());
var fs = require("fs");

app.use(cors());

/////ROUTES//////////
var loginRouter = require("./routes/login");
app.use("/login", loginRouter);

var registerRouter = require("./routes/register");
app.use("/register", registerRouter);

var changePasswordRouter = require("./routes/changePassword");
app.use("/changePassword", changePasswordRouter);

var authRoutes = require("./routes/auth");
app.use("/activateEmail", authRoutes);

var productRouter = require("./routes/product");
app.use("/product", productRouter);

var basketRouter = require("./routes/basket");
app.use("/basket", basketRouter);

var orderRouter = require("./routes/order");
app.use("/order", orderRouter);

var adressRouter = require("./routes/adress");
app.use("/adress", adressRouter);

var commentRouter = require("./routes/comment");
app.use("/comment", commentRouter);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ error: "error" });
});

app.listen(5005, () => {
  console.log("Server listening on port 5002");
});

module.exports = app;
