// mongodb://<dbuser>:<dbpassword>@ds117334.mlab.com:17334/easyproject
const mongoose = require('mongoose');

const connect = () => {
  return new Promise(( resolve, reject) => {
    mongoose.connect(process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // autoReconnect: true,
    })
      .then(() => resolve(console.log(`Mongoose default connection with user ${process.env.DB_USER}`)))
      .catch(err => reject(console.log(`DB Connection Error: ${err.message}`)));
  })
}

module.exports = connect;