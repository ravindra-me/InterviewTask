var express = require('express');
var router = express.Router();
var user = require('../controller/User');
const auth = require('../middleware/auth');
/* GET users listing. */
router.post('/login', user.loginUser);
router.post('/', user.newUser);
router.put('/', auth.verifyToken, user.updateInformation);
module.exports = router;
