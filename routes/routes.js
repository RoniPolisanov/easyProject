const userRouter = require('./controllers/user/userRouter');

exports.routes = app =>{
  app.use('/users', userRouter);
};