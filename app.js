var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const cors = require('cors')
const db = require("./helper/db")();
var app = express();


app.use(bodyParser.json());

app.use(cors());


/////ROUTES//////////
var loginRouter = require('./routes/login');
app.use('/login', loginRouter);

var registerRouter = require('./routes/register');
app.use('/register', registerRouter);

var changePasswordRouter = require('./routes/changePassword');
app.use('/changePassword', changePasswordRouter);

var authRoutes=require('./routes/auth');
app.use('/activateEMail',authRoutes)

var productRouter =require('./routes/product');
app.use('/product', productRouter)






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:"error"});
});

app.listen(5002, () => {
  console.log('Server listening on port 5002')
})



/**************GOOGLE AUTHENTICATION */
// const passport = require('passport');
// const cookieSession = require('cookie-session')
// require('./passport-setup');
// app.use(cors())

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// // For an actual app you should configure this with an experation time, better keys, proxy and secure
// app.use(cookieSession({
//   name: 'ecoomerce-session',
//   keys: ['key1', 'key2']
// }))

// // Auth middleware that checks if the user is logged in
// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }


// // Initializes passport and passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

// // Example protected and unprotected routes
// app.get('/', (req, res) => res.send('Example Home page!'))
// app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// // In this route you can see that if the user is logged in u can acess his info in: req.user
// app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// // Auth Routes
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/good');
//   }
// );

// app.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// })



/************END OF GOOGLE AUTHENTICATION */

module.exports = app;
