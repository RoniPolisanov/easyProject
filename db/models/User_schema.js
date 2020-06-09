const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9,
    validate(value) {
      if (!validator.isNumeric(value))
        throw new Error('ID is invalid')
    }
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlpha(value))
        throw new Error('First name is invalid')
    }
  },
  last_name: {
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
        throw new Error('Date of birth is invalid')
    }
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isNumeric(value))
        throw new Error('Phone is invalid')
    }
  },
  address: {
    country: { type: String, required: true },
    postcode: { type: Number, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house_num: { type: Number, required: true }
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
  bank_account: {
    bank_num: { type: Number, required: true },
    branch_num: { type: Number, required: true },
    account_num: { type: Number, required: true }
  },
  creation_date: {
    type: Date,
    default: new Date()
  },
  token: { type: String, default: null }
}, { collection: 'users' })

UserSchema.index({ email: 1 }, { unique: true })

UserSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Unable to login');

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.token = token;
  await user.save();

  return token;
}

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.token;

  return userObject;
}

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8);

  next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
