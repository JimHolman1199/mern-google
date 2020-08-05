const passport = require('passport');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const bodyParser= require('body-parser');

const path = require('path');
const authRotes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes')
const connectDB = require('./config/db')

const port = process.env.port || 5000;

if(process.env.NODE_ENV !=='production') require('dotenv').config({path:'./config/.env'})

require('./config/passport-setup')(passport)

connectDB();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(
  session({
    secret: [process.env.EXPRESS_SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    store: false,
    proxy:true
  })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRotes)
app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'client/build')));

  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/build','index.html'))
  })
}

app.listen(port, (err) => {
  if(err) throw err;
  console.log(`Server running on port ${port}`)
});
