const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');  // session middleware
const cors = require('cors')

const passport = require('./routes/shared/passportSettings');

const indexRouter = require('./routes/index');
const siteRouter = require('./routes/site');
const detectionRouter = require('./routes/detection');
const adminRouter = require('./routes/admin');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
  {
    origin: 'http://localhost:3001',
    credentials: true,
  }
));

// Configure Sessions Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'SID.Coo',
  cookie: {sameSite: false, maxAge: 60 * 60 * 1000, httpOnly: false } // 1 hour
}));

// Configure Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/site', siteRouter);
app.use('/detection', detectionRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;


