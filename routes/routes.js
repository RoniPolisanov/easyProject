const express = require('express');
const app = express();
const userRouter = require('./controllers/user/userRouter')

app.use('/users', userRouter);