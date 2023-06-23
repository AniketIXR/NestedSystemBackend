const express = require('express');
const app = express();
const cors = require('cors');
const AppError = require('./Utils/appError');
const postRoute = require('./route/postRoute');
const userRoute = require('./route/userRoute');
const commentRoute = require('./route/commentRoute');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  keys: ['your-secret-key'],
  maxAge: 24 * 60 * 60 * 1000, 
}));

// app.use(cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:3001',
//     credentials: true
//   }));

app.use(cors({
  origin: '*',
  credentials: true
}));

  const CURRENT_USER_ID = "647b11ce3dd2cc06163d72ed";
  
  const onRequestMiddleware = (req, res, next) => {
    
    if(req.cookies.userId !== CURRENT_USER_ID)
    {
      req.cookies.userId = CURRENT_USER_ID;
      res.clearCookie('userId');
      res.cookie('userId', CURRENT_USER_ID);
    }
    next();
  };

  app.use(onRequestMiddleware);


app.use(express.json());

app.use('/api/v1/posts',postRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/comments',commentRoute);

app.all("*",(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
