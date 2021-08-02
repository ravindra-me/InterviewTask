var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const roleEnum = ['hr', 'developer', 'designer'];

const userRole = new Schema(
  {
    email: { type: String, match: /@/, required: true, unique: true },
    role: { type: String, enum: roleEnum },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserRole', userRole);
