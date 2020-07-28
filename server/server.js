const passport = require('passport');
const express = require('express');
const cookieSession = require("cookie-session");
const cors = require('cors');

const authRotes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes')
const connectDB = require('./config/db')
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');

const port = process.env.port || 5000;

require('./config/passport-setup')(passport)

connectDB();

const app = express();

app.use(cookieSession({
  // milliseconds of a day
  name: "session",
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use('/auth', authRotes)
app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production') {
  //kill yourself
}

app.listen(port, () => console.log(`Listening on port ${port}`));
