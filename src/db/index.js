// mongodb://<dbuser>:<dbpassword>@ds117334.mlab.com:17334/easyproject
const mongoose = require('mongoose')

const DB_USER = "easyproject"
const DB_PASS = "easyproject2020"
const DB_URI = `mongodb://${DB_USER}:${DB_PASS}@ds117334.mlab.com:17334/easyproject`

const connect = () => {
  mongoose.connect(DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
  });
}

module.exports = connect