var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = new Schema(
  {
    email: { type: String, match: /@/, required: true, unique: true },
    password: { type: String, min: 8, max: 15, required: true, minlength: 8 },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

user.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

user.pre('save', function (next) {
  if (this.email === 'admin@gmail.com') {
    this.isAdmin = true;
  }
  next();
});

user.methods.verifyPassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
    res.status(400).send(e);
  }
};

user.methods.signToken = async function () {
  var payload = {
    userId: this._id,
  };
  try {
    const token = jwt.sign(payload, process.env.SECRET);
    return token;
  } catch (error) {
    return error;
  }
};

user.methods.userJson = function (token) {
  return {
    email: this.email,
    token: token,
    isAdmin: this.isAdmin,
  };
};

module.exports = mongoose.model('User', user);
