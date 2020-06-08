const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlpha(value))
        throw new Error('First name is invalid')
    }
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlpha(value))
        throw new Error('Last name is invalid')
    }
  },
  date_of_birth: {
    type: Date,
    required: true,
    validate(value) {
      if (!moment(value).isValid())
        throw new Error('Last name is invalid')
    }
  },
  avatar: {
    type: String,
    default: "https://www.academicapproach.com/wp-content/uploads/2019/09/iu.png"
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('Email is invalid')
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  tokens: [{
    token: { type: String, required: true }
  }]
}, { collection: 'users' })

UserSchema.index({ email: 1 }, { unique: true })

UserSchema.statics.findByCredentials = async (email, password) => {
  try{
    const user = await User.findOne({ email });
    if (!user) throw Error('Unable to login');
  }
  catch(e){
throw new Error (e.message);
  }

  try{
     const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw Error('Unable to login');
  }
  catch(e){
    throw new Error (e.message);
  }
 

  return user;
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8);

  next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User
