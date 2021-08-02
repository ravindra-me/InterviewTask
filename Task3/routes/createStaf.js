const express = require('express');
const router = express.Router();

const UserRole = require('../model/UserRole');
const auth = require('../middleware/auth');
const createRole = require('../controller/CreateStaf');

router.post('/', auth.verifyToken, createRole.newUser);

module.exports = router;
