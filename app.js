var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./helper/db")();
var app = express();
const exhbs = require('express-handlebars');
const crypto = require("crypto"); //to generate file name
app.use(bodyParser.json());
var fs = require("fs");
app.engine("handlebars",exhbs());
app.set("view engine","handlebars");
app.use(cors());



// const multer = require("multer");

// var Storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./public/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// var upload = multer({
//   storage: Storage,
// }).single("image"); //Field name and max count

// app.use(express.static('public/images'));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });
//
const morgan = require("morgan");
app.use(morgan("devStart"));
app.use('./public/images', express.static('./public/images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
/////ROUTES//////////
var loginRouter = require("./routes/login");
app.use("/login", loginRouter);

var registerRouter = require("./routes/register");
app.use("/register", registerRouter);

var changePasswordRouter = require("./routes/changePassword");
app.use("/changePassword", changePasswordRouter);

var authRoutes = require("./routes/auth");
app.use("/activateEmail", authRoutes);


var imageRoutes = require("./routes/image");
app.use("/image", imageRoutes);


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

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   console.log(err);
//   res.json({ error: "error" });
// });
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.listen(5008, () => {
  console.log("Server listening on port 5008");
});

module.exports = app;
